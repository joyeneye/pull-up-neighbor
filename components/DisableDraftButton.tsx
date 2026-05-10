"use client";

export default function DisableDraftButton() {
  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[60] bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg border border-brand-500/40 hover:bg-slate-800 transition-colors"
    >
      Exit Preview
    </a>
  );
}
