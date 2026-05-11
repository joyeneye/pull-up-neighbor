import { sanityFetch } from "@/sanity/lib/fetch";
import { impactPageQuery } from "@/sanity/lib/queries";
import { defaultImpactPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function ImpactPage() {
  const result = await sanityFetch<SimplePageData>({ query: impactPageQuery });
  const data = result?.hero ? result : defaultImpactPage;
  return <View data={data} />;
}
