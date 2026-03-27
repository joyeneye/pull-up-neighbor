import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  name: string;
  tagline: string;
  description: string;
  pillars: string[];
  color?: string;
  href?: string;
}

export default function ProgramCard({
  name,
  tagline,
  description,
  pillars,
  color = "from-slate-800 to-slate-900",
  href = "/programs",
}: ProgramCardProps) {
  return (
    <div
      className={`bg-gradient-to-br ${color} text-white rounded-2xl p-8 flex flex-col justify-between min-h-72 hover:scale-[1.02] transition-transform duration-300`}
    >
      <div>
        <h3 className="text-2xl font-black tracking-tight mb-1">{name}</h3>
        <p className="text-amber-400 font-semibold text-sm mb-4">{tagline}</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {pillars.map((pillar) => (
            <span
              key={pillar}
              className="bg-white/10 border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              {pillar}
            </span>
          ))}
        </div>
      </div>

      <Link
        href={href}
        className="flex items-center gap-2 text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors group"
      >
        Learn More{" "}
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform"
        />
      </Link>
    </div>
  );
}
