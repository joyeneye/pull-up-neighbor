"use client";

import { helpText, focusRing } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel } from "../utils";

/** A real switch: a button with role="switch", so it works from the keyboard. */
export default function BooleanField({ field, value, onChange, path, disabled }: FieldProps) {
  const id = fieldDomId(path);
  const on = value === true;
  const label = fieldLabel(field);
  const describedBy = field.description ? `${id}-description` : undefined;

  return (
    <div data-field-path={path} className="flex items-start gap-3">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-describedby={describedBy}
        disabled={disabled}
        onClick={() => onChange(!on)}
        className={`mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          on ? "border-brand-600 bg-brand-500" : "border-slate-300 bg-slate-200"
        } ${focusRing}`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
      <div className="min-w-0 space-y-1">
        <label htmlFor={id} className="block cursor-pointer text-sm font-semibold text-slate-900">
          {label}
        </label>
        {field.description ? (
          <p id={describedBy} className={helpText}>
            {field.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
