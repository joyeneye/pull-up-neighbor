"use client";

import { motion } from "framer-motion";
import {
  Users,
  MapPin,
  Utensils,
  Package,
  Vote,
  Megaphone,
  Heart,
  Award,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import StatCard from "@/components/StatCard";
import CTASection from "@/components/CTASection";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const allStats = [
  {
    value: "1M+",
    label: "People Reached",
    description: "Across all programs and activations nationwide",
  },
  {
    value: "100+",
    label: "Cities Served",
    description: "Coast-to-coast community presence and operations",
  },
  {
    value: "10M+",
    label: "Meals Distributed",
    description: "Through disaster response and community relief programs",
  },
  {
    value: "2M+",
    label: "Supply Kits Deployed",
    description: "Emergency and essential goods distributed during crises",
  },
  {
    value: "100K+",
    label: "Voters Registered",
    description: "Through VoteHub and targeted civic engagement campaigns",
  },
  {
    value: "150K+",
    label: "Community Members Mobilized",
    description: "For civic action, elections, and community advocacy",
  },
  {
    value: "15K+",
    label: "Vaccinations Administered",
    description: "Community health activations during the pandemic and beyond",
  },
];

const reachHighlights = [
  {
    icon: MapPin,
    title: "100+ Cities",
    description:
      "PUN's reach spans over 100 cities across the United States — from major metros to smaller cities often overlooked by national organizations.",
  },
  {
    icon: Users,
    title: "1M+ Individuals",
    description:
      "More than one million people have been directly touched by PUN programs, activations, and relief operations.",
  },
  {
    icon: Award,
    title: "Notable Partnerships",
    description:
      "Our work is validated and amplified by partnerships with the MLB Players Alliance, the Dodgers Foundation, and other leading organizations.",
  },
];

const civicStats = [
  { value: "100K+", label: "Voters Registered" },
  { value: "150K+", label: "Community Members Mobilized" },
  { value: "100+", label: "Civic Events and Drives" },
];

const reliefStats = [
  { value: "10M+", label: "Meals Distributed" },
  { value: "2M+", label: "Supply Kits Deployed" },
  { value: "15K+", label: "Vaccinations Administered" },
];

const notablePartners = [
  {
    name: "MLB Players Alliance",
    description:
      "PUN partnered with the MLB Players Alliance to bring community relief, civic engagement, and youth empowerment programs to communities across the country — leveraging the reach and credibility of professional athletes.",
    area: "Civic Engagement / Youth Empowerment",
  },
  {
    name: "Dodgers Foundation",
    description:
      "A collaboration with the Los Angeles Dodgers Foundation brought PUN's programs to communities throughout Los Angeles County, combining the Foundation's resources with PUN's on-the-ground infrastructure.",
    area: "Community Relief / Housing",
  },
];

export default function ImpactPage() {
  return (
    <>
      <HeroSection
        badge="Our Impact"
        title="Numbers That Tell the Truth"
        subtitle="Every statistic represents a real person — a family housed, a vote cast, a meal delivered, a young person equipped with knowledge they didn't have before. This is what community infrastructure actually looks like."
        ctaText="Partner With Us"
        ctaHref="/contact"
        secondaryCtaText="View Programs"
        secondaryCtaHref="/programs"
        accentWords={["Truth"]}
      />

      {/* Full Stats Grid */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              By the Numbers
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Aggregate Impact Across All Programs
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              These numbers represent years of consistent work — not a single campaign or
              one-time effort. This is what sustained community infrastructure delivers.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {allStats.map((stat, i) => (
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
        </div>
      </section>

      {/* Community Reach */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Community Reach
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              A National Footprint, Built Locally
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reachHighlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="bg-amber-50 rounded-xl p-3 inline-flex mb-5">
                  <item.icon className="text-amber-500" size={24} />
                </div>
                <h3 className="text-slate-900 font-black text-2xl mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="mt-12 bg-slate-900 rounded-3xl p-10 lg:p-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                  The Scale of Our Work
                </p>
                <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5">
                  From Los Angeles to the Gulf Coast — and Everywhere Between
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  PUN has operated in cities across every region of the United States. Our
                  programs are designed to be locally relevant and nationally scalable — which
                  means when a new city needs us, we can stand up operations quickly because our
                  systems and playbooks are already built.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "West Coast", cities: "Los Angeles, Oakland, Seattle" },
                  { label: "Gulf Coast", cities: "Houston, New Orleans, Miami" },
                  { label: "Mid-Atlantic", cities: "Baltimore, Philadelphia, D.C." },
                  { label: "Southeast", cities: "Atlanta, Charlotte, Memphis" },
                ].map((region) => (
                  <div
                    key={region.label}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                  >
                    <p className="text-amber-400 font-bold text-sm mb-1">{region.label}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{region.cities}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Civic Participation */}
      <section className="bg-amber-500 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Vote className="text-slate-900" size={24} />
                <p className="text-slate-900 text-xs font-black uppercase tracking-widest">
                  Civic Participation
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Turning Disenfranchisement into Democratic Power
              </h2>
              <p className="text-slate-800 text-lg leading-relaxed mb-6">
                Voter suppression is a systemic problem that requires systemic solutions.
                PUN&apos;s VoteHub platform and civic mobilization programs attack disenfranchisement
                at its roots — removing barriers, building education, and turning passive
                communities into active democratic participants.
              </p>
              <p className="text-slate-800 leading-relaxed">
                100,000+ voters registered. 150,000+ community members mobilized. Not in a
                single election cycle — across years of sustained civic investment.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {civicStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-slate-900 rounded-2xl p-6 flex items-center gap-6"
                >
                  <p className="text-4xl font-black text-amber-500 flex-shrink-0">
                    {stat.value}
                  </p>
                  <p className="text-white font-bold text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Relief Efforts */}
      <section className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="grid grid-cols-1 gap-4">
              {reliefStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex items-center gap-6"
                >
                  <p className="text-4xl font-black text-amber-500 flex-shrink-0">
                    {stat.value}
                  </p>
                  <p className="text-white font-bold text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Utensils className="text-amber-400" size={24} />
                <p className="text-amber-400 text-xs font-black uppercase tracking-widest">
                  Relief Efforts
                </p>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                When Disaster Strikes, PUN Is Already There
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                PUN doesn&apos;t spin up relief operations when the TV cameras arrive — we maintain
                standing capacity for rapid deployment because disasters don&apos;t announce
                themselves. Our relief operations have delivered 10M+ meals, 2M+ supply kits,
                and 15,000+ vaccinations to communities in crisis.
              </p>
              <p className="text-slate-400 leading-relaxed">
                More importantly, we don&apos;t leave when the cameras do. Long-term rebuilding
                support, case management, and sustained community investment are part of every
                major relief activation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Notable Partnerships */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-12">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Notable Partnerships
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Validated by the Organizations That Matter
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {notablePartners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-slate-900 font-black text-xl">{partner.name}</h3>
                  <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ml-3">
                    {partner.area}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {partner.description}
                </p>
                <Link
                  href="/partners"
                  className="flex items-center gap-2 text-amber-600 font-bold text-sm hover:text-amber-500 transition-colors group"
                >
                  Learn About Partnerships{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...fadeInUp}
            className="mt-10 bg-slate-50 rounded-2xl p-8 border border-slate-200"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-amber-50 rounded-xl p-3">
                  <Heart className="text-amber-500" size={24} />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg">
                    Your Organization Could Be Next
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Join a growing list of organizations building real community impact with PUN.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 bg-amber-500 text-slate-900 font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Start a Partnership
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        eyebrow="Join the Impact"
        title="Your Partnership Becomes Part of This Story"
        description="Every statistic on this page was made possible by organizations willing to invest in real community infrastructure. Your partnership adds to this legacy — and your name stands behind outcomes that matter."
        ctaText="Become a Partner"
        ctaHref="/contact"
        secondaryCtaText="View Partnership Models"
        secondaryCtaHref="/partners"
        dark={false}
      />
    </>
  );
}
