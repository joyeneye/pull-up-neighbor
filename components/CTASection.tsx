import Link from "next/link";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  dark?: boolean;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export default function CTASection({
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  dark = false,
  secondaryCtaText,
  secondaryCtaHref,
}: CTASectionProps) {
  if (dark) {
    // Amber background version
    return (
      <section className="bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {eyebrow && (
            <p className="text-slate-900/70 text-xs font-bold uppercase tracking-widest mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-5">
            {title}
          </h2>
          <p className="text-slate-800 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaHref}
              className="inline-block bg-slate-900 text-white font-bold px-8 py-4 rounded-lg hover:bg-slate-800 transition-colors duration-200"
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-block border-2 border-slate-900 text-slate-900 font-bold px-8 py-4 rounded-lg hover:bg-slate-900 hover:text-white transition-colors duration-200"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Dark (slate-900) background version
  return (
    <section className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {eyebrow && (
          <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-5">
          {title}
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ctaHref}
            className="inline-block bg-amber-500 text-slate-900 font-bold px-8 py-4 rounded-lg hover:bg-amber-400 transition-colors duration-200"
          >
            {ctaText}
          </Link>
          {secondaryCtaText && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className="inline-block border border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white hover:text-slate-900 transition-colors duration-200"
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
