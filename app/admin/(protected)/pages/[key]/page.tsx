import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import {
  AlertIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@/components/admin/icons";
import { libraryEntry } from "@/components/admin/library-catalog";
import { type Doc, getDocument, listDocuments } from "@/lib/admin/content";
import { PAGE_ROUTES } from "@/sanity/lib/routes";

type Props = { params: Promise<{ key: string }> };

export async function generateMetadata({ params }: Props) {
  const { key } = await params;
  const page = PAGE_ROUTES.find((entry) => entry.key === key);
  return { title: page ? `${page.title} page` : "Page not found" };
}

/**
 * Collapses a field value to a single readable line. Pipes are stripped
 * because headings use them to mark the words the site paints in the brand
 * colour — they are markup, not punctuation the editor should see here.
 */
function oneLine(value: string, max = 96): string {
  const text = value.replace(/\|/g, "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

const PREVIEW_KEYS = ["title", "heading", "eyebrow", "badge", "reasonsTitle", "formIntroTitle", "name"];

/**
 * A glance at what a section currently says, so the editor can find the one
 * they mean without opening each in turn.
 */
function previewOf(doc: Doc): string | null {
  for (const key of PREVIEW_KEYS) {
    const value = doc[key];
    if (typeof value === "string" && value.trim()) return oneLine(value);
  }
  const sections = doc.sections;
  if (Array.isArray(sections)) {
    return sections.length === 1 ? "1 content block" : `${sections.length} content blocks`;
  }
  return null;
}

export default async function PageSectionsScreen({ params }: Props) {
  await connection();

  const { key } = await params;
  const page = PAGE_ROUTES.find((entry) => entry.key === key);
  if (!page) notFound();

  const rows = await Promise.all(
    page.sections.map(async (section) => {
      if (section.kind === "list") {
        const docs = await listDocuments(section.schemaType);
        const live = docs.filter((doc) => doc.archived !== true).length;
        return {
          section,
          href: `/admin/library/${section.schemaType}`,
          preview:
            docs.length === 0
              ? "No items yet"
              : `${live === 1 ? "1 item" : `${live} items`} showing on the page`,
          isList: true,
          missing: false,
        };
      }
      const doc = await getDocument(section.id);
      return {
        section,
        href: `/admin/edit/${section.id}`,
        preview: doc ? previewOf(doc) : null,
        isList: false,
        missing: !doc,
      };
    })
  );

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <ArrowLeftIcon />
        Dashboard
      </Link>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{page.title} page</h1>
          <p className="mt-2 max-w-xl text-slate-600">
            Choose a section to edit. Saving puts the change on the live page immediately.
          </p>
        </div>
        <a
          href={page.route}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          View page
          <ExternalLinkIcon />
        </a>
      </header>

      <ul className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {rows.map((row) => {
          const entry = row.isList ? libraryEntry(row.section.schemaType) : undefined;
          if (row.missing) {
            return (
              <li key={row.section.id} className="flex items-start gap-4 bg-slate-50/60 p-5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <AlertIcon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-slate-500">{row.section.title}</span>
                  <span className="mt-1 block text-sm text-slate-500">
                    This section has not been created yet, so there is nothing to edit. It will
                    appear here once the content is seeded.
                  </span>
                </span>
              </li>
            );
          }

          return (
            <li key={row.section.id}>
              <Link
                href={row.href}
                className="group flex items-center gap-4 p-5 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-slate-900">{row.section.title}</span>
                    {row.isList ? (
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-700">
                        Collection
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-1 block truncate text-sm text-slate-500">
                    {row.preview ?? "Not filled in yet"}
                  </span>
                  {entry ? (
                    <span className="mt-1 block text-xs text-slate-400">{entry.blurb}</span>
                  ) : null}
                </span>
                <ChevronRightIcon className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
