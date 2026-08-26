import { dataset, projectId } from "@/sanity/env";
import type { AdminField } from "@/lib/admin/schema-types";

/** "richTextBlock" -> "Rich Text Block", "primaryCta" -> "Primary Cta". */
export function humanise(name: string): string {
  const spaced = name
    .replace(/[_-]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
  if (!spaced) return name;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Every field gets a visible label, even when the schema left the title blank. */
export function fieldLabel(field: AdminField): string {
  const title = field.title?.trim();
  return title && title.length > 0 ? title : humanise(field.name);
}

/**
 * A read-only field with no title is a Studio-only widget (a custom input
 * rendered in place of the field). There is nothing for an editor to do with
 * it here, and a disabled empty box would be a dead control, so it is skipped.
 */
export function isHiddenField(field: AdminField): boolean {
  return field.readOnly === true && !(field.title ?? "").trim();
}

let keyCounter = 0;

/** Stable unique _key for a new array member. */
export function newKey(): string {
  const globalCrypto = typeof crypto !== "undefined" ? crypto : undefined;
  if (globalCrypto && typeof globalCrypto.randomUUID === "function") {
    return globalCrypto.randomUUID().replace(/-/g, "").slice(0, 12);
  }
  keyCounter += 1;
  return `k${Date.now().toString(36)}${keyCounter.toString(36)}`;
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** True when a value counts as "not filled in" for a required check. */
export function isBlank(value: unknown): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (typeof value === "number") return Number.isNaN(value);
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return value.length === 0;
  if (isPlainObject(value)) {
    if ("current" in value) return isBlank(value.current);
    if ("asset" in value) return isBlank(value.asset);
    if ("_ref" in value) return isBlank(value._ref);
    return Object.keys(value).every((key) => key === "_type" || key === "_key" || isBlank(value[key]));
  }
  return false;
}

/** Reads a member's _key, generating nothing — callers add keys when they add members. */
export function memberKey(member: unknown, index: number): string {
  if (isPlainObject(member) && typeof member._key === "string" && member._key) return member._key;
  return `index-${index}`;
}

/** Moves an array member, returning a new array. Out-of-range moves are no-ops. */
export function moveItem<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length || from === to) return items;
  const next = items.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/**
 * A CDN preview URL for a Sanity image asset id
 * ("image-<sha>-<w>x<h>-<ext>"). Returns null for anything unrecognised so the
 * caller can fall back to a placeholder instead of a broken <img>.
 */
export function assetPreviewUrl(ref: string | undefined, width = 320): string | null {
  if (!ref || !projectId) return null;
  const match = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/.exec(ref);
  if (!match) return null;
  const [, sha, dimensions, extension] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${sha}-${dimensions}.${extension}?w=${width}&fit=max&auto=format`;
}

/** The asset id held by an image / file / mux value, if there is one. */
export function assetRefOf(value: unknown): string | undefined {
  if (!isPlainObject(value)) return undefined;
  const asset = value.asset;
  if (isPlainObject(asset) && typeof asset._ref === "string") return asset._ref;
  if (typeof value._ref === "string") return value._ref;
  return undefined;
}

/** Deterministic JSON with sorted keys, so dirty checks ignore key order. */
export function stableStringify(value: unknown): string {
  if (value === undefined) return "null";
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (isPlainObject(value)) {
    const keys = Object.keys(value).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

/** A short, human summary of a nested member, for card headers. */
export function summarise(member: unknown, limit = 70): string {
  if (!isPlainObject(member)) return "";
  for (const key of ["title", "name", "label", "heading", "eyebrow", "phase", "value", "quote"]) {
    const candidate = member[key];
    if (typeof candidate === "string" && candidate.trim()) {
      const text = candidate.trim().replace(/\s+/g, " ");
      return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
    }
  }
  return "";
}

/** Path helpers keep error keys and DOM ids in one format. */
export function childPath(path: string, name: string): string {
  return path ? `${path}.${name}` : name;
}

export function indexPath(path: string, index: number): string {
  return `${path}[${index}]`;
}

/** A DOM-id-safe version of a field path. */
export function fieldDomId(path: string): string {
  return `admin-field-${path.replace(/[^a-zA-Z0-9]+/g, "-")}`;
}
