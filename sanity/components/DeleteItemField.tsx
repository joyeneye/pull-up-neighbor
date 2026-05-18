"use client";

import { useState } from "react";
import { useFormValue, useClient, type StringFieldProps } from "sanity";
import { usePaneRouter } from "sanity/structure";

export function DeleteItemField(_props: StringFieldProps) {
  const id = useFormValue(["_id"]) as string | undefined;
  const type = useFormValue(["_type"]) as string | undefined;
  const title = useFormValue(["title"]) as string | undefined;
  const client = useClient({ apiVersion: "2024-01-01" });
  const { closeCurrent } = usePaneRouter();
  const [busy, setBusy] = useState(false);

  if (!id) {
    return (
      <div
        style={{
          padding: "12px 14px",
          borderRadius: 8,
          background: "rgba(148, 163, 184, 0.12)",
          color: "rgb(148, 163, 184)",
          fontSize: 13,
        }}
      >
        Save this item once before it can be deleted.
      </div>
    );
  }

  const handleDelete = async () => {
    const label = title ? `"${title}"` : "this item";
    const ok = window.confirm(
      `Delete ${label}? This permanently removes it from the In Action gallery.`
    );
    if (!ok) return;
    setBusy(true);
    try {
      const baseId = id.replace(/^drafts\./, "");
      await client.delete(baseId);
      await client.delete(`drafts.${baseId}`).catch(() => undefined);
      closeCurrent();
    } catch (err) {
      console.error("Delete failed", err);
      window.alert(
        "Couldn't delete this item. Check the browser console for details."
      );
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 10,
        border: "1px solid rgba(239, 68, 68, 0.35)",
        background: "rgba(239, 68, 68, 0.08)",
      }}
    >
      <div style={{ fontSize: 13, color: "rgb(248, 113, 113)" }}>
        Remove this {type === "inActionItem" ? "gallery item" : "item"} from the
        site. This cannot be undone.
      </div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={busy}
        style={{
          appearance: "none",
          border: "none",
          padding: "9px 14px",
          borderRadius: 8,
          background: busy ? "rgb(127, 29, 29)" : "rgb(220, 38, 38)",
          color: "white",
          fontWeight: 700,
          fontSize: 13,
          cursor: busy ? "wait" : "pointer",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {busy ? "Deleting…" : "🗑  Delete this item"}
      </button>
    </div>
  );
}
