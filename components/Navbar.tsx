"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Programs", href: "/programs" },
  { label: "Impact", href: "/impact" },
  { label: "Partners", href: "/partners" },
  { label: "Vision", href: "/vision" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white transition-shadow duration-300 ${
        scrolled ? "shadow-xl shadow-black/30" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-amber-500 font-black text-2xl tracking-tight">
              PUN
            </span>
            <span className="hidden sm:block text-white font-semibold text-sm tracking-wide">
              Pull Up Neighbor
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="bg-amber-500 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-amber-400 transition-colors duration-200"
            >
              Partner With Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pb-6 pt-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2.5 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-amber-500 text-slate-900 font-bold text-sm px-5 py-3 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
