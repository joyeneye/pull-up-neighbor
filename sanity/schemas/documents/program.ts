import { defineField, defineType } from "sanity";

export const program = defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (used for #anchor links)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pillars",
      title: "Pillars (tags)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "color",
      title: "Card Gradient (Tailwind classes)",
      description: "e.g. 'from-slate-800 to-slate-900' — pick from existing site palette.",
      type: "string",
      options: {
        list: [
          { title: "Slate Dark", value: "from-slate-800 to-slate-900" },
          { title: "Slate Mid", value: "from-slate-700 to-slate-900" },
          { title: "Brand → Slate", value: "from-brand-800 to-slate-900" },
          { title: "Slate → Brand", value: "from-slate-800 to-brand-900" },
          { title: "Reverse Slate", value: "from-slate-900 to-slate-700" },
        ],
      },
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "displayOrder",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "tagline" },
  },
});
