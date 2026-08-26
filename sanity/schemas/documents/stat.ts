import { defineField, defineType } from "sanity";
import { archivedField, archivedSubtitle } from "../objects/archivedField";

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({
      name: "value",
      title: "Big Number (e.g. 1M+)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    archivedField,
  ],
  orderings: [
    { title: "Display Order", name: "displayOrder", by: [{ field: "displayOrder", direction: "asc" }] },
  ],
  preview: {
    select: { title: "label", subtitle: "value", archived: "archived" },
    prepare: ({ title, subtitle, archived }) => ({
      title,
      subtitle: archivedSubtitle(subtitle, archived),
    }),
  },
});
