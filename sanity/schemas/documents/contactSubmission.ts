import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

const STATUSES = [
  { title: "New", value: "new" },
  { title: "Read", value: "read" },
  { title: "Replied", value: "replied" },
  { title: "Archived", value: "archived" },
];

/**
 * An inquiry submitted through the contact form.
 *
 * Created only by /api/contact, never by hand — every field is read-only in
 * the Studio so an inbox entry cannot be silently edited into something the
 * sender never wrote. Status is the one thing an editor changes.
 */
export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Inquiry",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: STATUSES, layout: "radio" },
      initialValue: "new",
    }),
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "organization", title: "Organization", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({
      name: "partnershipType",
      title: "Partnership Type",
      type: "string",
      readOnly: true,
    }),
    defineField({ name: "message", title: "Message", type: "text", rows: 8, readOnly: true }),
    defineField({
      name: "submittedAt",
      title: "Submitted",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 4,
      description: "Only visible here. The sender never sees this.",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      organization: "organization",
      partnershipType: "partnershipType",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare: ({ name, organization, partnershipType, status, submittedAt }) => {
      const when = submittedAt
        ? new Date(submittedAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })
        : "";
      const who = organization ? `${name} · ${organization}` : name;
      const flag = status && status !== "new" ? status : "NEW";
      return {
        title: who || "(no name)",
        subtitle: [flag.toUpperCase(), partnershipType, when].filter(Boolean).join(" · "),
      };
    },
  },
});
