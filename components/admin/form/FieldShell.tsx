"use client";

import type { ReactNode } from "react";
import { AlertIcon } from "./icons";
import { helpText, labelText } from "./styles";

type ShellProps = {
  /** Dotted field path — also the hook the save bar uses to scroll to an error. */
  path: string;
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
};

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="ml-1 font-normal text-red-600">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  );
}

function Messages({ error, hint }: { error?: string; hint?: ReactNode }) {
  return (
    <>
      {error ? (
        <p role="alert" className="flex items-start gap-1.5 text-xs font-medium text-red-600">
          <AlertIcon className="mt-px shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
      {hint && !error ? <p className={helpText}>{hint}</p> : null}
    </>
  );
}

/** Label + help text + control + message, for fields with one focusable control. */
export function FieldShell({
  path,
  label,
  description,
  required,
  error,
  hint,
  children,
  htmlFor,
}: ShellProps & { htmlFor: string }) {
  return (
    <div data-field-path={path} className="space-y-1.5">
      <label htmlFor={htmlFor} className={labelText}>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      {description ? <p className={helpText}>{description}</p> : null}
      {children}
      <Messages error={error} hint={hint} />
    </div>
  );
}

/** The same frame for widgets made of several controls (lists, images, groups). */
export function GroupShell({
  path,
  label,
  description,
  required,
  error,
  hint,
  children,
}: ShellProps) {
  return (
    <fieldset data-field-path={path} className="min-w-0 space-y-1.5">
      <legend className={labelText}>
        {label}
        {required ? <RequiredMark /> : null}
      </legend>
      {description ? <p className={`${helpText} mb-1.5`}>{description}</p> : null}
      {children}
      <Messages error={error} hint={hint} />
    </fieldset>
  );
}
