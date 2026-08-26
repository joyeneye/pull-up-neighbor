/**
 * One place for the class strings the widgets share, so every control in the
 * panel focuses, hovers and disables the same way.
 */

export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

export const inputBase =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/25 focus:outline-none disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500";

export const inputInvalid =
  "border-red-400 hover:border-red-500 focus:border-red-500 focus:ring-red-500/25";

export const selectBase = `${inputBase} appearance-none bg-[length:1rem] bg-[right_0.6rem_center] bg-no-repeat pr-9 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%221.5%22%3E%3Cpath%20d%3D%22M4%206l4%204%204-4%22/%3E%3C/svg%3E')]`;

export const buttonPrimary = `inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 active:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none ${focusRing}`;

export const buttonSecondary = `inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50 active:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400 ${focusRing}`;

export const buttonGhost = `inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent ${focusRing}`;

export const buttonDanger = `inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent ${focusRing}`;

export const iconButton = `inline-flex h-7 w-7 items-center justify-center rounded-md border border-transparent text-slate-500 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:border-transparent disabled:hover:bg-transparent ${focusRing}`;

export const cardBase = "rounded-xl border border-slate-200 bg-white shadow-sm";

export const helpText = "text-xs leading-relaxed text-slate-500";

export const labelText = "block text-sm font-semibold text-slate-900";

export const noteBox =
  "rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-600";
