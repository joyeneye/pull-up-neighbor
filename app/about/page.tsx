"use client";

import { motion } from "framer-motion";
import { Target, Users, BarChart3, Heart, Lightbulb, Shield, Star } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const values = [
  {
    icon: Heart,
    title: "Radical Presence",
    description:
      "We show up before the crisis, during it, and long after the cameras leave. Presence is the foundation of trust.",
  },
  {
    icon: Target,
    title: "Outcomes Over Optics",
    description:
      "We measure success in families housed, voters registered, and meals delivered — not press releases or photo opportunities.",
  },
  {
    icon: Lightbulb,
    title: "Systems Thinking",
    description:
      "We build programs and partnerships designed to outlast us — because sustainable change requires infrastructure, not charity.",
  },
  {
    icon: Star,
    title: "Cultural Integrity",
    description:
      "Community trust is earned through cultural fluency, not marketing. We speak the language of the neighborhoods we serve.",
  },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        badge="About PUN"
        title="Built at the Intersection of Community, Capital & Culture"
        subtitle="Pull Up Neighbor is not a charity with a catchy name. We are a community infrastructure platform — combining grassroots credibility, strategic capital, and cultural relevance to drive outcomes that endure."
        ctaText="Explore Our Work"
        ctaHref="/services"
        secondaryCtaText="Partner With Us"
        secondaryCtaHref="/contact"
        accentWords={["Community,", "Capital", "Culture"]}
      />

      {/* Mission Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div {...fadeInUp}>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                Our Mission
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                A Platform, Not a Program
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  Pull Up Neighbor was founded on a simple but radical premise: the communities
                  that need the most resources are the ones most often excluded from the rooms
                  where decisions are made. We exist to close that gap — not with handouts, but
                  with infrastructure.
                </p>
                <p>
                  We operate across five interconnected pillars — housing, disaster recovery,
                  civic engagement, youth empowerment, and strategic partnerships — because no
                  single issue exists in isolation. A family without stable housing can&apos;t
                  vote reliably. A young person without financial literacy can&apos;t build
                  generational wealth. A community without civic participation can&apos;t
                  advocate for the resources it needs.
                </p>
                <p>
                  PUN connects those dots. We are the bridge between the community and the
                  capital it deserves — and the platform through which brands, foundations, cities,
                  and institutions can show up in ways that actually matter.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                The PUN Difference
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                We&apos;re an Ecosystem Builder
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>
                  Most nonprofits are built around a single program. PUN is built around a
                  community — and an ecosystem of programs, partnerships, and relationships
                  that reinforce each other.
                </p>
                <p>
                  When we run a disaster response operation, we&apos;re also registering
                  voters, distributing financial literacy materials, and connecting families
                  to housing resources. That integration is intentional. It&apos;s how we
                  produce outcomes instead of activities.
                </p>
                <p>
                  Our partners don&apos;t just write checks — they co-create. They gain
                  community credibility, program access, and impact data in exchange for
                  capital that goes directly into operations proven to work.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why PUN is Different */}
      <section id="why" className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Why PUN Is Different
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Three Things That Set Us Apart
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Thousands of organizations work in underserved communities.
              Very few operate at the intersection of all three pillars that drive lasting change.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: "Platform Thinking",
                description:
                  "We don't run isolated programs — we build systems. Each initiative connects to the others, creating compounding impact that a single-service model can never achieve. Our infrastructure is designed to scale alongside our partners.",
              },
              {
                icon: Users,
                title: "Community Trust",
                description:
                  "Trust is the most scarce resource in community work. We&apos;ve built it over years of consistent presence, cultural fluency, and keeping our promises. That trust is what makes our programs effective — and what our partners are accessing when they work with us.",
              },
              {
                icon: BarChart3,
                title: "Measurable Impact",
                description:
                  "We track everything. Meals distributed. Voters registered. Families housed. Vaccines administered. Our partners know exactly what their investment produced — because accountability isn't optional in our model, it's built in.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="bg-amber-50 rounded-xl p-3 inline-flex mb-5">
                  <item.icon className="text-amber-500" size={24} />
                </div>
                <h3 className="text-slate-900 font-black text-xl mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="mb-14">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              Our Values
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              What We Stand On
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-5 p-6 border border-slate-200 rounded-2xl hover:shadow-md transition-shadow"
              >
                <div className="bg-amber-50 rounded-xl p-3 h-fit flex-shrink-0">
                  <value.icon className="text-amber-500" size={22} />
                </div>
                <div>
                  <h3 className="text-slate-900 font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Context */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                Our Approach
              </p>
              <h2 className="text-4xl font-black text-white tracking-tight leading-tight mb-6">
                We Don&apos;t Just Serve Communities.{" "}
                <span className="text-amber-500">We Build With Them.</span>
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5">
                Every program, every partnership, every activation is designed with community
                input — not just for community consumption. The people we serve are our
                collaborators, not our beneficiaries.
              </p>
              <p className="text-slate-400 leading-relaxed">
                This approach takes longer. It requires deeper relationships and higher
                standards of accountability. But it produces outcomes that last — because
                the community is invested in them, not just receiving them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Shield, stat: "100+", label: "Cities Reached" },
                { icon: Users, stat: "1M+", label: "Lives Impacted" },
                { icon: Heart, stat: "10M+", label: "Meals Distributed" },
                { icon: Target, stat: "100K+", label: "Voters Registered" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-slate-800 rounded-2xl p-6 text-center border border-slate-700"
                >
                  <item.icon className="text-amber-500 mx-auto mb-3" size={24} />
                  <p className="text-3xl font-black text-amber-500 mb-1">{item.stat}</p>
                  <p className="text-slate-300 text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Join the Movement"
        title="Become a Partner"
        description="If you're serious about community impact — not just community presence — we should talk. PUN is the partner that turns your mission into momentum."
        ctaText="Start the Conversation"
        ctaHref="/contact"
        secondaryCtaText="View Our Programs"
        secondaryCtaHref="/programs"
        dark={false}
      />
    </>
  );
}
