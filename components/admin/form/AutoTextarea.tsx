"use client";

import { useEffect, useRef, type TextareaHTMLAttributes } from "react";
import { inputBase, inputInvalid } from "./styles";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "rows"> & {
  value: string;
  rows?: number;
  invalid?: boolean;
};

/** A textarea that grows with its content instead of scrolling inside itself. */
export default function AutoTextarea({
  value,
  rows = 3,
  invalid = false,
  className = "",
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      {...rest}
      ref={ref}
      rows={rows}
      value={value}
      className={`${inputBase} resize-y overflow-hidden leading-relaxed ${invalid ? inputInvalid : ""} ${className}`}
      style={{ minHeight: `calc(${rows} * 1.5rem + 1.25rem)`, ...style }}
    />
  );
}
