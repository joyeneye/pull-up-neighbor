"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";
import { createClient } from "@sanity/client";
import { revalidateSyncTags as revalidateSyncTagsAction } from "next-sanity/live/server-actions";

const DEBOUNCE_MS = 800;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-05-09";

type SyncTag = Parameters<typeof revalidateSyncTagsAction>[0][number];

/**
 * Replaces next-sanity's <SanityLive /> with a debounced equivalent.
 * Multiple Live API events that arrive within 800ms collapse into a
 * single revalidateTag + router.refresh — so a video upload (asset
 * doc + parent doc patch + any progress mutations) produces one
 * iframe refresh at the end, not three flashes during.
 */
export default function DebouncedSanityLive() {
  const router = useRouter();
  const pendingTags = useRef<Set<SyncTag>>(new Set());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const client = useMemo(() => {
    if (!projectId) return null;
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
    });
  }, []);

  useEffect(() => {
    if (!client) return;
    const subscription = client.live
      .events({ tag: "next-loader.live" })
      .subscribe({
        next: (event) => {
          if (event.type !== "message") return;
          for (const t of event.tags) pendingTags.current.add(t);
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(async () => {
            const flushed = Array.from(pendingTags.current);
            pendingTags.current.clear();
            try {
              const result = await revalidateSyncTagsAction(flushed);
              if (result === "refresh") {
                startTransition(() => router.refresh());
              }
            } catch (err) {
              console.error("[live] revalidate failed", err);
            }
          }, DEBOUNCE_MS);
        },
      });
    return () => subscription.unsubscribe();
  }, [client, router]);

  return null;
}
