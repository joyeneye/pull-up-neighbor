"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Shield,
  Vote,
  Users,
  Handshake,
  Building2,
  BookOpen,
  Globe,
  ArrowRight,
  Megaphone,
  DollarSign,
  Layers,
} from "lucide-react";

import HeroSection from "@/components/HeroSection";
import StatCard from "@/components/StatCard";
import ServiceCard from "@/components/ServiceCard";
import ProgramCard from "@/components/ProgramCard";
import CTASection from "@/components/CTASection";
import PartnerTypeCard from "@/components/PartnerTypeCard";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const focusAreas = [
  {
    icon: Home,
    title: "Housing",
    description:
      "Creating pathways to affordable, stable, dignified housing for underserved communities.",
  },
  {
    icon: Shield,
    title: "Disaster Recovery",
    description:
      "Rapid, coordinated relief operations that reach the people government systems miss.",
  },
  {
    icon: Vote,
    title: "Civic Engagement",
    description:
      "Rebuilding trust between communities and institutions through voter access and civic participation.",
  },
  {
    icon: Users,
    title: "Youth Empowerment",
    description:
      "Equipping the next generation with financial literacy, leadership tools, and economic vision.",
  },
  {
    icon: Handshake,
    title: "Partnerships",
    description:
      "Connecting mission-aligned brands, foundations, and institutions with real community infrastructure.",
  },
];

const services = [
  {
    icon: Building2,
    title: "Affordable Housing Development",
    description:
      "We partner with developers, cities, and institutions to create affordable housing pipelines — from land acquisition to resident placement.",
    why: "The housing crisis is a capital problem and a trust problem. We solve both.",
    howToPartner:
      "Developers, CDFIs, and city agencies can engage us as a community liaison, co-developer, or pipeline partner.",
  },
  {
    icon: Shield,
    title: "Disaster Response & Recovery",
    description:
      "Coordinated relief logistics including meals, supply distribution, wellness checks, and long-term rebuilding support.",
    why: "Communities in crisis need trusted local operators, not just donations.",
    howToPartner:
      "Corporate partners can sponsor relief activations. Foundations can fund standing capacity for rapid deployment.",
  },
  {
    icon: Megaphone,
    title: "Community Engagement & Brand Integration",
    description:
      "Brands and institutions gain authentic community access through our programs, events, and trusted relationships.",
    why: "Credibility in underserved markets is earned through presence, not advertising spend.",
    howToPartner:
      "Brands sponsor activations, co-create content, or fund programs that carry mutual value.",
  },
];

const programs = [
  {
    name: "VoteHub",
    tagline: "Civic technology for voter access",
    description:
      "A digital-first platform that removes barriers to voter registration, poll access, and civic education — built for the communities most often left out.",
    pillars: ["Technology", "Civic Access", "Education"],
    color: "from-slate-800 to-slate-900",
    href: "/programs#votehub",
  },
  {
    name: "Next Gen Money",
    tagline: "Financial literacy for young leaders",
    description:
      "A curriculum designed for high school and college-aged youth that makes wealth-building real, practical, and culturally resonant.",
    pillars: ["Youth", "Finance", "Empowerment"],
    color: "from-amber-800 to-slate-900",
    href: "/programs#nextgenmoney",
  },
  {
    name: "The Wealth Playbook",
    tagline: "Economic mobility at scale",
    description:
      "A community-facing economic curriculum that moves families from financial survival to financial strategy — credit, investing, homeownership, and business.",
    pillars: ["Economic Mobility", "Homeownership", "Business"],
    color: "from-slate-700 to-slate-900",
    href: "/programs#wealthplaybook",
  },
  {
    name: "Affordable Housing Initiative",
    tagline: "Housing as a human right",
    description:
      "Pipeline development, tenant advocacy, and affordable unit access programs connecting families to stable housing faster.",
    pillars: ["Housing", "Advocacy", "Development"],
    color: "from-slate-800 to-amber-900",
    href: "/programs#housing",
  },
  {
    name: "Disaster Response & Recovery Initiative",
    tagline: "Rapid relief, long-term rebuilding",
    description:
      "Standing infrastructure for coordinated disaster response — meals, supply kits, health services, and community rebuilding, deployed when it matters most.",
    pillars: ["Relief", "Logistics", "Rebuilding"],
    color: "from-slate-900 to-slate-700",
    href: "/programs#disaster",
  },
];

const stats = [
  { value: "1M+", label: "People Reached", description: "Across programs and activations" },
  { value: "100+", label: "Cities Served", description: "Nationwide community presence" },
  { value: "10M+", label: "Meals Distributed", description: "Through disaster response ops" },
  { value: "2M+", label: "Supply Kits Deployed", description: "During relief activations" },
  { value: "100K+", label: "Voters Registered", description: "Through VoteHub and civic programs" },
  { value: "150K+", label: "Community Members Mobilized", description: "For civic action" },
  { value: "15K+", label: "Vaccinations Administered", description: "Community health activations" },
];

