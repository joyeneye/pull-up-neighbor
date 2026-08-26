/**
 * Generates lib/admin/schema.json from the Sanity schema definitions.
 *
 * The custom admin panel builds its forms from that JSON, so the fields an
 * editor sees are derived from the same schema the content is stored against —
 * there is no second list of fields to keep in sync. Add a field to a schema,
 * run `npm run admin:schema`, and it appears in the admin panel.
 *
 * Runs with stubbed `sanity` / `@sanity/icons` modules (see tsconfig.codegen.json)
 * because the real packages pull in Studio CSS that cannot load under Node.
 * defineType/defineField are identity functions at runtime, so the stubs are
 * faithful — we only ever read the plain objects they return.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { schemaTypes } from "../sanity/schemas";

type RawField = {
  name: string;
  title?: string;
  type: string;
  description?: string;
  rows?: number;
  initialValue?: unknown;
  readOnly?: boolean;
  hidden?: unknown;
  options?: Record<string, unknown>;
  of?: RawType[];
  fields?: RawField[];
  to?: { type: string }[];
  validation?: unknown;
  components?: Record<string, unknown>;
};

type RawType = {
  name?: string;
  title?: string;
  type?: string;
  fields?: RawField[];
  of?: RawType[];
  to?: { type: string }[];
  options?: Record<string, unknown>;
};

export type AdminField = {
  name: string;
  title: string;
  type: string;
  description?: string;
  rows?: number;
  required?: boolean;
  readOnly?: boolean;
  /** Fixed choices, from options.list */
  choices?: { title: string; value: string }[];
  /** For type "array" */
  arrayOf?: AdminField["type"];
  /** Referenced document types, for reference arrays/fields */
  refTypes?: string[];
  /** For arrays of objects, and for inline object types like `cta` */
  fields?: AdminField[];
  /** For arrays of differing block types (the page builder) */
  blockTypes?: string[];
};

export type AdminType = {
  name: string;
  title: string;
  fields: AdminField[];
};

const types = schemaTypes as unknown as RawType[];
const byName = new Map<string, RawType>();
for (const t of types) if (t.name) byName.set(t.name, t);

/**
 * Sanity validation is a builder function. Call it with a recording stub to
 * find out whether required() was asked for, without importing Sanity.
 */
function isRequired(validation: unknown): boolean {
  if (typeof validation !== "function") return false;
  let required = false;
  const rule: Record<string, unknown> = {};
  const handler: ProxyHandler<Record<string, unknown>> = {
    get: (_t, prop) => {
      if (prop === "required") {
        return () => {
          required = true;
          return proxy;
        };
      }
      return () => proxy;
    },
  };
  const proxy = new Proxy(rule, handler);
  try {
    (validation as (r: unknown) => unknown)(proxy);
  } catch {
    // A validation rule that does something exotic is not worth crashing over;
    // it just means we do not mark the field required in the admin UI.
  }
  return required;
}

function choicesFrom(options?: Record<string, unknown>): AdminField["choices"] {
  const list = options?.list;
  if (!Array.isArray(list)) return undefined;
  return list.map((entry) =>
    typeof entry === "string"
      ? { title: entry, value: entry }
      : {
          title: String((entry as { title?: string; value?: string }).title ?? (entry as { value?: string }).value),
          value: String((entry as { value?: string }).value),
        }
  );
}

const PRIMITIVES = new Set([
  "string",
  "text",
  "number",
  "boolean",
  "url",
  "date",
  "datetime",
  "slug",
  "image",
  "file",
  "mux.video",
]);

function convertField(field: RawField, depth = 0): AdminField {
  const out: AdminField = {
    name: field.name,
    title: field.title ?? field.name,
    type: field.type,
  };

  if (field.description) out.description = field.description;
  if (field.rows) out.rows = field.rows;
  if (field.readOnly) out.readOnly = true;
  if (isRequired(field.validation)) out.required = true;

  const choices = choicesFrom(field.options);
  if (choices) out.choices = choices;

  if (field.type === "array" && Array.isArray(field.of)) {
    const members = field.of;
    if (members.length === 1) {
      const member = members[0];
      if (member.type === "reference") {
        out.arrayOf = "reference";
        out.refTypes = (member.to ?? []).map((t) => t.type);
      } else if (member.type === "object" && member.fields) {
        out.arrayOf = "object";
        out.fields = member.fields.map((f) => convertField(f, depth + 1));
      } else {
        out.arrayOf = member.type ?? "string";
      }
    } else {
      // Page builder: an array that accepts several named block types.
      out.arrayOf = "block";
      out.blockTypes = members.map((m) => m.type ?? "").filter(Boolean);
    }
    return out;
  }

  if (field.type === "reference") {
    out.refTypes = (field.to ?? []).map((t) => t.type);
    return out;
  }

  // Named inline object types (cta, finalCta, hero...) resolve to their fields
  // so the form can render them as a nested group.
  if (!PRIMITIVES.has(field.type) && depth < 4) {
    const named = byName.get(field.type);
    if (named?.fields) {
      out.fields = named.fields.map((f) => convertField(f, depth + 1));
    }
  }

  return out;
}

/**
 * Fields that exist only to host a custom Studio input (they declare
 * `components.field`) carry no content — they were a place to hang a button in
 * Studio's UI. The custom panel has its own controls, so rendering them would
 * put a stray, often blank-labelled input in front of the editor.
 */
function isStudioOnly(field: RawField): boolean {
  return Boolean(field.components && "field" in field.components);
}

function convertType(t: RawType): AdminType | null {
  if (!t.name || !t.fields) return null;
  return {
    name: t.name,
    title: t.title ?? t.name,
    fields: t.fields.filter((f) => !isStudioOnly(f)).map((f) => convertField(f)),
  };
}

const out: Record<string, AdminType> = {};
for (const t of types) {
  const converted = convertType(t);
  if (converted) out[converted.name] = converted;
}

const target = join(process.cwd(), "lib", "admin", "schema.json");
writeFileSync(
  target,
  JSON.stringify(
    {
      generatedBy: "npm run admin:schema",
      note: "Do not edit by hand. Generated from sanity/schemas.",
      types: out,
    },
    null,
    2
  ) + "\n"
);

console.log(`Wrote ${Object.keys(out).length} types to lib/admin/schema.json`);
