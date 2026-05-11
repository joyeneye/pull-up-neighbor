import { sanityFetch } from "@/sanity/lib/fetch";
import { inActionPageQuery, inActionItemsQuery } from "@/sanity/lib/queries";
import { defaultInActionPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import type { InActionItem } from "@/lib/in-action-types";
import View from "./view";

export default async function InActionPage() {
  const [pageResult, items] = await Promise.all([
    sanityFetch<SimplePageData>({ query: inActionPageQuery }),
    sanityFetch<InActionItem[]>({ query: inActionItemsQuery }),
  ]);
  const data = pageResult?.hero ? pageResult : defaultInActionPage;
  return <View data={data} items={items ?? []} />;
}
