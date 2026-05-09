export type Cta = { label: string; href: string };

export type SanityImageField = {
  asset?: { url?: string; metadata?: unknown } | null;
} | null;

export type HeroContent = {
  badge?: string | null;
  title: string;
  accentWords?: string[] | null;
  subtitle: string;
  primaryCta: Cta;
  secondaryCta?: Cta | null;
  videoUrl?: string | null;
  videoMimeType?: string | null;
  videoPoster?: SanityImageField;
};

export type FinalCtaContent = {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  primaryCta: Cta;
  secondaryCta?: Cta | null;
  dark?: boolean | null;
};

export type FocusAreaItem = {
  _id?: string;
  title: string;
  description: string;
  icon: string;
};

export type ServiceItem = {
  _id?: string;
  title: string;
  icon: string;
  description: string;
  why?: string | null;
  howToPartner?: string | null;
};

export type ProgramItem = {
  _id?: string;
  name: string;
  slug?: string | null;
  tagline: string;
  description: string;
  pillars?: string[] | null;
  color?: string | null;
};

export type StatItem = {
  _id?: string;
  value: string;
  label: string;
  description?: string | null;
};

export type PartnerTypeItem = {
  _id?: string;
  type: string;
  icon: string;
  description: string;
};

export type SidePanel = { title: string; body: string };

export type HomePageData = {
  hero: HeroContent;
  focusAreasEyebrow?: string | null;
  focusAreasTitle?: string | null;
  focusAreas?: FocusAreaItem[] | null;
  aboutEyebrow?: string | null;
  aboutTitle?: string | null;
  aboutBody?: string[] | null;
  aboutLinkLabel?: string | null;
  aboutLinkHref?: string | null;
  aboutSidePanels?: SidePanel[] | null;
  servicesEyebrow?: string | null;
  servicesTitle?: string | null;
  servicesLinkLabel?: string | null;
  services?: ServiceItem[] | null;
  programsEyebrow?: string | null;
  programsTitle?: string | null;
  programsLinkLabel?: string | null;
  programs?: ProgramItem[] | null;
  statsEyebrow?: string | null;
  statsTitle?: string | null;
  statsSubtitle?: string | null;
  stats?: StatItem[] | null;
  statsLinkLabel?: string | null;
  partnersEyebrow?: string | null;
  partnersTitle?: string | null;
  partnersSubtitle?: string | null;
  partnerTypes?: PartnerTypeItem[] | null;
  partnersCtaLabel?: string | null;
  finalCta?: FinalCtaContent | null;
};

export type SimplePageData = {
  hero: HeroContent;
  finalCta?: FinalCtaContent | null;
};
