/** Shared types for page-builder section blocks. */

export type SectionBackground =
  | "white"
  | "slate-50"
  | "slate-900"
  | "brand-500";

export type RichTextBlock = {
  _type: "richTextBlock";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  alignment?: "left" | "center" | null;
  body?: string[] | null;
  background?: SectionBackground | null;
};

export type TwoColumnTextBlock = {
  _type: "twoColumnTextBlock";
  _key?: string;
  leftEyebrow?: string | null;
  leftTitle?: string | null;
  leftBody?: string[] | null;
  rightEyebrow?: string | null;
  rightTitle?: string | null;
  rightBody?: string[] | null;
  background?: SectionBackground | null;
};

export type IconCardGridCard = {
  icon?: string | null;
  title: string;
  description?: string | null;
  _key?: string;
};

export type IconCardGridBlock = {
  _type: "iconCardGridBlock";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  alignment?: "left" | "center" | null;
  columns?: 2 | 3 | 4 | null;
  cardLayout?: "icon-top" | "icon-left" | null;
  cards: IconCardGridCard[];
  background?: SectionBackground | null;
};

export type PillarCard = {
  icon?: string | null;
  title: string;
  description?: string | null;
  bullets?: string[] | null;
  _key?: string;
};

export type PillarCardsBlock = {
  _type: "pillarCardsBlock";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  alignment?: "left" | "center" | null;
  bulletLabel?: string | null;
  pillars: PillarCard[];
  background?: SectionBackground | null;
};

export type PhaseCard = {
  phase: string;
  title: string;
  status?: "Active" | "In Progress" | "Horizon" | "Complete" | null;
  description?: string | null;
  _key?: string;
};

export type PhaseCardsBlock = {
  _type: "phaseCardsBlock";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  phases: PhaseCard[];
  background?: SectionBackground | null;
};

export type StatCardItem = {
  icon?: string | null;
  value: string;
  label: string;
  _key?: string;
};

export type TextWithStatsBlock = {
  _type: "textWithStatsBlock";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  accentTail?: string | null;
  body?: string[] | null;
  stats: StatCardItem[];
  background?: SectionBackground | null;
};

export type QuoteSplitBlock = {
  _type: "quoteSplitBlock";
  _key?: string;
  leftEyebrow?: string | null;
  leftTitle?: string | null;
  leftBody?: string[] | null;
  rightEyebrow?: string | null;
  quote: string;
  quoteFooter?: string | null;
  background?: SectionBackground | null;
};

export type BrandedCalloutItem = {
  title: string;
  description?: string | null;
  _key?: string;
};

export type BrandedCalloutBlock = {
  _type: "brandedCalloutBlock";
  _key?: string;
  eyebrow?: string | null;
  title?: string | null;
  body?: string[] | null;
  items?: BrandedCalloutItem[] | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

export type Section =
  | RichTextBlock
  | TwoColumnTextBlock
  | IconCardGridBlock
  | PillarCardsBlock
  | PhaseCardsBlock
  | TextWithStatsBlock
  | QuoteSplitBlock
  | BrandedCalloutBlock;
