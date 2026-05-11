import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

/**
 * A single piece of media shown on the /in-action gallery.
 * Can be a YouTube link, an uploaded MP4, or a photo.
 */
export const inActionItem = defineType({
  name: "inActionItem",
  title: "In Action Item",
  type: "document",
  icon: PlayIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Media" },
    { name: "display", title: "Display" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description (shown in the lightbox)",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Category (e.g. VoteHub, Disaster Relief)",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      group: "content",
    }),
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      group: "media",
      options: {
        list: [
          { title: "YouTube Video (paste URL)", value: "youtube" },
          { title: "Uploaded Video (MP4)", value: "upload" },
          { title: "Photo", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "youtube",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      description:
        "Paste any YouTube URL: youtube.com/watch?v=…, youtu.be/…, or a Shorts URL.",
      type: "url",
      group: "media",
      hidden: ({ parent }) => parent?.mediaType !== "youtube",
      validation: (Rule) =>
        Rule.custom((url, ctx) => {
          const parent = ctx.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType !== "youtube") return true;
          if (!url) return "A YouTube URL is required.";
          if (typeof url !== "string") return "Must be a URL.";
          if (!/youtu\.?be/.test(url)) return "Must be a YouTube link.";
          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Video File (MP4)",
      description:
        "Upload an MP4 under 100 MB. Compress at handbrake.fr if needed.",
      type: "file",
      options: { accept: "video/mp4" },
      group: "media",
      hidden: ({ parent }) => parent?.mediaType !== "upload",
      validation: (Rule) =>
        Rule.custom((file, ctx) => {
          const parent = ctx.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType !== "upload") return true;
          if (!file) return "An uploaded video file is required.";
          return true;
        }),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      group: "media",
      hidden: ({ parent }) => parent?.mediaType !== "image",
      validation: (Rule) =>
        Rule.custom((image, ctx) => {
          const parent = ctx.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType !== "image") return true;
          if (!image) return "A photo is required.";
          return true;
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail (optional)",
      description:
        "Custom thumbnail shown on the gallery card. If empty: YouTube videos use the auto-thumbnail, photos use themselves, uploaded videos use the first frame.",
      type: "image",
      options: { hotspot: true },
      group: "display",
    }),
    defineField({
      name: "featured",
      title: "Featured (show first in gallery)",
      type: "boolean",
      group: "display",
      initialValue: false,
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      description: "Lower numbers appear first. Featured items always come first.",
      type: "number",
      group: "display",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Featured first, then newest",
      name: "featuredFirst",
      by: [
        { field: "featured", direction: "desc" },
        { field: "date", direction: "desc" },
        { field: "displayOrder", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnail",
      mediaType: "mediaType",
    },
    prepare: ({ title, subtitle, media, mediaType }) => ({
      title,
      subtitle: `${mediaType ?? "?"}${subtitle ? " · " + subtitle : ""}`,
      media,
    }),
  },
});
