"use client";

import { FieldShell } from "../FieldShell";
import { useFormEnv } from "../FormContext";
import { inputInvalid, selectBase } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel, isPlainObject } from "../utils";

/** A single pointer to another document, chosen from the picker options. */
export default function ReferenceField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const { refOptions } = useFormEnv();
  const id = fieldDomId(path);
  const options = refOptions[field.name] ?? [];
  const current = isPlainObject(value) && typeof value._ref === "string" ? value._ref : "";
  const missing = current.length > 0 && !options.some((option) => option._id === current);

  return (
    <FieldShell
      path={path}
      htmlFor={id}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
      hint={
        options.length === 0
          ? "There is nothing to choose from yet. Create one first and it will show up here."
          : undefined
      }
    >
      <select
        id={id}
        className={`${selectBase} max-w-md ${error ? inputInvalid : ""}`}
        value={missing ? "" : current}
        disabled={disabled || options.length === 0}
        aria-invalid={error ? true : undefined}
        onChange={(event) => {
          const next = event.target.value;
          if (!next) {
            onChange(undefined);
            return;
          }
          const base = isPlainObject(value) ? value : {};
          onChange({ ...base, _type: "reference", _ref: next });
        }}
      >
        <option value="">{field.required ? "Choose one…" : "Not set"}</option>
        {missing ? <option value={current}>Item no longer available</option> : null}
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.archived ? `${option.label} (archived)` : option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
