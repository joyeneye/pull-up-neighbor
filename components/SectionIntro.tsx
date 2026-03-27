interface SectionIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionIntroProps) {
  return (
    <div className={centered ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-5">
        {title}
      </h2>
      <p className="text-slate-600 text-lg leading-relaxed">{description}</p>
    </div>
  );
}
