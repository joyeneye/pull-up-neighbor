"use client";

import { GroupShell } from "../FieldShell";
import { useFormEnv } from "../FormContext";
import { MoveControls, RemoveButton } from "../controls";
import { PlusIcon } from "../icons";
import { buttonSecondary, helpText } from "../styles";
import type { FieldProps } from "../types";
import {
  fieldLabel,
  indexPath,
  isPlainObject,
  memberKey,
  moveItem,
  newKey,
  summarise,
} from "../utils";

/** A repeatable group of sub-fields — the cards inside a section, and so on. */
export default function ObjectListField({ field, value, onChange, path, error }: FieldProps) {
  const { NestedFields, disabled } = useFormEnv();
  const memberFields = field.fields ?? [];
  const members: Record<string, unknown>[] = (Array.isArray(value) ? value : []).map((member) =>
    isPlainObject(member) ? member : {}
  );

  const replace = (index: number, next: Record<string, unknown>) =>
    onChange(members.map((member, i) => (i === index ? next : member)));

  return (
    <GroupShell
      path={path}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
    >
      <div className="space-y-3">
        {members.length === 0 ? (
          <p className={`${helpText} rounded-lg border border-dashed border-slate-300 px-3 py-3`}>
            Nothing here yet. Add your first one below.
          </p>
        ) : null}

        {members.map((member, index) => {
          const summary = summarise(member);
          const itemLabel = summary || `item ${index + 1}`;
          return (
            <div
              key={memberKey(member, index)}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-xs font-semibold tabular-nums text-slate-500 ring-1 ring-slate-200">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-700">
                  {summary || `Item ${index + 1}`}
                </span>
                <span className="flex shrink-0 items-center gap-0.5">
                  <MoveControls
                    index={index}
                    count={members.length}
                    disabled={disabled}
                    itemLabel={itemLabel}
                    onMove={(next) => onChange(moveItem(members, index, next))}
                  />
                  <RemoveButton
                    disabled={disabled}
                    itemLabel={itemLabel}
                    onRemove={() => onChange(members.filter((_, i) => i !== index))}
                  />
                </span>
              </div>
              <div className="space-y-4 p-4">
                <NestedFields
                  fields={memberFields}
                  values={member}
                  path={indexPath(path, index)}
                  onChange={(name, next) => replace(index, { ...member, [name]: next })}
                />
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className={buttonSecondary}
          disabled={disabled}
          onClick={() => onChange([...members, { _key: newKey() }])}
        >
          <PlusIcon />
          Add {members.length === 0 ? "one" : "another"}
        </button>
      </div>
    </GroupShell>
  );
}
