import type {
  FocusAreaItem,
  HomePageData,
  PartnerTypeItem,
  ProgramItem,
  ServiceItem,
  SimplePageData,
  StatItem,
} from "./cms-types";

export const defaultFocusAreas: FocusAreaItem[] = [
  { title: "Housing", icon: "Home", description: "Creating pathways to affordable, stable, dignified housing for underserved communities." },
  { title: "Disaster Recovery", icon: "Shield", description: "Rapid, coordinated relief operations that reach the people government systems miss." },
  { title: "Civic Engagement", icon: "Vote", description: "Rebuilding trust between communities and institutions through voter access and civic participation." },
  { title: "Youth Empowerment", icon: "Users", description: "Equipping the next generation with financial literacy, leadership tools, and economic vision." },
  { title: "Partnerships", icon: "Handshake", description: "Connecting mission-aligned brands, foundations, and institutions with real community infrastructure." },
];

export const defaultServices: ServiceItem[] = [
  {
    title: "Affordable Housing Development",
    slug: "housing",
    icon: "Building2",
    description:
      "PUN operates as a community-centered housing partner — working alongside developers, municipal agencies, CDFIs, and foundations to create affordable housing pipelines that actually reach the families who need them most.",
    why:
      "The affordable housing crisis is not a shortage of good intentions — it's a shortage of trusted operators who can move capital into communities at scale. PUN bridges the gap between institutional resources and community-level trust.",
    howToPartner:
      "Developers and financial institutions can engage PUN as a community co-developer, resident outreach partner, or pipeline coordinator. Cities and CDFIs can contract us for community-based housing access programming.",
    bullets: [
      "Community needs assessment and site analysis",
      "Resident outreach and placement services",
      "Affordable unit pipeline development",
      "Tenant advocacy and housing navigation",
      "Land acquisition partnerships",
      "Co-development with mission-aligned developers",
    ],
  },
  {
    title: "Disaster Response & Recovery",
    slug: "disaster",
    icon: "Shield",
    description:
      "When disaster strikes, PUN deploys — with meals, supply kits, wellness services, and long-term rebuilding support. We maintain standing operational capacity specifically designed for rapid community-level response.",
    why:
      "Government and traditional aid organizations are essential but often slow to reach the most isolated or distressed communities. PUN operates on the ground, through local networks, with the cultural credibility to go where other organizations can't.",
    howToPartner:
      "Corporate partners can sponsor specific relief activations or fund our standing emergency response capacity. Foundations can support our year-round operational infrastructure. City agencies can engage us as a rapid-response community contractor.",
    bullets: [
      "Rapid meal distribution operations",
      "Emergency supply kit deployment",
      "Community wellness and health services",
      "Coordination with local faith and civic institutions",
      "Long-term rebuilding and case management",
      "Volunteer coordination and logistics",
    ],
  },
  {
    title: "Community Engagement & Brand Integration",
    slug: "community",
    icon: "Megaphone",
    description:
      "PUN gives brands, sports organizations, and institutions authentic access to underserved communities through co-created activations, events, and programs that generate real impact — and real brand equity.",
    why:
      "Community trust is the rarest and most valuable asset in marketing. It cannot be bought — but it can be earned through authentic partnership with trusted community operators.",
    howToPartner:
      "Brands can sponsor activations, co-create community events, fund programs, or integrate their products and services into PUN's existing community touchpoints.",
    bullets: [
      "Community event co-creation and production",
      "Brand activation through community programs",
      "Culturally resonant content development",
      "Ambassador and ambassador program development",
      "Impact measurement and storytelling",
      "Sports and entertainment community tie-ins",
    ],
  },
];

