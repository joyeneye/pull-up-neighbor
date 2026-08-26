"use client";

import { useRef, useState } from "react";
import { uploadImageAction } from "@/app/admin/actions";
import { GroupShell } from "../FieldShell";
import { AlertIcon, ImageIcon, SpinnerIcon } from "../icons";
import { buttonSecondary, buttonDanger, helpText } from "../styles";
import type { FieldProps } from "../types";
import { assetPreviewUrl, assetRefOf, fieldLabel } from "../utils";

const MAX_BYTES = 20 * 1024 * 1024;

type Uploaded = { assetId: string; url: string };

export default function ImageField({
  field,
  value,
  onChange,
  path,
  error,
  disabled,
}: FieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploaded, setUploaded] = useState<Uploaded | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const reference = assetRefOf(value);
  // A freshly uploaded asset is not on the CDN under a predictable name yet,
  // so the URL the upload returned is preferred while it matches.
  const preview =
    uploaded && uploaded.assetId === reference ? uploaded.url : assetPreviewUrl(reference, 400);
  const hasImage = Boolean(reference);
  const locked = disabled || busy;

  async function upload(file: File) {
    if (!file.type.startsWith("image/")) {
      setUploadError("That file is not an image. Choose a JPG, PNG, WebP or SVG.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setUploadError("Images must be under 20 MB. Compress it and try again.");
      return;
    }

    setUploadError(null);
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const result = await uploadImageAction(body);
      if (result.ok) {
        setUploaded({ assetId: result.assetId, url: result.url });
        onChange({
          _type: "image",
          asset: { _type: "reference", _ref: result.assetId },
        });
      } else {
        setUploadError(result.error);
      }
    } catch {
      setUploadError("The upload did not go through. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <GroupShell
      path={path}
      label={fieldLabel(field)}
      description={field.description}
      required={field.required}
      error={error}
    >
      <div
        onDragOver={(event) => {
          if (locked) return;
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          if (locked) return;
          event.preventDefault();
          setDragging(false);
          const file = event.dataTransfer.files?.[0];
          if (file) void upload(file);
        }}
        className={`flex flex-wrap items-center gap-4 rounded-xl border border-dashed p-3 transition-colors ${
          dragging ? "border-brand-500 bg-brand-50" : "border-slate-300 bg-slate-50"
        }`}
      >
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white">
          {preview ? (
            // Sanity's CDN is not configured for next/image in this project.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-1 text-slate-300">
              <ImageIcon width={22} height={22} />
              <span className="text-[11px] font-medium text-slate-400">
                {hasImage ? "Saved" : "Empty"}
              </span>
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={buttonSecondary}
              disabled={locked}
              onClick={() => inputRef.current?.click()}
            >
              {busy ? <SpinnerIcon /> : null}
              {busy ? "Uploading…" : hasImage ? "Replace image" : "Upload image"}
            </button>
            {hasImage ? (
              <button
                type="button"
                className={buttonDanger}
                disabled={locked}
                onClick={() => {
                  setUploaded(null);
                  setUploadError(null);
                  onChange(undefined);
                }}
              >
                Remove
              </button>
            ) : null}
          </div>
          <p className={helpText}>
            {busy
              ? "Uploading to the media library — this can take a moment on a big photo."
              : "Drag a file here or choose one. JPG, PNG, WebP or SVG, up to 20 MB."}
          </p>
          {uploadError ? (
            <p role="alert" className="flex items-start gap-1.5 text-xs font-medium text-red-600">
              <AlertIcon className="mt-px shrink-0" />
              <span>{uploadError}</span>
            </p>
          ) : null}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          tabIndex={-1}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void upload(file);
          }}
        />
      </div>
    </GroupShell>
  );
}
