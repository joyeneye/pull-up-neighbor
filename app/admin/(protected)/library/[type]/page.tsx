import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArrowLeftIcon, LibraryIcon } from "@/components/admin/icons";
import LibraryRowActions from "@/components/admin/LibraryRowActions";
import { libraryEntry, shownOn } from "@/components/admin/library-catalog";
import NewDocumentButton from "@/components/admin/NewDocumentButton";
import { type AdminType, type Doc, getType, listDocuments } from "@/lib/admin/content";

type Props = { params: Promise<{ type: string }> };

export async function generateMetadata({ params }: Props) {
  const { type } = await params;
  const entry = libraryEntry(type);
  const schemaType = getType(type);
  const name = entry?.plural ?? schemaType?.title;
  return { title: name ?? "Library" };
}

const LABEL_KEYS = ["name", "title", "label", "type", "value"];
const SUMMARY_KEYS = ["description", "tagline", "subtitle", "mission", "value", "investment"];

const MEDIA_LABELS: Record<string, string> = {
  embed: "Video link",
  upload: "Uploaded video",
  image: "Photo",
};

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/** Pipes mark accent words for the public site; they are noise in a list. */
function truncate(value: string, max: number): string {
  const clean = value.replace(/\|/g, "").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean;
}

function labelOf(doc: Doc, schemaType: AdminType): string {
  for (const key of LABEL_KEYS) {
    const value = text(doc[key]);
    if (value) return truncate(value, 90);
  }
  return `Untitled ${schemaType.title.toLowerCase()}`;
}

function summaryOf(doc: Doc): string | null {
  for (const key of SUMMARY_KEYS) {
    const value = text(doc[key]);
    if (value) return truncate(value, 140);
  }
  return null;
}

function chipsOf(doc: Doc): string[] {
  const chips: string[] = [];
  const category = text(doc.category);
  if (category) chips.push(category);
  const mediaType = text(doc.mediaType);
  if (mediaType) chips.push(MEDIA_LABELS[mediaType] ?? mediaType);
  const timeframe = text(doc.timeframe);
  if (timeframe) chips.push(timeframe);
  if (doc.featured === true) chips.push("Featured");
  return chips;
}

/** The field a brand-new item should get its starter name in. */
function labelField(schemaType: AdminType): string | null {
  for (const key of LABEL_KEYS) {
    if (schemaType.fields.some((field) => field.name === key)) return key;
  }
  return null;
}

function Row({
  doc,
  schemaType,
  archived,
}: {
  doc: Doc;
  schemaType: AdminType;
  archived: boolean;
}) {
  const label = labelOf(doc, schemaType);
  const summary = summaryOf(doc);
  const chips = chipsOf(doc);
  const order = typeof doc.displayOrder === "number" ? doc.displayOrder : null;

  return (
    <li className={archived ? "bg-slate-50/70" : "bg-white"}>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <Link
            href={`/admin/edit/${doc._id}`}
            className={`rounded-sm font-semibold transition hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
              archived ? "text-slate-500" : "text-slate-900"
            }`}
          >
            {label}
          </Link>
          {summary ? (
            <p className={`mt-1 text-sm ${archived ? "text-slate-400" : "text-slate-500"}`}>
              {summary}
            </p>
          ) : null}
          {chips.length > 0 || order !== null ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {chip}
                </span>
              ))}
              {order !== null ? (
                <span className="text-[11px] font-medium text-slate-400">Order {order}</span>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap items-start gap-2 sm:justify-end">
          <Link
            href={`/admin/edit/${doc._id}`}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Edit<span className="sr-only"> {label}</span>
          </Link>
          <LibraryRowActions id={doc._id} label={label} archived={archived} />
        </div>
      </div>
    </li>
  );
}

export default async function LibraryScreen({ params }: Props) {
  await connection();

  const { type } = await params;
  const schemaType = getType(type);
  if (!schemaType) notFound();

  const entry = libraryEntry(type);
  const heading = entry?.plural ?? schemaType.title;
  const singular = entry?.singular ?? schemaType.title.toLowerCase();
  const where = shownOn(type);

  const docs = await listDocuments(type);
  const live = docs.filter((doc) => doc.archived !== true);
  const archived = docs.filter((doc) => doc.archived === true);

  const nameField = labelField(schemaType);
  const hasOrder = schemaType.fields.some((field) => field.name === "displayOrder");
  const orders = docs.map((doc) => (typeof doc.displayOrder === "number" ? doc.displayOrder : 0));
  const defaults: Record<string, unknown> = {};
  if (nameField) defaults[nameField] = `New ${singular}`;
  if (hasOrder) defaults.displayOrder = (orders.length > 0 ? Math.max(...orders) : 0) + 1;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <ArrowLeftIcon />
        Dashboard
      </Link>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{heading}</h1>
          {entry ? <p className="mt-2 text-slate-600">{entry.blurb}</p> : null}
          <p className="mt-2 text-sm text-slate-500">
            Archiving hides an item from the site without deleting it — you can restore it at any
            time. Items appear on the site in the order shown here; change an item&rsquo;s display
            order to move it.
          </p>
        </div>
        <NewDocumentButton type={type} label={`New ${singular}`} defaults={defaults} />
      </header>

      <p className="mt-6 text-sm text-slate-500">
        {live.length === 1 ? "1 item live" : `${live.length} items live`}
        {archived.length > 0 ? ` · ${archived.length} archived` : ""}
        {where ? ` · ${where}` : ""}
      </p>

      {docs.length === 0 ? (
        <div className="mt-4 flex flex-col items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <LibraryIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="font-semibold text-slate-900">Nothing here yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Add your first {singular} and it will appear on the site as soon as you save it.
            </p>
          </div>
          <NewDocumentButton type={type} label={`New ${singular}`} defaults={defaults} />
        </div>
      ) : (
        <>
          {live.length > 0 ? (
            <ul className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              {live.map((doc) => (
                <Row key={doc._id} doc={doc} schemaType={schemaType} archived={false} />
              ))}
            </ul>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
              <p className="font-semibold text-slate-900">Everything here is archived</p>
              <p className="mt-1 text-sm text-slate-500">
                Nothing from this library is showing on the site right now. Restore an item below,
                or add a new {singular}.
              </p>
            </div>
          )}

          {archived.length > 0 ? (
            <section className="mt-10" aria-labelledby="archived-heading">
              <h2 id="archived-heading" className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Archived
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Hidden from the site, kept here in case you want them back.
              </p>
              <ul className="mt-3 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200">
                {archived.map((doc) => (
                  <Row key={doc._id} doc={doc} schemaType={schemaType} archived />
                ))}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
