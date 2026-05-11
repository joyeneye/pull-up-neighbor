import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";
import { defaultContactPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function ContactPage() {
  const result = await sanityFetch<SimplePageData>({ query: contactPageQuery });
  const data = result?.hero ? result : defaultContactPage;
  return <View data={data} />;
}
