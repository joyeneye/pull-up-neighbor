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
  },
  "backgroundImage": backgroundImage {
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

// For body sections that reference partnershipModel docs, dereference them.
const BODY_SECTIONS = `sections[]{
  ...,
  _type == "partnershipModelGridBlock" => {
    ...,
    "models": models[]->{ _id, title, description, investment, timeframe, displayOrder } | order(displayOrder asc)
  }
}`;

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

function buildPageWithBodyQuery(
  heroId: string,
  bodyId: string,
  finalCtaId: string
) {
  return defineQuery(`{
    "hero": *[_id == "${heroId}"][0] { ${HERO_FIELDS} },
    "sections": *[_id == "${bodyId}"][0].${BODY_SECTIONS},
    "finalCta": *[_id == "${finalCtaId}"][0] { ${FINAL_CTA_FIELDS} }
  }`);
}

export const aboutPageQuery = buildPageWithBodyQuery("aboutHero", "aboutBody", "aboutFinalCta");
export const visionPageQuery = buildPageWithBodyQuery("visionHero", "visionBody", "visionFinalCta");
export const programsPageQuery = buildPageWithBodyQuery("programsHero", "programsBody", "programsFinalCta");
export const impactPageQuery = buildPageWithBodyQuery("impactHero", "impactBody", "impactFinalCta");
export const servicesPageQuery = buildPageWithBodyQuery("servicesHero", "servicesBody", "servicesFinalCta");
export const partnersPageQuery = buildPageWithBodyQuery("partnersHero", "partnersBody", "partnersFinalCta");
export const contactPageQuery = buildPageWithBodyQuery("contactHero", "contactBody", "contactFinalCta");
export const inActionPageQuery = buildPageWithBodyQuery("inActionHero", "inActionBody", "inActionFinalCta");

export const inActionItemsQuery = defineQuery(`
  *[_type == "inActionItem"] | order(featured desc, date desc, displayOrder asc) {
    _id,
    title,
    description,
    category,
    date,
    mediaType,
    "embedUrl": coalesce(embedUrl, youtubeUrl),
    "videoUrl": video.asset->url,
    "imageUrl": image.asset->url,
    "thumbnailUrl": thumbnail.asset->url,
    featured
  }
`);

export const programsLibraryQuery = defineQuery(`
  *[_type == "program"] | order(displayOrder asc) {
    _id, name, "slug": slug.current, tagline, icon, description,
    mission, pillars, impact, partnerOpportunity, color,
    "backgroundImageUrl": backgroundImage.asset->url
  }
`);

export const servicesLibraryQuery = defineQuery(`
  *[_type == "service"] | order(displayOrder asc) {
    _id, title, "slug": slug.current, icon, description,
    why, howToPartner, bullets,
    "backgroundImageUrl": backgroundImage.asset->url
  }
`);

export const contactFormSectionQuery = defineQuery(`
  *[_id == "contactFormSection"][0] {
    reasonsHeading,
    reasonsTitle,
    reasons,
    partnerTypesHeading,
    partnerTypes,
    directContactHeading,
    email,
    directContactNote,
    responseTimeHeading,
    responseTimeBody,
    formIntroTitle,
    formIntroSubtitle
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    siteTitle,
    tagline,
    contactEmail
  }
`);
