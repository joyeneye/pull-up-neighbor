import { sanityFetch } from "@/sanity/lib/fetch";
import { servicesPageQuery, servicesLibraryQuery } from "@/sanity/lib/queries";
import { defaultServicesPage, defaultServices } from "@/lib/cms-defaults";
import type { ServiceItem, SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function ServicesPage() {
  const [pageResult, services] = await Promise.all([
    sanityFetch<SimplePageData>({ query: servicesPageQuery }),
    sanityFetch<ServiceItem[]>({ query: servicesLibraryQuery }),
  ]);
  const data = pageResult?.hero ? pageResult : defaultServicesPage;
  return <View data={data} services={services && services.length > 0 ? services : defaultServices} />;
}
