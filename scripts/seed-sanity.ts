/**
 * Seeds the Sanity dataset with the current site content.
 *
 * Usage:
 *   1. Set NEXT_PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN in .env.local
 *   2. npm run seed
 *
 * Re-runnable. Docs use stable IDs and are upserted via createOrReplace.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
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
import type { HeroContent, FinalCtaContent } from "../lib/cms-types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID env var");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN env var");
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

  // Reusable card-level docs
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

  // Upload hero video + poster
  let heroVideoAssetId: string | undefined;
  let heroPosterAssetId: string | undefined;
  const heroVideoPath = resolve(process.cwd(), "public/hero/pun-hero.mp4");
  if (existsSync(heroVideoPath)) {
    console.log("Uploading hero video...");
    const uploaded = await client.assets.upload(
      "file",
      readFileSync(heroVideoPath),
      { filename: "pun-hero.mp4", contentType: "video/mp4" }
    );
    heroVideoAssetId = uploaded._id;
    console.log(`  → ${uploaded._id}`);
  }
  const heroPosterPath = resolve(process.cwd(), "public/hero/pun-hero-poster.jpg");
  if (existsSync(heroPosterPath)) {
    console.log("Uploading hero poster...");
    const uploaded = await client.assets.upload(
      "image",
      readFileSync(heroPosterPath),
      { filename: "pun-hero-poster.jpg", contentType: "image/jpeg" }
    );
    heroPosterAssetId = uploaded._id;
    console.log(`  → ${uploaded._id}`);
  }

  // Build a pageHero document
  const heroDoc = (
    _id: string,
    h: HeroContent,
    opts: { withVideo?: boolean } = {}
  ) => ({
    _id,
    _type: "pageHero",
    badge: h.badge ?? undefined,
    title: h.title,
    accentWords: h.accentWords ?? undefined,
    subtitle: h.subtitle,
    primaryCta: { label: h.primaryCta.label, href: h.primaryCta.href },
    secondaryCta: h.secondaryCta
      ? { label: h.secondaryCta.label, href: h.secondaryCta.href }
      : undefined,
    ...(opts.withVideo && heroVideoAssetId
      ? {
          backgroundVideo: {
            _type: "file",
            asset: { _type: "reference", _ref: heroVideoAssetId },
          },
        }
      : {}),
    ...(opts.withVideo && heroPosterAssetId
      ? {
          backgroundVideoPoster: {
            _type: "image",
            asset: { _type: "reference", _ref: heroPosterAssetId },
          },
        }
      : {}),
  });

  const finalCtaDoc = (_id: string, c: FinalCtaContent) => ({
    _id,
    _type: "pageFinalCta",
    eyebrow: c.eyebrow ?? undefined,
    title: c.title,
    description: c.description ?? undefined,
    primaryCta: { label: c.primaryCta.label, href: c.primaryCta.href },
    secondaryCta: c.secondaryCta
      ? { label: c.secondaryCta.label, href: c.secondaryCta.href }
      : undefined,
    dark: c.dark ?? false,
  });

  const refsFor = (ids: string[]) =>
    ids.map((id) => ({ _type: "reference", _ref: id, _key: id }));

  // --- Home page sections ---
  await client.createOrReplace(
    heroDoc("homeHero", defaultHomePage.hero, { withVideo: true })
  );
  await client.createOrReplace({
    _id: "homeFocusAreas",
    _type: "homeFocusAreas",
    eyebrow: defaultHomePage.focusAreasEyebrow,
    title: defaultHomePage.focusAreasTitle,
    items: refsFor(focusAreaIds),
  });
  await client.createOrReplace({
    _id: "homeAbout",
    _type: "homeAbout",
    eyebrow: defaultHomePage.aboutEyebrow,
    title: defaultHomePage.aboutTitle,
    body: defaultHomePage.aboutBody,
    linkLabel: defaultHomePage.aboutLinkLabel,
    linkHref: defaultHomePage.aboutLinkHref,
    sidePanels: defaultHomePage.aboutSidePanels?.map((p, i) => ({
      _key: `panel-${i}`,
      title: p.title,
      body: p.body,
    })),
  });
  await client.createOrReplace({
    _id: "homeServices",
    _type: "homeServices",
    eyebrow: defaultHomePage.servicesEyebrow,
    title: defaultHomePage.servicesTitle,
    linkLabel: defaultHomePage.servicesLinkLabel,
    items: refsFor(serviceIds),
  });
  await client.createOrReplace({
    _id: "homePrograms",
    _type: "homePrograms",
    eyebrow: defaultHomePage.programsEyebrow,
    title: defaultHomePage.programsTitle,
    linkLabel: defaultHomePage.programsLinkLabel,
    items: refsFor(programIds),
  });
  await client.createOrReplace({
    _id: "homeStats",
    _type: "homeStats",
    eyebrow: defaultHomePage.statsEyebrow,
    title: defaultHomePage.statsTitle,
    subtitle: defaultHomePage.statsSubtitle,
    items: refsFor(statIds),
    linkLabel: defaultHomePage.statsLinkLabel,
  });
  await client.createOrReplace({
    _id: "homePartners",
    _type: "homePartners",
    eyebrow: defaultHomePage.partnersEyebrow,
    title: defaultHomePage.partnersTitle,
    subtitle: defaultHomePage.partnersSubtitle,
    items: refsFor(partnerTypeIds),
    ctaLabel: defaultHomePage.partnersCtaLabel,
  });
  if (defaultHomePage.finalCta) {
    await client.createOrReplace(
      finalCtaDoc("homeFinalCta", defaultHomePage.finalCta)
    );
  }

  // --- Secondary pages (hero + finalCta only) ---
  const secondaryPages = [
    ["about", defaultAboutPage],
    ["vision", defaultVisionPage],
    ["programs", defaultProgramsPage],
    ["impact", defaultImpactPage],
    ["services", defaultServicesPage],
    ["partners", defaultPartnersPage],
    ["contact", defaultContactPage],
  ] as const;

  for (const [pageId, page] of secondaryPages) {
    await client.createOrReplace(heroDoc(`${pageId}Hero`, page.hero));
    if (page.finalCta) {
      await client.createOrReplace(
        finalCtaDoc(`${pageId}FinalCta`, page.finalCta)
      );
    }
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
