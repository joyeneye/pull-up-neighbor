/**
 * The reusable content types, in the order they should be offered, with the
 * plain-English plural and blurb the dashboard and library screens show.
 *
 * Document types come out of the generated schema with singular titles
 * ("Program", "Stat") which read badly as list headings, and the schema has no
 * place for a sentence explaining what a type is for. That copy lives here.
 * Everything else — field lists, titles for the editor — still comes from the
 * schema, so this stays a thin presentation layer.
 */

import { PAGE_ROUTES, TYPE_TO_ROUTES } from "@/sanity/lib/routes";

export type LibraryEntry = {
  /** Document _type, and the /admin/library/<type> segment. */
  type: string;
  plural: string;
  /** One sentence a non-technical editor can act on. */
  blurb: string;
  /** Singular noun used in buttons and empty states. */
  singular: string;
};

export const LIBRARIES: LibraryEntry[] = [
  {
    type: "program",
    plural: "Programs",
    singular: "program",
    blurb: "The initiatives listed on the Programs page and previewed on the home page.",
  },
  {
    type: "service",
    plural: "Services",
    singular: "service",
    blurb: "What the organization offers, shown on the Services page and on home.",
  },
  {
    type: "focusArea",
    plural: "Focus Areas",
    singular: "focus area",
    blurb: "The short cards in the focus areas band on the home page.",
  },
  {
    type: "stat",
    plural: "Stats",
    singular: "stat",
    blurb: "The big numbers used on the home page and across the Impact page.",
  },
  {
    type: "partnerType",
    plural: "Partner Types",
    singular: "partner type",
    blurb: "The kinds of partner described on the Partners page.",
  },
  {
    type: "partnershipModel",
    plural: "Partnership Models",
    singular: "partnership model",
    blurb: "Ways to partner, with investment level and timeframe.",
  },
  {
    type: "inActionItem",
    plural: "In Action Items",
    singular: "gallery item",
    blurb: "Videos and photos in the In Action gallery.",
  },
];

export function libraryEntry(type: string): LibraryEntry | undefined {
  return LIBRARIES.find((entry) => entry.type === type);
}

const ROUTE_TITLES: Record<string, string> = Object.fromEntries(
  PAGE_ROUTES.map((page) => [page.route, page.title])
);

function sentenceList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * "Shown on Home and Programs" — the pages a library's items actually appear
 * on, read straight off the route table so it cannot drift.
 */
export function shownOn(type: string): string | null {
  const names = (TYPE_TO_ROUTES[type] ?? [])
    .map((route) => ROUTE_TITLES[route])
    .filter((title): title is string => Boolean(title));
  return names.length > 0 ? `Shown on ${sentenceList(names)}` : null;
}
