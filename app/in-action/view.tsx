"use client";

import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import SectionRenderer from "@/components/sections/SectionRenderer";
import InActionGallery from "@/components/InActionGallery";
import type { SimplePageData } from "@/lib/cms-types";
import type { InActionItem } from "@/lib/in-action-types";

export default function InActionPage({
  data,
  items,
}: {
  data: SimplePageData;
  items: InActionItem[];
}) {
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
      />

      <InActionGallery items={items} />

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
