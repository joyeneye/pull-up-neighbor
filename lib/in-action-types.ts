export type InActionMediaType = "embed" | "youtube" | "upload" | "image";

export type InActionItem = {
  _id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  date?: string | null;
  mediaType: InActionMediaType;
  embedUrl?: string | null;
  muxPlaybackId?: string | null;
  videoUrl?: string | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  featured?: boolean | null;
};

export function muxThumbnail(playbackId: string | null | undefined): string | null {
  if (!playbackId) return null;
  return `https://image.mux.com/${playbackId}/thumbnail.jpg?width=1200&height=675&fit_mode=smartcrop`;
}

export function isEmbedMediaType(t: InActionMediaType | undefined | null): boolean {
  return t === "embed" || t === "youtube";
}

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

/** Pull the numeric Vimeo ID out of any Vimeo URL. */
export function vimeoIdFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const patterns = [
    /vimeo\.com\/(?:video\/)?(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
    /vimeo\.com\/channels\/[^/]+\/(\d+)/,
    /vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export type EmbedPlatform = "youtube" | "vimeo" | null;

export function detectEmbedPlatform(url: string | null | undefined): EmbedPlatform {
  if (!url) return null;
  if (youtubeIdFromUrl(url)) return "youtube";
  if (vimeoIdFromUrl(url)) return "vimeo";
  return null;
}

export function youtubeThumbnail(url: string | null | undefined): string | null {
  const id = youtubeIdFromUrl(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

export function youtubeEmbedSrc(url: string | null | undefined): string | null {
  const id = youtubeIdFromUrl(url);
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : null;
}

export function vimeoEmbedSrc(url: string | null | undefined): string | null {
  const id = vimeoIdFromUrl(url);
  return id
    ? `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`
    : null;
}

/** Single embed src that works for either YouTube or Vimeo. */
export function embedSrc(url: string | null | undefined): string | null {
  return youtubeEmbedSrc(url) ?? vimeoEmbedSrc(url);
}

/** Single thumbnail URL — YouTube auto-thumbs, Vimeo via API needs custom upload. */
export function embedThumbnail(url: string | null | undefined): string | null {
  return youtubeThumbnail(url);
}

/** Pick the best available thumbnail URL for a card. */
export function cardThumbnail(item: InActionItem): string | null {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  if (item.mediaType === "image" && item.imageUrl) return item.imageUrl;
  if (item.muxPlaybackId) return muxThumbnail(item.muxPlaybackId);
  if (isEmbedMediaType(item.mediaType)) return embedThumbnail(item.embedUrl);
  return null;
}
