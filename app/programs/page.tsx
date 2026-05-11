import { sanityFetch } from "@/sanity/lib/fetch";
import { programsPageQuery } from "@/sanity/lib/queries";
import { defaultProgramsPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function ProgramsPage() {
  const result = await sanityFetch<SimplePageData>({ query: programsPageQuery });
  const data = result?.hero ? result : defaultProgramsPage;
  return <View data={data} />;
}
