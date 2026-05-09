import { defineQuery } from "next-sanity";

const HERO_FRAGMENT = `
  badge,
  title,
  accentWords,
  subtitle,
  primaryCta,
  secondaryCta,
  "videoUrl": backgroundVideo.asset->url,
  "videoMimeType": backgroundVideo.asset->mimeType,
  videoPoster {
    ...,
    asset->{ url, metadata }
  }
`;

const FINAL_CTA_FRAGMENT = `
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  dark
`;

export const homePageQuery = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    hero { ${HERO_FRAGMENT} },
    focusAreasEyebrow,
    focusAreasTitle,
    focusAreas[]->{ _id, title, description, icon, displayOrder } | order(displayOrder asc),
    aboutEyebrow,
    aboutTitle,
    aboutBody,
    aboutLinkLabel,
    aboutLinkHref,
    aboutSidePanels,
    servicesEyebrow,
    servicesTitle,
    servicesLinkLabel,
    services[]->{ _id, title, description, icon, why, howToPartner, displayOrder } | order(displayOrder asc),
    programsEyebrow,
    programsTitle,
    programsLinkLabel,
    programs[]->{ _id, name, "slug": slug.current, tagline, description, pillars, color, displayOrder } | order(displayOrder asc),
    statsEyebrow,
    statsTitle,
    statsSubtitle,
    stats[]->{ _id, value, label, description, displayOrder } | order(displayOrder asc),
    statsLinkLabel,
    partnersEyebrow,
    partnersTitle,
    partnersSubtitle,
    partnerTypes[]->{ _id, type, description, icon, displayOrder } | order(displayOrder asc),
    partnersCtaLabel,
    finalCta { ${FINAL_CTA_FRAGMENT} }
  }
`);

function buildSimplePageQuery(type: string) {
  return defineQuery(`
    *[_type == "${type}" && _id == "${type}"][0] {
      hero { ${HERO_FRAGMENT} },
      finalCta { ${FINAL_CTA_FRAGMENT} }
    }
  `);
}

export const aboutPageQuery = buildSimplePageQuery("aboutPage");
export const visionPageQuery = buildSimplePageQuery("visionPage");
export const programsPageQuery = buildSimplePageQuery("programsPage");
export const impactPageQuery = buildSimplePageQuery("impactPage");
export const servicesPageQuery = buildSimplePageQuery("servicesPage");
export const partnersPageQuery = buildSimplePageQuery("partnersPage");
export const contactPageQuery = buildSimplePageQuery("contactPage");

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteTitle,
    tagline,
    contactEmail
  }
`);
