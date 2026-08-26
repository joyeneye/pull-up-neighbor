"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, LoaderCircle, TriangleAlert } from "lucide-react";
import { signIn, type ActionResult } from "@/app/admin/actions";

/**
 * The one unguarded admin screen — it deliberately sits outside the
 * (protected) route group so the layout guard never redirects it back to
 * itself. A successful `signIn` redirects to /admin from the server.
 */
export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<ActionResult | null, FormData>(
    signIn,
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  // React resets uncontrolled fields once a form action settles, so the email
  // is held in state — a failed attempt should not make you retype it.
  const [email, setEmail] = useState("");

  const error = state && !state.ok ? state.error : undefined;

  const fieldClass =
    "block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-500 focus:outline-2 focus:outline-offset-0 focus:outline-brand-500/40";

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 px-4 py-12">
      <meta name="robots" content="noindex, nofollow" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_38rem_at_50%_-8%,rgba(6,164,89,0.22),transparent_70%)]"
      />

      <main className="relative w-full max-w-md">
        <div className="rounded-2xl bg-white p-7 shadow-2xl shadow-black/40 ring-1 ring-black/5 sm:p-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-sm font-black tracking-tight text-slate-900"
            >
              PUN
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-slate-900">
                Pull Up Neighbor
              </span>
              <span className="text-xs font-medium text-slate-500">Website admin</span>
            </span>
          </div>

          <h1 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
            Sign in to the admin panel
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Edit the pages, programs and settings on pullupneighbor.com. Anything you save
            goes live straight away.
          </p>

          {error ? (
            <div
              role="alert"
              className="mt-5 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800"
            >
              <TriangleAlert size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <form action={formAction} aria-busy={pending} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                autoComplete="email"
                spellCheck={false}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@pullupneighbor.com"
                aria-invalid={error ? true : undefined}
                className={`mt-1.5 ${fieldClass}`}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative mt-1.5">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  aria-invalid={error ? true : undefined}
                  className={`${fieldClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center rounded-r-lg px-3 text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
                >
                  {showPassword ? (
                    <EyeOff size={16} aria-hidden="true" />
                  ) : (
                    <Eye size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 active:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:cursor-not-allowed disabled:bg-brand-500/60"
            >
              {pending ? (
                <>
                  <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
            Trouble signing in? Your password can only be reset by whoever manages the
            website — there is no self-serve reset.
          </p>
        </div>

        <p className="mt-6 text-center text-sm">
          <a
            href="https://www.pullupneighbor.com"
            className="rounded text-slate-400 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          >
            Back to pullupneighbor.com
          </a>
        </p>
      </main>
    </div>
  );
}
