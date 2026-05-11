export type InActionMediaType = "youtube" | "upload" | "image";

export type InActionItem = {
  _id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  date?: string | null;
  mediaType: InActionMediaType;
  youtubeUrl?: string | null;
  videoUrl?: string | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  featured?: boolean | null;
};

/** Pull the 11-char YouTube ID out of any flavor of YouTube URL. */
export function youtubeIdFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?[^#]*v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export function youtubeThumbnail(url: string | null | undefined): string | null {
  const id = youtubeIdFromUrl(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

export function youtubeEmbedSrc(url: string | null | undefined): string | null {
  const id = youtubeIdFromUrl(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;
}

/** Pick the best available thumbnail URL for a card. */
export function cardThumbnail(item: InActionItem): string | null {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  if (item.mediaType === "image" && item.imageUrl) return item.imageUrl;
  if (item.mediaType === "youtube") return youtubeThumbnail(item.youtubeUrl);
  return null; // uploaded videos: no auto-thumb, the card will show a play icon over a gradient
}
