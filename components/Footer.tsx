import Link from "next/link";

const aboutLinks = [
  { label: "Our Story", href: "/about" },
  { label: "Mission & Values", href: "/about#values" },
  { label: "Why PUN Is Different", href: "/about#why" },
  { label: "Vision", href: "/vision" },
];

const programLinks = [
  { label: "VoteHub", href: "/programs#votehub" },
  { label: "Next Gen Money", href: "/programs#nextgenmoney" },
  { label: "The Wealth Playbook", href: "/programs#wealthplaybook" },
  { label: "Affordable Housing Initiative", href: "/programs#housing" },
  { label: "Disaster Response & Recovery", href: "/programs#disaster" },
];

const serviceLinks = [
  { label: "Affordable Housing Development", href: "/services#housing" },
  { label: "Disaster Response", href: "/services#disaster" },
  { label: "Community & Brand Integration", href: "/services#community" },
  { label: "Voter Engagement", href: "/services#voter" },
  { label: "Financial Literacy", href: "/services#financial" },
  { label: "Strategic Initiatives", href: "/services#strategic" },
];

const contactLinks = [
  { label: "Partner With Us", href: "/contact" },
  { label: "Partnership Types", href: "/partners" },
  { label: "Impact Report", href: "/impact" },
  { label: "Press Inquiries", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-amber-500 font-black text-2xl tracking-tight">
                PUN
              </span>
              <span className="text-white font-semibold text-sm tracking-wide">
                Pull Up Neighbor
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Community. Capital. Culture.
            </p>
            <p className="text-slate-500 text-xs leading-relaxed">
              Transforming communities through housing, disaster recovery,
              civic engagement, and youth empowerment.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-2.5">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-slate-500 text-xs">
                hello@pullupneighbor.org
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2024 Pull Up Neighbor. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Community. Capital. Culture.
          </p>
        </div>
      </div>
    </footer>
  );
}
