import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../objects/iconList";
import { archivedField, archivedSubtitle } from "../objects/archivedField";

export const partnerType = defineType({
  name: "partnerType",
  title: "Partner Type",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Type",
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
    select: { title: "type", subtitle: "description", archived: "archived" },
    prepare: ({ title, subtitle, archived }) => ({
      title,
      subtitle: archivedSubtitle(subtitle, archived),
    }),
  },
});
