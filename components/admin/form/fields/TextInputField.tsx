"use client";

import { FieldShell } from "../FieldShell";
import { inputBase, inputInvalid } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel } from "../utils";

/** Single-line text. Also serves `url`, which only changes the input type. */
export default function TextInputField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const id = fieldDomId(path);
  const text = typeof value === "string" ? value : value == null ? "" : String(value);
  const isUrl = field.type === "url";

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
        type={isUrl ? "url" : "text"}
        className={`${inputBase} ${error ? inputInvalid : ""}`}
        value={text}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        placeholder={isUrl ? "https://" : undefined}
        inputMode={isUrl ? "url" : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  );
}
