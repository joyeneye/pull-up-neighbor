import { defineQuery } from "next-sanity";

const HERO_FIELDS = `
  badge,
  title,
  accentWords,
  subtitle,
  primaryCta,
  secondaryCta,
  "videoUrl": backgroundVideo.asset->url,
  "videoMimeType": backgroundVideo.asset->mimeType,
  "videoPoster": backgroundVideoPoster {
    asset->{ url, metadata }
  }
`;

const FINAL_CTA_FIELDS = `
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  dark
`;

export const homePageQuery = defineQuery(`{
  "hero": *[_id == "homeHero"][0] { ${HERO_FIELDS} },
  "focusAreas": *[_id == "homeFocusAreas"][0] {
    "eyebrow": eyebrow,
    "title": title,
    "items": items[]->{ _id, title, description, icon, displayOrder } | order(displayOrder asc)
  },
  "about": *[_id == "homeAbout"][0] {
    "eyebrow": eyebrow,
    "title": title,
    "body": body,
    "linkLabel": linkLabel,
    "linkHref": linkHref,
    "sidePanels": sidePanels
  },
  "services": *[_id == "homeServices"][0] {
    "eyebrow": eyebrow,
    "title": title,
    "linkLabel": linkLabel,
    "items": items[]->{ _id, title, description, icon, why, howToPartner, displayOrder } | order(displayOrder asc)
  },
  "programs": *[_id == "homePrograms"][0] {
    "eyebrow": eyebrow,
    "title": title,
    "linkLabel": linkLabel,
    "items": items[]->{ _id, name, "slug": slug.current, tagline, description, pillars, color, displayOrder } | order(displayOrder asc)
  },
  "stats": *[_id == "homeStats"][0] {
    "eyebrow": eyebrow,
    "title": title,
    "subtitle": subtitle,
    "items": items[]->{ _id, value, label, description, displayOrder } | order(displayOrder asc),
    "linkLabel": linkLabel
  },
  "partners": *[_id == "homePartners"][0] {
    "eyebrow": eyebrow,
    "title": title,
    "subtitle": subtitle,
    "items": items[]->{ _id, type, description, icon, displayOrder } | order(displayOrder asc),
    "ctaLabel": ctaLabel
  },
  "finalCta": *[_id == "homeFinalCta"][0] { ${FINAL_CTA_FIELDS} }
}`);

function buildSimplePageQuery(heroId: string, finalCtaId: string) {
  return defineQuery(`{
    "hero": *[_id == "${heroId}"][0] { ${HERO_FIELDS} },
    "finalCta": *[_id == "${finalCtaId}"][0] { ${FINAL_CTA_FIELDS} }
  }`);
}

export const aboutPageQuery = buildSimplePageQuery("aboutHero", "aboutFinalCta");
export const visionPageQuery = buildSimplePageQuery("visionHero", "visionFinalCta");
export const programsPageQuery = buildSimplePageQuery("programsHero", "programsFinalCta");
export const impactPageQuery = buildSimplePageQuery("impactHero", "impactFinalCta");
export const servicesPageQuery = buildSimplePageQuery("servicesHero", "servicesFinalCta");
export const partnersPageQuery = buildSimplePageQuery("partnersHero", "partnersFinalCta");
export const contactPageQuery = buildSimplePageQuery("contactHero", "contactFinalCta");

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteTitle,
    tagline,
    contactEmail
  }
`);
