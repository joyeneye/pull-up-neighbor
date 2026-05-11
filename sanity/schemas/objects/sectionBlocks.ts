import { defineField, defineType } from "sanity";
import {
  TextIcon,
  SplitVerticalIcon,
  ThLargeIcon,
  TiersIcon,
  TimelineIcon,
  ChartUpwardIcon,
  StarIcon,
  RocketIcon,
  ProjectsIcon as ProjectsIconAlias,
} from "@sanity/icons";
import { ICON_OPTIONS } from "./iconList";

/**
 * Reusable page-builder block schemas. Each page's "Body" document
 * has a `sections` array where editors can add any of these blocks
 * in any order. Editors see a menu of block types in Studio.
 */

const BG_OPTIONS = [
  { title: "White", value: "white" },
  { title: "Light slate", value: "slate-50" },
  { title: "Dark slate", value: "slate-900" },
  { title: "Brand green", value: "brand-500" },
];

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Rich Text",
  type: "object",
  icon: TextIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow (small label above title)",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
      },
      initialValue: "left",
    }),
    defineField({
      name: "body",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_OPTIONS },
      initialValue: "white",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "eyebrow" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Rich Text",
      subtitle: subtitle || undefined,
    }),
  },
});

const columnFields = (prefix: string) => [
  defineField({
    name: `${prefix}Eyebrow`,
    title: `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} — Eyebrow`,
    type: "string",
  }),
  defineField({
    name: `${prefix}Title`,
    title: `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} — Title`,
    type: "text",
    rows: 2,
  }),
  defineField({
    name: `${prefix}Body`,
    title: `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} — Body Paragraphs`,
    type: "array",
    of: [{ type: "text", rows: 4 }],
  }),
];

export const twoColumnTextBlock = defineType({
  name: "twoColumnTextBlock",
  title: "Two-Column Text",
  type: "object",
  icon: SplitVerticalIcon,
  fields: [
    ...columnFields("left"),
    ...columnFields("right"),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_OPTIONS },
      initialValue: "white",
    }),
  ],
  preview: {
    select: { title: "leftTitle", subtitle: "rightTitle" },
    prepare: ({ title, subtitle }) => ({
      title: title ? `Two-Column: ${title}` : "Two-Column Text",
      subtitle: subtitle || undefined,
    }),
  },
});

export const iconCardGridBlock = defineType({
  name: "iconCardGridBlock",
  title: "Icon Card Grid",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({ name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 2 }),
    defineField({
      name: "alignment",
      title: "Header Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
      },
      initialValue: "left",
    }),
    defineField({
      name: "columns",
      title: "Columns",
      type: "number",
      options: {
        list: [
          { title: "2", value: 2 },
          { title: "3", value: 3 },
          { title: "4", value: 4 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: "cardLayout",
      title: "Card Layout",
      type: "string",
      options: {
        list: [
          { title: "Icon on top, text below", value: "icon-top" },
          { title: "Icon on left, text right", value: "icon-left" },
        ],
      },
      initialValue: "icon-top",
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: [...ICON_OPTIONS] },
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
      validation: (R) => R.min(1),
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_OPTIONS },
      initialValue: "slate-50",
    }),
  ],
  preview: {
    select: { title: "title", count: "cards.length" },
    prepare: ({ title, count }) => ({
      title: title || "Icon Card Grid",
      subtitle: `${count ?? 0} card${count === 1 ? "" : "s"}`,
    }),
  },
});

export const pillarCardsBlock = defineType({
  name: "pillarCardsBlock",
  title: "Pillar Cards",
  type: "object",
  icon: TiersIcon,
  description:
    "Large cards each with an icon, title, description, and an optional bullet list (e.g. 'Goals').",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({ name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 3 }),
    defineField({
      name: "alignment",
      title: "Header Alignment",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
      },
      initialValue: "center",
    }),
    defineField({
      name: "bulletLabel",
      title: "Bullet List Label (e.g. '2030 Goals')",
      type: "string",
    }),
    defineField({
      name: "pillars",
      title: "Pillars",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: [...ICON_OPTIONS] },
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "bullets",
              title: "Bullet Points",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_OPTIONS },
      initialValue: "slate-50",
    }),
  ],
  preview: {
    select: { title: "title", count: "pillars.length" },
    prepare: ({ title, count }) => ({
      title: title || "Pillar Cards",
      subtitle: `${count ?? 0} pillar${count === 1 ? "" : "s"}`,
    }),
  },
});