export const defaultPrograms: ProgramItem[] = [
  {
    name: "VoteHub",
    slug: "votehub",
    icon: "Vote",
    tagline: "Civic technology for voter access",
    description:
      "VoteHub is PUN's civic technology platform designed to eliminate structural barriers to voter participation for underserved communities. From registration to election day, VoteHub provides the tools, information, and support that ensure every eligible voter can exercise their right.",
    mission:
      "To make civic participation as accessible as possible for communities that have historically been disenfranchised — not just through registration, but through sustained civic education and mobilization.",
    pillars: ["Voter Registration Technology", "Civic Education", "Poll Access", "Community Mobilization"],
    impact: [
      "100,000+ voters registered",
      "150,000+ community members mobilized",
      "Deployed in 100+ cities",
    ],
    partnerOpportunity:
      "Foundations and civic-minded corporations can sponsor VoteHub deployments in specific cities or communities. We can also work with employers to run voter registration programs for their workforces.",
    color: "from-slate-800 to-slate-900",
  },
  {
    name: "Next Gen Money",
    slug: "nextgenmoney",
    icon: "DollarSign",
    tagline: "Financial literacy for young leaders",
    description:
      "Next Gen Money is a financial literacy program built specifically for high school and college-aged youth — designed to be culturally relevant, practical, and immediately actionable. Students learn credit, saving, investing, and entrepreneurship through the lens of their own communities and aspirations.",
    mission:
      "To break the generational cycle of financial illiteracy by giving young people the knowledge, tools, and mindset to build wealth — before they make the mistakes that cost them decades.",
    pillars: ["Credit & Debt", "Saving & Investing", "Entrepreneurship", "Career Finance"],
    impact: [
      "Deployed in schools and community centers nationwide",
      "Thousands of youth graduates annually",
      "Industry partnerships for internship and career pathways",
    ],
    partnerOpportunity:
      "Financial institutions, banks, and consumer brands can sponsor program delivery. Employers can fund workforce pipeline components. Foundations can support expansion to underserved school districts.",
    color: "from-brand-800 to-slate-900",
  },
  {
    name: "The Wealth Playbook",
    slug: "wealthplaybook",
    icon: "BookOpen",
    tagline: "Economic mobility for families and communities",
    description:
      "The Wealth Playbook is PUN's adult financial empowerment curriculum — a comprehensive program that moves families from financial survival to financial strategy. Delivered in community centers, churches, and workplaces, it covers credit building, homeownership, business formation, and investment fundamentals.",
    mission:
      "To give every community member the knowledge and tools to build a financial life — not just manage their money, but grow it, protect it, and pass it on.",
    pillars: ["Credit Building", "Homeownership Prep", "Business Development", "Wealth Building"],
    impact: [
      "Delivered across dozens of cities",
      "Connected participants to homebuying programs",
      "Spawned dozens of community-based businesses",
    ],
    partnerOpportunity:
      "Banks and CDFIs can sponsor Wealth Playbook cohorts and connect graduates to their own financial products. Real estate developers can fund homeownership tracks. Corporations can offer it as a workforce benefit.",
    color: "from-slate-700 to-slate-900",
  },
  {
    name: "Affordable Housing Initiative",
    slug: "housing",
    icon: "Home",
    tagline: "Housing access as a community right",
    description:
      "The Affordable Housing Initiative is PUN's comprehensive approach to expanding access to stable, dignified housing for underserved communities. We operate across the entire housing spectrum — from tenant advocacy and navigation services to co-development of affordable units and land acquisition partnerships.",
    mission:
      "To make affordable, stable housing a real option — not a lottery — for families in the communities we serve, through advocacy, development partnerships, and direct housing access programming.",
    pillars: ["Tenant Advocacy", "Housing Navigation", "Affordable Unit Pipeline", "Co-Development"],
    impact: [
      "Hundreds of families placed in stable housing",
      "Active development partnerships in multiple cities",
      "Tenant advocacy serving thousands",
    ],
    partnerOpportunity:
      "Developers can partner with us as a community co-developer or outreach partner. Cities can contract us for housing access programming. Foundations can fund tenant advocacy and housing navigation services.",
    color: "from-slate-800 to-brand-900",
  },
  {
    name: "Disaster Response & Recovery Initiative",
    slug: "disaster",
    icon: "Shield",
    tagline: "Rapid relief. Long-term rebuilding.",
    description:
      "The Disaster Response & Recovery Initiative is PUN's standing operational capacity for community-level disaster relief. We maintain the infrastructure, relationships, and logistics to deploy rapidly when communities are in crisis — with meals, supply kits, wellness services, and long-term rebuilding support that doesn't stop when the headlines do.",
    mission:
      "To ensure that no community faces a disaster alone — and that the relief provided is fast, culturally competent, and sustained long enough to actually help families rebuild.",
    pillars: ["Rapid Meal Distribution", "Supply Kit Deployment", "Community Health", "Long-term Rebuilding"],
    impact: [
      "10M+ meals distributed",
      "2M+ supply kits deployed",
      "15,000+ vaccinations administered",
      "Activated in disasters across the country",
    ],
    partnerOpportunity:
      "Corporate partners can sponsor relief activations or fund standing capacity. Foundations can support year-round operational readiness. City agencies can pre-position PUN as a rapid-response community contractor.",
    color: "from-slate-900 to-slate-700",
  },
];

