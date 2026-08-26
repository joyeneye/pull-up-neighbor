import { sanityFetch } from "@/sanity/lib/fetch";
import { visionPageQuery } from "@/sanity/lib/queries";
import { defaultVisionPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function VisionPage() {
  const result = await sanityFetch<SimplePageData>({ query: visionPageQuery });
  const data = result?.hero ? result : defaultVisionPage;
  return <View data={data} />;
}
