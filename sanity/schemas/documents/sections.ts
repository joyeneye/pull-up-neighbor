import { defineField, defineType } from "sanity";
import {
  RocketIcon,
  TargetIcon,
  InfoOutlineIcon,
  PackageIcon,
  StackIcon,
  ChartUpwardIcon,
  HeartIcon,
  EnvelopeIcon,
} from "@sanity/icons";

/**
 * Generic hero section. Used by every page — each page has its own
 * singleton document of this type (e.g. _id "homeHero", "aboutHero").
 * The schema is identical; only the document IDs differ.
 */
export const pageHero = defineType({
  name: "pageHero",
  title: "Hero Section",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "badge",
      title: "Badge (small text above headline)",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Headline",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accentWords",
      title: "Words to highlight in brand green",
      description:
        "Each word/phrase typed here appears in brand green in the headline.",
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
      name: "backgroundImage",
      title: "Background Image (optional)",
      description:
        "Use this for a static photo background. If a Background Video is also uploaded, the video takes priority.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "backgroundVideo",
      title: "Background Video (optional)",
      description:
        "Upload an MP4 under 50 MB. Compress at handbrake.fr if needed. Takes priority over the Background Image.",
      type: "file",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "backgroundVideoPoster",
      title: "Video Poster Image (optional)",
      description:
        "Shown for ~1 second before the video plays, and for reduced-motion users instead of the video.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "title", subtitle: "subtitle" } },
});

export const pageFinalCta = defineType({
  name: "pageFinalCta",
  title: "Final CTA Section",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text (small label above title)",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
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
  preview: { select: { title: "title", subtitle: "eyebrow" } },
});

export const homeFocusAreas = defineType({
  name: "homeFocusAreas",
  title: "Focus Areas Section",
  type: "document",
  icon: TargetIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Focus Area Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "focusArea" }] }],
    }),
  ],
  preview: { prepare: () => ({ title: "Focus Areas Section" }) },
});

export const homeAbout = defineType({
  name: "homeAbout",
  title: "About Snapshot Section",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "title",
      title: "Section Title",
      description: "Wrap brand-green portion with pipes: 'Plain. |Green part.|'",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "body",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({ name: "linkLabel", title: "Link Label", type: "string" }),
    defineField({ name: "linkHref", title: "Link Target", type: "string" }),
    defineField({
      name: "sidePanels",
      title: "Side Panels (right column)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "text",
              rows: 3,
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Snapshot Section" }) },
});

export const homeServices = defineType({
  name: "homeServices",
  title: "Services Preview Section",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({
      name: "linkLabel",
      title: "View-All Link Label",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Service Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
  ],
  preview: { prepare: () => ({ title: "Services Preview Section" }) },
});

export const homePrograms = defineType({
  name: "homePrograms",
  title: "Programs Preview Section",
  type: "document",
  icon: StackIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({
      name: "linkLabel",
      title: "View-All Link Label",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Program Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "program" }] }],
    }),
  ],
  preview: { prepare: () => ({ title: "Programs Preview Section" }) },
});

export const homeStats = defineType({
  name: "homeStats",
  title: "Impact Stats Section",
  type: "document",
  icon: ChartUpwardIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 2 }),
    defineField({
      name: "items",
      title: "Stats",
      type: "array",
      of: [{ type: "reference", to: [{ type: "stat" }] }],
    }),
    defineField({ name: "linkLabel", title: "Link Label", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Impact Stats Section" }) },
});

export const homePartners = defineType({
  name: "homePartners",
  title: "Partners Section",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "Partner Type Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partnerType" }] }],
    }),
    defineField({ name: "ctaLabel", title: "Button Label", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Partners Section" }) },
});
