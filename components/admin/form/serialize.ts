import type { AdminField, AdminType } from "@/lib/admin/schema-types";
import { childPath, fieldLabel, indexPath, isBlank, isPlainObject } from "./utils";
import type { FieldErrors } from "./types";

type BlockSchemas = Record<string, AdminType>;

/** Deep copy that removes `undefined` and changes nothing else. */
function stripUndefined(value: unknown): unknown {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) {
    return value.map(stripUndefined).filter((item) => item !== undefined);
  }
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [key, inner] of Object.entries(value)) {
      const cleaned = stripUndefined(inner);
      if (cleaned !== undefined) out[key] = cleaned;
    }
    return out;
  }
  return value;
}

/** `_type` and `_key` are bookkeeping — an object holding only those is empty. */
function hasContent(value: Record<string, unknown>): boolean {
  return Object.keys(value).some((key) => key !== "_type" && key !== "_key");
}

/**
 * Cleans an object against the sub-schema that describes it, carrying through
 * every key the schema does not mention exactly as it was found. That is what
 * lets a page-builder block round-trip untouched when this editor does not
 * know how to render part of it.
 */
function cleanObjectWithSchema(
  fields: AdminField[],
  source: Record<string, unknown>,
  blockSchemas: BlockSchemas
): Record<string, unknown> {
  const known = new Set(fields.map((field) => field.name));
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(source)) {
    if (known.has(key)) continue;
    const kept = stripUndefined(value);
    if (kept !== undefined) out[key] = kept;
  }

  for (const field of fields) {
    if (field.readOnly) {
      // Nested objects are written whole, so a read-only value still has to be
      // carried across or saving the parent would silently drop it.
      const kept = stripUndefined(source[field.name]);
      if (kept !== undefined) out[field.name] = kept;
      continue;
    }
    const cleaned = cleanField(field, source[field.name], blockSchemas);
    if (cleaned !== undefined) out[field.name] = cleaned;
  }

  return out;
}

/** Normalises one field's value into what Sanity should store, or undefined to unset it. */
export function cleanField(
  field: AdminField,
  value: unknown,
  blockSchemas: BlockSchemas
): unknown {
  if (value === undefined || value === null) return undefined;

  if (field.type === "array") {
    if (!Array.isArray(value)) return undefined;
    const arrayOf = field.arrayOf ?? "string";

    if (arrayOf === "reference") {
      return value
        .filter(isPlainObject)
        .filter((member) => typeof member._ref === "string" && member._ref.length > 0)
        .map((member) => ({
          ...(stripUndefined(member) as Record<string, unknown>),
          _type: "reference",
        }));
    }

    if (arrayOf === "object") {
      const memberFields = field.fields ?? [];
      return value
        .filter(isPlainObject)
        .map((member) => cleanObjectWithSchema(memberFields, member, blockSchemas));
    }

    if (arrayOf === "block") {
      return value.filter(isPlainObject).map((member) => {
        const typeName = typeof member._type === "string" ? member._type : "";
        const schema = blockSchemas[typeName];
        if (!schema) return stripUndefined(member) as Record<string, unknown>;
        return cleanObjectWithSchema(schema.fields, member, blockSchemas);
      });
    }

    // Arrays of plain strings or paragraphs.
    return value.filter(
      (item): item is string => typeof item === "string" && item.trim().length > 0
    );
  }

  // Named object types (cta, finalCta, …) arrive with their sub-fields inlined.
  if (field.fields && field.fields.length > 0) {
    if (!isPlainObject(value)) return undefined;
    const cleaned = cleanObjectWithSchema(field.fields, value, blockSchemas);
    return hasContent(cleaned) ? cleaned : undefined;
  }

  switch (field.type) {
    case "string":
    case "text":
    case "url":
    case "date":
    case "datetime":
      if (typeof value !== "string") return value;
      return value.trim() === "" ? undefined : value;

    case "number": {
      if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
      if (typeof value === "string") {
        if (value.trim() === "") return undefined;
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : undefined;
      }
      return undefined;
    }

    case "boolean":
      return typeof value === "boolean" ? value : undefined;

    case "slug": {
      if (typeof value === "string") {
        return value.trim() ? { _type: "slug", current: value.trim() } : undefined;
      }
      if (!isPlainObject(value)) return undefined;
      const current = typeof value.current === "string" ? value.current.trim() : "";
      if (!current) return undefined;
      return {
        ...(stripUndefined(value) as Record<string, unknown>),
        _type: "slug",
        current,
      };
    }

    case "image":
    case "file":
    case "mux.video": {
      if (!isPlainObject(value)) return undefined;
      const cleaned = stripUndefined(value) as Record<string, unknown>;
      return hasContent(cleaned) ? cleaned : undefined;
    }

    default:
      return stripUndefined(value);
  }
}

/**
 * The exact object handed to saveDocumentAction. Read-only fields are left out
 * so the patch never touches them; everything else is either a value or an
 * explicit null, which the server turns into an unset.
 */
export function documentPayload(
  type: AdminType,
  values: Record<string, unknown>,
  blockSchemas: BlockSchemas
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const field of type.fields) {
    if (field.readOnly) continue;
    const cleaned = cleanField(field, values[field.name], blockSchemas);
    out[field.name] = cleaned === undefined ? null : cleaned;
  }
  return out;
}

/**
 * Required-field messages keyed by path. Nested groups are only checked once
 * they hold something, so an untouched optional button does not block a save
 * just because its own label is marked required.
 */
export function collectErrors(
  fields: AdminField[],
  values: Record<string, unknown>,
  path: string,
  blockSchemas: BlockSchemas
): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of fields) {
    if (field.readOnly) continue;
    const here = childPath(path, field.name);
    const value = values[field.name];

    if (field.required && isBlank(value)) {
      errors[here] = `${fieldLabel(field)} is required.`;
      continue;
    }

    if (field.type === "array") {
      if (!Array.isArray(value)) continue;
      const memberFields = field.fields;
      if (field.arrayOf === "object" && memberFields) {
        value.forEach((member, index) => {
          if (!isPlainObject(member)) return;
          Object.assign(
            errors,
            collectErrors(memberFields, member, indexPath(here, index), blockSchemas)
          );
        });
      } else if (field.arrayOf === "block") {
        value.forEach((member, index) => {
          if (!isPlainObject(member)) return;
          const schema =
            typeof member._type === "string" ? blockSchemas[member._type] : undefined;
          if (!schema) return;
          Object.assign(
            errors,
            collectErrors(schema.fields, member, indexPath(here, index), blockSchemas)
          );
        });
      }
      continue;
    }

    if (field.fields && field.fields.length > 0) {
      if (!field.required && isBlank(value)) continue;
      Object.assign(
        errors,
        collectErrors(field.fields, isPlainObject(value) ? value : {}, here, blockSchemas)
      );
    }
  }

  return errors;
}
