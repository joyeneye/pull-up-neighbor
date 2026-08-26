"use client";

import { useState } from "react";
import { GroupShell } from "../FieldShell";
import { useFormEnv } from "../FormContext";
import { MoveControls, RemoveButton } from "../controls";
import { AlertIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon } from "../icons";
import { buttonGhost, buttonSecondary, focusRing, helpText, selectBase } from "../styles";
import type { FieldProps } from "../types";
import {
  fieldDomId,
  fieldLabel,
  humanise,
  indexPath,
  isPlainObject,
  memberKey,
  moveItem,
  newKey,
  summarise,
} from "../utils";

/**
 * The page builder: an ordered list of section blocks, each of a named type.
 *
 * A block whose schema was not passed in is still shown, still moves and still
 * saves — it just cannot be opened. Its stored content is carried through the
 * save untouched, so an editor can never lose a section this screen happens
 * not to understand.
 */
export default function BlockListField({ field, value, onChange, path, error }: FieldProps) {
  const { NestedFields, blockSchemas, errors, disabled } = useFormEnv();
  const blockTypes = field.blockTypes ?? [];
  const members: Record<string, unknown>[] = (Array.isArray(value) ? value : []).map((member) =>
    isPlainObject(member) ? member : {}
  );

  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [pending, setPending] = useState(blockTypes[0] ?? "");

  const typeTitle = (name: string) => blockSchemas[name]?.title ?? humanise(name);

  const hasErrorUnder = (prefix: string) =>
    Object.keys(errors).some((key) => key.startsWith(`${prefix}.`) || key.startsWith(`${prefix}[`));

  const replace = (index: number, next: Record<string, unknown>) =>
    onChange(members.map((member, i) => (i === index ? next : member)));

  const setAllOpen = (nextOpen: boolean) => {
    const next: Record<string, boolean> = {};
    members.forEach((member, index) => {
      next[memberKey(member, index)] = nextOpen;
    });
    setOpen(next);
  };

  const chosenType = blockTypes.includes(pending) ? pending : (blockTypes[0] ?? "");

  return (
    <GroupShell
      path={path}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
      hint="Sections appear on the page in the order below."
    >
      <div className="space-y-3">
        {members.length > 1 ? (
          <div className="flex items-center gap-1">
            <button type="button" className={buttonGhost} onClick={() => setAllOpen(true)}>
              Expand all
            </button>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <button type="button" className={buttonGhost} onClick={() => setAllOpen(false)}>
              Collapse all
            </button>
          </div>
        ) : null}

        {members.length === 0 ? (
          <p className={`${helpText} rounded-lg border border-dashed border-slate-300 px-3 py-3`}>
            This page has no body sections yet. Add one below.
          </p>
        ) : null}

        {members.map((member, index) => {
          const key = memberKey(member, index);
          const memberPath = indexPath(path, index);
          const typeName = typeof member._type === "string" ? member._type : "";
          const schema = blockSchemas[typeName];
          const invalid = hasErrorUnder(memberPath);
          const expanded = Boolean(open[key]) || invalid;
          const summary = summarise(member);
          const heading = typeName ? typeTitle(typeName) : "Untitled section";
          const panelId = `${memberPath.replace(/[^a-zA-Z0-9]+/g, "-")}-panel`;

          return (
            <div
              key={key}
              className={`overflow-hidden rounded-xl border bg-white shadow-sm ${
                invalid ? "border-red-300" : "border-slate-200"
              }`}
            >
              <div
                className={`flex items-center gap-2 px-2 py-2 ${
                  expanded ? "border-b border-slate-200 bg-slate-50" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen((prev) => ({ ...prev, [key]: !expanded }))}
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  className={`flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1.5 py-1 text-left transition-colors hover:bg-slate-100 ${focusRing}`}
                >
                  <span className="shrink-0 text-slate-400">
                    {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold text-slate-900">
                        {heading}
                      </span>
                      {!schema ? (
                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                          view only
                        </span>
                      ) : null}
                      {invalid ? (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-700">
                          <AlertIcon width={11} height={11} />
                          Needs attention
                        </span>
                      ) : null}
                    </span>
                    {summary ? (
                      <span className="mt-0.5 block truncate text-xs text-slate-500">{summary}</span>
                    ) : null}
                  </span>
                </button>
                <span className="flex shrink-0 items-center gap-0.5">
                  <MoveControls
                    index={index}
                    count={members.length}
                    disabled={disabled}
                    itemLabel={heading}
                    onMove={(next) => onChange(moveItem(members, index, next))}
                  />
                  <RemoveButton
                    disabled={disabled}
                    itemLabel={heading}
                    onRemove={() => onChange(members.filter((_, i) => i !== index))}
                  />
                </span>
              </div>

              {expanded ? (
                <div id={panelId} className="space-y-4 p-4">
                  {schema ? (
                    <NestedFields
                      fields={schema.fields}
                      values={member}
                      path={memberPath}
                      onChange={(name, next) => replace(index, { ...member, [name]: next })}
                    />
                  ) : (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
                      <p className="text-sm font-medium text-slate-700">
                        This section type cannot be edited here yet.
                      </p>
                      <p className={`${helpText} mt-1`}>
                        Its content is safe — it is saved back exactly as it is, and you can still
                        move or remove the whole section.
                        {typeName ? (
                          <>
                            {" "}
                            Section type:{" "}
                            <code className="rounded bg-white px-1 py-0.5 font-mono text-slate-600">
                              {typeName}
                            </code>
                            .
                          </>
                        ) : null}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          );
        })}

        {blockTypes.length === 0 ? null : (
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor={`${fieldDomId(path)}-add`} className="sr-only">
              Section type to add
            </label>
            <select
              id={`${fieldDomId(path)}-add`}
              className={`${selectBase} max-w-xs`}
              value={chosenType}
              disabled={disabled}
              onChange={(event) => setPending(event.target.value)}
            >
              {blockTypes.map((name) => (
                <option key={name} value={name}>
                  {typeTitle(name)}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={buttonSecondary}
              disabled={disabled || !chosenType}
              onClick={() => {
                if (!chosenType) return;
                const key = newKey();
                onChange([...members, { _type: chosenType, _key: key }]);
                setOpen((prev) => ({ ...prev, [key]: true }));
              }}
            >
              <PlusIcon />
              Add section
            </button>
          </div>
        )}
      </div>
    </GroupShell>
  );
}
