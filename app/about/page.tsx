import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { defaultAboutPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function AboutPage() {
  const data = await sanityFetch<SimplePageData>({
    query: aboutPageQuery,
    tags: ["aboutPage"],
  });
  return <View data={data ?? defaultAboutPage} />;
}
