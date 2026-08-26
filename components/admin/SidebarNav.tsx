"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";
import { ExternalLink, LoaderCircle, LogOut, Menu, X } from "lucide-react";
import { signOut } from "@/app/admin/actions";

/**
 * The admin chrome: a persistent dark sidebar on desktop, a top bar plus a
 * slide-in drawer on narrow screens. It is a client component only because it
 * needs the current path (to highlight the active link) and a little local
 * state for the drawer — every link list is handed down from the server layout.
 */

export type AdminNavLink = {
  href: string;
  label: string;
  /** Opens in a new tab, and is never highlighted as the current page. */
  external?: boolean;
};

export type AdminNavGroup = {
  /** Small heading above the group. Groups are separated by a divider. */
  label?: string;
  links: AdminNavLink[];
};

export type SidebarNavProps = {
  groups: AdminNavGroup[];
  user: { name: string; email: string };
};

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** A link is current for its own path and for anything nested beneath it. */
function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400";

function Brand() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-[11px] font-black tracking-tight text-slate-900">
        PUN
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-sm font-semibold text-white">Pull Up Neighbor</span>
        <span className="truncate text-[11px] text-slate-400">Admin panel</span>
      </span>
    </span>
  );
}

function SignOutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cx(
        "flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-medium text-slate-200 transition-colors",
        "hover:bg-slate-800 hover:text-white active:bg-slate-700",
        "disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-slate-800/60",
        focusRing
      )}
    >
      {pending ? (
        <LoaderCircle size={15} className="animate-spin" aria-hidden="true" />
      ) : (
        <LogOut size={15} aria-hidden="true" />
      )}
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}

type PanelProps = SidebarNavProps & {
  pathname: string;
  /** Present only in the mobile drawer — renders the close button. */
  onClose?: () => void;
};

function SidebarPanel({ groups, user, pathname, onClose }: PanelProps) {
  return (
    <div className="flex h-full flex-col border-r border-slate-800 bg-slate-900">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-slate-800 px-4">
        <Brand />
        {onClose ? (
          <button
            type="button"
            data-admin-close=""
            onClick={onClose}
            aria-label="Close navigation menu"
            className={cx(
              "ml-auto -mr-1 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white",
              focusRing
            )}
          >
            <X size={18} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <nav aria-label="Admin sections" className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group, index) => (
          <div
            key={group.label ?? `group-${index}`}
            className={index > 0 ? "mt-5 border-t border-slate-800 pt-5" : undefined}
          >
            {group.label ? (
              <h2 className="px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {group.label}
              </h2>
            ) : null}
            <ul className="space-y-0.5">
              {group.links.map((link) => {
                if (link.external) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className={cx(
                          "group relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors",
                          "hover:bg-slate-800/60 hover:text-white",
                          focusRing
                        )}
                      >
                        {link.label}
                        <ExternalLink
                          size={13}
                          aria-hidden="true"
                          className="text-slate-500 transition-colors group-hover:text-slate-300"
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  );
                }

                const active = isCurrent(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={cx(
                        "relative flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white",
                        focusRing
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cx(
                          "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-brand-500 transition-opacity",
                          active ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-slate-800 p-3">
        <div className="flex items-center gap-2.5 px-1 pb-2.5">
          <span
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-[11px] font-bold text-brand-300"
          >
            {initials(user.name)}
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium text-white">{user.name}</span>
            <span className="truncate text-[11px] text-slate-400">{user.email}</span>
          </span>
        </div>
        <form action={signOut}>
          <SignOutButton />
        </form>
      </div>
    </div>
  );
}

export default function SidebarNav({ groups, user }: SidebarNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Navigating away closes the drawer. Adjusting during render rather than in
  // an effect keeps it from flashing the old screen behind a still-open menu.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (pathname !== renderedPathname) {
    setRenderedPathname(pathname);
    setOpen(false);
  }

  // Escape closes it, and the page behind it should not scroll.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Move focus into the drawer when it opens, and back to the toggle when it closes.
  useEffect(() => {
    if (open) {
      panelRef.current?.querySelector<HTMLElement>("[data-admin-close]")?.focus();
    } else if (wasOpen.current) {
      toggleRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-slate-800 bg-slate-900 px-3 lg:hidden">
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls={drawerId}
          className={cx(
            "rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
            focusRing
          )}
        >
          <Menu size={20} aria-hidden="true" />
        </button>
        <Brand />
      </header>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:block lg:w-64">
        <SidebarPanel groups={groups} user={user} pathname={pathname} />
      </div>

      {/* Mobile drawer */}
      <div
        className={cx("fixed inset-0 z-50 lg:hidden", !open && "pointer-events-none")}
        aria-hidden={open ? undefined : true}
        inert={!open}
      >
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className={cx(
            "absolute inset-0 bg-slate-950/60 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          ref={panelRef}
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation"
          className={cx(
            "absolute inset-y-0 left-0 w-72 max-w-[85vw] transition-transform duration-200 ease-out",
            // The shadow is dropped while closed so it cannot bleed across the
            // right-hand edge of an off-screen panel.
            open ? "translate-x-0 shadow-2xl shadow-black/50" : "-translate-x-full"
          )}
        >
          <SidebarPanel
            groups={groups}
            user={user}
            pathname={pathname}
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
