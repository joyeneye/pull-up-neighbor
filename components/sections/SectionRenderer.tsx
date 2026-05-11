"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/Icon";
import type {
  BrandedCalloutBlock,
  IconCardGridBlock,
  PartnershipModelGridBlock,
  PhaseCardsBlock,
  PillarCardsBlock,
  QuoteSplitBlock,
  RichTextBlock,
  Section,
  SectionBackground,
  TextWithStatsBlock,
  TwoColumnTextBlock,
} from "@/lib/section-types";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const bgClass = (bg: SectionBackground | null | undefined): string => {
  switch (bg) {
    case "slate-50":
      return "bg-slate-50";
    case "slate-900":
      return "bg-slate-900";
    case "brand-500":
      return "bg-brand-500";
    case "white":
    default:
      return "bg-white";
  }
};

const isDarkBg = (bg: SectionBackground | null | undefined): boolean =>
  bg === "slate-900" || bg === "brand-500";

function Eyebrow({
  text,
  dark,
  brand = false,
}: {
  text?: string | null;
  dark?: boolean;
  brand?: boolean;
}) {
  if (!text) return null;
  const cls = brand
    ? "text-slate-900 text-xs font-black uppercase tracking-widest"
    : dark
    ? "text-brand-400 text-xs font-bold uppercase tracking-widest"
    : "text-brand-500 text-xs font-bold uppercase tracking-widest";
  return <p className={`${cls} mb-3`}>{text}</p>;
}

function Title({
  text,
  dark,
  brand = false,
  className = "",
}: {
  text?: string | null;
  dark?: boolean;
  brand?: boolean;
  className?: string;
}) {
  if (!text) return null;
  const color = brand
    ? "text-slate-900"
    : dark
    ? "text-white"
    : "text-slate-900";
  // Pipe-character convention: "Plain text |brand-green text| more plain"
  const parts = text.split("|");
  const content =
    parts.length > 1
      ? parts.map((p, i) =>
          i % 2 === 1 ? (
            <span key={i} className="text-brand-500">
              {p}
            </span>
          ) : (
            <span key={i}>{p}</span>
          )
        )
      : text;
  return (
    <h2
      className={`text-4xl sm:text-5xl font-black ${color} tracking-tight leading-tight ${className}`}
    >
      {content}
    </h2>
  );
}

function Paragraphs({
  items,
  dark,
  brand = false,
}: {
  items?: string[] | null;
  dark?: boolean;
  brand?: boolean;
}) {
  if (!items || items.length === 0) return null;
  const color = brand
    ? "text-slate-800"
    : dark
    ? "text-slate-300"
    : "text-slate-600";
  return (
    <div className={`space-y-5 ${color} leading-relaxed`}>
      {items.map((p, i) => (
        <p key={i} className={i === 0 ? "text-lg" : ""}>
          {p}
        </p>
      ))}
    </div>
  );
}