export const defaultStats: StatItem[] = [
  { value: "1M+", label: "People Reached", description: "Across programs and activations" },
  { value: "100+", label: "Cities Served", description: "Nationwide community presence" },
  { value: "10M+", label: "Meals Distributed", description: "Through disaster response ops" },
  { value: "2M+", label: "Supply Kits Deployed", description: "During relief activations" },
  { value: "100K+", label: "Voters Registered", description: "Through VoteHub and civic programs" },
  { value: "150K+", label: "Community Members Mobilized", description: "For civic action" },
  { value: "15K+", label: "Vaccinations Administered", description: "Community health activations" },
];

export const defaultPartnerTypes: PartnerTypeItem[] = [
  { type: "Brand Partners", icon: "Globe", description: "Consumer brands that want authentic community access, culturally resonant activation, and purpose-driven storytelling." },
  { type: "Foundations", icon: "BookOpen", description: "Philanthropic institutions looking for proven operators with measurable community impact and systems-level thinking." },
  { type: "Sports Teams & Leagues", icon: "Users", description: "Sports organizations that want to move beyond charity work and into genuine, lasting community investment." },
  { type: "Developers & CDFIs", icon: "Building2", description: "Real estate developers and financial institutions building affordable housing pipelines and community capital." },
  { type: "City & Government", icon: "DollarSign", description: "Municipal agencies seeking trusted community partners for outreach, services, and civic engagement programs." },
  { type: "Strategic Investors", icon: "Layers", description: "Impact investors and family offices ready to deploy capital into community infrastructure that generates returns — social and financial." },
];

export const defaultHomePage: HomePageData = {
  hero: {
    badge: "Community. Capital. Culture.",
    title: "Where Community, Capital & Culture Converge",
    accentWords: ["Capital", "Culture"],
    subtitle:
      "Pull Up Neighbor transforms underserved communities through affordable housing development, disaster recovery, civic engagement, and youth empowerment — powered by strategic partnerships that move at the speed of need.",
    primaryCta: { label: "Explore Services", href: "/services" },
    secondaryCta: { label: "Partner With Us", href: "/contact" },
    videoUrl: "/hero/pun-hero.mp4",
    videoMimeType: "video/mp4",
    videoPoster: { asset: { url: "/hero/pun-hero-poster.jpg" } },
  },
  focusAreasEyebrow: "What We Do",
  focusAreasTitle: "Five Focus Areas. One Mission.",
  focusAreas: defaultFocusAreas,
  aboutEyebrow: "Who We Are",
  aboutTitle: "More Than a Nonprofit. |A Platform for Change.|",
  aboutBody: [
    "Pull Up Neighbor isn't a charity with a single program. We are a community infrastructure platform — operating at the intersection of grassroots trust, strategic capital, and cultural relevance.",
    "We build, we convene, we execute. Whether it's placing families in affordable housing, running disaster relief operations, or registering 100,000 voters, we show up with strategy, not just intention.",
  ],
  aboutLinkLabel: "Learn About PUN",
  aboutLinkHref: "/about",
  aboutSidePanels: [
    { title: "Platform Thinking", body: "We don't deliver one-off services. We build systems, programs, and partnerships that compound over time." },
    { title: "Community Trust", body: "Our relationships are built over years of showing up — before the crisis, during it, and long after the cameras leave." },
    { title: "Measurable Impact", body: "Every dollar, every activation, every program is tracked against real community outcomes — not optics." },
  ],
  servicesEyebrow: "What We Offer",
  servicesTitle: "Services Built for Scale",
  servicesLinkLabel: "View All Services",
  services: defaultServices,
  programsEyebrow: "Our Programs",
  programsTitle: "Five Programs. Thousands of Lives.",
  programsLinkLabel: "All Programs",
  programs: defaultPrograms,
  statsEyebrow: "Our Impact",
  statsTitle: "Numbers That Don't Lie",
  statsSubtitle:
    "Behind every statistic is a family served, a vote cast, a meal delivered, a life stabilized.",
  stats: defaultStats,
  statsLinkLabel: "View Full Impact Report",
  partnersEyebrow: "Partnerships",
  partnersTitle: "The Partner of Choice for Organizations That Mean It",
  partnersSubtitle:
    "We don't do photo-op partnerships. We build infrastructure, co-create programs, and deliver outcomes — with partners who are serious about community impact.",
  partnerTypes: defaultPartnerTypes,
  partnersCtaLabel: "Explore Partnership Models",
  finalCta: {
    eyebrow: "Get Involved",
    title: "Ready to Build Something That Lasts?",
    description: "Great communities don't happen by accident. They're built by organizations willing to commit to something real. Let's talk about what that looks like for you.",
    primaryCta: { label: "Start the Conversation", href: "/contact" },
    secondaryCta: { label: "View Our Work", href: "/impact" },
    dark: false,
  },
};

