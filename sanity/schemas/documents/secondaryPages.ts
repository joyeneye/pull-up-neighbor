import { defineField, defineType } from "sanity";

function buildPage(name: string, title: string) {
  return defineType({
    name,
    title,
    type: "document",
    fields: [
      defineField({
        name: "hero",
        title: "Hero (top of page)",
        type: "hero",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "finalCta",
        title: "Final CTA Section (bottom of page)",
        type: "finalCta",
      }),
    ],
    preview: { prepare: () => ({ title }) },
  });
}

export const aboutPage = buildPage("aboutPage", "About Page");
export const visionPage = buildPage("visionPage", "Vision Page");
export const programsPage = buildPage("programsPage", "Programs Page");
export const impactPage = buildPage("impactPage", "Impact Page");
export const servicesPage = buildPage("servicesPage", "Services Page");
export const partnersPage = buildPage("partnersPage", "Partners Page");
export const contactPage = buildPage("contactPage", "Contact Page");
