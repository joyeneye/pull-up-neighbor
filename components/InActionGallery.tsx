"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Image as ImageIcon, X, Calendar, Tag } from "lucide-react";
import {
  cardThumbnail,
  youtubeEmbedSrc,
  type InActionItem,
} from "@/lib/in-action-types";

type Filter = "all" | "youtube" | "upload" | "image";

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

export default function InActionGallery({ items }: { items: InActionItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<InActionItem | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "image") return items.filter((i) => i.mediaType === "image");
    return items.filter(
      (i) => i.mediaType === "youtube" || i.mediaType === "upload"
        ? filter === "youtube"
          ? i.mediaType === "youtube"
          : i.mediaType === "upload"
        : false
    );
  }, [items, filter]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  const counts = useMemo(() => ({
    all: items.length,
    youtube: items.filter((i) => i.mediaType === "youtube").length,
    upload: items.filter((i) => i.mediaType === "upload").length,
    image: items.filter((i) => i.mediaType === "image").length,
  }), [items]);

  if (items.length === 0) {
    return (
      <section className="bg-slate-50 py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-600">
            No items yet. Add the first one in Studio &rarr; In Action Items.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <FilterChip label="All" count={counts.all} active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterChip label="Videos" count={counts.youtube + counts.upload} active={filter === "youtube" || filter === "upload"} onClick={() => setFilter("youtube")} />
          <FilterChip label="Photos" count={counts.image} active={filter === "image"} onClick={() => setFilter("image")} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => {
            const thumb = cardThumbnail(item);
            const isVideo = item.mediaType !== "image";
            const date = formatDate(item.date);
            return (
              <motion.button
                key={item._id}
                onClick={() => setActive(item)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
                whileHover={{ y: -3 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-900 text-left shadow-sm hover:shadow-xl transition-shadow"
                aria-label={`Open ${item.title}`}
              >
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumb}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-slate-900/0" />

                {/* Play icon for video items */}
                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-brand-500/95 rounded-full p-4 group-hover:scale-110 group-hover:bg-brand-500 transition-all shadow-lg">
                      <Play className="text-slate-900" size={24} fill="currentColor" />
                    </div>
                  </div>
                )}

                {/* Type badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-slate-900/70 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur flex items-center gap-1">
                    {item.mediaType === "image" ? (
                      <>
                        <ImageIcon size={11} /> Photo
                      </>
                    ) : (
                      <>
                        <Play size={11} fill="currentColor" /> Video
                      </>
                    )}
                  </span>
                </div>

                {/* Bottom text */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  {item.category && (
                    <span className="inline-block text-brand-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                      {item.category}
                    </span>
                  )}
                  <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  {date && (
                    <p className="text-slate-300 text-xs flex items-center gap-1.5">
                      <Calendar size={11} /> {date}
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
        active
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
      }`}
    >
      {label}
      <span
        className={`ml-2 text-xs ${
          active ? "text-brand-400" : "text-slate-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function Lightbox({ item, onClose }: { item: InActionItem; onClose: () => void }) {
  const date = formatDate(item.date);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur p-4 sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-12 right-0 sm:-right-2 text-white/80 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold"
        >
          Close <X size={18} />
        </button>

        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
          {/* Media */}
          <div className="relative bg-black aspect-video w-full">
            {item.mediaType === "youtube" && (
              <iframe
                src={youtubeEmbedSrc(item.youtubeUrl) ?? undefined}
                title={item.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
            {item.mediaType === "upload" && item.videoUrl && (
              <video
                src={item.videoUrl}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 h-full w-full"
              />
            )}
            {item.mediaType === "image" && item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
          </div>

          {/* Meta */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
              {item.category && (
                <span className="inline-flex items-center gap-1 text-brand-400 font-bold uppercase tracking-widest">
                  <Tag size={11} /> {item.category}
                </span>
              )}
              {date && (
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Calendar size={11} /> {date}
                </span>
              )}
            </div>
            <h3 className="text-white font-black text-2xl sm:text-3xl tracking-tight leading-tight mb-3">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-slate-300 leading-relaxed">{item.description}</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
