import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../objects/iconList";
import { archivedField, archivedSubtitle } from "../objects/archivedField";

export const focusArea = defineType({
  name: "focusArea",
  title: "Focus Area",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: [...ICON_OPTIONS] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
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
    select: { title: "title", subtitle: "description", archived: "archived" },
    prepare: ({ title, subtitle, archived }) => ({
      title,
      subtitle: archivedSubtitle(subtitle, archived),
    }),
  },
});
