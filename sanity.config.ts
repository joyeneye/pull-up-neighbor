import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes, SINGLETON_TYPES } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { punTheme } from "./sanity/theme";
import { StudioLogo } from "./sanity/StudioLogo";

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
  theme: punTheme,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
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
        // Where each document lives on the public site (used by the
        // "Open preview" button on each document)
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
        // When the editor navigates inside the iframe, jump the document
        // panel to the singleton that owns that route.
        mainDocuments: Object.entries(SINGLETON_TO_PATH).map(
          ([type, route]) => ({ route, type })
        ),
      },
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