export const phaseCardsBlock = defineType({
  name: "phaseCardsBlock",
  title: "Phase Cards",
  type: "object",
  icon: TimelineIcon,
  description:
    "Cards showing phases or stages, each with a phase label, status badge, title, and description. Looks best on dark backgrounds.",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({ name: "subtitle", title: "Subtitle (optional)", type: "text", rows: 3 }),
    defineField({
      name: "phases",
      title: "Phases",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "phase",
              title: "Phase Label (e.g. 'Phase 1')",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "status",
              title: "Status Badge",
              type: "string",
              options: {
                list: [
                  { title: "Active", value: "Active" },
                  { title: "In Progress", value: "In Progress" },
                  { title: "Horizon", value: "Horizon" },
                  { title: "Complete", value: "Complete" },
                ],
              },
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
          ],
          preview: { select: { title: "title", subtitle: "phase" } },
        },
      ],
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_OPTIONS },
      initialValue: "slate-900",
    }),
  ],
  preview: {
    select: { title: "title", count: "phases.length" },
    prepare: ({ title, count }) => ({
      title: title || "Phase Cards",
      subtitle: `${count ?? 0} phase${count === 1 ? "" : "s"}`,
    }),
  },
});

export const textWithStatsBlock = defineType({
  name: "textWithStatsBlock",
  title: "Text + Stat Cards",
  type: "object",
  icon: ChartUpwardIcon,
  description:
    "Text on the left, 2x2 stat cards on the right. Typically dark themed.",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
    defineField({
      name: "accentTail",
      title: "Title Accent Tail (rendered in brand green)",
      description:
        "Optional. Appears after the title in brand green — e.g. 'We Build With Them.'",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "stats",
      title: "Stat Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: { list: [...ICON_OPTIONS] },
            }),
            defineField({
              name: "value",
              title: "Big Number (e.g. 1M+)",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
      validation: (R) => R.min(2).max(8),
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_OPTIONS },
      initialValue: "slate-900",
    }),
  ],
  preview: {
    select: { title: "title", count: "stats.length" },
    prepare: ({ title, count }) => ({
      title: title || "Text + Stat Cards",
      subtitle: `${count ?? 0} stat${count === 1 ? "" : "s"}`,
    }),
  },
});

export const quoteSplitBlock = defineType({
  name: "quoteSplitBlock",
  title: "Text + Quote",
  type: "object",
  icon: StarIcon,
  description: "Text on the left, a large quote card on the right.",
  fields: [
    defineField({ name: "leftEyebrow", title: "Left — Eyebrow", type: "string" }),
    defineField({ name: "leftTitle", title: "Left — Title", type: "text", rows: 2 }),
    defineField({
      name: "leftBody",
      title: "Left — Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({ name: "rightEyebrow", title: "Quote Card — Eyebrow", type: "string" }),
    defineField({
      name: "quote",
      title: "Quote Text",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "quoteFooter",
      title: "Quote Card — Footer (below divider)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_OPTIONS },
      initialValue: "white",
    }),
  ],
  preview: {
    select: { title: "leftTitle", subtitle: "quote" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Text + Quote",
      subtitle: subtitle || undefined,
    }),
  },
});

export const brandedCalloutBlock = defineType({
  name: "brandedCalloutBlock",
  title: "Branded Callout",
  type: "object",
  icon: RocketIcon,
  description:
    "Large brand-green section with text on the left, a list of opportunity cards + button on the right.",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
    defineField({
      name: "body",
      title: "Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "items",
      title: "Right Column — Items",
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
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({ name: "ctaLabel", title: "Button Label", type: "string" }),
    defineField({ name: "ctaHref", title: "Button Link", type: "string" }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title || "Branded Callout",
    }),
  },
});

export const partnershipModelGridBlock = defineType({
  name: "partnershipModelGridBlock",
  title: "Partnership Models Grid",
  type: "object",
  icon: ProjectsIconAlias,
  description:
    "Two-column grid of partnership models pulled from the Partnership Models library.",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "text", rows: 2 }),
    defineField({
      name: "models",
      title: "Models",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partnershipModel" }] }],
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "string",
      options: { list: BG_OPTIONS },
      initialValue: "slate-50",
    }),
  ],
  preview: {
    select: { title: "title", count: "models.length" },
    prepare: ({ title, count }) => ({
      title: title || "Partnership Models Grid",
      subtitle: `${count ?? 0} model${count === 1 ? "" : "s"}`,
    }),
  },
});

/** The full list of block types editors can add to a page body. */
export const PAGE_BUILDER_BLOCKS = [
  { type: "richTextBlock" },
  { type: "twoColumnTextBlock" },
  { type: "iconCardGridBlock" },
  { type: "pillarCardsBlock" },
  { type: "phaseCardsBlock" },
  { type: "textWithStatsBlock" },
  { type: "quoteSplitBlock" },
  { type: "brandedCalloutBlock" },
  { type: "partnershipModelGridBlock" },
];

export const pageBuilderTypes = [
  richTextBlock,
  twoColumnTextBlock,
  iconCardGridBlock,
  pillarCardsBlock,
  phaseCardsBlock,
  textWithStatsBlock,
  quoteSplitBlock,
  brandedCalloutBlock,
  partnershipModelGridBlock,
];
