"use client";

import { FieldShell } from "../FieldShell";
import { inputBase, inputInvalid } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel } from "../utils";

export default function NumberField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const id = fieldDomId(path);
  const text =
    typeof value === "number" && Number.isFinite(value)
      ? String(value)
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
    >
      <input
        id={id}
        type="number"
        inputMode="decimal"
        className={`${inputBase} max-w-40 ${error ? inputInvalid : ""}`}
        value={text}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        onChange={(event) => {
          const raw = event.target.value;
          if (raw.trim() === "") {
            onChange(undefined);
            return;
          }
          const parsed = Number(raw);
          onChange(Number.isFinite(parsed) ? parsed : raw);
        }}
      />
    </FieldShell>
  );
}
