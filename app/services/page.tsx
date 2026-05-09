import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesPageQuery } from "@/sanity/lib/queries";
import { defaultServicesPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function ServicesPage() {
  const data = await sanityFetch<SimplePageData>({
    query: servicesPageQuery,
    tags: ["servicesPage"],
  });
  return <View data={data ?? defaultServicesPage} />;
}
