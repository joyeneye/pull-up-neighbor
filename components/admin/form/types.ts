import type { ComponentType } from "react";
import type { AdminField, AdminType } from "@/lib/admin/schema-types";

/** A document that can be picked by a reference field. */
export type RefOption = { _id: string; label: string; archived: boolean };

/** Validation messages keyed by field path ("primaryCta.label", "cards[0].title"). */
export type FieldErrors = Record<string, string>;

/**
 * Renders a list of fields. Containers that recurse (nested objects, object
 * arrays, the page builder) receive this through {@link FormEnv} rather than
 * importing the renderer, which keeps the module graph acyclic.
 */
export type NestedFieldsProps = {
  fields: AdminField[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  /** Path prefix for the fields being rendered. "" at the document root. */
  path: string;
};

export type NestedFields = ComponentType<NestedFieldsProps>;

/** Everything a field widget needs that is not specific to one field. */
export type FormEnv = {
  refOptions: Record<string, RefOption[]>;
  blockSchemas: Record<string, AdminType>;
  errors: FieldErrors;
  /** True while a save is in flight — every control locks. */
  disabled: boolean;
  NestedFields: NestedFields;
};

/** The props every field widget under ./fields receives. */
export type FieldProps = {
  field: AdminField;
  value: unknown;
  onChange: (value: unknown) => void;
  /** Dotted path to this field, used for error lookup and focus. */
  path: string;
  error?: string;
  disabled: boolean;
};

export type { AdminField, AdminType };
