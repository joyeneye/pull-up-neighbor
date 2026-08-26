import Link from "next/link";
import { connection } from "next/server";
import type { ReactNode } from "react";
import { ArrowLeftIcon, InboxIcon, MailIcon } from "@/components/admin/icons";
import InquiryStatusControl, { type StatusChoice } from "@/components/admin/InquiryStatusControl";
import { type Doc, getType, listInquiries } from "@/lib/admin/content";

export const metadata = { title: "Inquiries" };

type Props = { searchParams: Promise<{ [key: string]: string | string[] | undefined }> };

const FALLBACK_CHOICES: StatusChoice[] = [
  { title: "New", value: "new" },
  { title: "Read", value: "read" },
  { title: "Replied", value: "replied" },
  { title: "Archived", value: "archived" },
];

// The organization runs on Eastern time, so timestamps are shown there rather
// than in whatever zone the server happens to be in.
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/New_York",
});

function text(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isNew(doc: Doc): boolean {
  const status = text(doc.status);
  return !status || status === "new";
}

function relative(date: Date): string | null {
  const diff = Date.now() - date.getTime();
  if (diff < 0) return null;
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 31) return `${days} day${days === 1 ? "" : "s"} ago`;
  return null;
}

function submitted(doc: Doc): { absolute: string; relative: string | null } | null {
  const raw = text(doc.submittedAt) ?? text(doc._createdAt);
  if (!raw) return null;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;
  return { absolute: DATE_FORMAT.format(date), relative: relative(date) };
}

function Tab({ href, active, children }: { href: string; active: boolean; children: ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-2 rounded-md px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function InquiriesScreen({ searchParams }: Props) {
  await connection();

  const params = await searchParams;
  const rawFilter = params.filter;
  const filter = Array.isArray(rawFilter) ? rawFilter[0] : rawFilter;
  const showAll = filter === "all";

  const inquiries = await listInquiries(!showAll);
  const newCount = showAll ? inquiries.filter(isNew).length : inquiries.length;

  const statusChoices =
    getType("contactSubmission")?.fields.find((field) => field.name === "status")?.choices ??
    FALLBACK_CHOICES;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-500 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        <ArrowLeftIcon />
        Dashboard
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inquiries</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Everything sent through the contact form on the website. Set a status as you work
          through them — it saves as soon as you choose it.
        </p>
      </header>

      <nav
        aria-label="Filter inquiries"
        className="mt-6 inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm"
      >
        <Tab href="/admin/inquiries" active={!showAll}>
          New
          {newCount > 0 ? (
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                showAll ? "bg-brand-100 text-brand-800" : "bg-white/20 text-white"
              }`}
            >
              {newCount}
            </span>
          ) : null}
        </Tab>
        <Tab href="/admin/inquiries?filter=all" active={showAll}>
          All
        </Tab>
      </nav>

      {inquiries.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <InboxIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="font-semibold text-slate-900">
              {showAll ? "No inquiries yet" : "You are all caught up"}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
              {showAll
                ? "When someone fills in the contact form on the website, their message lands here."
                : "Nothing new to read. Everything that has come in is under All."}
            </p>
          </div>
          {showAll ? null : (
            <Link
              href="/admin/inquiries?filter=all"
              className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              See all inquiries
            </Link>
          )}
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {inquiries.map((doc) => {
            const name = text(doc.name) ?? "Someone";
            const organization = text(doc.organization);
            const email = text(doc.email);
            const partnershipType = text(doc.partnershipType);
            const message = text(doc.message);
            const notes = text(doc.notes);
            const when = submitted(doc);
            const unread = isNew(doc);

            return (
              <li
                key={doc._id}
                className={`overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md ${
                  unread ? "border-slate-200 border-l-4 border-l-brand-500" : "border-slate-200"
                }`}
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="flex flex-wrap items-center gap-2 text-lg font-semibold text-slate-900">
                      {name}
                      {unread ? (
                        <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-700">
                          New
                        </span>
                      ) : null}
                    </h2>
                    {organization ? (
                      <p className="mt-0.5 text-sm text-slate-600">{organization}</p>
                    ) : null}
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      {email ? (
                        <a
                          href={`mailto:${email}`}
                          className="inline-flex items-center gap-1.5 rounded-sm font-medium text-brand-700 underline decoration-brand-200 underline-offset-4 transition hover:decoration-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                        >
                          <MailIcon className="h-3.5 w-3.5" />
                          {email}
                        </a>
                      ) : (
                        <span className="text-slate-400">No email address given</span>
                      )}
                      {partnershipType ? (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                          {partnershipType}
                        </span>
                      ) : null}
                    </div>
                    {when ? (
                      <p className="mt-2 text-xs text-slate-400">
                        {when.absolute}
                        {when.relative ? ` · ${when.relative}` : ""}
                      </p>
                    ) : null}
                  </div>

                  <InquiryStatusControl
                    id={doc._id}
                    subject={name}
                    status={text(doc.status) ?? "new"}
                    choices={statusChoices}
                  />
                </div>

                <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4">
                  {message ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                      {message}
                    </p>
                  ) : (
                    <p className="text-sm italic text-slate-400">No message was included.</p>
                  )}
                  {notes ? (
                    <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-slate-600">
                      <span className="font-semibold text-slate-500">Internal note: </span>
                      {notes}
                    </p>
                  ) : null}
                  {email ? (
                    <div className="mt-4">
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                      >
                        <MailIcon className="h-4 w-4" />
                        Reply by email
                      </a>
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
