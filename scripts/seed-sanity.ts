/**
 * Seeds the Sanity dataset with the current site content.
 *
 * Usage:
 *   1. Ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and
 *      SANITY_API_WRITE_TOKEN are set in your environment (e.g. .env.local).
 *   2. npx tsx scripts/seed-sanity.ts
 *
 * Re-running is idempotent — documents use stable IDs and are upserted via
 * createOrReplace. Existing edits in Sanity will be overwritten.
 */
import { createClient } from "@sanity/client";
import {
  defaultHomePage,
  defaultAboutPage,
  defaultVisionPage,
  defaultProgramsPage,
  defaultImpactPage,
  defaultServicesPage,
  defaultPartnersPage,
  defaultContactPage,
  defaultPrograms,
  defaultServices,
  defaultPartnerTypes,
  defaultFocusAreas,
  defaultStats,
} from "../lib/cms-defaults";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID env var");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN env var (create one with editor permissions in sanity.io/manage)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-05-09",
  token,
  useCdn: false,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  // Reusable docs
  const focusAreaIds = await Promise.all(
    defaultFocusAreas.map(async (item, i) => {
      const _id = `focusArea-${slugify(item.title)}`;
      await client.createOrReplace({
        _id,
        _type: "focusArea",
        title: item.title,
        icon: item.icon,
        description: item.description,
        displayOrder: i,
      });
      return _id;
    })
  );

  const serviceIds = await Promise.all(
    defaultServices.map(async (item, i) => {
      const _id = `service-${slugify(item.title)}`;
      await client.createOrReplace({
        _id,
        _type: "service",
        title: item.title,
        icon: item.icon,
        description: item.description,
        why: item.why,
        howToPartner: item.howToPartner,
        displayOrder: i,
      });
      return _id;
    })
  );

  const programIds = await Promise.all(
    defaultPrograms.map(async (item, i) => {
      const _id = `program-${slugify(item.name)}`;
      await client.createOrReplace({
        _id,
        _type: "program",
        name: item.name,
        slug: { _type: "slug", current: item.slug ?? slugify(item.name) },
        tagline: item.tagline,
        description: item.description,
        pillars: item.pillars,
        color: item.color,
        displayOrder: i,
      });
      return _id;
    })
  );

  const statIds = await Promise.all(
    defaultStats.map(async (item, i) => {
      const _id = `stat-${slugify(item.label)}`;
      await client.createOrReplace({
        _id,
        _type: "stat",
        value: item.value,
        label: item.label,
        description: item.description,
        displayOrder: i,
      });
      return _id;
    })
  );

  const partnerTypeIds = await Promise.all(
    defaultPartnerTypes.map(async (item, i) => {
      const _id = `partnerType-${slugify(item.type)}`;
      await client.createOrReplace({
        _id,
        _type: "partnerType",
        type: item.type,
        icon: item.icon,
        description: item.description,
        displayOrder: i,
      });
      return _id;
    })
  );

  // Helper to convert hero defaults into Sanity-shape (skip video — editor uploads in Studio)
  const heroDoc = (h: typeof defaultHomePage.hero) => ({
    badge: h.badge,
    title: h.title,
    accentWords: h.accentWords,
    subtitle: h.subtitle,
    primaryCta: { label: h.primaryCta.label, href: h.primaryCta.href },
    secondaryCta: h.secondaryCta
      ? { label: h.secondaryCta.label, href: h.secondaryCta.href }
      : undefined,
  });

  const finalCtaDoc = (c?: typeof defaultHomePage.finalCta) =>
    c
      ? {
          eyebrow: c.eyebrow,
          title: c.title,
          description: c.description,
          primaryCta: { label: c.primaryCta.label, href: c.primaryCta.href },
          secondaryCta: c.secondaryCta
            ? { label: c.secondaryCta.label, href: c.secondaryCta.href }
            : undefined,
          dark: c.dark,
        }
      : undefined;

  // Home page
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    hero: heroDoc(defaultHomePage.hero),
    focusAreasEyebrow: defaultHomePage.focusAreasEyebrow,
    focusAreasTitle: defaultHomePage.focusAreasTitle,
    focusAreas: focusAreaIds.map((id) => ({ _type: "reference", _ref: id, _key: id })),
    aboutEyebrow: defaultHomePage.aboutEyebrow,
    aboutTitle: defaultHomePage.aboutTitle,
    aboutBody: defaultHomePage.aboutBody,
    aboutLinkLabel: defaultHomePage.aboutLinkLabel,
    aboutLinkHref: defaultHomePage.aboutLinkHref,
    aboutSidePanels: defaultHomePage.aboutSidePanels?.map((p, i) => ({
      _key: `panel-${i}`,
      title: p.title,
      body: p.body,
    })),
    servicesEyebrow: defaultHomePage.servicesEyebrow,
    servicesTitle: defaultHomePage.servicesTitle,
    servicesLinkLabel: defaultHomePage.servicesLinkLabel,
    services: serviceIds.map((id) => ({ _type: "reference", _ref: id, _key: id })),
    programsEyebrow: defaultHomePage.programsEyebrow,
    programsTitle: defaultHomePage.programsTitle,
    programsLinkLabel: defaultHomePage.programsLinkLabel,
    programs: programIds.map((id) => ({ _type: "reference", _ref: id, _key: id })),
    statsEyebrow: defaultHomePage.statsEyebrow,
    statsTitle: defaultHomePage.statsTitle,
    statsSubtitle: defaultHomePage.statsSubtitle,
    stats: statIds.map((id) => ({ _type: "reference", _ref: id, _key: id })),
    statsLinkLabel: defaultHomePage.statsLinkLabel,
    partnersEyebrow: defaultHomePage.partnersEyebrow,
    partnersTitle: defaultHomePage.partnersTitle,
    partnersSubtitle: defaultHomePage.partnersSubtitle,
    partnerTypes: partnerTypeIds.map((id) => ({ _type: "reference", _ref: id, _key: id })),
    partnersCtaLabel: defaultHomePage.partnersCtaLabel,
    finalCta: finalCtaDoc(defaultHomePage.finalCta ?? undefined),
  });

  // Secondary pages
  const secondary = [
    ["aboutPage", defaultAboutPage],
    ["visionPage", defaultVisionPage],
    ["programsPage", defaultProgramsPage],
    ["impactPage", defaultImpactPage],
    ["servicesPage", defaultServicesPage],
    ["partnersPage", defaultPartnersPage],
    ["contactPage", defaultContactPage],
  ] as const;

  for (const [type, page] of secondary) {
    await client.createOrReplace({
      _id: type,
      _type: type,
      hero: heroDoc(page.hero),
      finalCta: finalCtaDoc(page.finalCta ?? undefined),
    });
  }

  // Site settings
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: "Pull Up Neighbor",
    tagline: "Where Community, Capital & Culture Converge",
  });

  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
