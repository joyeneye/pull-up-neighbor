"use client";

import { FieldShell, GroupShell } from "../FieldShell";
import { focusRing, inputInvalid, selectBase } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel } from "../utils";

const RADIO_LIMIT = 4;

export default function ChoiceField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const id = fieldDomId(path);
  const choices = field.choices ?? [];
  const current = value === undefined || value === null ? "" : String(value);

  // Choices are generated as strings; a numeric field has to get a number back.
  const emit = (raw: string) => {
    if (raw === "") {
      onChange(undefined);
      return;
    }
    if (field.type === "number") {
      const parsed = Number(raw);
      onChange(Number.isFinite(parsed) ? parsed : raw);
      return;
    }
    onChange(raw);
  };

  if (choices.length > 0 && choices.length <= RADIO_LIMIT) {
    const options = field.required ? choices : [{ title: "Not set", value: "" }, ...choices];
    return (
      <GroupShell
        path={path}
        label={fieldLabel(field)}
        description={field.description}
        required={field.required}
        error={error}
      >
        <div className="flex flex-wrap gap-2 pt-0.5">
          {options.map((choice) => {
            const checked = current === choice.value;
            return (
              <label
                key={choice.value || "__none"}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  checked
                    ? "border-brand-500 bg-brand-50 font-medium text-brand-800"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
              >
                <input
                  type="radio"
                  name={id}
                  className={`h-4 w-4 accent-brand-500 ${focusRing}`}
                  value={choice.value}
                  checked={checked}
                  disabled={disabled}
                  onChange={() => emit(choice.value)}
                />
                {choice.title}
              </label>
            );
          })}
        </div>
      </GroupShell>
    );
  }

  return (
    <FieldShell
      path={path}
      htmlFor={id}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
    >
      <select
        id={id}
        className={`${selectBase} max-w-md ${error ? inputInvalid : ""}`}
        value={current}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        onChange={(event) => emit(event.target.value)}
      >
        <option value="">{field.required ? "Choose one…" : "Not set"}</option>
        {choices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {choice.title}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
