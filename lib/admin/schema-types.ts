/**
 * Shape of lib/admin/schema.json, which is generated from the Sanity schemas
 * by `npm run admin:schema` (scripts/generate-admin-schema.ts).
 */

export type AdminChoice = { title: string; value: string };

export type AdminField = {
  name: string;
  title: string;
  /** Sanity field type: string, text, number, boolean, url, image, array, cta... */
  type: string;
  description?: string;
  rows?: number;
  required?: boolean;
  readOnly?: boolean;
  /** Fixed choices — renders a select or radio group. */
  choices?: AdminChoice[];
  /** For type "array": what the members are. */
  arrayOf?: "string" | "object" | "reference" | "block" | string;
  /** Document types a reference field may point at. */
  refTypes?: string[];
  /** Sub-fields, for arrays of objects and for inline object types like `cta`. */
  fields?: AdminField[];
  /** Named block types a page-builder array accepts. */
  blockTypes?: string[];
};

export type AdminType = {
  name: string;
  title: string;
  fields: AdminField[];
};

export type AdminSchema = {
  generatedBy: string;
  note: string;
  types: Record<string, AdminType>;
};
