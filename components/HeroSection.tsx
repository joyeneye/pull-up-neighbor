"use client";

import { motion } from "framer-motion";
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
}: HeroSectionProps) {
  // Highlight specific words in the title with amber color
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
        <span key={i} className="text-amber-500">
          {part.text}
        </span>
      ) : (
        <span key={i}>{part.text}</span>
      )
    );
  };

  return (
    <section className="bg-slate-900 min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
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
              <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full">
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
              className="inline-block bg-amber-500 text-slate-900 font-bold px-8 py-4 rounded-lg hover:bg-amber-400 transition-colors duration-200 text-center text-base"
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
