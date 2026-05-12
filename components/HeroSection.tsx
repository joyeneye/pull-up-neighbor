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
  backgroundImage?: string;
  muxPlaybackId?: string;
  embedUrl?: string;
}

function youtubeBgEmbed(url: string): string | null {
  const id = url.match(/youtu\.be\/([A-Za-z0-9_-]{11})|v=([A-Za-z0-9_-]{11})|embed\/([A-Za-z0-9_-]{11})|shorts\/([A-Za-z0-9_-]{11})/);
  const videoId = id?.[1] || id?.[2] || id?.[3] || id?.[4];
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1&rel=0&showinfo=0`;
}
function vimeoBgEmbed(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)|player\.vimeo\.com\/video\/(\d+)/);
  const id = m?.[1] || m?.[2];
  if (!id) return null;
  return `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1`;
}
function backgroundEmbedSrc(url: string | undefined): string | null {
  if (!url) return null;
  return youtubeBgEmbed(url) ?? vimeoBgEmbed(url);
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
  backgroundImage,
  muxPlaybackId,
  embedUrl,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasMux = Boolean(muxPlaybackId);
  const hasVideo = Boolean(videoSrcMp4 || videoSrcWebm);
  const embedBgSrc = backgroundEmbedSrc(embedUrl);
  const hasEmbed = Boolean(embedBgSrc);
  const hasImage = Boolean(backgroundImage);
  const hasBackground = hasMux || hasVideo || hasEmbed || hasImage;
  const showVideo = hasVideo && !prefersReducedMotion;
  const showMux = hasMux && !prefersReducedMotion;
  const showEmbed = hasEmbed && !prefersReducedMotion;
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
      {hasBackground && (
        <div aria-hidden className="absolute inset-0 -z-10">
          {showMux && muxPlaybackId ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={videoPoster || `https://image.mux.com/${muxPlaybackId}/thumbnail.jpg?width=1920&fit_mode=preserve`}
              src={`https://stream.mux.com/${muxPlaybackId}/high.mp4`}
            />
          ) : showVideo ? (
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
          ) : showEmbed && embedBgSrc ? (
            <iframe
              src={embedBgSrc}
              title=""
              className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              tabIndex={-1}
            />
          ) : hasImage && backgroundImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={backgroundImage}
              alt=""
              className="h-full w-full object-cover"
            />
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
