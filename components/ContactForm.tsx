"use client";

import { useState } from "react";

const partnershipTypes = [
  "Brand",
  "Foundation",
  "Sports Team",
  "Developer",
  "City / Government",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    organization: "",
    email: "",
    partnershipType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center text-center min-h-80">
        <div className="bg-amber-50 rounded-full p-5 mb-5">
          <svg
            className="w-10 h-10 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          Message Received
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-sm">
          Thank you for reaching out. Our team will be in touch within 2
          business days to discuss how we can build something meaningful
          together.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            placeholder="Acme Foundation"
            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Email Address <span className="text-amber-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="jane@example.com"
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Partnership Type <span className="text-amber-500">*</span>
        </label>
        <select
          name="partnershipType"
          required
          value={form.partnershipType}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-white"
        >
          <option value="" disabled>
            Select a partnership type
          </option>
          {partnershipTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          Message <span className="text-amber-500">*</span>
        </label>
        <textarea
          name="message"
          required
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your organization and how you'd like to partner with Pull Up Neighbor..."
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-500 text-slate-900 font-bold py-4 rounded-lg hover:bg-amber-400 transition-colors duration-200 text-base"
      >
        Send Message
      </button>
    </form>
  );
}
