import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesPageQuery } from "@/sanity/lib/queries";
import { defaultServicesPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function ServicesPage() {
  const result = await sanityFetch<SimplePageData>({ query: servicesPageQuery });
  const data = result?.hero ? result : defaultServicesPage;
  return <View data={data} />;
}
