"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badge?: string;
  accentWords?: string[];
  videoSrcMp4?: string;
  videoSrcWebm?: string;
  videoPoster?: string;
}

export default function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  badge,
  accentWords = [],
  videoSrcMp4,
  videoSrcWebm,
  videoPoster,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasVideo = Boolean(videoSrcMp4 || videoSrcWebm);
  const showVideo = hasVideo && !prefersReducedMotion;
  // Highlight specific words in the title with brand color
  const renderTitle = () => {
    if (accentWords.length === 0) return title;

    let result = title;
    const parts: { text: string; accent: boolean }[] = [];

    // Split title by accent words
    let remaining = title;
    accentWords.forEach((word) => {
      const idx = remaining.indexOf(word);
      if (idx !== -1) {
        if (idx > 0) parts.push({ text: remaining.slice(0, idx), accent: false });
        parts.push({ text: word, accent: true });
        remaining = remaining.slice(idx + word.length);
      }
    });
    if (remaining) parts.push({ text: remaining, accent: false });

    if (parts.length === 0) return result;

    return parts.map((part, i) =>
      part.accent ? (
        <span key={i} className="text-brand-500">
          {part.text}
        </span>
      ) : (
        <span key={i}>{part.text}</span>
      )
    );
  };

  return (
    <section className="relative isolate overflow-hidden bg-slate-900 min-h-screen flex items-center pt-16">
      {hasVideo && (
        <div aria-hidden className="absolute inset-0 -z-10">
          {showVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={videoPoster}
            >
              {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
              {videoSrcMp4 && <source src={videoSrcMp4} type="video/mp4" />}
            </video>
          ) : videoPoster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={videoPoster}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-slate-900/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/20" />
        </div>
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-4xl"
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block mb-6"
            >
              <span className="bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
                {badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight mb-6"
          >
            {renderTitle()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={ctaHref}
              className="inline-block bg-brand-500 text-slate-900 font-bold px-8 py-4 rounded-lg hover:bg-brand-400 transition-colors duration-200 text-center text-base"
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-block border border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-slate-900 transition-colors duration-200 text-center text-base"
              >
                {secondaryCtaText}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
