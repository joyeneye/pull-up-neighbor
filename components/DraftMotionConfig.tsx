"use client";

import { MotionConfig } from "framer-motion";

/**
 * Disables all framer-motion animations under this subtree. Used in draft
 * mode so SanityLive's RSC refreshes don't replay every section's entrance
 * animation on each keystroke — the editor would feel like the page is
 * reloading on every change otherwise.
 */
export default function DraftMotionConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="always">{children}</MotionConfig>;
}
