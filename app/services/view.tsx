"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";
import SectionRenderer from "@/components/sections/SectionRenderer";
import Icon from "@/components/Icon";
import type { ServiceItem, SimplePageData } from "@/lib/cms-types";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ServicesPage({
  data,
  services,
}: {
  data: SimplePageData;
  services: ServiceItem[];
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

      {/* Services anchor nav */}
      {services.length > 0 && (
        <section className="bg-white border-b border-slate-200 py-5 sticky top-16 z-40 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {services.map((s) => (
                <a
                  key={s._id ?? s.slug ?? s.title}
                  href={`#${s.slug ?? ""}`}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-brand-600 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 px-4 py-2 rounded-full transition-all"
                >
                  <Icon name={s.icon} size={14} />
                  {s.title}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Individual service detail */}
      {services.map((service, i) => (
        <section
          key={service._id ?? service.slug ?? service.title}
          id={service.slug ?? undefined}
          className={`relative isolate overflow-hidden py-24 ${
            i % 2 === 0 ? "bg-white" : "bg-slate-50"
          }`}
        >
          {service.backgroundImageUrl && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.backgroundImageUrl}
                alt=""
                aria-hidden
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-15"
              />
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 ${
                  i % 2 === 0 ? "bg-white/70" : "bg-slate-50/70"
                }`}
              />
            </>
          )}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-brand-50 rounded-xl p-3">
                    <Icon name={service.icon} className="text-brand-500" size={28} />
                  </div>
                  <span className="text-brand-500 text-xs font-bold uppercase tracking-widest">
                    Service 0{i + 1}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
                  {service.title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">{service.description}</p>

                {service.why && (
                  <div className="bg-brand-50 border-l-4 border-brand-500 rounded-r-xl p-5 mb-6">
                    <p className="text-brand-700 text-xs font-bold uppercase tracking-widest mb-2">
                      Why It Matters
                    </p>
                    <p className="text-slate-700 leading-relaxed">{service.why}</p>
                  </div>
                )}

                {service.howToPartner && (
                  <div className="border-l-4 border-slate-300 pl-6 py-2">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
                      How to Partner
                    </p>
                    <p className="text-slate-600 leading-relaxed">{service.howToPartner}</p>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {service.bullets && service.bullets.length > 0 && (
                  <div className="bg-slate-900 rounded-2xl p-8">
                    <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-5">
                      What This Includes
                    </p>
                    <ul className="space-y-3">
                      {service.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="text-brand-500 flex-shrink-0 mt-0.5"
                            size={18}
                          />
                          <span className="text-slate-300 text-sm leading-relaxed">{b}</span>
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
