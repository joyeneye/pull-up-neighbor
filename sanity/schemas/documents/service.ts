import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "../objects/iconList";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (used for #anchor links)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
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
      name: "why",
      title: "Why It Matters",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "howToPartner",
      title: "How to Partner",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "bullets",
      title: "Service Bullets (shown on Services page detail)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Display Order", name: "displayOrder", by: [{ field: "displayOrder", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
