interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

export default function StatCard({ value, label, description }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 hover:shadow-md transition-shadow duration-300">
      <p className="text-4xl sm:text-5xl font-black text-amber-500 tracking-tight mb-2">
        {value}
      </p>
      <p className="text-slate-900 font-bold text-base mb-1">{label}</p>
      {description && (
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      )}
    </div>
  );
}
