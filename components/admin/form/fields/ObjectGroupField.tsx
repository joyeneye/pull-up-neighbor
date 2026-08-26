"use client";

import { GroupShell } from "../FieldShell";
import { useFormEnv } from "../FormContext";
import type { FieldProps } from "../types";
import { fieldLabel, isPlainObject } from "../utils";

/**
 * A named object type (cta, finalCta, …) rendered as a bordered sub-form.
 * Sub-fields are locked by the shared form environment, so this widget does
 * not need the `disabled` flag of its own.
 */
export default function ObjectGroupField({ field, value, onChange, path, error }: FieldProps) {
  const { NestedFields } = useFormEnv();
  const object = isPlainObject(value) ? value : {};

  return (
    <GroupShell
      path={path}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
    >
      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
        <NestedFields
          fields={field.fields ?? []}
          values={object}
          path={path}
          onChange={(name, next) => onChange({ ...object, [name]: next })}
        />
      </div>
    </GroupShell>
  );
}
