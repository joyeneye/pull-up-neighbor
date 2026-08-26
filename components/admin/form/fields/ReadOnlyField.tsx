"use client";

import { LockIcon } from "../icons";
import { helpText, labelText } from "../styles";
import type { FieldProps } from "../types";
import { fieldLabel, isBlank } from "../utils";

/** Renders an ISO timestamp identically on the server and in the browser. */
function formatTimestamp(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  const text = parsed.toISOString();
  return `${text.slice(0, 10)} at ${text.slice(11, 16)} UTC`;
}

function displayValue(type: string, value: unknown): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  if (typeof value === "string") {
    return type === "datetime" ? formatTimestamp(value) : value;
  }
  return "Set";
}

/**
 * Values the schema marks read-only. They stay selectable so an editor can
 * copy an address or a message, and they are never included in a save.
 */
export default function ReadOnlyField({ field, value, path }: FieldProps) {
  const label = fieldLabel(field);
  const empty = isBlank(value);
  const text = empty ? "Not set" : displayValue(field.type, value);
  const multiline = field.type === "text" || text.includes("\n");

  return (
    <div data-field-path={path} className="space-y-1.5">
      <p className={labelText}>
        {label}
        <span className="ml-2 inline-flex items-center gap-1 align-middle rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
          <LockIcon width={11} height={11} />
          Read only
        </span>
      </p>
      {field.description ? <p className={helpText}>{field.description}</p> : null}
      <div
        className={`rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm ${
          empty ? "text-slate-400 italic" : "text-slate-700"
        } ${multiline ? "whitespace-pre-wrap leading-relaxed" : ""}`}
      >
        {text}
      </div>
    </div>
  );
}
