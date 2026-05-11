import { defineField, defineType } from "sanity";
import { ThListIcon } from "@sanity/icons";
import { PAGE_BUILDER_BLOCKS } from "../objects/sectionBlocks";

/**
 * Holds the page-builder body (array of section blocks) for a page.
 * One singleton per page (e.g. _id "aboutBody", "visionBody").
 * Editors add/remove/reorder sections here.
 */
export const pageBody = defineType({
  name: "pageBody",
  title: "Page Body",
  type: "document",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "sections",
      title: "Sections",
      description:
        "Add, remove, and reorder the body sections of this page. Click + to add a section, drag to reorder, X to remove.",
      type: "array",
      of: PAGE_BUILDER_BLOCKS,
    }),
  ],
  preview: { prepare: () => ({ title: "Body Sections" }) },
});
