"use client";

import { motion } from "framer-motion";
import {
  Globe,
  BookOpen,
  Users,
  Building2,
  DollarSign,
  Layers,
  CheckCircle2,
  ArrowRight,
  Target,
  BarChart3,
  Handshake,
  Zap,
} from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import PartnerTypeCard from "@/components/PartnerTypeCard";
import CTASection from "@/components/CTASection";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const partnerTypes = [
  {
    icon: Globe,
    type: "Brand Partners",
    description:
      "Consumer brands that want authentic community access, culturally resonant activation, and purpose-driven storytelling that generates real community equity — not just PR.",
  },
  {
    icon: BookOpen,
    type: "Foundations",
    description:
      "Philanthropic institutions looking for proven operators with measurable community impact, transparent reporting, and systems-level thinking that extends beyond grant cycles.",
  },
  {
    icon: Users,
    type: "Sports Teams & Leagues",
    description:
      "Sports organizations and player associations that want to move beyond charity work and into genuine, lasting community investment with real outcomes to point to.",
  },
  {
    icon: Building2,
    type: "Developers & CDFIs",
    description:
      "Real estate developers and financial institutions building affordable housing pipelines and community capital who need a trusted community partner on the ground.",
  },
  {
    icon: DollarSign,
    type: "City & Government",
    description:
      "Municipal agencies and government entities seeking trusted community partners for outreach, services, civic engagement programs, and emergency response contracts.",
  },
  {
    icon: Layers,
    type: "Strategic Investors",
    description:
      "Impact investors and family offices ready to deploy capital into community infrastructure that generates measurable social returns — and a growing track record of financial viability.",
  },
];

const partnershipSteps = [
  {
    icon: Target,
    step: "01",
    title: "Strategy",
    description:
      "We start by understanding your goals — community presence, brand equity, impact metrics, or capital deployment. Every partnership begins with a clear strategic framework.",
  },
  {
    icon: Zap,
    step: "02",
    title: "Execution",
    description:
      "PUN brings the infrastructure, relationships, and operational capacity to move from plan to action fast. We handle logistics, community relationships, and program delivery.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Community Trust",
    description:
      "Your investment is validated by PUN's existing community credibility — earned through years of consistent presence. You don't have to build trust from scratch.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Impact",
    description:
      "We track and report on every outcome — meals distributed, voters registered, families housed, youth reached. You receive transparent data on what your investment produced.",
  },
];

const whyPartner = [
  {
    title: "Credibility You Can't Buy",
    description:
      "PUN has earned the trust of communities that are skeptical of institutions. When you partner with us, you access that trust — something no amount of advertising spend can produce on its own.",
  },
  {
    title: "Operational Infrastructure",
    description:
      "We've already built the systems, the supply chains, the volunteer networks, and the community relationships. Your capital goes into execution — not setup costs.",
  },
  {
    title: "Integrated Impact",
    description:
      "Our programs reinforce each other, which means your investment produces compounding impact across multiple issue areas — not just the one you funded.",
  },
  {
    title: "Transparent Accountability",
    description:
      "We report on outcomes, not activities. You'll know exactly what your partnership produced — and we'll tell you if something didn't work and why.",
  },
];

const partnershipModels = [
  {
    title: "Program Sponsor",
    description:
      "Fund a specific PUN program or program cohort in exchange for co-branding, impact reporting, and community access.",
    investment: "Flexible",
    timeframe: "6–24 months",
  },
  {
    title: "Activation Partner",
    description:
      "Co-create and sponsor specific community events, relief operations, or civic engagement drives with PUN's operational support.",
    investment: "Event-based",
    timeframe: "Single or recurring",
  },
  {
    title: "Strategic Community Partner",
    description:
      "A deeper, multi-year engagement where PUN designs and executes a custom community initiative aligned with your mission and goals.",
    investment: "Significant",
    timeframe: "2–5 years",
  },
  {
    title: "Capital Partner",
    description:
      "Deploy philanthropic or impact capital into PUN's affordable housing, economic mobility, or capacity-building initiatives.",
    investment: "Mission-aligned capital",
    timeframe: "Multi-year",
  },
];

export default function PartnersPage() {
  return (
    <>
      <HeroSection
        badge="Partnerships"
        title="Built for Organizations That Mean It"
        subtitle="PUN doesn't do photo-op partnerships. We build infrastructure, co-create programs, and deliver outcomes — with partners who are serious about community impact and ready to invest accordingly."
        ctaText="Explore a Partnership"
        ctaHref="/contact"
        secondaryCtaText="View Our Impact"
        secondaryCtaHref="/impact"
        accentWords={["Mean It"]}
      />

      {/* Partner Types */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Who We Work With
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Six Types of Partners. One Standard.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Every PUN partner — regardless of sector or size — is held to the same
              standard: real community outcomes, transparent accountability, and genuine
              commitment to the communities we serve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {partnerTypes.map((pt, i) => (
              <motion.div
                key={pt.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <PartnerTypeCard {...pt} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Model */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              How We Work Together
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              The PUN Partnership Model
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Every partnership follows a four-stage framework designed to turn your
              investment into community impact — with accountability at every step.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {partnershipSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-7 relative"
              >
                <span className="text-slate-700 font-black text-5xl absolute top-5 right-6 leading-none">
                  {step.step}
                </span>
                <div className="bg-amber-500/10 rounded-xl p-3 inline-flex mb-5">
                  <step.icon className="text-amber-500" size={22} />
                </div>
                <h3 className="text-white font-black text-xl mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Partnership Structures
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Find the Right Fit
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnershipModels.map((model, i) => (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-slate-900 font-black text-xl mb-3">{model.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {model.description}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    Investment: {model.investment}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-full">
                    Timeframe: {model.timeframe}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Why PUN
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Four Reasons Partners Choose PUN
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyPartner.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5"
              >
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle2 className="text-amber-500" size={22} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2">{reason.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-14 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-amber-500 text-slate-900 font-bold px-10 py-5 rounded-xl hover:bg-amber-400 transition-colors text-lg group"
            >
              Start a Partnership Conversation{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <CTASection
        eyebrow="Let's Build Together"
        title="Ready to Make Your Community Investment Count?"
        description="The best time to build community trust was years ago. The second best time is now. PUN gives you the infrastructure, the relationships, and the track record to make your investment matter."
        ctaText="Contact Our Team"
        ctaHref="/contact"
        secondaryCtaText="View Our Impact"
        secondaryCtaHref="/impact"
        dark={false}
      />
    </>
  );
}