export const defaultAboutPage: SimplePageData = {
  hero: {
    badge: "About PUN",
    title: "Built at the Intersection of Community, Capital & Culture",
    accentWords: ["Community,", "Capital", "Culture"],
    subtitle:
      "Pull Up Neighbor is not a charity with a catchy name. We are a community infrastructure platform — combining grassroots credibility, strategic capital, and cultural relevance to drive outcomes that endure.",
    primaryCta: { label: "Explore Our Work", href: "/services" },
    secondaryCta: { label: "Partner With Us", href: "/contact" },
  },
  finalCta: {
    eyebrow: "Join the Movement",
    title: "Become a Partner",
    description:
      "If you're serious about community impact — not just community presence — we should talk. PUN is the partner that turns your mission into momentum.",
    primaryCta: { label: "Start the Conversation", href: "/contact" },
    secondaryCta: { label: "View Our Programs", href: "/programs" },
    dark: false,
  },
};

export const defaultVisionPage: SimplePageData = {
  hero: {
    badge: "Our Vision",
    title: "The Horizon We're Building Toward",
    accentWords: ["Horizon"],
    subtitle:
      "PUN exists to solve today's community crises. But our real goal is to build systems that make those crises less likely — and less devastating — for the next generation.",
    primaryCta: { label: "Invest in the Vision", href: "/contact" },
    secondaryCta: { label: "View Our Impact", href: "/impact" },
  },
  finalCta: {
    eyebrow: "Build With Us",
    title: "The Future We're Building Needs You",
    description:
      "Whether you're a funder, a builder, a civic leader, or an organization with mission and capital — PUN has a place for you in the work. Let's talk about what that looks like.",
    primaryCta: { label: "Start the Conversation", href: "/contact" },
    secondaryCta: { label: "View Our Programs", href: "/programs" },
    dark: false,
  },
};

export const defaultProgramsPage: SimplePageData = {
  hero: {
    badge: "Our Programs",
    title: "Five Programs. One Ecosystem.",
    accentWords: ["Ecosystem."],
    subtitle:
      "PUN's programs don't operate in silos — they reinforce each other. Housing, civic engagement, financial literacy, and disaster relief work together because the communities we serve need them to.",
    primaryCta: { label: "Partner With a Program", href: "/contact" },
    secondaryCta: { label: "View Services", href: "/services" },
  },
  finalCta: {
    eyebrow: "Get Involved",
    title: "Find the Program That Fits Your Mission",
    description:
      "Every PUN program has multiple pathways for partnership — funding, co-creation, sponsorship, or capacity building. Let's find the right fit for your organization.",
    primaryCta: { label: "Talk to Our Team", href: "/contact" },
    secondaryCta: { label: "View Our Services", href: "/services" },
    dark: false,
  },
};

