"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CTASection from "@/components/CTASection";
import SectionRenderer from "@/components/sections/SectionRenderer";
import InActionGallery from "@/components/InActionGallery";
import InActionLightbox from "@/components/InActionLightbox";
import type { SimplePageData } from "@/lib/cms-types";
import type { InActionItem } from "@/lib/in-action-types";

export default function InActionPage({
  data,
  items,
}: {
  data: SimplePageData;
  items: InActionItem[];
}) {
  const { sections, finalCta } = data;
  const [active, setActive] = useState<InActionItem | null>(null);

  return (
    <>
      <InActionGallery items={items} onItemClick={setActive} />

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

      <AnimatePresence>
        {active && <InActionLightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
