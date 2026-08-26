"use server";

import { redirect } from "next/navigation";
import {
  createDocument,
  deleteDocument,
  reorderReferences,
  saveDocument,
  setArchived,
  uploadImage,
} from "@/lib/admin/content";
import {
  currentUser,
  endSession,
  findUser,
  startSession,
  verifyPassword,
} from "@/lib/admin/auth";

/**
 * Every action re-checks the session. The layout guard is for navigation;
 * this is what actually protects the data, since a server action can be
 * invoked directly.
 */
async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("Not signed in");
  return user;
}

export type ActionResult = { ok: boolean; error?: string; revalidated?: string[]; id?: string };

export async function signIn(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, error: "Enter your email and password." };
  }

  const user = findUser(email);
  // Compare against a dummy hash when the user is unknown so a missing
  // account and a wrong password take the same time to answer.
  const stored =
    user?.passwordHash ??
    "0000000000000000000000000000000000000000000000000000000000000000:00";
  const valid = await verifyPassword(password, stored);

  if (!user || !valid) {
    return { ok: false, error: "That email and password do not match." };
  }

  await startSession({ email: user.email, name: user.name });
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

export async function saveDocumentAction(
  id: string,
  values: Record<string, unknown>
): Promise<ActionResult> {
  await requireUser();
  const result = await saveDocument(id, values);
  return result.ok
    ? { ok: true, revalidated: result.revalidated }
    : { ok: false, error: result.error };
}

export async function createDocumentAction(
  type: string,
  values: Record<string, unknown>
): Promise<ActionResult> {
  await requireUser();
  const result = await createDocument(type, values);
  return result.ok ? { ok: true, id: result.id } : { ok: false, error: result.error };
}

export async function setArchivedAction(id: string, archived: boolean): Promise<ActionResult> {
  await requireUser();
  const result = await setArchived(id, archived);
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function deleteDocumentAction(id: string): Promise<ActionResult> {
  await requireUser();
  const result = await deleteDocument(id);
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function reorderAction(
  docId: string,
  fieldName: string,
  orderedIds: string[]
): Promise<ActionResult> {
  await requireUser();
  const result = await reorderReferences(docId, fieldName, orderedIds);
  return result.ok ? { ok: true } : { ok: false, error: result.error };
}

export async function uploadImageAction(formData: FormData): Promise<
  { ok: true; assetId: string; url: string } | { ok: false; error: string }
> {
  await requireUser();
  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false, error: "No file received." };
  if (file.size > 20 * 1024 * 1024) {
    return { ok: false, error: "Images must be under 20 MB. Compress it and try again." };
  }
  return uploadImage(file);
}
