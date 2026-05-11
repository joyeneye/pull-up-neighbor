import { defineField, defineType } from "sanity";
import { ProjectsIcon } from "@sanity/icons";

export const partnershipModel = defineType({
  name: "partnershipModel",
  title: "Partnership Model",
  type: "document",
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: "title",
      title: "Model Name",
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
      name: "investment",
      title: "Investment",
      description: "e.g. 'Flexible', 'Event-based', 'Mission-aligned capital'",
      type: "string",
    }),
    defineField({
      name: "timeframe",
      title: "Timeframe",
      description: "e.g. '6–24 months', '2–5 years'",
      type: "string",
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
  preview: { select: { title: "title", subtitle: "investment" } },
});
