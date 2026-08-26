"use client";

import { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, XIcon } from "./icons";
import { buttonGhost, focusRing, iconButton } from "./styles";

/** Up / down buttons for one member of an ordered list. */
export function MoveControls({
  index,
  count,
  onMove,
  disabled,
  itemLabel,
}: {
  index: number;
  count: number;
  onMove: (nextIndex: number) => void;
  disabled: boolean;
  itemLabel: string;
}) {
  return (
    <span className="inline-flex items-center">
      <button
        type="button"
        className={iconButton}
        onClick={() => onMove(index - 1)}
        disabled={disabled || index === 0}
        title="Move up"
        aria-label={`Move ${itemLabel} up`}
      >
        <ArrowUpIcon />
      </button>
      <button
        type="button"
        className={iconButton}
        onClick={() => onMove(index + 1)}
        disabled={disabled || index >= count - 1}
        title="Move down"
        aria-label={`Move ${itemLabel} down`}
      >
        <ArrowDownIcon />
      </button>
    </span>
  );
}

/**
 * Removing content is destructive and there is no undo, so the button arms
 * first and disarms itself if it is left alone.
 */
export function RemoveButton({
  onRemove,
  disabled,
  itemLabel,
}: {
  onRemove: () => void;
  disabled: boolean;
  itemLabel: string;
}) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = window.setTimeout(() => setArmed(false), 5000);
    return () => window.clearTimeout(timer);
  }, [armed]);

  if (!armed) {
    return (
      <button
        type="button"
        className={`${iconButton} hover:border-red-200 hover:bg-red-50 hover:text-red-600`}
        onClick={() => setArmed(true)}
        disabled={disabled}
        title={`Remove ${itemLabel}`}
        aria-label={`Remove ${itemLabel}`}
      >
        <XIcon />
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1">
      <button
        type="button"
        autoFocus
        className={`rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-700 disabled:bg-slate-300 ${focusRing}`}
        onClick={() => {
          setArmed(false);
          onRemove();
        }}
        disabled={disabled}
      >
        Remove
      </button>
      <button type="button" className={buttonGhost} onClick={() => setArmed(false)}>
        Cancel
      </button>
    </span>
  );
}
