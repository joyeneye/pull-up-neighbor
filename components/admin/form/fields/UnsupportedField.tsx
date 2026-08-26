"use client";

import { LockIcon } from "../icons";
import { helpText, labelText } from "../styles";
import type { FieldProps } from "../types";
import { fieldLabel, isBlank } from "../utils";

/**
 * A field whose type this editor has no widget for. It is shown rather than
 * hidden so nothing looks missing, and its stored value is carried through a
 * save untouched.
 */
export default function UnsupportedField({ field, value, path }: FieldProps) {
  const filled = !isBlank(value);

  return (
    <div data-field-path={path} className="space-y-1.5">
      <p className={labelText}>{fieldLabel(field)}</p>
      {field.description ? <p className={helpText}>{field.description}</p> : null}
      <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
        <LockIcon className="mt-0.5 shrink-0 text-slate-400" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-700">
            {filled ? "This field has content." : "This field is empty."}
          </p>
          <p className={helpText}>
            It is not editable from this screen yet, and saving leaves it exactly as it is.
          </p>
        </div>
      </div>
    </div>
  );
}
