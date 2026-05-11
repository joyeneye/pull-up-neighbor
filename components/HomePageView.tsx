"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import HeroSection from "@/components/HeroSection";
import StatCard from "@/components/StatCard";
import ServiceCard from "@/components/ServiceCard";
import ProgramCard from "@/components/ProgramCard";
import CTASection from "@/components/CTASection";
import PartnerTypeCard from "@/components/PartnerTypeCard";
import Icon from "@/components/Icon";
import type { HomePageData } from "@/lib/cms-types";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function renderTitleWithAccent(title: string | null | undefined) {
  if (!title) return null;
  // Pipe-character convention: "Plain text |brand-green text| more plain"
  const parts = title.split("|");
  if (parts.length === 1) return title;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-brand-500">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function HomePageView({ data }: { data: HomePageData }) {
  const hero = data.hero;
  const finalCta = data.finalCta;
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

      {/* Focus Areas */}
      {data.focusAreas && data.focusAreas.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="mb-12">
              {data.focusAreasEyebrow && (
                <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">
                  {data.focusAreasEyebrow}
                </p>
              )}
              {data.focusAreasTitle && (
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  {data.focusAreasTitle}
                </h2>
              )}
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {data.focusAreas.map((area, i) => (
                <motion.div
                  key={area._id ?? area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-brand-200 transition-all duration-300"
                >
                  <div className="bg-brand-50 rounded-xl p-3 inline-flex mb-4">
                    <Icon name={area.icon} className="text-brand-500" size={22} />
                  </div>
                  <h3 className="text-slate-900 font-bold text-base mb-2">
                    {area.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Snapshot */}
      {(data.aboutTitle || (data.aboutBody && data.aboutBody.length > 0)) && (
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeInUp}>
                {data.aboutEyebrow && (
                  <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-4">
                    {data.aboutEyebrow}
                  </p>
                )}
                {data.aboutTitle && (
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                    {renderTitleWithAccent(data.aboutTitle)}
                  </h2>
                )}
                {data.aboutBody?.map((p, i) => (
                  <p
                    key={i}
                    className={`text-slate-600 leading-relaxed mb-5 ${
                      i === 0 ? "text-lg" : ""
                    }`}
                  >
                    {p}
                  </p>
                ))}
                {data.aboutLinkLabel && data.aboutLinkHref && (
                  <Link
                    href={data.aboutLinkHref}
                    className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-500 transition-colors group mt-3"
                  >
                    {data.aboutLinkLabel}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                )}
              </motion.div>

              {data.aboutSidePanels && data.aboutSidePanels.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 gap-4"
                >
                  {data.aboutSidePanels.map((item) => (
                    <div
                      key={item.title}
                      className="border-l-4 border-brand-500 pl-6 py-2"
                    >
                      <h4 className="text-slate-900 font-bold text-base mb-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Services Preview */}
      {data.services && data.services.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="mb-12 flex items-end justify-between flex-wrap gap-4"
            >
              <div>
                {data.servicesEyebrow && (
                  <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">
                    {data.servicesEyebrow}
                  </p>
                )}
                {data.servicesTitle && (
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    {data.servicesTitle}
                  </h2>
                )}
              </div>
              {data.servicesLinkLabel && (
                <Link
                  href="/services"
                  className="flex items-center gap-2 text-brand-600 font-bold hover:text-brand-500 transition-colors group"
                >
                  {data.servicesLinkLabel}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.services.map((service, i) => (
                <motion.div
                  key={service._id ?? service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    description={service.description}
                    why={service.why ?? undefined}
                    howToPartner={service.howToPartner ?? undefined}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs Preview */}
      {data.programs && data.programs.length > 0 && (
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="mb-12 flex items-end justify-between flex-wrap gap-4"
            >
              <div>
                {data.programsEyebrow && (
                  <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">
                    {data.programsEyebrow}
                  </p>
                )}
                {data.programsTitle && (
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                    {data.programsTitle}
                  </h2>
                )}
              </div>
              {data.programsLinkLabel && (
                <Link
                  href="/programs"
                  className="flex items-center gap-2 text-brand-600 font-bold hover:text-brand-500 transition-colors group"
                >
                  {data.programsLinkLabel}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.programs.map((program, i) => (
                <motion.div
                  key={program._id ?? program.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <ProgramCard
                    name={program.name}
                    tagline={program.tagline}
                    description={program.description}
                    pillars={program.pillars ?? []}
                    color={program.color ?? "from-slate-800 to-slate-900"}
                    href={program.slug ? `/programs#${program.slug}` : "/programs"}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Impact Stats */}
      {data.stats && data.stats.length > 0 && (
        <section className="bg-slate-900 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="mb-12 text-center">
              {data.statsEyebrow && (
                <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">
                  {data.statsEyebrow}
                </p>
              )}
              {data.statsTitle && (
                <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  {data.statsTitle}
                </h2>
              )}
              {data.statsSubtitle && (
                <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
                  {data.statsSubtitle}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.stats.map((stat, i) => (
                <motion.div
                  key={stat._id ?? stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    description={stat.description ?? ""}
                  />
                </motion.div>
              ))}
            </div>

            {data.statsLinkLabel && (
              <motion.div {...fadeInUp} className="mt-10 text-center">
                <Link
                  href="/impact"
                  className="inline-flex items-center gap-2 text-brand-400 font-bold hover:text-brand-300 transition-colors group"
                >
                  {data.statsLinkLabel}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Partner Types */}
      {data.partnerTypes && data.partnerTypes.length > 0 && (
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="mb-12 text-center max-w-3xl mx-auto"
            >
              {data.partnersEyebrow && (
                <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-3">
                  {data.partnersEyebrow}
                </p>
              )}
              {data.partnersTitle && (
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5">
                  {data.partnersTitle}
                </h2>
              )}
              {data.partnersSubtitle && (
                <p className="text-slate-600 text-lg leading-relaxed">
                  {data.partnersSubtitle}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.partnerTypes.map((pt, i) => (
                <motion.div
                  key={pt._id ?? pt.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <PartnerTypeCard
                    icon={pt.icon}
                    type={pt.type}
                    description={pt.description}
                  />
                </motion.div>
              ))}
            </div>

            {data.partnersCtaLabel && (
              <motion.div {...fadeInUp} className="mt-10 text-center">
                <Link
                  href="/partners"
                  className="inline-block bg-brand-500 text-slate-900 font-bold px-8 py-4 rounded-lg hover:bg-brand-400 transition-colors"
                >
                  {data.partnersCtaLabel}
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Final CTA */}
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
