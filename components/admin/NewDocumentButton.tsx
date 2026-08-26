"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { createDocumentAction } from "@/app/admin/actions";
import { AlertIcon, PlusIcon, SpinnerIcon } from "./icons";

/**
 * Creates an empty document of `type` and drops the editor straight into it.
 *
 * Creating and then navigating has to happen after the server answers with the
 * new id, so this is a button rather than a link. `defaults` is worked out on
 * the server (it needs the schema) and passed down, so a new row never shows up
 * in the list as a blank line.
 */
export default function NewDocumentButton({
  type,
  label,
  defaults,
  variant = "solid",
}: {
  type: string;
  label: string;
  defaults?: Record<string, unknown>;
  variant?: "solid" | "outline";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function create() {
    setError(null);
    startTransition(async () => {
      const result = await createDocumentAction(type, defaults ?? {});
      if (result.ok && result.id) {
        router.push(`/admin/edit/${result.id}`);
        return;
      }
      setError(result.error ?? "Could not create that just now. Please try again.");
    });
  }

  const base =
    "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
  const skin =
    variant === "solid"
      ? "bg-brand-500 text-white shadow-sm hover:bg-brand-600 active:bg-brand-700"
      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50 active:bg-slate-100";

  return (
    <div className="flex flex-col items-start gap-2">
      <button type="button" onClick={create} disabled={pending} aria-busy={pending} className={`${base} ${skin}`}>
        {pending ? <SpinnerIcon /> : <PlusIcon />}
        {pending ? "Creating…" : label}
      </button>
      {error ? (
        <p role="alert" className="inline-flex items-start gap-1.5 text-sm text-red-700">
          <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
