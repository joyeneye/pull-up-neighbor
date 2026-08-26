"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteDocumentAction, setArchivedAction } from "@/app/admin/actions";
import { AlertIcon, ArchiveIcon, RestoreIcon, SpinnerIcon, TrashIcon } from "./icons";

const BUTTON =
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Archive / restore / delete for one row of a content library.
 *
 * Deleting is deliberately awkward: it asks for a second click, and when the
 * server refuses because something on the site still points at the document it
 * shows that sentence in place rather than doing nothing, which is what the old
 * Studio delete did.
 */
export default function LibraryRowActions({
  id,
  label,
  archived,
}: {
  id: string;
  label: string;
  archived: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [running, setRunning] = useState<"archive" | "delete" | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleArchive() {
    setError(null);
    setRunning("archive");
    startTransition(async () => {
      const result = await setArchivedAction(id, !archived);
      setRunning(null);
      if (!result.ok) {
        setError(result.error ?? "That change did not save. Please try again.");
        return;
      }
      router.refresh();
    });
  }

  function destroy() {
    setError(null);
    setRunning("delete");
    startTransition(async () => {
      const result = await deleteDocumentAction(id);
      setRunning(null);
      if (!result.ok) {
        setConfirming(false);
        setError(result.error ?? "That could not be deleted. Try archiving it instead.");
        return;
      }
      setConfirming(false);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      {confirming ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-slate-600">Delete permanently?</span>
          <button
            type="button"
            onClick={destroy}
            disabled={pending}
            aria-busy={pending && running === "delete"}
            className={`${BUTTON} border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700`}
          >
            {pending && running === "delete" ? <SpinnerIcon /> : <TrashIcon />}
            {pending && running === "delete" ? "Deleting…" : "Yes, delete"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={pending}
            className={`${BUTTON} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleArchive}
            disabled={pending}
            aria-busy={pending && running === "archive"}
            className={`${BUTTON} border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50`}
          >
            {pending && running === "archive" ? (
              <SpinnerIcon />
            ) : archived ? (
              <RestoreIcon />
            ) : (
              <ArchiveIcon />
            )}
            {pending && running === "archive"
              ? archived
                ? "Restoring…"
                : "Archiving…"
              : archived
                ? "Restore"
                : "Archive"}
            <span className="sr-only"> {label}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setConfirming(true);
            }}
            disabled={pending}
            className={`${BUTTON} border-transparent bg-transparent text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-700`}
          >
            <TrashIcon />
            Delete
            <span className="sr-only"> {label}</span>
          </button>
        </div>
      )}

      {error ? (
        <p
          role="alert"
          className="flex max-w-xs items-start gap-1.5 rounded-md bg-red-50 px-2.5 py-2 text-left text-sm text-red-700"
        >
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
