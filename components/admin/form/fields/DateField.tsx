"use client";

import { FieldShell } from "../FieldShell";
import { inputBase, inputInvalid } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel } from "../utils";

/**
 * ISO timestamp <-> the "YYYY-MM-DDTHH:mm" a datetime-local input wants.
 * The conversion stays in UTC on purpose: doing it in the viewer's timezone
 * would render differently on the server than in the browser.
 */
function isoToInput(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 16);
}

function inputToIso(local: string): string | undefined {
  if (!local) return undefined;
  const parsed = new Date(`${local}:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

/** Handles both `date` (plain day) and `datetime` (full timestamp). */
export default function DateField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const id = fieldDomId(path);
  const isDateOnly = field.type === "date";
  const raw = typeof value === "string" ? value : "";
  const inputValue = isDateOnly ? raw.slice(0, 10) : isoToInput(raw);

  return (
    <FieldShell
      path={path}
      htmlFor={id}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
      hint={isDateOnly ? undefined : "Times are stored and shown in UTC."}
    >
      <input
        id={id}
        type={isDateOnly ? "date" : "datetime-local"}
        className={`${inputBase} max-w-64 ${error ? inputInvalid : ""}`}
        value={inputValue}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        onChange={(event) => {
          const next = event.target.value;
          if (!next) {
            onChange(undefined);
            return;
          }
          onChange(isDateOnly ? next : inputToIso(next));
        }}
      />
    </FieldShell>
  );
}
