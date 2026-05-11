import HomePageView from "@/components/HomePageView";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homePageQuery } from "@/sanity/lib/queries";
import { defaultHomePage } from "@/lib/cms-defaults";
import type { HomePageData } from "@/lib/cms-types";

type HomeQueryResult = {
  hero: HomePageData["hero"] | null;
  focusAreas: {
    eyebrow?: string | null;
    title?: string | null;
    items?: HomePageData["focusAreas"];
  } | null;
  about: {
    eyebrow?: string | null;
    title?: string | null;
    body?: string[] | null;
    linkLabel?: string | null;
    linkHref?: string | null;
    sidePanels?: HomePageData["aboutSidePanels"];
  } | null;
  services: {
    eyebrow?: string | null;
    title?: string | null;
    linkLabel?: string | null;
    items?: HomePageData["services"];
  } | null;
  programs: {
    eyebrow?: string | null;
    title?: string | null;
    linkLabel?: string | null;
    items?: HomePageData["programs"];
  } | null;
  stats: {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    items?: HomePageData["stats"];
    linkLabel?: string | null;
  } | null;
  partners: {
    eyebrow?: string | null;
    title?: string | null;
    subtitle?: string | null;
    items?: HomePageData["partnerTypes"];
    ctaLabel?: string | null;
  } | null;
  finalCta: HomePageData["finalCta"] | null;
};

function assemble(result: HomeQueryResult | null): HomePageData {
  if (!result || !result.hero) return defaultHomePage;
  return {
    hero: result.hero,
    focusAreasEyebrow: result.focusAreas?.eyebrow ?? null,
    focusAreasTitle: result.focusAreas?.title ?? null,
    focusAreas: result.focusAreas?.items ?? null,
    aboutEyebrow: result.about?.eyebrow ?? null,
    aboutTitle: result.about?.title ?? null,
    aboutBody: result.about?.body ?? null,
    aboutLinkLabel: result.about?.linkLabel ?? null,
    aboutLinkHref: result.about?.linkHref ?? null,
    aboutSidePanels: result.about?.sidePanels ?? null,
    servicesEyebrow: result.services?.eyebrow ?? null,
    servicesTitle: result.services?.title ?? null,
    servicesLinkLabel: result.services?.linkLabel ?? null,
    services: result.services?.items ?? null,
    programsEyebrow: result.programs?.eyebrow ?? null,
    programsTitle: result.programs?.title ?? null,
    programsLinkLabel: result.programs?.linkLabel ?? null,
    programs: result.programs?.items ?? null,
    statsEyebrow: result.stats?.eyebrow ?? null,
    statsTitle: result.stats?.title ?? null,
    statsSubtitle: result.stats?.subtitle ?? null,
    stats: result.stats?.items ?? null,
    statsLinkLabel: result.stats?.linkLabel ?? null,
    partnersEyebrow: result.partners?.eyebrow ?? null,
    partnersTitle: result.partners?.title ?? null,
    partnersSubtitle: result.partners?.subtitle ?? null,
    partnerTypes: result.partners?.items ?? null,
    partnersCtaLabel: result.partners?.ctaLabel ?? null,
    finalCta: result.finalCta ?? null,
  };
}

export default async function HomePage() {
  const result = await sanityFetch<HomeQueryResult>({ query: homePageQuery });
  return <HomePageView data={assemble(result)} />;
}
