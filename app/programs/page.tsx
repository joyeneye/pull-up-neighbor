import { sanityFetch } from "@/sanity/lib/fetch";
import { programsPageQuery, programsLibraryQuery } from "@/sanity/lib/queries";
import { defaultProgramsPage, defaultPrograms } from "@/lib/cms-defaults";
import type { ProgramItem, SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function ProgramsPage() {
  const [pageResult, programs] = await Promise.all([
    sanityFetch<SimplePageData>({ query: programsPageQuery }),
    sanityFetch<ProgramItem[]>({ query: programsLibraryQuery }),
  ]);
  const data = pageResult?.hero ? pageResult : defaultProgramsPage;
  return <View data={data} programs={programs && programs.length > 0 ? programs : defaultPrograms} />;
}
