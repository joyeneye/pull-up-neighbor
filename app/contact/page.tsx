"use client";

import { motion } from "framer-motion";
import {
  Globe,
  BookOpen,
  Users,
  Building2,
  DollarSign,
  Layers,
  Mail,
  ArrowRight,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/CTASection";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const partnerTypes = [
  { icon: Globe, label: "Brand Partners" },
  { icon: BookOpen, label: "Foundations" },
  { icon: Users, label: "Sports Teams & Leagues" },
  { icon: Building2, label: "Developers & CDFIs" },
  { icon: DollarSign, label: "City & Government" },
  { icon: Layers, label: "Strategic Investors" },
];

const reasons = [
  "You want authentic community access — not just a logo placement.",
  "You have capital and want to put it where it produces real outcomes.",
  "You're building or investing in affordable housing and need a trusted community operator.",
  "You believe in civic participation as a fundamental right and want to help fund it.",
  "You're a sports organization ready to move beyond charity into community investment.",
  "You run a foundation looking for a proven operator with transparent impact reporting.",
];

export default function ContactPage() {
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
            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full inline-block mb-6">
              Partner With PUN
            </span>
            <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-5">
              Let&apos;s Build{" "}
              <span className="text-amber-500">Something Real</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              Whether you represent a brand, a foundation, a city, or an investment
              firm — if you&apos;re serious about community impact, we want to talk.
              Fill out the form and our team will be in touch within 2 business days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Info */}
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-8">
              {/* Why reach out */}
              <div>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                  Is This For You?
                </p>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-5">
                  Reach Out If...
                </h2>
                <ul className="space-y-3">
                  {reasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-3">
                      <ArrowRight
                        className="text-amber-500 flex-shrink-0 mt-0.5"
                        size={16}
                      />
                      <span className="text-slate-600 text-sm leading-relaxed">
                        {reason}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Partner Types */}
              <div>
                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                  We Work With
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {partnerTypes.map((pt) => (
                    <div
                      key={pt.label}
                      className="flex items-center gap-2.5 bg-white border border-slate-200 rounded-xl px-4 py-3"
                    >
                      <pt.icon className="text-amber-500 flex-shrink-0" size={16} />
                      <span className="text-slate-700 text-xs font-semibold">
                        {pt.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-slate-900 rounded-2xl p-7">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-4">
                  Direct Contact
                </p>
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="text-amber-500 flex-shrink-0" size={18} />
                  <a
                    href="mailto:hello@pullupneighbor.org"
                    className="text-white text-sm hover:text-amber-400 transition-colors font-medium"
                  >
                    hello@pullupneighbor.org
                  </a>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mt-4">
                  For press inquiries, media requests, or speaking engagements,
                  please indicate your needs in the message field.
                </p>
              </div>

              {/* Response Time */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <p className="text-amber-700 font-bold text-sm mb-2">
                  Response Time
                </p>
                <p className="text-amber-800 text-sm leading-relaxed">
                  Our team responds to all partnership inquiries within{" "}
                  <strong>2 business days</strong>. For urgent matters, indicate
                  the time sensitivity in your message.
                </p>
              </div>
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
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                  Tell Us About Your Organization
                </h2>
                <p className="text-slate-600 text-sm">
                  The more context you share, the better we can prepare for our first conversation.
                </p>
              </div>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ / What Happens Next */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
              What to Expect
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What Happens After You Reach Out
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Initial Response",
                description:
                  "A member of our partnerships team reviews your inquiry and responds within 2 business days with initial thoughts and next steps.",
              },
              {
                step: "02",
                title: "Discovery Call",
                description:
                  "We schedule a 30-minute call to understand your goals, your organization's mission, and where the alignment with PUN's work is strongest.",
              },
              {
                step: "03",
                title: "Partnership Proposal",
                description:
                  "Based on our conversation, we develop a custom partnership framework — programs, investment, structure, and expected outcomes.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="bg-amber-500 text-slate-900 font-black text-xl w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Already Know What You Want?"
        title="Let&apos;s Skip the Small Talk"
        description="If you're ready to commit to a partnership conversation — not just an exploratory email — tell us that in your message. We'll prioritize getting you in front of the right people immediately."
        ctaText="Send Us a Message"
        ctaHref="#contact-form"
        dark={true}
      />
    </>
  );
}
