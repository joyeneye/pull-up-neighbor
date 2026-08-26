"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type JSX,
  type ReactNode,
} from "react";
import { saveDocumentAction } from "@/app/admin/actions";
import type { AdminType } from "@/lib/admin/schema-types";
import { FieldList } from "./FieldRenderer";
import { FormEnvProvider } from "./FormContext";
import { AlertIcon, ArrowLeftIcon, CheckIcon, SpinnerIcon } from "./icons";
import { collectErrors, documentPayload } from "./serialize";
import { buttonPrimary, buttonSecondary, focusRing } from "./styles";
import type { FieldErrors, FormEnv, RefOption } from "./types";
import { stableStringify } from "./utils";

export type { RefOption };

export type DocumentFormProps = {
  docId: string;
  type: AdminType;
  initialValues: Record<string, unknown>;
  /** Reference pickers, keyed by the field name they belong to. */
  refOptions?: Record<string, RefOption[]>;
  /** Schemas for the page-builder block types, keyed by block type name. */
  blockSchemas?: Record<string, AdminType>;
  backHref?: string;
  title?: string;
  /** Optional control rendered on the title row, e.g. a link to the live page. */
  headerAside?: ReactNode;
};

type SaveStatus =
  | { kind: "idle" }
  | { kind: "saved" }
  | { kind: "invalid"; message: string }
  | { kind: "error"; message: string };

const NO_ERRORS: FieldErrors = {};
const NO_REF_OPTIONS: Record<string, RefOption[]> = {};
const NO_BLOCK_SCHEMAS: Record<string, AdminType> = {};

