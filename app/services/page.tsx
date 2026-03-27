"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Shield,
  Megaphone,
  Vote,
  GraduationCap,
  Network,
  CheckCircle2,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CTASection from "@/components/CTASection";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const services = [
  {
    id: "housing",
    icon: Building2,
    title: "Affordable Housing Development",
    description:
      "PUN operates as a community-centered housing partner — working alongside developers, municipal agencies, CDFIs, and foundations to create affordable housing pipelines that actually reach the families who need them most.",
    why: "The affordable housing crisis is not a shortage of good intentions — it's a shortage of trusted operators who can move capital into communities at scale. PUN bridges the gap between institutional resources and community-level trust. We don't just build units; we build housing pathways for families who have historically been locked out of stable housing.",
    howToPartner:
      "Developers and financial institutions can engage PUN as a community co-developer, resident outreach partner, or pipeline coordinator. Cities and CDFIs can contract us for community-based housing access programming. Foundations can fund our Affordable Housing Initiative to expand capacity.",
    bullets: [
      "Community needs assessment and site analysis",
      "Resident outreach and placement services",
      "Affordable unit pipeline development",
      "Tenant advocacy and housing navigation",
      "Land acquisition partnerships",
      "Co-development with mission-aligned developers",
    ],
  },
  {
    id: "disaster",
    icon: Shield,
    title: "Disaster Response & Recovery",
    description:
      "When disaster strikes, PUN deploys — with meals, supply kits, wellness services, and long-term rebuilding support. We maintain standing operational capacity specifically designed for rapid community-level response.",
    why: "Government and traditional aid organizations are essential but often slow to reach the most isolated or distressed communities. PUN operates on the ground, through local networks, with the cultural credibility to go where other organizations can't. We've distributed 10M+ meals and 2M+ supply kits — and we don't stop when the news cycle does.",
    howToPartner:
      "Corporate partners can sponsor specific relief activations or fund our standing emergency response capacity. Foundations can support our year-round operational infrastructure. City agencies can engage us as a rapid-response community contractor during declared emergencies.",
    bullets: [
      "Rapid meal distribution operations",
      "Emergency supply kit deployment",
      "Community wellness and health services",
      "Coordination with local faith and civic institutions",
      "Long-term rebuilding and case management",
      "Volunteer coordination and logistics",
    ],
  },
  {
    id: "community",
    icon: Megaphone,
    title: "Community Engagement & Brand Integration",
    description:
      "PUN gives brands, sports organizations, and institutions authentic access to underserved communities through co-created activations, events, and programs that generate real impact — and real brand equity.",
    why: "Community trust is the rarest and most valuable asset in marketing. It cannot be bought — but it can be earned through authentic partnership with trusted community operators. PUN provides the bridge between corporate mission statements and community-level credibility, ensuring your brand shows up in a way that resonates and endures.",
    howToPartner:
      "Brands can sponsor activations, co-create community events, fund programs, or integrate their products and services into PUN's existing community touchpoints. We develop custom partnership frameworks based on your goals, audience, and budget.",
    bullets: [
      "Community event co-creation and production",
      "Brand activation through community programs",
      "Culturally resonant content development",
      "Ambassador and ambassador program development",
      "Impact measurement and storytelling",
      "Sports and entertainment community tie-ins",
    ],
  },
  {
    id: "voter",
    icon: Vote,
    title: "Voter Engagement & Civic Participation",
    description:
      "Through VoteHub and targeted civic engagement programs, PUN removes the structural barriers that prevent underserved communities from participating in democracy — from voter registration to poll access to civic education.",
    why: "Disenfranchisement is not accidental — it's the product of decades of systemic barriers. PUN attacks those barriers directly with technology, community education, and on-the-ground mobilization. We've registered 100,000+ voters and mobilized 150,000+ community members because we treat civic participation as a fundamental human right, not a seasonal campaign.",
    howToPartner:
      "Foundations and civic-minded brands can fund VoteHub expansion, voter registration drives, and civic education programs. Government agencies can engage us as a trusted community mobilization partner. Corporate sponsors can underwrite specific voter registration or civic education campaigns.",
    bullets: [
      "Voter registration drives",
      "VoteHub technology platform deployment",
      "Civic education curriculum and workshops",
      "Poll access and transportation programs",
      "Community mobilization and organizing",
      "Post-election civic engagement",
    ],
  },
  {
    id: "financial",
    icon: GraduationCap,
    title: "Financial Literacy & Youth Empowerment",
    description:
      "Next Gen Money and The Wealth Playbook are PUN's flagship financial empowerment programs — designed to move young people and families from financial survival to financial strategy through culturally relevant, practical curriculum.",
    why: "Financial literacy is not the absence of access to information — it's the absence of access to information that feels relevant and actionable. Generic financial education fails communities because it doesn't speak their language or account for their realities. PUN's curriculum is built from the ground up for the communities it serves — credit, investing, homeownership, and entrepreneurship, taught in a way that connects.",
    howToPartner:
      "Financial institutions, banks, and foundations can sponsor program delivery in schools, community centers, and churches. Corporate partners can integrate workforce financial wellness components. Investors can fund program expansion to new cities and cohorts.",
    bullets: [
      "Youth financial literacy curriculum (Next Gen Money)",
      "Adult wealth-building programs (The Wealth Playbook)",
      "Credit and debt management workshops",
      "Homeownership education and preparation",
      "Entrepreneurship and business basics",
      "Investment and wealth-building fundamentals",
    ],
  },
  {
    id: "strategic",
    icon: Network,
    title: "Strategic Community Initiatives",
    description:
      "PUN designs and executes custom community initiatives for partners who need a trusted operator with proven infrastructure — from multi-city rollouts to sustained community investment programs.",
    why: "Many organizations have the capital and the intention to make a difference in communities — but lack the relationships, cultural credibility, and operational infrastructure to execute well. PUN is the partner that turns vision into operations. We've built the trust, the networks, and the systems so our partners don't have to start from zero.",
    howToPartner:
      "Engage PUN as a strategic community partner for multi-year initiatives. We co-design programs, execute operations, measure outcomes, and provide transparent reporting. Partnership structures are customized based on scope, geography, and goals.",
    bullets: [
      "Custom community program design",
      "Multi-city initiative management",
      "Community needs assessment",
      "Stakeholder engagement and facilitation",
      "Impact measurement and reporting",
      "Long-term community investment strategy",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection
        badge="Our Services"
        title="Community Impact at Scale"
        subtitle="Six service areas. One integrated approach. PUN delivers real community outcomes — not programs on paper, but operations on the ground, backed by relationships built over years."
        ctaText="Partner With Us"
        ctaHref="/contact"
        secondaryCtaText="View Programs"
        secondaryCtaHref="/programs"
        accentWords={["Scale"]}
      />

      {/* Services Nav */}
      <section className="bg-white border-b border-slate-200 py-5 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 text-xs font-semibold text-slate-600 hover:text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-full border border-slate-200 hover:border-amber-200 transition-all whitespace-nowrap"
              >
                {s.title.split(" ")[0]} {s.title.split(" ")[1]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Service Sections */}
      {services.map((service, i) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-24 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-amber-50 rounded-xl p-3">
                    <service.icon className="text-amber-500" size={28} />
                  </div>
                  <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                    Service 0{i + 1}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-5">
                  {service.title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <CheckCircle2
                        className="text-amber-500 flex-shrink-0 mt-0.5"
                        size={18}
                      />
                      <span className="text-slate-700 text-sm">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-slate-900 rounded-2xl p-8">
                  <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                    Why It Matters
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm">{service.why}</p>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8">
                  <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
                    How to Partner
                  </p>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {service.howToPartner}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <CTASection
        eyebrow="Ready to Work Together?"
        title="Let's Build Something Real"
        description="Whether you're a brand, foundation, city, or developer — PUN has the infrastructure, the relationships, and the proven track record to make your community investment count."
        ctaText="Start the Conversation"
        ctaHref="/contact"
        secondaryCtaText="View Our Impact"
        secondaryCtaHref="/impact"
        dark={false}
      />
    </>
  );
}
