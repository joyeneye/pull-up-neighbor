"use client";

import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import SectionRenderer from "@/components/sections/SectionRenderer";
import type { SimplePageData } from "@/lib/cms-types";

export default function AboutPage({ data }: { data: SimplePageData }) {
  const { hero, sections, finalCta } = data;
  return (
    <>
      <HeroSection
        badge={hero.badge ?? undefined}
        title={hero.title}
        subtitle={hero.subtitle}
        ctaText={hero.primaryCta.label}
        ctaHref={hero.primaryCta.href}
        secondaryCtaText={hero.secondaryCta?.label}
        secondaryCtaHref={hero.secondaryCta?.href}
        accentWords={hero.accentWords ?? []}
        videoSrcMp4={hero.videoUrl ?? undefined}
        videoPoster={hero.videoPoster?.asset?.url ?? undefined}
        backgroundImage={hero.backgroundImage?.asset?.url ?? undefined}
        muxPlaybackId={hero.muxPlaybackId ?? undefined}
        embedUrl={hero.backgroundEmbedUrl ?? undefined}
      />

      <SectionRenderer sections={sections} />

      {finalCta && (
        <CTASection
          eyebrow={finalCta.eyebrow ?? undefined}
          title={finalCta.title}
          description={finalCta.description ?? ""}
          ctaText={finalCta.primaryCta.label}
          ctaHref={finalCta.primaryCta.href}
          secondaryCtaText={finalCta.secondaryCta?.label}
          secondaryCtaHref={finalCta.secondaryCta?.href}
          dark={finalCta.dark ?? false}
        />
      )}
    </>
  );
}
