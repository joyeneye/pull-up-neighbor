import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes, SINGLETON_ID_SET, SINGLETON_ONLY_TYPES } from "./sanity/schemas";
import { structure } from "./sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { punTheme } from "./sanity/theme";
import { StudioLogo } from "./sanity/StudioLogo";

// When the iframe navigates to a path, jump the document panel to that
// page's hero section (the primary editable section for that route).
const ROUTE_TO_HERO: Record<string, { id: string; type: string }> = {
  "/": { id: "homeHero", type: "pageHero" },
  "/about": { id: "aboutHero", type: "pageHero" },
  "/vision": { id: "visionHero", type: "pageHero" },
  "/programs": { id: "programsHero", type: "pageHero" },
  "/impact": { id: "impactHero", type: "pageHero" },
  "/services": { id: "servicesHero", type: "pageHero" },
  "/partners": { id: "partnersHero", type: "pageHero" },
  "/contact": { id: "contactHero", type: "pageHero" },
  "/in-action": { id: "inActionHero", type: "pageHero" },
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
      templates.filter(({ schemaType }) => !SINGLETON_ONLY_TYPES.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETON_ID_SET.has(context.documentId ?? "")
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
        // When iframe is at /about, open aboutHero in the document panel.
        mainDocuments: Object.entries(ROUTE_TO_HERO).map(
          ([route, { id, type }]) => ({
            route,
            filter: `_type == "${type}" && _id == "${id}"`,
          })
        ),
      },
    }),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
