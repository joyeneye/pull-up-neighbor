import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";

/**
 * Authentication for the custom admin panel.
 *
 * Users live in the ADMIN_USERS environment variable rather than in Sanity,
 * because the production dataset is world-readable without a token — an
 * unauthenticated GET against the query API returns documents — so password
 * hashes stored there would be public. Env vars are private to the deployment.
 *
 * Passwords are scrypt-hashed (Node built-in, no dependency). Sessions are a
 * signed cookie: payload.signature, HMAC-SHA256 over the payload with
 * ADMIN_SESSION_SECRET. Nothing sensitive is in the payload — it carries the
 * email and an expiry, and the signature is what makes it trustworthy.
 */

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number
) => Promise<Buffer>;

const SESSION_COOKIE = "pun_admin_session";
const SESSION_DAYS = 14;
const KEY_LENGTH = 64;

export type AdminUser = { email: string; name: string; passwordHash: string };
export type SessionUser = { email: string; name: string };

export function hashError(): string | null {
  if (!process.env.ADMIN_SESSION_SECRET) return "ADMIN_SESSION_SECRET is not set";
  if (!process.env.ADMIN_USERS) return "ADMIN_USERS is not set";
  return null;
}

/** scrypt hash in the form salt:derivedKey, both hex. */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = await scryptAsync(password, salt, KEY_LENGTH);
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const derived = await scryptAsync(password, salt, KEY_LENGTH);
  const expected = Buffer.from(key, "hex");
  if (expected.length !== derived.length) return false;
  return timingSafeEqual(expected, derived);
}

function loadUsers(): AdminUser[] {
  const raw = process.env.ADMIN_USERS;
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (u): u is AdminUser =>
        typeof u?.email === "string" &&
        typeof u?.passwordHash === "string" &&
        u.email.length > 0
    );
  } catch {
    console.error("[admin] ADMIN_USERS is not valid JSON — nobody can sign in");
    return [];
  }
}

export function findUser(email: string): AdminUser | undefined {
  const needle = email.trim().toLowerCase();
  return loadUsers().find((u) => u.email.toLowerCase() === needle);
}

function sign(payload: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function createToken(user: SessionUser): string {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = Buffer.from(
    JSON.stringify({ email: user.email, name: user.name, expires })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function readToken(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      email?: string;
      name?: string;
      expires?: number;
    };
    if (!data.email || !data.expires || Date.now() > data.expires) return null;
    return { email: data.email, name: data.name ?? data.email };
  } catch {
    return null;
  }
}

export async function startSession(user: SessionUser): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, createToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** The signed-in user, or null. Safe to call from any server component. */
export async function currentUser(): Promise<SessionUser | null> {
  if (!process.env.ADMIN_SESSION_SECRET) return null;
  const store = await cookies();
  return readToken(store.get(SESSION_COOKIE)?.value);
}
