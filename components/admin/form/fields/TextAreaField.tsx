"use client";

import AutoTextarea from "../AutoTextarea";
import { FieldShell } from "../FieldShell";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel } from "../utils";

/** Multi-line text, sized by the schema's `rows` and grown by its content. */
export default function TextAreaField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const id = fieldDomId(path);
  const text = typeof value === "string" ? value : value == null ? "" : String(value);

  return (
    <FieldShell
      path={path}
      htmlFor={id}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
    >
      <AutoTextarea
        id={id}
        value={text}
        rows={field.rows && field.rows > 0 ? field.rows : 3}
        invalid={Boolean(error)}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}
