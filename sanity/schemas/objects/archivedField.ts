import { defineField } from "sanity";

/**
 * Shared "Archived" toggle for every library document type.
 *
 * Before this existed, deleting was the only way to take a program, service,
 * stat or gallery item off the site — and deleting is blocked whenever
 * another document still references it, which is precisely when you most want
 * to remove it. Archiving hides the item everywhere it renders while keeping
 * the content, so it can be brought back with one click.
 */
export const archivedField = defineField({
  name: "archived",
  title: "Archived",
  type: "boolean",
  initialValue: false,
  description:
    "Hide this from the website without deleting it. Archived items disappear from every page but stay here, and can be un-archived at any time.",
});

/** Adds "Archived" to a preview subtitle so hidden items are obvious in lists. */
export function archivedSubtitle(subtitle?: string | null, archived?: boolean): string {
  const base = subtitle ?? "";
  return archived ? (base ? `Archived · ${base}` : "Archived") : base;
}
