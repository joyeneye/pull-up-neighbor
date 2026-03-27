"use client";

import { motion } from "framer-motion";
import {
  Vote,
  DollarSign,
  BookOpen,
  Home,
  Shield,
  CheckCircle2,
  ArrowRight,
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

const programs = [
  {
    id: "votehub",
    icon: Vote,
    name: "VoteHub",
    tagline: "Civic technology for voter access",
    color: "bg-slate-900",
    textColor: "text-amber-400",
    description:
      "VoteHub is PUN's civic technology platform designed to eliminate structural barriers to voter participation for underserved communities. From registration to election day, VoteHub provides the tools, information, and support that ensure every eligible voter can exercise their right.",
    mission:
      "To make civic participation as accessible as possible for communities that have historically been disenfranchised — not just through registration, but through sustained civic education and mobilization.",
    pillars: ["Voter Registration Technology", "Civic Education", "Poll Access", "Community Mobilization"],
    impact: ["100,000+ voters registered", "150,000+ community members mobilized", "Deployed in 100+ cities"],
    partnerOpportunity:
      "Foundations and civic-minded corporations can sponsor VoteHub deployments in specific cities or communities. We can also work with employers to run voter registration programs for their workforces.",
  },
  {
    id: "nextgenmoney",
    icon: DollarSign,
    name: "Next Gen Money",
    tagline: "Financial literacy for the next generation",
    color: "bg-amber-500",
    textColor: "text-slate-900",
    description:
      "Next Gen Money is a financial literacy program built specifically for high school and college-aged youth — designed to be culturally relevant, practical, and immediately actionable. Students learn credit, saving, investing, and entrepreneurship through the lens of their own communities and aspirations.",
    mission:
      "To break the generational cycle of financial illiteracy by giving young people the knowledge, tools, and mindset to build wealth — before they make the mistakes that cost them decades.",
    pillars: ["Credit & Debt", "Saving & Investing", "Entrepreneurship", "Career Finance"],
    impact: ["Deployed in schools and community centers nationwide", "Thousands of youth graduates annually", "Industry partnerships for internship and career pathways"],
    partnerOpportunity:
      "Financial institutions, banks, and consumer brands can sponsor program delivery. Employers can fund workforce pipeline components. Foundations can support expansion to underserved school districts.",
  },
  {
    id: "wealthplaybook",
    icon: BookOpen,
    name: "The Wealth Playbook",
    tagline: "Economic mobility for families and communities",
    color: "bg-slate-800",
    textColor: "text-amber-400",
    description:
      "The Wealth Playbook is PUN's adult financial empowerment curriculum — a comprehensive program that moves families from financial survival to financial strategy. Delivered in community centers, churches, and workplaces, it covers credit building, homeownership, business formation, and investment fundamentals.",
    mission:
      "To give every community member the knowledge and tools to build a financial life — not just manage their money, but grow it, protect it, and pass it on.",
    pillars: ["Credit Building", "Homeownership Prep", "Business Development", "Wealth Building"],
    impact: ["Delivered across dozens of cities", "Connected participants to homebuying programs", "Spawned dozens of community-based businesses"],
    partnerOpportunity:
      "Banks and CDFIs can sponsor Wealth Playbook cohorts and connect graduates to their own financial products. Real estate developers can fund homeownership tracks. Corporations can offer it as a workforce benefit.",
  },
  {
    id: "housing",
    icon: Home,
    name: "Affordable Housing Initiative",
    tagline: "Housing access as a community right",
    color: "bg-slate-900",
    textColor: "text-amber-400",
    description:
      "The Affordable Housing Initiative is PUN's comprehensive approach to expanding access to stable, dignified housing for underserved communities. We operate across the entire housing spectrum — from tenant advocacy and navigation services to co-development of affordable units and land acquisition partnerships.",
    mission:
      "To make affordable, stable housing a real option — not a lottery — for families in the communities we serve, through advocacy, development partnerships, and direct housing access programming.",
    pillars: ["Tenant Advocacy", "Housing Navigation", "Affordable Unit Pipeline", "Co-Development"],
    impact: ["Hundreds of families placed in stable housing", "Active development partnerships in multiple cities", "Tenant advocacy serving thousands"],
    partnerOpportunity:
      "Developers can partner with us as a community co-developer or outreach partner. Cities can contract us for housing access programming. Foundations can fund tenant advocacy and housing navigation services.",
  },
  {
    id: "disaster",
    icon: Shield,
    name: "Disaster Response & Recovery Initiative",
    tagline: "Rapid relief. Long-term rebuilding.",
    color: "bg-slate-700",
    textColor: "text-amber-400",
    description:
      "The Disaster Response & Recovery Initiative is PUN's standing operational capacity for community-level disaster relief. We maintain the infrastructure, relationships, and logistics to deploy rapidly when communities are in crisis — with meals, supply kits, wellness services, and long-term rebuilding support that doesn't stop when the headlines do.",
    mission:
      "To ensure that no community faces a disaster alone — and that the relief provided is fast, culturally competent, and sustained long enough to actually help families rebuild.",
    pillars: ["Rapid Meal Distribution", "Supply Kit Deployment", "Community Health", "Long-term Rebuilding"],
    impact: ["10M+ meals distributed", "2M+ supply kits deployed", "15,000+ vaccinations administered", "Activated in disasters across the country"],
    partnerOpportunity:
      "Corporate partners can sponsor relief activations or fund standing capacity. Foundations can support year-round operational readiness. City agencies can pre-position PUN as a rapid-response community contractor.",
  },
];

export default function ProgramsPage() {
  return (
    <>
      <HeroSection
        badge="Our Programs"
        title="Five Programs. One Ecosystem."
        subtitle="PUN's programs don't operate in silos — they reinforce each other. Housing, civic engagement, financial literacy, and disaster relief work together because the communities we serve need them to."
        ctaText="Partner With a Program"
        ctaHref="/contact"
        secondaryCtaText="View Services"
        secondaryCtaHref="/services"
        accentWords={["Ecosystem."]}
      />

      {/* Programs Overview */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {programs.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-amber-600 border border-slate-200 hover:border-amber-300 hover:bg-amber-50 px-5 py-2.5 rounded-full transition-all"
              >
                <p.icon size={15} />
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Programs */}
      {programs.map((program, i) => (
        <section
          key={program.id}
          id={program.id}
          className={`py-24 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left: Content */}
              <motion.div {...fadeInUp} className="lg:col-span-3">
                <div
                  className={`${program.color} rounded-2xl p-6 inline-flex items-center gap-3 mb-6`}
                >
                  <program.icon className={program.textColor} size={24} />
                  <span className={`${program.textColor} font-black text-lg`}>
                    {program.name}
                  </span>
                </div>

                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
                  {program.tagline}
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
                  {program.name}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                  {program.description}
                </p>

                <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl pl-5 pr-4 py-4 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                    Our Mission
                  </p>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {program.mission}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Program Pillars
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {program.pillars.map((pillar) => (
                      <span
                        key={pillar}
                        className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right: Impact + Partner */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-5"
              >
                <div className="bg-slate-900 rounded-2xl p-7">
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                    Impact
                  </p>
                  <ul className="space-y-3">
                    {program.impact.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="text-amber-500 flex-shrink-0 mt-0.5"
                          size={16}
                        />
                        <span className="text-slate-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-7">
                  <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-3">
                    Partner Opportunity
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    {program.partnerOpportunity}
                  </p>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-500 transition-colors group"
                  >
                    Partner on {program.name}{" "}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <CTASection
        eyebrow="Get Involved"
        title="Find the Program That Fits Your Mission"
        description="Every PUN program has multiple pathways for partnership — funding, co-creation, sponsorship, or capacity building. Let's find the right fit for your organization."
        ctaText="Talk to Our Team"
        ctaHref="/contact"
        secondaryCtaText="View Our Services"
        secondaryCtaHref="/services"
        dark={false}
      />
    </>
  );
}
