import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";
import { DeleteItemField } from "../../components/DeleteItemField";

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
      name: "deleteAction",
      title: " ",
      type: "string",
      readOnly: true,
      components: {
        field: DeleteItemField,
      },
    }),
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
          { title: "Video Link (YouTube or Vimeo)", value: "embed" },
          { title: "Uploaded Video (MP4)", value: "upload" },
          { title: "Photo", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "embed",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "embedUrl",
      title: "Video URL",
      description:
        "Paste a YouTube or Vimeo URL. Supported: youtube.com/watch?v=…, youtu.be/…, YouTube Shorts, vimeo.com/123456789, player.vimeo.com/video/123456789.",
      type: "url",
      group: "media",
      hidden: ({ parent }) =>
        parent?.mediaType !== "embed" && parent?.mediaType !== "youtube",
      validation: (Rule) =>
        Rule.custom((url, ctx) => {
          const parent = ctx.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType !== "embed" && parent?.mediaType !== "youtube") return true;
          if (!url) return "A video URL is required.";
          if (typeof url !== "string") return "Must be a URL.";
          if (!/youtu\.?be|vimeo\.com/.test(url))
            return "Must be a YouTube or Vimeo link.";
          return true;
        }),
    }),
    defineField({
      name: "muxVideo",
      title: "Video Upload (Mux — recommended)",
      description:
        "Drop in a video of any size. Mux handles the upload + streaming so the browser never freezes.",
      type: "mux.video",
      group: "media",
      hidden: ({ parent }) => parent?.mediaType !== "upload",
      validation: (Rule) =>
        Rule.custom((value, ctx) => {
          const parent = ctx.parent as { mediaType?: string; video?: unknown } | undefined;
          if (parent?.mediaType !== "upload") return true;
          if (!value && !parent?.video) return "Upload a video.";
          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Legacy MP4 Upload (small files only)",
      description:
        "Only use for tiny clips under 30 MB. Prefer the Mux field above.",
      type: "file",
      options: { accept: "video/mp4" },
      group: "media",
      hidden: ({ parent }) =>
        parent?.mediaType !== "upload" || Boolean(parent?.muxVideo),
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
