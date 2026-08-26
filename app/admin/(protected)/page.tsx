import Link from "next/link";
import { connection } from "next/server";
import type { ReactNode } from "react";
import {
  ChevronRightIcon,
  ExternalLinkIcon,
  InboxIcon,
  LibraryIcon,
  PageIcon,
  SettingsIcon,
} from "@/components/admin/icons";
import { LIBRARIES, shownOn } from "@/components/admin/library-catalog";
import { currentUser } from "@/lib/admin/auth";
import { listDocuments, listInquiries } from "@/lib/admin/content";
import { PAGE_ROUTES } from "@/sanity/lib/routes";

export const metadata = { title: "Dashboard" };

function plural(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

function Card({
  href,
  icon,
  title,
  blurb,
  meta,
  badge,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  blurb?: string;
  meta?: string;
  badge?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 transition group-hover:bg-brand-100">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-slate-900">{title}</span>
          {badge}
        </span>
        {blurb ? <span className="mt-1 block text-sm leading-relaxed text-slate-500">{blurb}</span> : null}
        {meta ? (
          <span className="mt-2 block text-xs font-medium text-slate-400">{meta}</span>
        ) : null}
      </span>
      <ChevronRightIcon className="mt-1.5 h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
    </Link>
  );
}

export default async function AdminDashboard() {
  await connection();

  const user = await currentUser();
  const firstName = user?.name?.trim().split(/\s+/)[0] ?? "";

  const [newInquiries, ...libraryDocs] = await Promise.all([
    listInquiries(true),
    ...LIBRARIES.map((library) => listDocuments(library.type)),
  ]);

  const newCount = newInquiries.length;

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {firstName ? `Welcome back, ${firstName}.` : "Welcome back."}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Everything on the website is edited from here. When you save a change it is live on the
            site straight away — there is no separate publish step.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          View the live site
          <ExternalLinkIcon />
        </a>
      </header>

      <Link
        href="/admin/inquiries"
        className={`group mt-8 flex items-center gap-4 rounded-xl border p-5 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
          newCount > 0
            ? "border-brand-200 bg-brand-50 hover:border-brand-300"
            : "border-slate-200 bg-white hover:border-brand-300"
        }`}
      >
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
            newCount > 0 ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-500"
          }`}
        >
          <InboxIcon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-slate-900">
            {newCount > 0
              ? `${plural(newCount, "new inquiry", "new inquiries")} from the contact form`
              : "Inquiries"}
          </span>
          <span className="mt-1 block text-sm text-slate-600">
            {newCount > 0
              ? "Someone is waiting to hear back. Open the inbox to read and reply."
              : "Nothing new right now. Past messages are all kept in the inbox."}
          </span>
        </span>
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-brand-600" />
      </Link>

      <section className="mt-10" aria-labelledby="pages-heading">
        <h2 id="pages-heading" className="text-lg font-semibold text-slate-900">
          Pages
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Each page is made of sections you can edit one at a time.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAGE_ROUTES.map((page) => (
            <Card
              key={page.key}
              href={`/admin/pages/${page.key}`}
              icon={<PageIcon />}
              title={`${page.title} page`}
              blurb={page.route}
              meta={plural(page.sections.length, "section", "sections")}
            />
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="libraries-heading">
        <h2 id="libraries-heading" className="text-lg font-semibold text-slate-900">
          Content libraries
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Reusable items that appear in more than one place. Edit one here and it updates
          everywhere it is used.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LIBRARIES.map((library, index) => {
            const docs = libraryDocs[index] ?? [];
            const live = docs.filter((doc) => doc.archived !== true).length;
            const archived = docs.length - live;
            const where = shownOn(library.type);
            return (
              <Card
                key={library.type}
                href={`/admin/library/${library.type}`}
                icon={<LibraryIcon />}
                title={library.plural}
                blurb={library.blurb}
                meta={[
                  archived > 0
                    ? `${plural(live, "item", "items")} · ${archived} archived`
                    : plural(live, "item", "items"),
                  where,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              />
            );
          })}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="site-heading">
        <h2 id="site-heading" className="text-lg font-semibold text-slate-900">
          Site-wide
        </h2>
        <p className="mt-1 text-sm text-slate-500">Settings that apply to every page.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            href="/admin/edit/siteSettings"
            icon={<SettingsIcon />}
            title="Site settings"
            blurb="Site title, tagline and the contact email shown to visitors."
            meta="Affects every page"
          />
        </div>
      </section>
    </div>
  );
}
