import { sanityFetch } from "@/sanity/lib/fetch";
import { inActionPageQuery, inActionItemsQuery } from "@/sanity/lib/queries";
import { defaultInActionPage } from "@/lib/cms-defaults";
import type { SimplePageData } from "@/lib/cms-types";
import { detectEmbedPlatform, type InActionItem } from "@/lib/in-action-types";
import View from "./view";

/**
 * Vimeo has no predictable thumbnail URL (unlike YouTube), so resolve it via
 * the public oEmbed endpoint. Cached for a day to avoid a request per render.
 */
async function fetchVimeoThumbnail(url: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}&width=1280`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { thumbnail_url?: string };
    return data.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

async function withVimeoThumbnails(items: InActionItem[]): Promise<InActionItem[]> {
  return Promise.all(
    items.map(async (item) => {
      if (item.thumbnailUrl || detectEmbedPlatform(item.embedUrl) !== "vimeo") {
        return item;
      }
      const thumbnailUrl = await fetchVimeoThumbnail(item.embedUrl as string);
      return thumbnailUrl ? { ...item, thumbnailUrl } : item;
    })
  );
}

export default async function InActionPage() {
  const [pageResult, items] = await Promise.all([
    sanityFetch<SimplePageData>({ query: inActionPageQuery }),
    sanityFetch<InActionItem[]>({ query: inActionItemsQuery }),
  ]);
  const data = pageResult?.hero ? pageResult : defaultInActionPage;
  const enrichedItems = await withVimeoThumbnails(items ?? []);
  return <View data={data} items={enrichedItems} />;
}
