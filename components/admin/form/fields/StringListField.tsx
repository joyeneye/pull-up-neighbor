"use client";

import { useState } from "react";
import { GroupShell } from "../FieldShell";
import { XIcon } from "../icons";
import { focusRing, helpText, inputBase, inputInvalid } from "../styles";
import type { FieldProps } from "../types";
import { fieldDomId, fieldLabel } from "../utils";

function asStrings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

/** Tag editor: type, press Enter, get a chip. */
export default function StringListField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const id = fieldDomId(path);
  const items = asStrings(value);
  const [draft, setDraft] = useState("");

  function commit(raw: string) {
    const next = raw.trim();
    if (!next) return;
    if (items.some((item) => item.toLowerCase() === next.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...items, next]);
    setDraft("");
  }

  return (
    <GroupShell
      path={path}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
    >
      <div className="space-y-2">
        {items.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 py-1 pl-3 pr-1.5 text-sm text-slate-800"
              >
                <span className="truncate">{item}</span>
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange(items.filter((_, i) => i !== index))}
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300 ${focusRing}`}
                  aria-label={`Remove ${item}`}
                  title={`Remove ${item}`}
                >
                  <XIcon width={11} height={11} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <input
          id={id}
          type="text"
          className={`${inputBase} max-w-md ${error ? inputInvalid : ""}`}
          value={draft}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          placeholder={items.length ? "Add another…" : "Type and press Enter"}
          onChange={(event) => {
            const next = event.target.value;
            if (next.endsWith(",")) commit(next.slice(0, -1));
            else setDraft(next);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit(draft);
              return;
            }
            if (event.key === "Backspace" && draft === "" && items.length > 0) {
              event.preventDefault();
              onChange(items.slice(0, -1));
            }
          }}
          onBlur={() => commit(draft)}
        />
        <p className={helpText}>Press Enter after each one. They appear in the order shown.</p>
      </div>
    </GroupShell>
  );
}
