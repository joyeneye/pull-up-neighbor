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

  // --- Secondary pages (hero + finalCta + page-builder body) ---
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
    // Seed an empty pageBody so the document exists when the editor
    // opens "Body Sections" in Studio. Migration of bespoke content
    // into builder sections is done in seedAboutBody/etc. below.
    const existing = await client.getDocument(`${pageId}Body`).catch(() => null);
    if (!existing) {
      await client.createOrReplace({
        _id: `${pageId}Body`,
        _type: "pageBody",
        sections: [],
      });
    }
  }

  // --- Seed Vision's bespoke sections ---
  await client.createOrReplace({
    _id: "visionBody",
    _type: "pageBody",
    sections: [
      {
        _key: "vision-statement",
        _type: "quoteSplitBlock",
        leftEyebrow: "The Big Picture",
        leftTitle: "Not Just a Nonprofit. |A Systems Change Engine.|",
        leftBody: [
          "The problems PUN addresses — housing insecurity, financial exclusion, civic disenfranchisement — are not accidents. They are the predictable outcomes of systems designed without underserved communities in mind.",
          "Direct service is essential. We'll never stop distributing meals, registering voters, or placing families in housing. But we refuse to accept that these problems are permanent. Our vision is a future where the systems themselves work differently — where housing is accessible, financial mobility is real, and civic participation is universal.",
          "That's why everything PUN builds — every program, every partnership, every data point — is designed to contribute to systems change, not just symptom relief.",
        ],
        rightEyebrow: "Our Vision",
        quote:
          "A world where the communities that have been most excluded from opportunity are the ones leading the way forward.",
        quoteFooter:
          "This is not a tagline. It is a commitment that shapes every decision PUN makes — who we partner with, how we measure impact, and what we build next.",
        background: "white",
      },
      {
        _key: "vision-pillars",
        _type: "pillarCardsBlock",
        eyebrow: "Strategic Pillars",
        title: "Three Pillars. One Vision.",
        subtitle:
          "PUN's long-term vision is organized around three interconnected pillars — each essential, each reinforcing the others.",
        alignment: "center",
        bulletLabel: "2030 Goals",
        background: "slate-50",
        pillars: [
          {
            _key: "pillar-housing",
            icon: "Home",
            title: "Housing as Infrastructure",
            description:
              "Stable housing is the foundation of everything else — education, employment, civic participation, health. PUN's vision is a future where every family has access to dignified, affordable housing — not as a product of the market, but as a right supported by real infrastructure.",
            bullets: [
              "10,000 affordable units in the pipeline by 2030",
              "Community land trust partnerships in 10 major cities",
              "First-time homeownership pathways for 50,000 families",
            ],
          },
          {
            _key: "pillar-econ",
            icon: "TrendingUp",
            title: "Economic Empowerment at Scale",
            description:
              "Financial literacy is the foundation of generational wealth. PUN's vision is a world where every young person in an underserved community enters adulthood equipped with the financial knowledge to build a life — not just survive one.",
            bullets: [
              "Next Gen Money in 500 schools by 2028",
              "The Wealth Playbook in 200 cities",
              "10,000 new community-based businesses launched through our programs",
            ],
          },
          {
            _key: "pillar-civic",
            icon: "Vote",
            title: "Civic Power for Underserved Communities",
            description:
              "Democracy only works when everyone participates. PUN's vision is a future where no community is systematically excluded from the political process — where voter access, civic education, and community mobilization have permanently shifted the power dynamic.",
            bullets: [
              "VoteHub deployed in all 50 states",
              "500,000 voters registered through our programs",
              "Civic education reaching 1M+ community members annually",
            ],
          },
        ],
      },
      {
        _key: "vision-phases",
        _type: "phaseCardsBlock",
        eyebrow: "The Journey",
        title: "From Direct Service to Systems Change",
        subtitle:
          "PUN operates across multiple phases simultaneously — delivering direct service today while building the infrastructure for systems change tomorrow.",
        background: "slate-900",
        phases: [
          {
            _key: "ph-1",
            phase: "Phase 1",
            title: "Direct Service",
            status: "Active",
            description:
              "Building community trust through consistent, high-quality direct service — meals, housing navigation, voter registration, financial education. This is our foundation and will never stop.",
          },
          {
            _key: "ph-2",
            phase: "Phase 2",
            title: "Infrastructure Building",
            status: "Active",
            description:
              "Developing the programs, systems, and partnerships that scale our impact beyond direct service — VoteHub, The Wealth Playbook, affordable housing pipelines, and disaster response capacity.",
          },
          {
            _key: "ph-3",
            phase: "Phase 3",
            title: "Policy Influence",
            status: "In Progress",
            description:
              "Using our data, our track record, and our community relationships to influence the policy decisions that shape community outcomes — housing policy, civic access, financial regulation.",
          },
          {
            _key: "ph-4",
            phase: "Phase 4",
            title: "Systems Change",
            status: "Horizon",
            description:
              "A future where the systems PUN has been filling the gaps of — housing, finance, civic participation — are restructured to serve everyone. That's the horizon we're building toward.",
          },
        ],
      },
      {
        _key: "vision-future-goals",
        _type: "iconCardGridBlock",
        eyebrow: "Looking Ahead",
        title: "Where We're Going by 2030",
        alignment: "left",
        columns: 4,
        cardLayout: "icon-top",
        background: "white",
        cards: [
          {
            _key: "fg-cities",
            icon: "Globe",
            title: "500+ Cities",
            description:
              "Expanding our program footprint to 500+ cities within the next five years.",
          },
          {
            _key: "fg-housing",
            icon: "Home",
            title: "10,000 Housing Units",
            description:
              "10,000 affordable units in active development pipelines by 2030.",
          },
          {
            _key: "fg-civic",
            icon: "Layers",
            title: "National Civic Tech Platform",
            description:
              "VoteHub deployed in all 50 states as a permanent civic infrastructure.",
          },
          {
            _key: "fg-capital",
            icon: "Target",
            title: "$100M in Community Capital",
            description:
              "Mobilizing $100M in impact capital for community infrastructure by 2030.",
          },
        ],
      },
      {
        _key: "vision-capital",
        _type: "brandedCalloutBlock",
        eyebrow: "For Capital & Investment Partners",
        title:
          "The Vision Requires Capital Partners Who Think Long-Term",
        body: [
          "Systems change doesn't happen on grant cycles. PUN is actively seeking capital and investment partners willing to make multi-year commitments to community infrastructure — and who understand that patient capital produces the highest social returns.",
          "We are building housing pipelines, civic technology, and economic empowerment programs designed to generate both social impact and long-term financial viability. If you manage impact capital, we should talk.",
        ],
        items: [
          {
            _key: "ci-housing",
            title: "Affordable Housing Investment",
            description:
              "Co-invest in affordable housing development with community ownership built in.",
          },
          {
            _key: "ci-tech",
            title: "Civic Technology Expansion",
            description:
              "Fund VoteHub's expansion to new states and communities as a permanent civic infrastructure.",
          },
          {
            _key: "ci-econ",
            title: "Economic Mobility Programs",
            description:
              "Capitalize Next Gen Money and The Wealth Playbook for national scale.",
          },
          {
            _key: "ci-ops",
            title: "Operational Infrastructure",
            description:
              "Build PUN's capacity to deploy faster, in more cities, with greater impact.",
          },
        ],
        ctaLabel: "Connect With Our Team",
        ctaHref: "/contact",
      },
    ],
  });

  // --- Seed About's bespoke sections into the page builder ---
  await client.createOrReplace({
    _id: "aboutBody",
    _type: "pageBody",
    sections: [
      {
        _key: "about-mission",
        _type: "twoColumnTextBlock",
        leftEyebrow: "Our Mission",
        leftTitle: "A Platform, Not a Program",
        leftBody: [
          "Pull Up Neighbor was founded on a simple but radical premise: the communities that need the most resources are the ones most often excluded from the rooms where decisions are made. We exist to close that gap — not with handouts, but with infrastructure.",
          "We operate across five interconnected pillars — housing, disaster recovery, civic engagement, youth empowerment, and strategic partnerships — because no single issue exists in isolation. A family without stable housing can't vote reliably. A young person without financial literacy can't build generational wealth. A community without civic participation can't advocate for the resources it needs.",
          "PUN connects those dots. We are the bridge between the community and the capital it deserves — and the platform through which brands, foundations, cities, and institutions can show up in ways that actually matter.",
        ],
        rightEyebrow: "The PUN Difference",
        rightTitle: "We're an Ecosystem Builder",
        rightBody: [
          "Most nonprofits are built around a single program. PUN is built around a community — and an ecosystem of programs, partnerships, and relationships that reinforce each other.",
          "When we run a disaster response operation, we're also registering voters, distributing financial literacy materials, and connecting families to housing resources. That integration is intentional. It's how we produce outcomes instead of activities.",
          "Our partners don't just write checks — they co-create. They gain community credibility, program access, and impact data in exchange for capital that goes directly into operations proven to work.",
        ],
        background: "white",
      },
      {
        _key: "about-why-different",
        _type: "iconCardGridBlock",
        eyebrow: "Why PUN Is Different",
        title: "Three Things That Set Us Apart",
        subtitle:
          "Thousands of organizations work in underserved communities. Very few operate at the intersection of all three pillars that drive lasting change.",
        alignment: "center",
        columns: 3,
        cardLayout: "icon-top",
        background: "slate-50",
        cards: [
          {
            _key: "platform-thinking",
            icon: "Lightbulb",
            title: "Platform Thinking",
            description:
              "We don't run isolated programs — we build systems. Each initiative connects to the others, creating compounding impact that a single-service model can never achieve. Our infrastructure is designed to scale alongside our partners.",
          },
          {
            _key: "community-trust",
            icon: "Users",
            title: "Community Trust",
            description:
              "Trust is the most scarce resource in community work. We've built it over years of consistent presence, cultural fluency, and keeping our promises. That trust is what makes our programs effective — and what our partners are accessing when they work with us.",
          },
          {
            _key: "measurable-impact",
            icon: "BarChart3",
            title: "Measurable Impact",
            description:
              "We track everything. Meals distributed. Voters registered. Families housed. Vaccines administered. Our partners know exactly what their investment produced — because accountability isn't optional in our model, it's built in.",
          },
        ],
      },
      {
        _key: "about-values",
        _type: "iconCardGridBlock",
        eyebrow: "Our Values",
        title: "What We Stand On",
        alignment: "left",
        columns: 2,
        cardLayout: "icon-left",
        background: "white",
        cards: [
          {
            _key: "radical-presence",
            icon: "Heart",
            title: "Radical Presence",
            description:
              "We show up before the crisis, during it, and long after the cameras leave. Presence is the foundation of trust.",
          },
          {
            _key: "outcomes-over-optics",
            icon: "Target",
            title: "Outcomes Over Optics",
            description:
              "We measure success in families housed, voters registered, and meals delivered — not press releases or photo opportunities.",
          },
          {
            _key: "systems-thinking",
            icon: "Lightbulb",
            title: "Systems Thinking",
            description:
              "We build programs and partnerships designed to outlast us — because sustainable change requires infrastructure, not charity.",
          },
          {
            _key: "cultural-integrity",
            icon: "Star",
            title: "Cultural Integrity",
            description:
              "Community trust is earned through cultural fluency, not marketing. We speak the language of the neighborhoods we serve.",
          },
        ],
      },
      {
        _key: "about-approach",
        _type: "textWithStatsBlock",
        eyebrow: "Our Approach",
        title: "We Don't Just Serve Communities.",
        accentTail: "We Build With Them.",
        body: [
          "Every program, every partnership, every activation is designed with community input — not just for community consumption. The people we serve are our collaborators, not our beneficiaries.",
          "This approach takes longer. It requires deeper relationships and higher standards of accountability. But it produces outcomes that last — because the community is invested in them, not just receiving them.",
        ],
        stats: [
          { _key: "s-1", icon: "Shield", value: "100+", label: "Cities Reached" },
          { _key: "s-2", icon: "Users", value: "1M+", label: "Lives Impacted" },
          { _key: "s-3", icon: "Heart", value: "10M+", label: "Meals Distributed" },
          { _key: "s-4", icon: "Target", value: "100K+", label: "Voters Registered" },
        ],
        background: "slate-900",
      },
    ],
  });

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
