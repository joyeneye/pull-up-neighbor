"use client";

import { useState } from "react";
import { GroupShell } from "../FieldShell";
import { useFormEnv } from "../FormContext";
import { MoveControls, RemoveButton } from "../controls";
import { PlusIcon } from "../icons";
import { buttonSecondary, helpText, selectBase } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel, isPlainObject, moveItem } from "../utils";

type RefValue = { _type: "reference"; _ref: string; _key: string };

function asRefs(value: unknown): RefValue[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((member) => {
    if (!isPlainObject(member) || typeof member._ref !== "string" || !member._ref) return [];
    const key = typeof member._key === "string" && member._key ? member._key : member._ref;
    return [{ _type: "reference" as const, _ref: member._ref, _key: key }];
  });
}

/**
 * A curated, ordered list of other documents. The order of this list is the
 * order the cards appear on the public page, which is why it gets explicit
 * up/down controls rather than a sort.
 */
export default function ReferenceListField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const { refOptions } = useFormEnv();
  const id = fieldDomId(path);
  const chosen = asRefs(value);
  const options = refOptions[field.name] ?? [];
  const byId = new Map(options.map((option) => [option._id, option]));
  const available = options.filter((option) => !chosen.some((ref) => ref._ref === option._id));
  const [pending, setPending] = useState("");

  const pick = pending && available.some((option) => option._id === pending) ? pending : "";

  return (
    <GroupShell
      path={path}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
      hint="This list is the running order — whatever is first here appears first on the site."
    >
      <div className="space-y-2">
        {chosen.length === 0 ? (
          <p className={`${helpText} rounded-lg border border-dashed border-slate-300 px-3 py-3`}>
            Nothing chosen yet — this section will be empty on the site.
          </p>
        ) : (
          <ol className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {chosen.map((ref, index) => {
              const option = byId.get(ref._ref);
              return (
                <li key={ref._key} className="flex items-center gap-3 px-3 py-2">
                  <span
                    aria-hidden="true"
                    className="w-5 shrink-0 text-right text-xs font-medium tabular-nums text-slate-400"
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-slate-800">
                      {option ? option.label : "Item no longer available"}
                    </span>
                    {option?.archived ? (
                      <span className="mt-0.5 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-800">
                        (archived) — hidden from the site
                      </span>
                    ) : null}
                    {!option ? (
                      <span className="block truncate font-mono text-[11px] text-slate-400">
                        {ref._ref}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex shrink-0 items-center gap-0.5">
                    <MoveControls
                      index={index}
                      count={chosen.length}
                      disabled={disabled}
                      itemLabel={option?.label ?? "item"}
                      onMove={(next) => onChange(moveItem(chosen, index, next))}
                    />
                    <RemoveButton
                      disabled={disabled}
                      itemLabel={option?.label ?? "item"}
                      onRemove={() => onChange(chosen.filter((_, i) => i !== index))}
                    />
                  </span>
                </li>
              );
            })}
          </ol>
        )}

        {options.length === 0 ? (
          <p className={helpText}>
            There is nothing to choose from yet. Create one first and it will show up here.
          </p>
        ) : available.length === 0 ? (
          <p className={helpText}>Everything available is already on this list.</p>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor={id} className="sr-only">
              Add to {fieldLabel(field)}
            </label>
            <select
              id={id}
              className={`${selectBase} max-w-xs`}
              value={pick}
              disabled={disabled}
              onChange={(event) => setPending(event.target.value)}
            >
              <option value="">Choose something to add…</option>
              {available.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.archived ? `${option.label} (archived)` : option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={buttonSecondary}
              disabled={disabled || !pick}
              onClick={() => {
                if (!pick) return;
                onChange([...chosen, { _type: "reference", _ref: pick, _key: pick }]);
                setPending("");
              }}
            >
              <PlusIcon />
              Add
            </button>
          </div>
        )}
      </div>
    </GroupShell>
  );
}
