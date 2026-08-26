"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";
import SectionRenderer from "@/components/sections/SectionRenderer";
import Icon from "@/components/Icon";
import type { SimplePageData } from "@/lib/cms-types";
import type { ContactFormSectionData } from "@/lib/contact-types";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function renderTitleWithAccent(title: string, accentWords: string[]) {
  if (accentWords.length === 0) return title;
  let remaining = title;
  const parts: { text: string; accent: boolean }[] = [];
  accentWords.forEach((word) => {
    const idx = remaining.indexOf(word);
    if (idx !== -1) {
      if (idx > 0) parts.push({ text: remaining.slice(0, idx), accent: false });
      parts.push({ text: word, accent: true });
      remaining = remaining.slice(idx + word.length);
    }
  });
  if (remaining) parts.push({ text: remaining, accent: false });
  return parts.map((p, i) =>
    p.accent ? (
      <span key={i} className="text-brand-500">
        {p.text}
      </span>
    ) : (
      <span key={i}>{p.text}</span>
    )
  );
}

export default function ContactPage({
  data,
  formSection,
}: {
  data: SimplePageData;
  formSection: ContactFormSectionData;
}) {
  const { hero, sections, finalCta } = data;
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-900 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            {hero.badge && (
              <span className="bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6">
                {hero.badge}
              </span>
            )}
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-5">
              {renderTitleWithAccent(hero.title, hero.accentWords ?? [])}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">{hero.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-8">
              {/* Reasons */}
              {(formSection.reasonsTitle || (formSection.reasons && formSection.reasons.length > 0)) && (
                <div>
                  {formSection.reasonsHeading && (
                    <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-4">
                      {formSection.reasonsHeading}
                    </p>
                  )}
                  {formSection.reasonsTitle && (
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">
                      {formSection.reasonsTitle}
                    </h2>
                  )}
                  {formSection.reasons && (
                    <ul className="space-y-3">
                      {formSection.reasons.map((reason) => (
                        <li key={reason} className="flex items-start gap-3">
                          <ArrowRight
                            className="text-brand-500 flex-shrink-0 mt-0.5"
                            size={16}
                          />
                          <span className="text-slate-600 text-sm leading-relaxed">
                            {reason}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Partner Types */}
              {formSection.partnerTypes && formSection.partnerTypes.length > 0 && (
                <div>
                  {formSection.partnerTypesHeading && (
                    <p className="text-brand-500 text-xs font-bold uppercase tracking-widest mb-4">
                      {formSection.partnerTypesHeading}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {formSection.partnerTypes.map((pt) => (
                      <div
                        key={pt.label}
                        className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-4 py-3"
                      >
                        {pt.icon && (
                          <Icon
                            name={pt.icon}
                            className="text-brand-500 flex-shrink-0"
                            size={16}
                          />
                        )}
                        <span className="text-slate-700 text-xs font-semibold">{pt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct Contact */}
              {formSection.email && (
                <div className="bg-slate-900 rounded-2xl p-7">
                  {formSection.directContactHeading && (
                    <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-4">
                      {formSection.directContactHeading}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <Mail className="text-brand-500 flex-shrink-0" size={18} />
                    <a
                      href={`mailto:${formSection.email}`}
                      className="text-white text-sm hover:text-brand-400 transition-colors font-medium"
                    >
                      {formSection.email}
                    </a>
                  </div>
                  {formSection.directContactNote && (
                    <p className="text-slate-500 text-xs leading-relaxed mt-4">
                      {formSection.directContactNote}
                    </p>
                  )}
                </div>
              )}

              {/* Response Time */}
              {formSection.responseTimeBody && (
                <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
                  {formSection.responseTimeHeading && (
                    <p className="text-brand-700 font-bold text-sm mb-2">
                      {formSection.responseTimeHeading}
                    </p>
                  )}
                  <p className="text-brand-800 text-sm leading-relaxed">
                    {formSection.responseTimeBody}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="mb-6">
                {formSection.formIntroTitle && (
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                    {formSection.formIntroTitle}
                  </h2>
                )}
                {formSection.formIntroSubtitle && (
                  <p className="text-slate-600 text-sm">{formSection.formIntroSubtitle}</p>
                )}
              </div>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

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
