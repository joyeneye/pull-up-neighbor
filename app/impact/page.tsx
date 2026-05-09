import { sanityFetch } from "@/sanity/lib/fetch";
import { impactPageQuery } from "@/sanity/lib/queries";
import { defaultImpactPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function ImpactPage() {
  const data = await sanityFetch<SimplePageData>({
    query: impactPageQuery,
    tags: ["impactPage"],
  });
  return <View data={data ?? defaultImpactPage} />;
}
