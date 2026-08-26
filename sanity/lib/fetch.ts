import type { QueryParams } from "next-sanity";
import { isCorsOriginError } from "next-sanity";
import { liveFetch, SanityLive } from "./live";
import { isSanityConfigured, projectId } from "../env";

export { SanityLive };

type FetchOptions = {
  query: string;
  params?: QueryParams;
};

let warnedNotConfigured = false;

/**
 * Wraps next-sanity's defineLive sanityFetch with our existing T | null
 * return contract so call sites stay clean. Going through liveFetch
 * means <SanityLive /> sees these queries and the iframe inside Studio
 * can refresh in real time as drafts change.
 *
 * Returning null on failure is deliberate — pages fall back to
 * lib/cms-defaults.ts so a CMS outage degrades instead of 500ing. The cost is
 * that a broken connection looks exactly like a healthy site serving old copy,
 * which is how a blocked origin went unnoticed here for months. So every
 * failure now logs loudly, and names the fix when it can.
 */
export async function sanityFetch<T = unknown>({
  query,
  params = {},
}: FetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    if (!warnedNotConfigured) {
      warnedNotConfigured = true;
      console.error(
        "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Every page is rendering hardcoded " +
          "fallback copy from lib/cms-defaults.ts and NOTHING the CMS contains will appear."
      );
    }
    return null;
  }

  try {
    const result = await liveFetch({ query, params });
    return (result as { data: T | null }).data ?? null;
  } catch (error) {
    if (isCorsOriginError(error)) {
      console.error(
        "[sanity] This deployment's origin is not on the allowed-origins list for Sanity project " +
          `${projectId}. The site is serving fallback copy instead of live content. ` +
          `Fix: https://sanity.io/manage/project/${projectId}/api`,
        error
      );
    } else {
      console.error(
        "[sanity] fetch failed — serving fallback copy from lib/cms-defaults.ts instead of live content",
        { query: query.slice(0, 120) },
        error
      );
    }
    return null;
  }
}