export const defaultImpactPage: SimplePageData = {
  hero: {
    badge: "Our Impact",
    title: "Numbers That Tell the Truth",
    accentWords: ["Truth"],
    subtitle:
      "Every statistic represents a real person — a family housed, a vote cast, a meal delivered, a young person equipped with knowledge they didn't have before. This is what community infrastructure actually looks like.",
    primaryCta: { label: "Partner With Us", href: "/contact" },
    secondaryCta: { label: "View Programs", href: "/programs" },
  },
  finalCta: {
    eyebrow: "Join the Impact",
    title: "Your Partnership Becomes Part of This Story",
    description:
      "Every statistic on this page was made possible by organizations willing to invest in real community infrastructure. Your partnership adds to this legacy — and your name stands behind outcomes that matter.",
    primaryCta: { label: "Become a Partner", href: "/contact" },
    secondaryCta: { label: "View Partnership Models", href: "/partners" },
    dark: false,
  },
};

export const defaultServicesPage: SimplePageData = {
  hero: {
    badge: "Our Services",
    title: "Community Impact at Scale",
    accentWords: ["Scale"],
    subtitle:
      "Six service areas. One integrated approach. PUN delivers real community outcomes — not programs on paper, but operations on the ground, backed by relationships built over years.",
    primaryCta: { label: "Partner With Us", href: "/contact" },
    secondaryCta: { label: "View Programs", href: "/programs" },
  },
  finalCta: {
    eyebrow: "Ready to Work Together?",
    title: "Let's Build Something Real",
    description:
      "Whether you're a brand, foundation, city, or developer — PUN has the infrastructure, the relationships, and the proven track record to make your community investment count.",
    primaryCta: { label: "Start the Conversation", href: "/contact" },
    secondaryCta: { label: "View Our Impact", href: "/impact" },
    dark: false,
  },
};

export const defaultPartnersPage: SimplePageData = {
  hero: {
    badge: "Partnerships",
    title: "Built for Organizations That Mean It",
    accentWords: ["Mean It"],
    subtitle:
      "PUN doesn't do photo-op partnerships. We build infrastructure, co-create programs, and deliver outcomes — with partners who are serious about community impact and ready to invest accordingly.",
    primaryCta: { label: "Explore a Partnership", href: "/contact" },
    secondaryCta: { label: "View Our Impact", href: "/impact" },
  },
  finalCta: {
    eyebrow: "Let's Build Together",
    title: "Ready to Make Your Community Investment Count?",
    description:
      "The best time to build community trust was years ago. The second best time is now. PUN gives you the infrastructure, the relationships, and the track record to make your investment matter.",
    primaryCta: { label: "Contact Our Team", href: "/contact" },
    secondaryCta: { label: "View Our Impact", href: "/impact" },
    dark: false,
  },
};

export const defaultInActionPage: SimplePageData = {
  hero: {
    badge: "PUN In Action",
    title: "See the Work, Not Just the Words.",
    accentWords: ["the Work"],
    subtitle:
      "Photos, films, and shorts from the ground — community events, voter drives, disaster relief, financial literacy classes, and the partnerships that power them.",
    primaryCta: { label: "Partner With Us", href: "/contact" },
    secondaryCta: { label: "View Our Impact", href: "/impact" },
  },
  finalCta: {
    eyebrow: "See Something You'd Sponsor?",
    title: "Let's Build the Next One Together.",
    description:
      "These activations happen because partners step up. Tell us what you want to see more of, and we'll build it.",
    primaryCta: { label: "Start the Conversation", href: "/contact" },
    secondaryCta: { label: "View Programs", href: "/programs" },
    dark: false,
  },
};

export const defaultContactPage: SimplePageData = {
  hero: {
    badge: "Partner With PUN",
    title: "Let's Build Something Real",
    accentWords: ["Something Real"],
    subtitle:
      "Whether you represent a brand, a foundation, a city, or an investment firm — if you're serious about community impact, we want to talk. Fill out the form and our team will be in touch within 2 business days.",
    primaryCta: { label: "Send Us a Message", href: "#contact-form" },
  },
  finalCta: {
    eyebrow: "Already Know What You Want?",
    title: "Let's Skip the Small Talk",
    description:
      "If you're ready to commit to a partnership conversation — not just an exploratory email — tell us that in your message. We'll prioritize getting you in front of the right people immediately.",
    primaryCta: { label: "Send Us a Message", href: "#contact-form" },
    dark: true,
  },
};
