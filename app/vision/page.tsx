import { sanityFetch } from "@/sanity/lib/fetch";
import { visionPageQuery } from "@/sanity/lib/queries";
import { defaultVisionPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import View from "./view";

export default async function VisionPage() {
  const data = await sanityFetch<SimplePageData>({
    query: visionPageQuery,
    tags: ["visionPage"],
  });
  return <View data={data ?? defaultVisionPage} />;
}
