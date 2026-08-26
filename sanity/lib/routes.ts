/**
 * The one table that maps a page to its route and to the documents that
 * make it up.
 *
 * Before this file existed the same information was written out three
 * separate times — the Studio sidebar (sanity/structure.ts), the singleton
 * lock list (sanity/schemas/index.ts) and the Presentation route map
 * (sanity.config.ts) — and the revalidation webhook invented a fourth set
 * of names that matched none of them. Adding a section meant remembering
 * all four; missing one failed silently.
 *
 * Everything derives from here now. Add a section in this table and the
 * sidebar, the delete-protection and the publish-to-live path all pick it
 * up together.
 */

export type SectionKind = "singleton" | "list";

export type PageSection = {
  /** Document _id for singletons, or a sidebar-only id for lists. */
  id: string;
  schemaType: string;
  title: string;
  kind?: SectionKind;
};

export type PageRoute = {
  key: string;
  title: string;
  /** The path a visitor sees. Used directly by revalidatePath(). */
  route: string;
  sections: PageSection[];
};

export const PAGE_ROUTES: PageRoute[] = [
  {
    key: "home",
    title: "Home",
    route: "/",
    sections: [
      { id: "homeHero", schemaType: "pageHero", title: "Hero" },
      { id: "homeFocusAreas", schemaType: "homeFocusAreas", title: "Focus Areas" },
      { id: "homeAbout", schemaType: "homeAbout", title: "About Snapshot" },
      { id: "homeServices", schemaType: "homeServices", title: "Services Preview" },
      { id: "homePrograms", schemaType: "homePrograms", title: "Programs Preview" },
      { id: "homeStats", schemaType: "homeStats", title: "Impact Stats" },
      { id: "homePartners", schemaType: "homePartners", title: "Partners" },
      { id: "homeFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
  {
    key: "about",
    title: "About",
    route: "/about",
    sections: [
      { id: "aboutHero", schemaType: "pageHero", title: "Hero" },
      { id: "aboutBody", schemaType: "pageBody", title: "Body Sections" },
      { id: "aboutFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
  {
    key: "vision",
    title: "Vision",
    route: "/vision",
    sections: [
      { id: "visionHero", schemaType: "pageHero", title: "Hero" },
      { id: "visionBody", schemaType: "pageBody", title: "Body Sections" },
      { id: "visionFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
  {
    key: "programs",
    title: "Programs",
    route: "/programs",
    sections: [
      { id: "programsHero", schemaType: "pageHero", title: "Hero" },
      { id: "programsBody", schemaType: "pageBody", title: "Body Sections" },
      { id: "programsFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
  {
    key: "impact",
    title: "Impact",
    route: "/impact",
    sections: [
      { id: "impactHero", schemaType: "pageHero", title: "Hero" },
      { id: "impactBody", schemaType: "pageBody", title: "Body Sections" },
      { id: "impactFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
  {
    key: "services",
    title: "Services",
    route: "/services",
    sections: [
      { id: "servicesHero", schemaType: "pageHero", title: "Hero" },
      { id: "servicesBody", schemaType: "pageBody", title: "Body Sections" },
      { id: "servicesFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
  {
    key: "partners",
    title: "Partners",
    route: "/partners",
    sections: [
      { id: "partnersHero", schemaType: "pageHero", title: "Hero" },
      { id: "partnersBody", schemaType: "pageBody", title: "Body Sections" },
      { id: "partnersFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
  {
    key: "contact",
    title: "Contact",
    route: "/contact",
    sections: [
      { id: "contactHero", schemaType: "pageHero", title: "Hero" },
      { id: "contactFormSection", schemaType: "contactFormSection", title: "Form Section" },
      { id: "contactBody", schemaType: "pageBody", title: "Body Sections" },
      { id: "contactFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
  {
    key: "inAction",
    title: "In Action",
    route: "/in-action",
    sections: [
      { id: "inActionHero", schemaType: "pageHero", title: "Hero" },
      {
        id: "inActionGallery",
        schemaType: "inActionItem",
        title: "Gallery Items (Videos & Photos)",
        kind: "list",
      },
      { id: "inActionBody", schemaType: "pageBody", title: "Body Sections" },
      { id: "inActionFinalCta", schemaType: "pageFinalCta", title: "Final CTA" },
    ],
  },
];

export const ALL_ROUTES: string[] = PAGE_ROUTES.map((p) => p.route);

/** Section document ids that must never be duplicated, deleted or unpublished. */
export const SECTION_SINGLETON_IDS: string[] = PAGE_ROUTES.flatMap((p) =>
  p.sections.filter((s) => s.kind !== "list").map((s) => s.id)
);

/** Document _id -> the route(s) that render it. */
export const ID_TO_ROUTES: Record<string, string[]> = Object.fromEntries(
  PAGE_ROUTES.flatMap((p) => p.sections.filter((s) => s.kind !== "list").map((s) => [s.id, [p.route]]))
);

/**
 * Library document types -> every route that renders them. These have
 * arbitrary ids (program-votehub, stat-abc123), so they match on _type.
 */
export const TYPE_TO_ROUTES: Record<string, string[]> = {
  program: ["/", "/programs"],
  service: ["/", "/services"],
  focusArea: ["/"],
  stat: ["/", "/impact"],
  partnerType: ["/", "/partners"],
  partnershipModel: ["/partners"],
  inActionItem: ["/in-action"],
  siteSettings: ALL_ROUTES,
};

/** The route(s) to revalidate for a published document. Empty = unmapped. */
export function routesForDocument(id: string | undefined, type: string | undefined): string[] {
  const publishedId = id?.replace(/^drafts\./, "");
  if (publishedId && ID_TO_ROUTES[publishedId]) return ID_TO_ROUTES[publishedId];
  if (type && TYPE_TO_ROUTES[type]) return TYPE_TO_ROUTES[type];
  return [];
}
