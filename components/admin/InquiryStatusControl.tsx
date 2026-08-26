"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { saveDocumentAction } from "@/app/admin/actions";
import { AlertIcon, CheckIcon, ChevronRightIcon, SpinnerIcon } from "./icons";

export type StatusChoice = { title: string; value: string };

const DOT: Record<string, string> = {
  new: "bg-brand-500",
  read: "bg-slate-400",
  replied: "bg-blue-500",
  archived: "bg-slate-300",
};

/**
 * The status dropdown on an inquiry. Saves on change — there is no separate
 * save button on this screen — and says so, because a control that silently
 * writes to the database is only trustworthy if it reports back.
 */
export default function InquiryStatusControl({
  id,
  subject,
  status,
  choices,
}: {
  id: string;
  subject: string;
  status: string;
  choices: StatusChoice[];
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setValue(status);
  }, [status]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  function change(next: string) {
    const previous = value;
    setValue(next);
    setState("saving");
    setError(null);

    startTransition(async () => {
      const result = await saveDocumentAction(id, { status: next });
      if (!result.ok) {
        setValue(previous);
        setState("error");
        setError(result.error ?? "That did not save. Check your connection and try again.");
        return;
      }
      setState("saved");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setState("idle"), 2500);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col items-start gap-1.5 sm:items-end">
      <div className="relative">
        <span
          aria-hidden
          className={`pointer-events-none absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${
            DOT[value] ?? "bg-slate-300"
          }`}
        />
        <select
          value={value}
          onChange={(event) => change(event.target.value)}
          disabled={state === "saving"}
          aria-label={`Status for the inquiry from ${subject}`}
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-7 pr-9 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 sm:w-44"
        >
          {choices.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.title}
            </option>
          ))}
        </select>
        <ChevronRightIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-slate-400" />
      </div>

      <p
        className="flex min-h-5 items-center gap-1.5 text-xs"
        role={state === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {state === "saving" ? (
          <span className="flex items-center gap-1.5 text-slate-500">
            <SpinnerIcon className="h-3.5 w-3.5" />
            Saving…
          </span>
        ) : null}
        {state === "saved" ? (
          <span className="flex items-center gap-1.5 text-brand-700">
            <CheckIcon className="h-3.5 w-3.5" />
            Saved
          </span>
        ) : null}
        {state === "error" && error ? (
          <span className="flex items-start gap-1.5 text-red-700">
            <AlertIcon className="mt-px h-3.5 w-3.5 shrink-0" />
            {error}
          </span>
        ) : null}
      </p>
    </div>
  );
}
