export type ContactPartnerTile = {
  icon?: string | null;
  label: string;
  _key?: string;
};

export type ContactFormSectionData = {
  reasonsHeading?: string | null;
  reasonsTitle?: string | null;
  reasons?: string[] | null;
  partnerTypesHeading?: string | null;
  partnerTypes?: ContactPartnerTile[] | null;
  directContactHeading?: string | null;
  email?: string | null;
  directContactNote?: string | null;
  responseTimeHeading?: string | null;
  responseTimeBody?: string | null;
  formIntroTitle?: string | null;
  formIntroSubtitle?: string | null;
};

export const defaultContactFormSection: ContactFormSectionData = {
  reasonsHeading: "Is This For You?",
  reasonsTitle: "Reach Out If...",
  reasons: [
    "You want authentic community access — not just a logo placement.",
    "You have capital and want to put it where it produces real outcomes.",
    "You're building or investing in affordable housing and need a trusted community operator.",
    "You believe in civic participation as a fundamental right and want to help fund it.",
    "You're a sports organization ready to move beyond charity into community investment.",
    "You run a foundation looking for a proven operator with transparent impact reporting.",
  ],
  partnerTypesHeading: "We Work With",
  partnerTypes: [
    { icon: "Globe", label: "Brand Partners" },
    { icon: "BookOpen", label: "Foundations" },
    { icon: "Users", label: "Sports Teams & Leagues" },
    { icon: "Building2", label: "Developers & CDFIs" },
    { icon: "DollarSign", label: "City & Government" },
    { icon: "Layers", label: "Strategic Investors" },
  ],
  directContactHeading: "Direct Contact",
  email: "hello@pullupneighbor.org",
  directContactNote:
    "For press inquiries, media requests, or speaking engagements, please indicate your needs in the message field.",
  responseTimeHeading: "Response Time",
  responseTimeBody:
    "Our team responds to all partnership inquiries within 2 business days. For urgent matters, indicate the time sensitivity in your message.",
  formIntroTitle: "Tell Us About Your Organization",
  formIntroSubtitle:
    "The more context you share, the better we can prepare for our first conversation.",
};
