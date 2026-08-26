import { createClient, type SanityClient } from "next-sanity";
import { revalidatePath } from "next/cache";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { routesForDocument } from "@/sanity/lib/routes";
import schema from "./schema.json";
import type { AdminField, AdminType } from "./schema-types";

/**
 * Server-side content access for the custom admin panel.
 *
 * Every read and write goes through here with the write token, from the
 * server. That is the whole reason the custom panel sidesteps the problem
 * Studio had: the browser never talks to Sanity directly, so there is no
 * origin to whitelist and nothing to register.
 *
 * Saving revalidates the affected route in the same request, so a save is
 * live by the time the editor sees the confirmation — no webhook round trip.
 */

const TYPES = (schema as { types: Record<string, AdminType> }).types;

export function getType(name: string): AdminType | null {
  return TYPES[name] ?? null;
}

export function allTypes(): Record<string, AdminType> {
  return TYPES;
}

let cached: SanityClient | null = null;

function writeClient(): SanityClient {
  if (cached) return cached;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!projectId || !token) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID must be set for the admin panel to read or save content."
    );
  }
  cached = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: "published",
  });
  return cached;
}

export type Doc = Record<string, unknown> & { _id: string; _type: string };

export async function getDocument(id: string): Promise<Doc | null> {
  const doc = await writeClient().fetch<Doc | null>(`*[_id == $id][0]`, { id });
  return doc ?? null;
}

export async function listDocuments(type: string): Promise<Doc[]> {
  return writeClient().fetch<Doc[]>(
    `*[_type == $type] | order(coalesce(displayOrder, 0) asc, _createdAt asc)`,
    { type }
  );
}

export async function listInquiries(onlyNew: boolean): Promise<Doc[]> {
  const filter = onlyNew
    ? `_type == "contactSubmission" && (status == "new" || !defined(status))`
    : `_type == "contactSubmission"`;
  return writeClient().fetch<Doc[]>(`*[${filter}] | order(submittedAt desc)`);
}

/**
 * Strips fields the admin must never write. _id/_type/_rev are addressed
 * separately; system fields and anything not in the schema are dropped so a
 * tampered form body cannot inject arbitrary document structure.
 */
function sanitize(type: AdminType, input: Record<string, unknown>): Record<string, unknown> {
  const allowed = new Set(type.fields.map((f) => f.name));
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (!allowed.has(key)) continue;
    out[key] = value;
  }
  return out;
}

/** Empty strings should clear the field rather than store "". */
function toPatch(values: Record<string, unknown>): { set: Record<string, unknown>; unset: string[] } {
  const set: Record<string, unknown> = {};
  const unset: string[] = [];
  for (const [key, value] of Object.entries(values)) {
    if (value === "" || value === null || value === undefined) unset.push(key);
    else set[key] = value;
  }
  return { set, unset };
}

export type SaveResult = { ok: true; revalidated: string[] } | { ok: false; error: string };

export async function saveDocument(
  id: string,
  values: Record<string, unknown>
): Promise<SaveResult> {
  const existing = await getDocument(id);
  if (!existing) return { ok: false, error: `No document with id ${id}` };

  const type = getType(existing._type);
  if (!type) return { ok: false, error: `Unknown type ${existing._type}` };

  const clean = sanitize(type, values);
  const { set, unset } = toPatch(clean);

  try {
    let patch = writeClient().patch(id);
    if (Object.keys(set).length) patch = patch.set(set);
    if (unset.length) patch = patch.unset(unset);
    await patch.commit();
  } catch (error) {
    console.error("[admin] save failed", { id, error });
    return { ok: false, error: error instanceof Error ? error.message : "Save failed" };
  }

  const routes = routesForDocument(id, existing._type);
  for (const route of routes) revalidatePath(route);

  return { ok: true, revalidated: routes };
}

export async function createDocument(
  type: string,
  values: Record<string, unknown>
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const schemaType = getType(type);
  if (!schemaType) return { ok: false, error: `Unknown type ${type}` };

  try {
    const created = await writeClient().create({
      _type: type,
      ...sanitize(schemaType, values),
    });
    for (const route of routesForDocument(created._id, type)) revalidatePath(route);
    return { ok: true, id: created._id };
  } catch (error) {
    console.error("[admin] create failed", { type, error });
    return { ok: false, error: error instanceof Error ? error.message : "Create failed" };
  }
}

/**
 * Archiving is the normal way to remove something. Real deletion is only
 * offered for documents nothing references, and Sanity rejects it otherwise.
 */
export async function setArchived(id: string, archived: boolean): Promise<SaveResult> {
  return saveDocument(id, { archived });
}

export async function deleteDocument(
  id: string
): Promise<{ ok: true } | { ok: false; error: string; referencedBy?: string[] }> {
  const doc = await getDocument(id);
  if (!doc) return { ok: false, error: "Already gone" };

  const referencedBy = await writeClient().fetch<{ _id: string }[]>(
    `*[references($id)]{_id}`,
    { id }
  );
  if (referencedBy.length > 0) {
    return {
      ok: false,
      error: "Still used on the site — archive it instead.",
      referencedBy: referencedBy.map((r) => r._id),
    };
  }

  try {
    await writeClient().delete(id);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Delete failed" };
  }

  for (const route of routesForDocument(id, doc._type)) revalidatePath(route);
  return { ok: true };
}

/** Persists a new order for a curated reference list on a section document. */
export async function reorderReferences(
  docId: string,
  fieldName: string,
  orderedIds: string[]
): Promise<SaveResult> {
  const refs = orderedIds.map((id) => ({ _type: "reference", _ref: id, _key: id }));
  return saveDocument(docId, { [fieldName]: refs });
}

export async function uploadImage(file: File): Promise<{ ok: true; assetId: string; url: string } | { ok: false; error: string }> {
  try {
    const asset = await writeClient().assets.upload("image", file, {
      filename: file.name,
    });
    return { ok: true, assetId: asset._id, url: asset.url };
  } catch (error) {
    console.error("[admin] image upload failed", error);
    return { ok: false, error: error instanceof Error ? error.message : "Upload failed" };
  }
}

/** Documents referenced by a picker field, for the dropdown options. */
export async function referenceOptions(types: string[]): Promise<{ _id: string; label: string; archived: boolean }[]> {
  const docs = await writeClient().fetch<Doc[]>(
    `*[_type in $types] | order(coalesce(displayOrder, 0) asc)`,
    { types }
  );
  return docs.map((d) => ({
    _id: d._id,
    label: String(d.name ?? d.title ?? d.label ?? d.type ?? d._id),
    archived: d.archived === true,
  }));
}

export type { AdminField, AdminType };
