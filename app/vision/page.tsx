"use client";

import { motion } from "framer-motion";
import {
  Home,
  TrendingUp,
  Vote,
  ArrowRight,
  Globe,
  Layers,
  Target,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const pillars = [
  {
    icon: Home,
    title: "Housing as Infrastructure",
    description:
      "Stable housing is the foundation of everything else — education, employment, civic participation, health. PUN's vision is a future where every family has access to dignified, affordable housing — not as a product of the market, but as a right supported by real infrastructure.",
    goals: [
      "10,000 affordable units in the pipeline by 2030",
      "Community land trust partnerships in 10 major cities",
      "First-time homeownership pathways for 50,000 families",
    ],
  },
  {
    icon: TrendingUp,
    title: "Economic Empowerment at Scale",
    description:
      "Financial literacy is the foundation of generational wealth. PUN's vision is a world where every young person in an underserved community enters adulthood equipped with the financial knowledge to build a life — not just survive one.",
    goals: [
      "Next Gen Money in 500 schools by 2028",
      "The Wealth Playbook in 200 cities",
      "10,000 new community-based businesses launched through our programs",
    ],
  },
  {
    icon: Vote,
    title: "Civic Power for Underserved Communities",
    description:
      "Democracy only works when everyone participates. PUN's vision is a future where no community is systematically excluded from the political process — where voter access, civic education, and community mobilization have permanently shifted the power dynamic.",
    goals: [
      "VoteHub deployed in all 50 states",
      "500,000 voters registered through our programs",
      "Civic education reaching 1M+ community members annually",
    ],
  },
];

const systemsChangeMilestones = [
  {
    phase: "Phase 1",
    title: "Direct Service",
    status: "Active",
    description:
      "Building community trust through consistent, high-quality direct service — meals, housing navigation, voter registration, financial education. This is our foundation and will never stop.",
  },
  {
    phase: "Phase 2",
    title: "Infrastructure Building",
    status: "Active",
    description:
      "Developing the programs, systems, and partnerships that scale our impact beyond direct service — VoteHub, The Wealth Playbook, affordable housing pipelines, and disaster response capacity.",
  },
  {
    phase: "Phase 3",
    title: "Policy Influence",
    status: "In Progress",
    description:
      "Using our data, our track record, and our community relationships to influence the policy decisions that shape community outcomes — housing policy, civic access, financial regulation.",
  },
  {
    phase: "Phase 4",
    title: "Systems Change",
    status: "Horizon",
    description:
      "A future where the systems PUN has been filling the gaps of — housing, finance, civic participation — are restructured to serve everyone. That's the horizon we're building toward.",
  },
];

const futureGoals = [
  {
    icon: Globe,
    title: "500+ Cities",
    description: "Expanding our program footprint to 500+ cities within the next five years.",
  },
  {
    icon: Home,
    title: "10,000 Housing Units",
    description: "10,000 affordable units in active development pipelines by 2030.",
  },
  {
    icon: Layers,
    title: "National Civic Tech Platform",
    description: "VoteHub deployed in all 50 states as a permanent civic infrastructure.",
  },
  {
    icon: Target,
    title: "$100M in Community Capital",
    description: "Mobilizing $100M in impact capital for community infrastructure by 2030.",
  },
];

export default function VisionPage() {
  return (
    <>
      <HeroSection
        badge="Our Vision"
        title="The Horizon We're Building Toward"
        subtitle="PUN exists to solve today's community crises. But our real goal is to build systems that make those crises less likely — and less devastating — for the next generation."
        ctaText="Invest in the Vision"
        ctaHref="/contact"
        secondaryCtaText="View Our Impact"
        secondaryCtaHref="/impact"
        accentWords={["Horizon"]}
      />

      {/* Vision Statement */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                The Big Picture
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Not Just a Nonprofit. A{" "}
                <span className="text-amber-500">Systems Change Engine.</span>
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  The problems PUN addresses — housing insecurity, financial exclusion,
                  civic disenfranchisement — are not accidents. They are the predictable
                  outcomes of systems designed without underserved communities in mind.
                </p>
                <p>
                  Direct service is essential. We&apos;ll never stop distributing meals,
                  registering voters, or placing families in housing. But we refuse to
                  accept that these problems are permanent. Our vision is a future where
                  the systems themselves work differently — where housing is accessible,
                  financial mobility is real, and civic participation is universal.
                </p>
                <p>
                  That&apos;s why everything PUN builds — every program, every partnership,
                  every data point — is designed to contribute to systems change, not just
                  symptom relief.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900 rounded-3xl p-10"
            >
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                Our Vision
              </p>
              <blockquote className="text-white text-2xl font-black leading-tight mb-8">
                &ldquo;A world where the communities that have been most excluded from
                opportunity are the ones leading the way forward.&rdquo;
              </blockquote>
              <div className="border-t border-slate-700 pt-6">
                <p className="text-slate-400 text-sm leading-relaxed">
                  This is not a tagline. It is a commitment that shapes every decision
                  PUN makes — who we partner with, how we measure impact, and what we
                  build next.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Strategic Pillars
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Three Pillars. One Vision.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              PUN&apos;s long-term vision is organized around three interconnected pillars —
              each essential, each reinforcing the others.
            </p>
          </motion.div>

          <div className="space-y-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="bg-amber-50 rounded-xl p-3">
                        <pillar.icon className="text-amber-500" size={24} />
                      </div>
                      <h3 className="text-slate-900 font-black text-2xl">{pillar.title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-3">
                      2030 Goals
                    </p>
                    <ul className="space-y-3">
                      {pillar.goals.map((goal) => (
                        <li key={goal} className="flex items-start gap-2.5">
                          <ArrowRight
                            className="text-amber-500 flex-shrink-0 mt-0.5"
                            size={16}
                          />
                          <span className="text-slate-700 text-sm leading-relaxed">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Systems Change Journey */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              The Journey
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
              From Direct Service to Systems Change
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              PUN operates across multiple phases simultaneously — delivering direct
              service today while building the infrastructure for systems change tomorrow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {systemsChangeMilestones.map((milestone, i) => (
              <motion.div
                key={milestone.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-slate-800 border border-slate-700 rounded-2xl p-7"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                    {milestone.phase}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      milestone.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : milestone.status === "In Progress"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {milestone.status}
                  </span>
                </div>
                <h3 className="text-white font-black text-xl mb-3">{milestone.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Looking Ahead
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Where We&apos;re Going by 2030
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {futureGoals.map((goal, i) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:shadow-md hover:border-amber-200 transition-all"
              >
                <div className="bg-amber-50 rounded-xl p-3 inline-flex mb-4">
                  <goal.icon className="text-amber-500" size={22} />
                </div>
                <h3 className="text-slate-900 font-black text-xl mb-2">{goal.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capital CTA */}
      <section className="bg-amber-500 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="text-slate-900" size={24} />
                <p className="text-slate-900 text-xs font-black uppercase tracking-widest">
                  For Capital & Investment Partners
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                The Vision Requires Capital Partners Who Think Long-Term
              </h2>
              <p className="text-slate-800 text-lg leading-relaxed mb-6">
                Systems change doesn&apos;t happen on grant cycles. PUN is actively seeking
                capital and investment partners willing to make multi-year commitments to
                community infrastructure — and who understand that patient capital
                produces the highest social returns.
              </p>
              <p className="text-slate-800 leading-relaxed">
                We are building housing pipelines, civic technology, and economic
                empowerment programs designed to generate both social impact and long-term
                financial viability. If you manage impact capital, we should talk.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {[
                {
                  title: "Affordable Housing Investment",
                  description:
                    "Co-invest in affordable housing development with community ownership built in.",
                },
                {
                  title: "Civic Technology Expansion",
                  description:
                    "Fund VoteHub's expansion to new states and communities as a permanent civic infrastructure.",
                },
                {
                  title: "Economic Mobility Programs",
                  description:
                    "Capitalize Next Gen Money and The Wealth Playbook for national scale.",
                },
                {
                  title: "Operational Infrastructure",
                  description:
                    "Build PUN's capacity to deploy faster, in more cities, with greater impact.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-slate-900 rounded-xl p-5"
                >
                  <h4 className="text-white font-bold text-base mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </motion.div>
              ))}

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-slate-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors group mt-2"
              >
                Connect With Our Team{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Build With Us"
        title="The Future We're Building Needs You"
        description="Whether you're a funder, a builder, a civic leader, or an organization with mission and capital — PUN has a place for you in the work. Let's talk about what that looks like."
        ctaText="Start the Conversation"
        ctaHref="/contact"
        secondaryCtaText="View Our Programs"
        secondaryCtaHref="/programs"
        dark={false}
      />
    </>
  );
}
