"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Tag } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import {
  embedSrc,
  isEmbedMediaType,
  type InActionItem,
} from "@/lib/in-action-types";

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

export default function InActionLightbox({
  item,
  onClose,
}: {
  item: InActionItem;
  onClose: () => void;
}) {
  const date = formatDate(item.date);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
          <div className="relative bg-black aspect-video w-full">
            {isEmbedMediaType(item.mediaType) && (
              <iframe
                src={embedSrc(item.embedUrl) ?? undefined}
                title={item.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
            {item.mediaType === "upload" && item.muxPlaybackId && (
              <MuxPlayer
                playbackId={item.muxPlaybackId}
                metadata={{ video_title: item.title }}
                autoPlay
                style={{ position: "absolute", inset: 0, height: "100%", width: "100%" }}
              />
            )}
            {item.mediaType === "upload" && !item.muxPlaybackId && item.videoUrl && (
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
