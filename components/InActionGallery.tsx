"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, Calendar } from "lucide-react";
import {
  cardThumbnail,
  isEmbedMediaType,
  type InActionItem,
} from "@/lib/in-action-types";

type Filter = "all" | "video" | "image";

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

export default function InActionGallery({
  items,
  onItemClick,
}: {
  items: InActionItem[];
  onItemClick: (item: InActionItem) => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "image") return items.filter((i) => i.mediaType === "image");
    return items.filter((i) => isEmbedMediaType(i.mediaType) || i.mediaType === "upload");
  }, [items, filter]);

  const counts = useMemo(() => ({
    all: items.length,
    video: items.filter((i) => isEmbedMediaType(i.mediaType) || i.mediaType === "upload").length,
    image: items.filter((i) => i.mediaType === "image").length,
  }), [items]);

  if (items.length === 0) {
    return (
      <section className="bg-slate-50 pt-32 pb-24 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mx-auto mb-5 inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white border border-slate-200">
            <Play className="text-brand-500" size={22} fill="currentColor" />
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            Photos and videos coming soon. Add items in Studio &rarr; In Action Items.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <FilterChip label="All" count={counts.all} active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterChip label="Videos" count={counts.video} active={filter === "video"} onClick={() => setFilter("video")} />
          <FilterChip label="Photos" count={counts.image} active={filter === "image"} onClick={() => setFilter("image")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, i) => {
            const thumb = cardThumbnail(item);
            const isVideo = item.mediaType !== "image";
            const date = formatDate(item.date);
            return (
              <motion.button
                key={item._id}
                onClick={() => onItemClick(item)}
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

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-slate-900/0" />

                {isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-brand-500/95 rounded-full p-4 group-hover:scale-110 group-hover:bg-brand-500 transition-all shadow-lg">
                      <Play className="text-slate-900" size={24} fill="currentColor" />
                    </div>
                  </div>
                )}

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
      <span className={`ml-2 text-xs ${active ? "text-brand-400" : "text-slate-400"}`}>
        {count}
      </span>
    </button>
  );
}
