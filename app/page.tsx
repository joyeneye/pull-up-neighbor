import HomePageView from "@/components/HomePageView";
import { sanityFetch } from "@/sanity/lib/fetch";
import { homePageQuery } from "@/sanity/lib/queries";
import { defaultHomePage } from "@/lib/cms-defaults";
import type { HomePageData } from "@/lib/cms-types";

export default async function HomePage() {
  const data = await sanityFetch<HomePageData>({
    query: homePageQuery,
    tags: ["homePage", "program", "service", "focusArea", "stat", "partnerType"],
  });
  return <HomePageView data={data ?? defaultHomePage} />;
}
