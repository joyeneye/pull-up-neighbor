"use client";

import { useState } from "react";
import { type LucideIcon, ChevronDown, ChevronUp } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  why?: string;
  howToPartner?: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  why,
  howToPartner,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = why || howToPartner;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-amber-50 rounded-xl p-3 flex-shrink-0">
          <Icon className="text-amber-500" size={24} />
        </div>
        <div>
          <h3 className="text-slate-900 font-bold text-lg leading-snug">{title}</h3>
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-4">{description}</p>

      {hasMore && (
        <>
          {expanded && (
            <div className="border-t border-slate-100 pt-4 mt-2 space-y-4">
              {why && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                    Why It Matters
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{why}</p>
                </div>
              )}
              {howToPartner && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">
                    How to Partner
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{howToPartner}</p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-auto pt-4 flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp size={16} />
              </>
            ) : (
              <>
                Learn More <ChevronDown size={16} />
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
