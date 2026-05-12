"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause, Image as ImageIcon, Calendar, Tag } from "lucide-react";
import { cardThumbnail, type InActionItem } from "@/lib/in-action-types";

const AUTOPLAY_MS = 6000;

function formatDate(d?: string | null) {
  if (!d) return null;
  try {
    return new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default function InActionCarousel({
  items,
  onItemClick,
}: {
  items: InActionItem[];
  onItemClick: (item: InActionItem) => void;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused || reduceMotion || total <= 1) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, reduceMotion, total, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  if (total === 0) {
    return (
      <section className="relative bg-slate-900 pt-28 pb-24 min-h-[60vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6">
              PUN In Action
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-5">
              See the work, not just the words.
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              This page comes alive the moment you add the first In Action Item in
              Studio. Drop in a YouTube link, a Vimeo link, or upload a video or
              photo — the carousel and gallery populate automatically.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const item = items[index];
  const thumb = cardThumbnail(item);
  const date = formatDate(item.date);
  const isVideo = item.mediaType !== "image";

  return (
    <section
      className="relative isolate overflow-hidden bg-slate-900 h-[70vh] min-h-[520px] max-h-[820px] pt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="In Action highlights"
    >
      {/* Slides — fade between */}
      <AnimatePresence mode="sync">
        <motion.button
          key={item._id}
          onClick={() => onItemClick(item)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full text-left cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/50"
          aria-label={`Open ${item.title}`}
        >
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
          )}
          {/* Darken for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-slate-950/15" />
          <div className="absolute inset-0 bg-slate-950/15" />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="max-w-3xl">
                {item.category && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="inline-flex items-center gap-1.5 text-brand-400 text-xs font-bold uppercase tracking-widest mb-4"
                  >
                    <Tag size={11} /> {item.category}
                  </motion.span>
                )}
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-4"
                >
                  {item.title}
                </motion.h2>
                {item.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.18 }}
                    className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl line-clamp-3 mb-4"
                  >
                    {item.description}
                  </motion.p>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="flex items-center gap-4 text-xs text-slate-300"
                >
                  {date && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} /> {date}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 bg-brand-500 text-slate-900 font-bold px-3 py-1.5 rounded-full">
                    {isVideo ? (
                      <>
                        <Play size={11} fill="currentColor" /> Play Video
                      </>
                    ) : (
                      <>
                        <ImageIcon size={11} /> View Photo
                      </>
                    )}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.button>
      </AnimatePresence>

      {/* Controls layer — sits ABOVE the slide button so clicks don't bubble into "open lightbox" */}
      {total > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous slide"
            className="hidden sm:flex absolute top-1/2 left-4 -translate-y-1/2 z-10 items-center justify-center h-12 w-12 rounded-full bg-slate-950/40 backdrop-blur text-white hover:bg-slate-950/70 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next slide"
            className="hidden sm:flex absolute top-1/2 right-4 -translate-y-1/2 z-10 items-center justify-center h-12 w-12 rounded-full bg-slate-950/40 backdrop-blur text-white hover:bg-slate-950/70 transition-colors"
          >
            <ChevronRight size={22} />
          </button>

          {/* Bottom: dots + counter + pause */}
          <div className="absolute inset-x-0 bottom-5 z-10 flex items-center justify-between px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
              <div className="flex items-center gap-2">
                {items.slice(0, Math.min(total, 10)).map((it, i) => (
                  <button
                    key={it._id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIndex(i);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === index ? "w-10 bg-brand-500" : "w-3 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
                {total > 10 && (
                  <span className="text-white/60 text-xs ml-2">
                    {index + 1} / {total}
                  </span>
                )}
              </div>
              {!reduceMotion && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPaused((p) => !p);
                  }}
                  aria-label={paused ? "Play autoplay" : "Pause autoplay"}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white transition-colors"
                >
                  {paused ? <Play size={12} fill="currentColor" /> : <Pause size={12} />}
                  {paused ? "Play" : "Pause"}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
