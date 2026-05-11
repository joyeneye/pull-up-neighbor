import { sanityFetch } from "@/sanity/lib/fetch";
import { partnersPageQuery } from "@/sanity/lib/queries";
import { defaultPartnersPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function PartnersPage() {
  const result = await sanityFetch<SimplePageData>({ query: partnersPageQuery });
  const data = result?.hero ? result : defaultPartnersPage;
  return <View data={data} />;
}
