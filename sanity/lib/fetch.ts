import type { QueryParams } from "next-sanity";
import { liveFetch, SanityLive } from "./live";
import { isSanityConfigured } from "../env";

export { SanityLive };

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
};

/**
 * Wraps next-sanity's defineLive sanityFetch with our existing T | null
 * return contract so call sites stay clean. Going through liveFetch
 * means <SanityLive /> sees these queries and the iframe inside Studio
 * can refresh in real time as drafts change.
 */
export async function sanityFetch<T = unknown>({
  query,
  params = {},
}: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) return null;
  try {
    const result = await liveFetch({ query, params });
    return ((result as { data: T | null }).data ?? null);
  } catch (error) {
    console.error("[sanity] fetch failed", error);
    return null;
  }
}
