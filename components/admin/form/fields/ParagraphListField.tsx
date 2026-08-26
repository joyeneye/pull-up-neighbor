"use client";

import AutoTextarea from "../AutoTextarea";
import { GroupShell } from "../FieldShell";
import { MoveControls, RemoveButton } from "../controls";
import { PlusIcon } from "../icons";
import { buttonSecondary, helpText } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel, moveItem } from "../utils";

function asStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => (typeof item === "string" ? item : "")) : [];
}

/** An ordered list of body paragraphs — one textarea per paragraph. */
export default function ParagraphListField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const id = fieldDomId(path);
  const items = asStrings(value);

  const replace = (index: number, text: string) =>
    onChange(items.map((item, i) => (i === index ? text : item)));

  return (
    <GroupShell
      path={path}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
    >
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className={`${helpText} rounded-lg border border-dashed border-slate-300 px-3 py-3`}>
            No paragraphs yet.
          </p>
        ) : null}

        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-2.5 w-5 shrink-0 text-right text-xs font-medium text-slate-400"
            >
              {index + 1}
            </span>
            <AutoTextarea
              id={index === 0 ? id : undefined}
              value={item}
              rows={3}
              disabled={disabled}
              aria-label={`${fieldLabel(field)} — paragraph ${index + 1}`}
              onChange={(event) => replace(index, event.target.value)}
            />
            <div className="mt-1 flex shrink-0 items-center gap-0.5">
              <MoveControls
                index={index}
                count={items.length}
                disabled={disabled}
                itemLabel={`paragraph ${index + 1}`}
                onMove={(next) => onChange(moveItem(items, index, next))}
              />
              <RemoveButton
                disabled={disabled}
                itemLabel={`paragraph ${index + 1}`}
                onRemove={() => onChange(items.filter((_, i) => i !== index))}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          className={buttonSecondary}
          disabled={disabled}
          onClick={() => onChange([...items, ""])}
        >
          <PlusIcon />
          Add paragraph
        </button>
      </div>
    </GroupShell>
  );
}