const partnerTypes = [
  {
    icon: Globe,
    type: "Brand Partners",
    description:
      "Consumer brands that want authentic community access, culturally resonant activation, and purpose-driven storytelling.",
  },
  {
    icon: BookOpen,
    type: "Foundations",
    description:
      "Philanthropic institutions looking for proven operators with measurable community impact and systems-level thinking.",
  },
  {
    icon: Users,
    type: "Sports Teams & Leagues",
    description:
      "Sports organizations that want to move beyond charity work and into genuine, lasting community investment.",
  },
  {
    icon: Building2,
    type: "Developers & CDFIs",
    description:
      "Real estate developers and financial institutions building affordable housing pipelines and community capital.",
  },
  {
    icon: DollarSign,
    type: "City & Government",
    description:
      "Municipal agencies seeking trusted community partners for outreach, services, and civic engagement programs.",
  },
  {
    icon: Layers,
    type: "Strategic Investors",
    description:
      "Impact investors and family offices ready to deploy capital into community infrastructure that generates returns — social and financial.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        badge="Community. Capital. Culture."
        title="Where Community, Capital & Culture Converge"
        subtitle="Pull Up Neighbor transforms underserved communities through affordable housing development, disaster recovery, civic engagement, and youth empowerment — powered by strategic partnerships that move at the speed of need."
        ctaText="Explore Services"
        ctaHref="/services"
        secondaryCtaText="Partner With Us"
        secondaryCtaHref="/contact"
        accentWords={["Capital", "Culture"]}
      />

      {/* Focus Areas */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-12">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              What We Do
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Five Focus Areas. One Mission.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {focusAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-amber-200 transition-all duration-300"
              >
                <div className="bg-amber-50 rounded-xl p-3 inline-flex mb-4">
                  <area.icon className="text-amber-500" size={22} />
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

      {/* About Snapshot */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                Who We Are
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                More Than a Nonprofit.{" "}
                <span className="text-amber-500">A Platform for Change.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-5">
                Pull Up Neighbor isn&apos;t a charity with a single program. We are a
                community infrastructure platform — operating at the intersection
                of grassroots trust, strategic capital, and cultural relevance.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                We build, we convene, we execute. Whether it&apos;s placing families
                in affordable housing, running disaster relief operations, or
                registering 100,000 voters, we show up with strategy, not just
                intention.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-amber-600 font-bold hover:text-amber-500 transition-colors group"
              >
                Learn About PUN{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 gap-4"
            >
              {[
                {
                  title: "Platform Thinking",
                  body: "We don't deliver one-off services. We build systems, programs, and partnerships that compound over time.",
                },
                {
                  title: "Community Trust",
                  body: "Our relationships are built over years of showing up — before the crisis, during it, and long after the cameras leave.",
                },
                {
                  title: "Measurable Impact",
                  body: "Every dollar, every activation, every program is tracked against real community outcomes — not optics.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l-4 border-amber-500 pl-6 py-2"
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
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
                What We Offer
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Services Built for Scale
              </h2>
            </div>
            <Link
              href="/services"
              className="flex items-center gap-2 text-amber-600 font-bold hover:text-amber-500 transition-colors group"
            >
              View All Services{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
                Our Programs
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Five Programs. Thousands of Lives.
              </h2>
            </div>
            <Link
              href="/programs"
              className="flex items-center gap-2 text-amber-600 font-bold hover:text-amber-500 transition-colors group"
            >
              All Programs{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((program, i) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={i === 4 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <ProgramCard {...program} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-12 text-center">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Our Impact
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Numbers That Don&apos;t Lie
            </h2>
            <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">
              Behind every statistic is a family served, a vote cast, a meal
              delivered, a life stabilized.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="mt-10 text-center"
          >
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 text-amber-400 font-bold hover:text-amber-300 transition-colors group"
            >
              View Full Impact Report{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-12 text-center max-w-3xl mx-auto">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Partnerships
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5">
              The Partner of Choice for Organizations That Mean It
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We don&apos;t do photo-op partnerships. We build infrastructure,
              co-create programs, and deliver outcomes — with partners who are
              serious about community impact.
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

          <motion.div {...fadeInUp} className="mt-10 text-center">
            <Link
              href="/partners"
              className="inline-block bg-amber-500 text-slate-900 font-bold px-8 py-4 rounded-lg hover:bg-amber-400 transition-colors"
            >
              Explore Partnership Models
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        eyebrow="Get Involved"
        title="Ready to Build Something That Lasts?"
        description="Great communities don't happen by accident. They're built by organizations willing to commit to something real. Let's talk about what that looks like for you."
        ctaText="Start the Conversation"
        ctaHref="/contact"
        secondaryCtaText="View Our Work"
        secondaryCtaHref="/impact"
        dark={false}
      />
    </>
  );
}
