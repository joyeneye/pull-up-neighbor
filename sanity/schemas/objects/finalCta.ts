import { defineField, defineType } from "sanity";

export const finalCta = defineType({
  name: "finalCta",
  title: "Final CTA Section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text (small label above title)",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryCta",
      title: "Primary Button",
      type: "cta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary Button (optional)",
      type: "cta",
    }),
    defineField({
      name: "dark",
      title: "Dark Background",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
