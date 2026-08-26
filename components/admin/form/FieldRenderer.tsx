"use client";

import type { ReactNode } from "react";
import type { AdminField } from "@/lib/admin/schema-types";
import { useFormEnv } from "./FormContext";
import BlockListField from "./fields/BlockListField";
import BooleanField from "./fields/BooleanField";
import ChoiceField from "./fields/ChoiceField";
import DateField from "./fields/DateField";
import ImageField from "./fields/ImageField";
import ManagedElsewhereField from "./fields/ManagedElsewhereField";
import NumberField from "./fields/NumberField";
import ObjectGroupField from "./fields/ObjectGroupField";
import ObjectListField from "./fields/ObjectListField";
import ParagraphListField from "./fields/ParagraphListField";
import ReadOnlyField from "./fields/ReadOnlyField";
import ReferenceField from "./fields/ReferenceField";
import ReferenceListField from "./fields/ReferenceListField";
import SlugField from "./fields/SlugField";
import StringListField from "./fields/StringListField";
import TextAreaField from "./fields/TextAreaField";
import TextInputField from "./fields/TextInputField";
import UnsupportedField from "./fields/UnsupportedField";
import type { FieldProps, NestedFieldsProps } from "./types";
import { childPath, isHiddenField } from "./utils";

const SIMPLE_TYPES = new Set([
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

/**
 * Picks the widget for a field. Every branch names a module-level component,
 * so a field keeps its state across renders.
 */
function renderWidget(props: FieldProps) {
  const { field } = props;

  if (field.readOnly) return <ReadOnlyField {...props} />;

  if (field.type === "array") {
    switch (field.arrayOf) {
      case "reference":
        return <ReferenceListField {...props} />;
      case "object":
        return <ObjectListField {...props} />;
      case "block":
        return <BlockListField {...props} />;
      case "text":
        return <ParagraphListField {...props} />;
      default:
        return <StringListField {...props} />;
    }
  }

  if (field.type === "reference") return <ReferenceField {...props} />;

  if (field.choices && field.choices.length > 0) return <ChoiceField {...props} />;

  // Named object types (cta, finalCta…) arrive with their sub-fields inlined.
  if (field.fields && field.fields.length > 0) return <ObjectGroupField {...props} />;

  switch (field.type) {
    case "text":
      return <TextAreaField {...props} />;
    case "number":
      return <NumberField {...props} />;
    case "boolean":
      return <BooleanField {...props} />;
    case "slug":
      return <SlugField {...props} />;
    case "date":
    case "datetime":
      return <DateField {...props} />;
    case "image":
      return <ImageField {...props} />;
    case "file":
    case "mux.video":
      return <ManagedElsewhereField {...props} />;
    case "string":
    case "url":
      return <TextInputField {...props} />;
    default:
      // An object type nested deep enough that the schema did not inline its
      // fields, or a type this editor has no widget for.
      return SIMPLE_TYPES.has(field.type) ? (
        <TextInputField {...props} />
      ) : (
        <UnsupportedField {...props} />
      );
  }
}

function FieldRenderer({
  field,
  values,
  onChange,
  path,
}: {
  field: AdminField;
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  path: string;
}): ReactNode {
  const { errors, disabled } = useFormEnv();

  return renderWidget({
    field,
    value: values[field.name],
    onChange: (next) => onChange(field.name, next),
    path,
    error: errors[path],
    disabled,
  });
}

/**
 * Renders a list of fields. Nesting containers get this through the form
 * environment instead of importing it, which keeps the module graph acyclic.
 */
export function FieldList({ fields, values, onChange, path }: NestedFieldsProps) {
  return (
    <>
      {fields
        .filter((field) => !isHiddenField(field))
        .map((field) => (
          <FieldRenderer
            key={field.name}
            field={field}
            values={values}
            onChange={onChange}
            path={childPath(path, field.name)}
          />
        ))}
    </>
  );
}

export default FieldList;
