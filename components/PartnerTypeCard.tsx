import { type LucideIcon } from "lucide-react";

interface PartnerTypeCardProps {
  icon: LucideIcon;
  type: string;
  description: string;
}

export default function PartnerTypeCard({
  icon: Icon,
  type,
  description,
}: PartnerTypeCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-amber-200 transition-all duration-300 group">
      <div className="bg-amber-50 group-hover:bg-amber-100 rounded-xl p-3 inline-flex mb-4 transition-colors duration-300">
        <Icon className="text-amber-500" size={24} />
      </div>
      <h3 className="text-slate-900 font-bold text-lg mb-2">{type}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
