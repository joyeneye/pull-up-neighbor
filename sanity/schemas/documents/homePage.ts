import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero (top of page)",
      type: "hero",
      validation: (Rule) => Rule.required(),
    }),
    // Focus Areas section
    defineField({
      name: "focusAreasEyebrow",
      title: "Focus Areas — Eyebrow",
      type: "string",
      group: "focusAreas",
    }),
    defineField({
      name: "focusAreasTitle",
      title: "Focus Areas — Title",
      type: "string",
      group: "focusAreas",
    }),
    defineField({
      name: "focusAreas",
      title: "Focus Areas — Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "focusArea" }] }],
      group: "focusAreas",
    }),
    // About snapshot section
    defineField({
      name: "aboutEyebrow",
      title: "About — Eyebrow",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutTitle",
      title: "About — Title",
      type: "string",
      description: "Use a pipe character | to mark text that should be brand-green.",
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "About — Body Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      group: "about",
    }),
    defineField({
      name: "aboutLinkLabel",
      title: "About — Link Label",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutLinkHref",
      title: "About — Link Target",
      type: "string",
      group: "about",
    }),
    defineField({
      name: "aboutSidePanels",
      title: "About — Side Panels",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (R) => R.required() }),
            defineField({ name: "body", title: "Body", type: "text", rows: 3, validation: (R) => R.required() }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
    // Services preview section
    defineField({
      name: "servicesEyebrow",
      title: "Services — Eyebrow",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "servicesTitle",
      title: "Services — Title",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "servicesLinkLabel",
      title: "Services — View All Link Label",
      type: "string",
      group: "services",
    }),
    defineField({
      name: "services",
      title: "Services — Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      group: "services",
    }),
    // Programs preview section
    defineField({
      name: "programsEyebrow",
      title: "Programs — Eyebrow",
      type: "string",
      group: "programs",
    }),
    defineField({
      name: "programsTitle",
      title: "Programs — Title",
      type: "string",
      group: "programs",
    }),
    defineField({
      name: "programsLinkLabel",
      title: "Programs — View All Link Label",
      type: "string",
      group: "programs",
    }),
    defineField({
      name: "programs",
      title: "Programs — Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "program" }] }],
      group: "programs",
    }),
    // Impact stats section
    defineField({
      name: "statsEyebrow",
      title: "Impact — Eyebrow",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "statsTitle",
      title: "Impact — Title",
      type: "string",
      group: "stats",
    }),
    defineField({
      name: "statsSubtitle",
      title: "Impact — Subtitle",
      type: "text",
      rows: 2,
      group: "stats",
    }),
    defineField({
      name: "stats",
      title: "Impact — Stats",
      type: "array",
      of: [{ type: "reference", to: [{ type: "stat" }] }],
      group: "stats",
    }),
    defineField({
      name: "statsLinkLabel",
      title: "Impact — Link Label",
      type: "string",
      group: "stats",
    }),
    // Partners section
    defineField({
      name: "partnersEyebrow",
      title: "Partners — Eyebrow",
      type: "string",
      group: "partners",
    }),
    defineField({
      name: "partnersTitle",
      title: "Partners — Title",
      type: "string",
      group: "partners",
    }),
    defineField({
      name: "partnersSubtitle",
      title: "Partners — Subtitle",
      type: "text",
      rows: 3,
      group: "partners",
    }),
    defineField({
      name: "partnerTypes",
      title: "Partners — Cards",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partnerType" }] }],
      group: "partners",
    }),
    defineField({
      name: "partnersCtaLabel",
      title: "Partners — Button Label",
      type: "string",
      group: "partners",
    }),
    // Final CTA
    defineField({
      name: "finalCta",
      title: "Final CTA Section",
      type: "finalCta",
      group: "final",
    }),
  ],
  groups: [
    { name: "focusAreas", title: "Focus Areas" },
    { name: "about", title: "About Snapshot" },
    { name: "services", title: "Services Preview" },
    { name: "programs", title: "Programs Preview" },
    { name: "stats", title: "Impact Stats" },
    { name: "partners", title: "Partners" },
    { name: "final", title: "Final CTA" },
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
