"use client";

import { FieldShell } from "../FieldShell";
import { inputBase, inputInvalid } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel, isPlainObject } from "../utils";

/** Keeps a slug URL-safe while it is being typed, without eating the dash. */
function toSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+/, "");
}

export default function SlugField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const id = fieldDomId(path);
  const stored = isPlainObject(value)
    ? typeof value.current === "string"
      ? value.current
      : ""
    : typeof value === "string"
      ? value
      : "";

  return (
    <FieldShell
      path={path}
      htmlFor={id}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
      hint={
        stored ? (
          <>
            Saved as <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-slate-700">#{stored}</code>
          </>
        ) : (
          "Letters, numbers and dashes only — spaces become dashes automatically."
        )
      }
    >
      <input
        id={id}
        type="text"
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        className={`${inputBase} font-mono ${error ? inputInvalid : ""}`}
        value={stored}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        placeholder="wealth-playbook"
        onChange={(event) => {
          const current = toSlug(event.target.value);
          if (!current) {
            onChange(undefined);
            return;
          }
          const base = isPlainObject(value) ? value : {};
          onChange({ ...base, _type: "slug", current });
        }}
      />
    </FieldShell>
  );
}
