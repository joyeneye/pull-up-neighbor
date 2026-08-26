import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { routesForDocument } from "@/sanity/lib/routes";

const SECRET = process.env.SANITY_REVALIDATE_SECRET;

/**
 * Sanity calls this on every publish. It must map the published document to
 * the page(s) that render it and revalidate those paths.
 *
 * Two things this route got wrong before, both silent:
 *
 * 1. It matched on _type against names like "homePage" and "aboutPage" that
 *    do not exist in the schema. Every hero, body and CTA edit produced an
 *    empty match, revalidated nothing, and still returned 200 — so Sanity's
 *    delivery log showed green while the site stayed stale until the 60s ISR
 *    window lapsed.
 * 2. _type cannot identify a page at all: eight heroes share
 *    _type == "pageHero" and eight bodies share "pageBody". The page queries
 *    key on _id, so the webhook has to as well.
 *
 * Now it matches on _id first (via the shared table in sanity/lib/routes.ts),
 * falls back to _type for library documents, and returns 422 when a document
 * maps to nothing — so the next unmapped schema type shows up red in Sanity
 * instead of disappearing.
 */
export async function POST(req: NextRequest) {
  if (!SECRET) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET is not set — publishes cannot revalidate");
    return NextResponse.json(
      { ok: false, error: "Server misconfigured: missing SANITY_REVALIDATE_SECRET" },
      { status: 500 }
    );
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const body = await req.text();

  if (!signature || !(await isValidSignature(body, signature, SECRET))) {
    return NextResponse.json({ ok: false, error: "Invalid signature" }, { status: 401 });
  }

  let payload: { _id?: string; _type?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { _id: id, _type: type } = payload;

  if (!id && !type) {
    return NextResponse.json(
      { ok: false, error: "Payload must include _id or _type" },
      { status: 400 }
    );
  }

  const routes = routesForDocument(id, type);

  if (routes.length === 0) {
    // Loud on purpose. A document nobody mapped is a bug in routes.ts, and a
    // 200 here is how this class of failure stayed invisible for months.
    console.warn("[revalidate] unmapped document — nothing revalidated", { id, type });
    return NextResponse.json(
      { ok: false, error: "Unmapped document", _id: id, _type: type },
      { status: 422 }
    );
  }

  for (const route of routes) {
    revalidatePath(route);
  }

  console.log("[revalidate] ok", { id, type, routes });
  return NextResponse.json({ ok: true, revalidated: routes, _id: id, _type: type });
}
