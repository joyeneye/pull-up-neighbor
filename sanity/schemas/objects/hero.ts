import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge (small text above headline)",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentWords",
      title: "Words to highlight in brand green",
      description: "Each word/phrase typed here will appear in the brand green color in the headline.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "subtitle",
      title: "Subheadline",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
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
      name: "backgroundVideo",
      title: "Background Video (optional)",
      description:
        "Upload an MP4 under 50 MB. Compress at handbrake.fr if needed. Leave empty for a plain dark background.",
      type: "file",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "backgroundVideoPoster",
      title: "Video Poster Image (optional)",
      description: "Shown before the video plays and for users with reduced-motion preferences.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
