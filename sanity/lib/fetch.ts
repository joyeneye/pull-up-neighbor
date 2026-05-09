import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "../env";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
};

export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tags = ["sanity"],
  revalidate = 60,
}: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured || !client) {
    return null;
  }
  const isDraft = (await draftMode().catch(() => null))?.isEnabled ?? false;
  const token = process.env.SANITY_API_READ_TOKEN;
  try {
    return await client.fetch<T>(query, params, {
      perspective: isDraft && token ? "previewDrafts" : "published",
      ...(isDraft && token ? { token } : {}),
      next: {
        revalidate: isDraft ? 0 : revalidate === false ? undefined : revalidate,
        tags,
      },
    });
  } catch (error) {
    console.error("[sanity] fetch failed", error);
    return null;
  }
}
