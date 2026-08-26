import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import SidebarNav, { type AdminNavGroup } from "@/components/admin/SidebarNav";
import { LIBRARIES } from "@/components/admin/library-catalog";
import { currentUser } from "@/lib/admin/auth";
import { PAGE_ROUTES } from "@/sanity/lib/routes";

export const metadata: Metadata = {
  title: {
    default: "Admin · Pull Up Neighbor",
    template: "%s · Pull Up Neighbor Admin",
  },
  robots: { index: false, follow: false },
};

const SITE_URL = "https://www.pullupneighbor.com";

/**
 * Guard for everything under /admin except the login screen, which sits
 * outside this route group. The session check here is what stops navigation;
 * each server action re-checks it independently, because an action can be
 * invoked without ever rendering a page.
 */
export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  if (!user) redirect("/admin/login");

  const groups: AdminNavGroup[] = [
    {
      label: "Pages",
      links: PAGE_ROUTES.map((page) => ({
        href: `/admin/pages/${page.key}`,
        label: page.title,
      })),
    },
    {
      label: "Content",
      // Straight off the library catalogue, so a nav item and the screen it
      // opens can never drift apart.
      links: LIBRARIES.map((entry) => ({
        href: `/admin/library/${entry.type}`,
        label: entry.plural,
      })),
    },
    {
      label: "Site",
      links: [
        { href: "/admin/inquiries", label: "Inquiries" },
        { href: "/admin/edit/siteSettings", label: "Site Settings" },
        { href: SITE_URL, label: "View site", external: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-brand-500"
      >
        Skip to content
      </a>

      <SidebarNav groups={groups} user={user} />

      <div className="lg:pl-64">
        <main
          id="admin-main"
          className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-10"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
