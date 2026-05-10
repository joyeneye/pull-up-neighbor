import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
};

/**
 * Calls Sanity's GROQ HTTP API via Next's native fetch so tag-based
 * revalidation actually works. The Sanity client uses its own HTTP
 * stack which Next's cache layer can't see, so client.fetch() with
 * next.tags is a no-op.
 */
export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tags = ["sanity"],
  revalidate = 60,
}: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) return null;

  const isDraft = (await draftMode().catch(() => null))?.isEnabled ?? false;
  const token = process.env.SANITY_API_READ_TOKEN;
  const useApiCdn = !isDraft;

  const host = useApiCdn ? "apicdn.sanity.io" : "api.sanity.io";
  const url = new URL(
    `https://${projectId}.${host}/v${apiVersion}/data/query/${dataset}`
  );
  url.searchParams.set("query", query);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(`$${k}`, JSON.stringify(v));
  }
  if (isDraft) {
    url.searchParams.set("perspective", "previewDrafts");
  }

  const headers: Record<string, string> = {};
  if (isDraft && token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(url.toString(), {
      headers,
      next: {
        tags,
        revalidate: isDraft ? 0 : revalidate === false ? false : revalidate,
      },
    });
    if (!response.ok) {
      console.error("[sanity] fetch failed", response.status, await response.text());
      return null;
    }
    const data = (await response.json()) as { result: T };
    return data.result;
  } catch (error) {
    console.error("[sanity] fetch error", error);
    return null;
  }
}
