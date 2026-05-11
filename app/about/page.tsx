import { sanityFetch } from "@/sanity/lib/fetch";
import { aboutPageQuery } from "@/sanity/lib/queries";
import { defaultAboutPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function AboutPage() {
  const result = await sanityFetch<SimplePageData>({ query: aboutPageQuery });
  const data = result?.hero ? result : defaultAboutPage;
  return <View data={data} />;
}
