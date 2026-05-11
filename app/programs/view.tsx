"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import SectionRenderer from "@/components/sections/SectionRenderer";
import Icon from "@/components/Icon";
import type { ProgramItem, SimplePageData } from "@/lib/cms-types";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ProgramsPage({
  data,
  programs,
}: {
  data: SimplePageData;
  programs: ProgramItem[];
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
      />

      {/* Programs anchor nav */}
      {programs.length > 0 && (
        <section className="bg-white py-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {programs.map((p) => (
                <a
                  key={p._id ?? p.slug ?? p.name}
                  href={`#${p.slug ?? ""}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-brand-600 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 px-5 py-2.5 rounded-full transition-all"
                >
                  {p.icon && <Icon name={p.icon} size={15} />}
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Individual program details */}
      {programs.map((program, i) => (
        <section
          key={program._id ?? program.slug ?? program.name}
          id={program.slug ?? undefined}
          className={`py-24 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <motion.div {...fadeInUp} className="lg:col-span-3">
                <div className="bg-slate-900 rounded-2xl p-6 inline-flex items-center gap-3 mb-6">
                  {program.icon && (
                    <Icon name={program.icon} className="text-brand-400" size={24} />
                  )}
                  <span className="text-brand-400 font-black text-lg">{program.name}</span>
                </div>
                <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">
                  {program.tagline}
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
                  {program.name}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {program.description}
                </p>
                {program.mission && (
                  <div className="bg-brand-50 border-l-4 border-brand-500 rounded-r-xl p-6 mb-6">
                    <p className="text-brand-700 text-xs font-bold uppercase tracking-widest mb-2">
                      Mission
                    </p>
                    <p className="text-slate-700 leading-relaxed">{program.mission}</p>
                  </div>
                )}

                {program.partnerOpportunity && (
                  <div className="border-l-4 border-slate-300 pl-6 py-2">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                      Partnership Opportunity
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {program.partnerOpportunity}
                    </p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-6"
              >
                {program.pillars && program.pillars.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                    <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-4">
                      Program Pillars
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {program.pillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {program.impact && program.impact.length > 0 && (
                  <div className="bg-slate-900 rounded-2xl p-6">
                    <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-4">
                      Impact
                    </p>
                    <ul className="space-y-3">
                      {program.impact.map((line) => (
                        <li key={line} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="text-brand-500 flex-shrink-0 mt-0.5"
                            size={16}
                          />
                          <span className="text-slate-300 text-sm leading-relaxed">{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      ))}

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
