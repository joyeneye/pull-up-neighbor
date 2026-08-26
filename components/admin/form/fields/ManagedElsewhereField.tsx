"use client";

import { FilmIcon } from "../icons";
import { helpText, labelText } from "../styles";
import type { FieldProps } from "../types";
import { assetRefOf, fieldLabel } from "../utils";

/**
 * Video files (direct uploads and Mux) are not uploaded from this panel — they
 * go through their own pipeline. The field still reports whether something is
 * attached, and saving leaves whatever is there untouched.
 */
export default function ManagedElsewhereField({ field, value, path }: FieldProps) {
  const reference = assetRefOf(value);
  const present = Boolean(reference) || (value != null && typeof value === "object");
  const isMux = field.type === "mux.video";

  return (
    <div data-field-path={path} className="space-y-1.5">
      <p className={labelText}>{fieldLabel(field)}</p>
      {field.description ? <p className={helpText}>{field.description}</p> : null}
      <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3">
        <FilmIcon className="mt-0.5 shrink-0 text-slate-400" />
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-slate-700">
            {present ? "A video is attached." : "No video attached."}
          </p>
          <p className={helpText}>
            {isMux
              ? "Mux videos are uploaded through the video pipeline, not from this screen."
              : "Direct file uploads are handled outside this screen."}{" "}
            {present
              ? "Saving this page leaves the existing file exactly as it is."
              : "Ask your developer to attach one if you need it here."}
          </p>
          {reference ? (
            <p className="truncate font-mono text-[11px] text-slate-400">{reference}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
