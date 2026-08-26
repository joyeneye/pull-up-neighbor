import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Always create a client (defineLive needs a non-null client at module load).
// If env is missing in build environments, fetches fail at runtime but the
// build itself doesn't crash — so say so at the top of the log rather than
// letting the site quietly serve hardcoded copy.
if (!projectId) {
  console.error(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is missing — the Sanity client is a placeholder and " +
      "no CMS content can load. Set it in the environment for this deployment."
  );
}

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl: "/studio" },
});
