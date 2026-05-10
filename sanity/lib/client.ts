import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

// Always create a client (defineLive needs a non-null client at module load).
// If env is missing in build environments, fetches fail at runtime but the
// build itself doesn't crash.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: { studioUrl: "/studio" },
});