function RichText({ section }: { section: RichTextBlock }) {
  const dark = isDarkBg(section.background);
  const align = section.alignment === "center" ? "text-center max-w-3xl mx-auto" : "";
  return (
    <section className={`${bgClass(section.background)} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className={align}>
          <Eyebrow text={section.eyebrow} dark={dark} />
          <Title text={section.title} dark={dark} className="mb-6" />
          <Paragraphs items={section.body} dark={dark} />
        </motion.div>
      </div>
    </section>
  );
}

function TwoColumnText({ section }: { section: TwoColumnTextBlock }) {
  const dark = isDarkBg(section.background);
  return (
    <section className={`${bgClass(section.background)} py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeInUp}>
            <Eyebrow text={section.leftEyebrow} dark={dark} />
            <Title text={section.leftTitle} dark={dark} className="mb-6" />
            <Paragraphs items={section.leftBody} dark={dark} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow text={section.rightEyebrow} dark={dark} />
            <Title text={section.rightTitle} dark={dark} className="mb-6" />
            <Paragraphs items={section.rightBody} dark={dark} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IconCardGrid({ section }: { section: IconCardGridBlock }) {
  const dark = isDarkBg(section.background);
  const cols = section.columns ?? 3;
  const colCls =
    cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  const centered = section.alignment === "center";
  const layout = section.cardLayout ?? "icon-top";
  return (
    <section className={`${bgClass(section.background)} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className={`mb-12 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}
        >
          <Eyebrow text={section.eyebrow} dark={dark} />
          <Title text={section.title} dark={dark} className="mb-4" />
          {section.subtitle && (
            <p className={`${dark ? "text-slate-300" : "text-slate-600"} text-lg leading-relaxed`}>
              {section.subtitle}
            </p>
          )}
        </motion.div>

        <div className={`grid grid-cols-1 ${colCls} gap-6`}>
          {section.cards.map((card, i) => (
            <motion.div
              key={card._key ?? card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${
                dark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } border rounded-2xl p-6 hover:shadow-md transition-shadow ${
                layout === "icon-left" ? "flex gap-5" : ""
              }`}
            >
              {card.icon && (
                <div
                  className={`${
                    dark ? "bg-slate-900/50" : "bg-brand-50"
                  } rounded-xl p-3 inline-flex ${
                    layout === "icon-left" ? "h-fit flex-shrink-0" : "mb-4"
                  }`}
                >
                  <Icon name={card.icon} className="text-brand-500" size={22} />
                </div>
              )}
              <div>
                <h3
                  className={`${
                    dark ? "text-white" : "text-slate-900"
                  } font-bold ${cols === 2 ? "text-lg" : "text-base"} mb-2`}
                >
                  {card.title}
                </h3>
                {card.description && (
                  <p
                    className={`${
                      dark ? "text-slate-400" : "text-slate-600"
                    } text-sm leading-relaxed`}
                  >
                    {card.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCards({ section }: { section: PillarCardsBlock }) {
  const dark = isDarkBg(section.background);
  const centered = section.alignment === "center";
  return (
    <section className={`${bgClass(section.background)} py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className={`mb-14 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}
        >
          <Eyebrow text={section.eyebrow} dark={dark} />
          <Title text={section.title} dark={dark} className="mb-4" />
          {section.subtitle && (
            <p className={`${dark ? "text-slate-300" : "text-slate-600"} text-lg leading-relaxed`}>
              {section.subtitle}
            </p>
          )}
        </motion.div>

        <div className="space-y-8">
          {section.pillars.map((pillar, i) => (
            <motion.div
              key={pillar._key ?? pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`${
                dark
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-slate-200"
              } rounded-2xl border p-8 lg:p-10`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-5">
                    {pillar.icon && (
                      <div className={`${dark ? "bg-slate-900/50" : "bg-brand-50"} rounded-xl p-3`}>
                        <Icon name={pillar.icon} className="text-brand-500" size={24} />
                      </div>
                    )}
                    <h3 className={`${dark ? "text-white" : "text-slate-900"} font-black text-2xl`}>
                      {pillar.title}
                    </h3>
                  </div>
                  {pillar.description && (
                    <p className={`${dark ? "text-slate-300" : "text-slate-600"} leading-relaxed`}>
                      {pillar.description}
                    </p>
                  )}
                </div>

                {pillar.bullets && pillar.bullets.length > 0 && (
                  <div className={`${dark ? "bg-slate-900/40" : "bg-slate-50"} rounded-xl p-6`}>
                    {section.bulletLabel && (
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-500 mb-3">
                        {section.bulletLabel}
                      </p>
                    )}
                    <ul className="space-y-3">
                      {pillar.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <ArrowRight className="text-brand-500 flex-shrink-0 mt-0.5" size={16} />
                          <span
                            className={`${
                              dark ? "text-slate-300" : "text-slate-700"
                            } text-sm leading-relaxed`}
                          >
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseCards({ section }: { section: PhaseCardsBlock }) {
  const dark = isDarkBg(section.background);
  return (
    <section className={`${bgClass(section.background)} py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow text={section.eyebrow} dark={dark} />
          <Title text={section.title} dark={dark} className="mb-4" />
          {section.subtitle && (
            <p className={`${dark ? "text-slate-300" : "text-slate-600"} text-lg leading-relaxed`}>
              {section.subtitle}
            </p>
          )}
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {section.phases.map((phase, i) => (
            <motion.div
              key={phase._key ?? phase.phase}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`${
                dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
              } border rounded-2xl p-7`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`${
                    dark ? "text-slate-500" : "text-slate-400"
                  } text-xs font-bold uppercase tracking-widest`}
                >
                  {phase.phase}
                </span>
                {phase.status && (
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      phase.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : phase.status === "In Progress"
                        ? "bg-brand-500/20 text-brand-400"
                        : phase.status === "Complete"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {phase.status}
                  </span>
                )}
              </div>
              <h3 className={`${dark ? "text-white" : "text-slate-900"} font-black text-xl mb-3`}>
                {phase.title}
              </h3>
              {phase.description && (
                <p
                  className={`${
                    dark ? "text-slate-400" : "text-slate-600"
                  } text-sm leading-relaxed`}
                >
                  {phase.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TextWithStats({ section }: { section: TextWithStatsBlock }) {
  const dark = isDarkBg(section.background);
  return (
    <section className={`${bgClass(section.background)} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <Eyebrow text={section.eyebrow} dark={dark} />
            <h2
              className={`text-4xl font-black ${
                dark ? "text-white" : "text-slate-900"
              } tracking-tight leading-tight mb-6`}
            >
              {section.title}
              {section.accentTail && (
                <>
                  {" "}
                  <span className="text-brand-500">{section.accentTail}</span>
                </>
              )}
            </h2>
            <Paragraphs items={section.body} dark={dark} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {section.stats.map((s) => (
              <div
                key={s._key ?? s.label}
                className={`${
                  dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
                } rounded-2xl p-6 text-center border`}
              >
                {s.icon && (
                  <Icon name={s.icon} className="text-brand-500 mx-auto mb-3" size={24} />
                )}
                <p className="text-3xl font-black text-brand-500 mb-1">{s.value}</p>
                <p className={`${dark ? "text-slate-300" : "text-slate-700"} text-sm font-medium`}>
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function QuoteSplit({ section }: { section: QuoteSplitBlock }) {
  const dark = isDarkBg(section.background);
  return (
    <section className={`${bgClass(section.background)} py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <Eyebrow text={section.leftEyebrow} dark={dark} />
            <Title text={section.leftTitle} dark={dark} className="mb-6" />
            <Paragraphs items={section.leftBody} dark={dark} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900 rounded-3xl p-10"
          >
            {section.rightEyebrow && (
              <p className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-6">
                {section.rightEyebrow}
              </p>
            )}
            <blockquote className="text-white text-2xl font-black leading-tight mb-8">
              &ldquo;{section.quote}&rdquo;
            </blockquote>
            {section.quoteFooter && (
              <div className="border-t border-slate-700 pt-6">
                <p className="text-slate-400 text-sm leading-relaxed">{section.quoteFooter}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BrandedCallout({ section }: { section: BrandedCalloutBlock }) {
  return (
    <section className="bg-brand-500 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <Eyebrow text={section.eyebrow} brand />
            <Title text={section.title} brand className="mb-6" />
            <Paragraphs items={section.body} brand />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {section.items?.map((item, i) => (
              <motion.div
                key={item._key ?? item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-slate-900 rounded-xl p-5"
              >
                <h4 className="text-white font-bold text-base mb-1">{item.title}</h4>
                {item.description && (
                  <p className="text-slate-400 text-sm">{item.description}</p>
                )}
              </motion.div>
            ))}
            {section.ctaLabel && section.ctaHref && (
              <Link
                href={section.ctaHref}
                className="flex items-center justify-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors group mt-2"
              >
                {section.ctaLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PartnershipModelGrid({ section }: { section: PartnershipModelGridBlock }) {
  const dark = isDarkBg(section.background);
  return (
    <section className={`${bgClass(section.background)} py-24`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="mb-14">
          <Eyebrow text={section.eyebrow} dark={dark} />
          <Title text={section.title} dark={dark} />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(section.models ?? []).map((m, i) => (
            <motion.div
              key={m._id ?? m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${
                dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
              } border rounded-2xl p-7`}
            >
              <h3 className={`${dark ? "text-white" : "text-slate-900"} font-black text-xl mb-3`}>
                {m.title}
              </h3>
              {m.description && (
                <p className={`${dark ? "text-slate-400" : "text-slate-600"} text-sm leading-relaxed mb-5`}>
                  {m.description}
                </p>
              )}
              <div className="flex flex-wrap gap-3 text-xs">
                {m.investment && (
                  <span
                    className={`${
                      dark ? "bg-brand-500/10 text-brand-400" : "bg-brand-50 text-brand-700"
                    } font-bold px-3 py-1.5 rounded-full`}
                  >
                    {m.investment}
                  </span>
                )}
                {m.timeframe && (
                  <span
                    className={`${
                      dark ? "bg-slate-900/50 text-slate-300" : "bg-slate-100 text-slate-700"
                    } font-bold px-3 py-1.5 rounded-full`}
                  >
                    {m.timeframe}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SectionRenderer({ sections }: { sections: Section[] | null | undefined }) {
  if (!sections || sections.length === 0) return null;
  return (
    <>
      {sections.map((section) => {
        const key = section._key ?? section._type;
        switch (section._type) {
          case "richTextBlock":
            return <RichText key={key} section={section} />;
          case "twoColumnTextBlock":
            return <TwoColumnText key={key} section={section} />;
          case "iconCardGridBlock":
            return <IconCardGrid key={key} section={section} />;
          case "pillarCardsBlock":
            return <PillarCards key={key} section={section} />;
          case "phaseCardsBlock":
            return <PhaseCards key={key} section={section} />;
          case "textWithStatsBlock":
            return <TextWithStats key={key} section={section} />;
          case "quoteSplitBlock":
            return <QuoteSplit key={key} section={section} />;
          case "brandedCalloutBlock":
            return <BrandedCallout key={key} section={section} />;
          case "partnershipModelGridBlock":
            return <PartnershipModelGrid key={key} section={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
