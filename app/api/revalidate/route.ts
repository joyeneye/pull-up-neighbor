import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const SECRET = process.env.SANITY_REVALIDATE_SECRET;

const TYPE_TO_TAGS: Record<string, string[]> = {
  homePage: ["homePage"],
  aboutPage: ["aboutPage"],
  visionPage: ["visionPage"],
  programsPage: ["programsPage"],
  impactPage: ["impactPage"],
  servicesPage: ["servicesPage"],
  partnersPage: ["partnersPage"],
  contactPage: ["contactPage"],
  siteSettings: ["siteSettings"],
  // Reusable docs touch every page that references them — be aggressive
  program: ["homePage", "programsPage"],
  service: ["homePage", "servicesPage"],
  focusArea: ["homePage"],
  stat: ["homePage", "impactPage"],
  partnerType: ["homePage", "partnersPage"],
};

export async function POST(req: NextRequest) {
  if (!SECRET) {
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

  let payload: { _type?: string };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const type = payload._type;
  if (!type) {
    return NextResponse.json({ ok: false, error: "Missing _type" }, { status: 400 });
  }

  const tags = TYPE_TO_TAGS[type] ?? [];
  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ ok: true, revalidated: tags });
}
