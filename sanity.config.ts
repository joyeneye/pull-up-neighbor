import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes, SINGLETON_TYPES } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";

const SINGLETON_TO_PATH: Record<string, string> = {
  homePage: "/",
  aboutPage: "/about",
  visionPage: "/vision",
  programsPage: "/programs",
  impactPage: "/impact",
  servicesPage: "/services",
  partnersPage: "/partners",
  contactPage: "/contact",
};

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Pull Up Neighbor",
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action !== "duplicate" &&
              action !== "delete" &&
              action !== "unpublish"
          )
        : input,
  },
  plugins: [
    presentationTool({
      title: "Preview",
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: Object.fromEntries(
          Object.entries(SINGLETON_TO_PATH).map(([type, path]) => [
            type,
            {
              select: { title: "hero.title" },
              resolve: (value) => ({
                locations: [
                  { title: (value?.title as string) || type, href: path },
                ],
              }),
            },
          ])
        ),
      },
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
