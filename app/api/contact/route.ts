import { createClient } from "next-sanity";
import { type NextRequest, NextResponse } from "next/server";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Receives contact form submissions and stores them as documents so they show
 * up in the Studio under "Inquiries".
 *
 * Until this existed, components/ContactForm.tsx called preventDefault() and
 * rendered "our team will be in touch within 2 business days" without sending
 * anything anywhere. Every inquiry was discarded.
 */

const MAX = { name: 200, organization: 200, email: 320, partnershipType: 100, message: 5000 };

type Payload = Record<string, unknown>;

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Deliberately permissive: rejecting unusual but valid addresses loses a real
// inquiry, which is worse than storing one that bounces.
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const message = clean(payload.message, MAX.message);
  const organization = clean(payload.organization, MAX.organization);
  const partnershipType = clean(payload.partnershipType, MAX.partnershipType);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  if (!looksLikeEmail(email)) {
    return NextResponse.json({ ok: false, error: "That email address looks wrong." }, { status: 400 });
  }

  // Honeypot: a hidden field only a bot fills in. Accept it so the bot sees
  // success and moves on, but store nothing.
  if (clean(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  if (!projectId || !token) {
    // Log the whole inquiry before failing, so it is recoverable from the
    // deployment logs rather than lost the way every earlier one was.
    console.error(
      "[contact] SANITY_API_WRITE_TOKEN is not set for this deployment — inquiry NOT saved to the " +
        "Studio. Recover it from this log line and set the env var.",
      { name, email, organization, partnershipType, message }
    );
    return NextResponse.json(
      { ok: false, error: "We could not send that just now. Please email us directly." },
      { status: 500 }
    );
  }

  try {
    const writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    });

    await writeClient.create({
      _type: "contactSubmission",
      status: "new",
      name,
      organization,
      email,
      partnershipType,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Log the whole submission so a storage failure does not also lose the
    // inquiry — it can be recovered from the deployment logs.
    console.error("[contact] failed to save inquiry", {
      name,
      email,
      organization,
      partnershipType,
      message,
      error,
    });
    return NextResponse.json(
      { ok: false, error: "We could not send that just now. Please try again." },
      { status: 502 }
    );
  }
}
