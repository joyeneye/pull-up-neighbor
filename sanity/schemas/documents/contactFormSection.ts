import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

/**
 * The Contact page's form section. The form itself is a stateful React
 * component that can't be a CMS block, but every piece of surrounding
 * text — sidebar headings, reasons, contact info, response message —
 * lives in this singleton document.
 */
export const contactFormSection = defineType({
  name: "contactFormSection",
  title: "Contact Form Section",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "reasonsHeading",
      title: "Reasons — Eyebrow",
      type: "string",
      initialValue: "Is This For You?",
    }),
    defineField({
      name: "reasonsTitle",
      title: "Reasons — Title",
      type: "string",
      initialValue: "Reach Out If...",
    }),
    defineField({
      name: "reasons",
      title: "Reasons (bulleted list)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "partnerTypesHeading",
      title: "Partner Types — Eyebrow",
      type: "string",
      initialValue: "We Work With",
    }),
    defineField({
      name: "partnerTypes",
      title: "Partner Type Tiles",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  "Globe", "BookOpen", "Users", "Building2",
                  "DollarSign", "Layers", "Heart", "Vote",
                  "Home", "Shield", "Megaphone", "Handshake",
                ],
              },
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: "label", media: "icon" } },
        },
      ],
    }),
    defineField({
      name: "directContactHeading",
      title: "Direct Contact — Eyebrow",
      type: "string",
      initialValue: "Direct Contact",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      initialValue: "hello@pullupneighbor.org",
    }),
    defineField({
      name: "directContactNote",
      title: "Direct Contact — Note",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "responseTimeHeading",
      title: "Response Time — Heading",
      type: "string",
      initialValue: "Response Time",
    }),
    defineField({
      name: "responseTimeBody",
      title: "Response Time — Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "formIntroTitle",
      title: "Form — Intro Title",
      type: "string",
      initialValue: "Tell Us About Your Organization",
    }),
    defineField({
      name: "formIntroSubtitle",
      title: "Form — Intro Subtitle",
      type: "text",
      rows: 2,
    }),
  ],
  preview: { prepare: () => ({ title: "Contact Form Section" }) },
});