export default function DocumentForm(props: DocumentFormProps): JSX.Element {
  const { docId, type, initialValues, backHref, title, headerAside } = props;
  const refOptions = props.refOptions ?? NO_REF_OPTIONS;
  const blockSchemas = props.blockSchemas ?? NO_BLOCK_SCHEMAS;

  const [values, setValues] = useState<Record<string, unknown>>(() => ({ ...initialValues }));
  /** What is currently on the server — the yardstick for "unsaved changes". */
  const [baseline, setBaseline] = useState<Record<string, unknown>>(() => ({ ...initialValues }));
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });
  const [showErrors, setShowErrors] = useState(false);
  const [pending, startTransition] = useTransition();
  const [seededFor, setSeededFor] = useState(docId);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Re-seed when the same form is reused for a different document.
  if (seededFor !== docId) {
    setSeededFor(docId);
    setValues({ ...initialValues });
    setBaseline({ ...initialValues });
    setStatus({ kind: "idle" });
    setShowErrors(false);
  }

  const payload = useMemo(
    () => documentPayload(type, values, blockSchemas),
    [type, values, blockSchemas]
  );
  const savedPayload = useMemo(
    () => documentPayload(type, baseline, blockSchemas),
    [type, baseline, blockSchemas]
  );
  const dirty = useMemo(
    () => stableStringify(payload) !== stableStringify(savedPayload),
    [payload, savedPayload]
  );

  const errors = useMemo(
    () => collectErrors(type.fields, values, "", blockSchemas),
    [type, values, blockSchemas]
  );
  const visibleErrors = showErrors ? errors : NO_ERRORS;

  const handleChange = useCallback((name: string, next: unknown) => {
    setValues((previous) => ({ ...previous, [name]: next }));
    // A confirmation that refers to an older version of the page is worse
    // than none, and the "still missing fields" summary is stale as soon as
    // anything is typed. Inline messages stay put until each one is fixed.
    setStatus((previous) =>
      previous.kind === "saved" || previous.kind === "invalid" ? { kind: "idle" } : previous
    );
  }, []);

  const focusField = useCallback((path: string) => {
    const root = formRef.current;
    if (!root) return;
    let target: HTMLElement | null = null;
    let probe = path;
    while (probe && !target) {
      target = root.querySelector<HTMLElement>(`[data-field-path="${probe}"]`);
      if (target) break;
      const cut = Math.max(probe.lastIndexOf("."), probe.lastIndexOf("["));
      probe = cut > 0 ? probe.slice(0, cut) : "";
    }
    if (!target) return;
    target.scrollIntoView({ block: "center", behavior: "smooth" });
    const focusable = target.querySelector<HTMLElement>(
      "input:not([type='hidden']), textarea, select, button"
    );
    focusable?.focus({ preventScroll: true });
  }, []);

  const save = useCallback(() => {
    if (pending || !dirty) return;

    const outstanding = Object.keys(errors);
    if (outstanding.length > 0) {
      setShowErrors(true);
      setStatus({
        kind: "invalid",
        message:
          outstanding.length === 1
            ? "One required field still needs filling in."
            : `${outstanding.length} required fields still need filling in.`,
      });
      // The next paint is when a block holding an error opens itself.
      window.requestAnimationFrame(() => focusField(outstanding[0]));
      return;
    }

    setShowErrors(false);
    const snapshot = values;
    const body = payload;

    startTransition(async () => {
      try {
        const result = await saveDocumentAction(docId, body);
        if (result.ok) {
          setBaseline(snapshot);
          setStatus({ kind: "saved" });
        } else {
          setStatus({
            kind: "error",
            message: result.error ?? "The save did not go through. Try again.",
          });
        }
      } catch {
        setStatus({
          kind: "error",
          message: "Could not reach the server. Check your connection and try again.",
        });
      }
    });
  }, [dirty, docId, errors, focusField, payload, pending, values]);

  // Keyboard save, without a stale closure over `values`.
  const saveRef = useRef(save);
  useEffect(() => {
    saveRef.current = save;
  }, [save]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        saveRef.current();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const env: FormEnv = useMemo(
    () => ({
      refOptions,
      blockSchemas,
      errors: visibleErrors,
      disabled: pending,
      NestedFields: FieldList,
    }),
    [refOptions, blockSchemas, visibleErrors, pending]
  );

  return (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-6">
        {backHref ? (
          <Link
            href={backHref}
            className={`-ml-1 mb-3 inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 ${focusRing}`}
            onClick={(event) => {
              // beforeunload does not fire on an in-app navigation, so the
              // one link that leaves this screen asks for itself.
              if (!dirty) return;
              const leave = window.confirm(
                "You have unsaved changes. Leave this page and lose them?"
              );
              if (!leave) event.preventDefault();
            }}
          >
            <ArrowLeftIcon />
            Back
          </Link>
        ) : null}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {title ?? type.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Edits go live on the website the moment you save — there is no separate publish
              step.
            </p>
          </div>
          {headerAside ? <div className="shrink-0">{headerAside}</div> : null}
        </div>
      </header>

      <FormEnvProvider value={env}>
        <form
          ref={formRef}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            save();
          }}
        >
          <fieldset
            disabled={pending}
            className="min-w-0 space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <FieldList fields={type.fields} values={values} onChange={handleChange} path="" />
          </fieldset>

          <div className="sticky bottom-0 z-20 -mx-4 mt-6 border-t border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <StatusLine dirty={dirty} pending={pending} status={status} />
              <div className="flex items-center gap-2">
                {dirty ? (
                  <button
                    type="button"
                    className={buttonSecondary}
                    disabled={pending}
                    onClick={() => {
                      setValues({ ...baseline });
                      setShowErrors(false);
                      setStatus({ kind: "idle" });
                    }}
                  >
                    Discard changes
                  </button>
                ) : null}
                <button type="submit" className={buttonPrimary} disabled={!dirty || pending}>
                  {pending ? <SpinnerIcon /> : null}
                  {pending ? "Saving…" : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormEnvProvider>
    </div>
  );
}

function StatusLine({
  dirty,
  pending,
  status,
}: {
  dirty: boolean;
  pending: boolean;
  status: SaveStatus;
}): ReactNode {
  const base = "flex min-w-0 items-center gap-2 text-sm";

  if (pending) {
    return (
      <p className={`${base} text-slate-500`}>
        <SpinnerIcon className="shrink-0" />
        Saving…
      </p>
    );
  }

  if (status.kind === "error" || status.kind === "invalid") {
    return (
      <p role="alert" className={`${base} font-medium text-red-600`}>
        <AlertIcon className="shrink-0" />
        <span className="min-w-0">{status.message}</span>
      </p>
    );
  }

  if (status.kind === "saved" && !dirty) {
    return (
      <p role="status" className={`${base} font-medium text-brand-700`}>
        <CheckIcon className="shrink-0" />
        Saved — live on the site.
      </p>
    );
  }

  if (dirty) {
    return (
      <p className={`${base} text-amber-700`}>
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
        Unsaved changes
      </p>
    );
  }

  return <p className={`${base} text-slate-400`}>No changes to save.</p>;
}
