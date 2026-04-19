import GoldBow from "./GoldBow";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 relative ${className}`}>
      <span className="text-apricot-deep text-[13px] tracking-[0.3em] uppercase font-medium">
        ✦
      </span>
      <h2 className="font-serif font-normal text-ink text-[clamp(1.75rem,1.3rem+1.5vw,2.25rem)] leading-[1.15] tracking-[-0.01em] mt-1.5 mb-1.5">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-muted mx-auto max-w-md text-[15px]">
          {subtitle}
        </p>
      )}
      <div className="flex justify-center items-center gap-2.5 mt-3.5">
        <span className="block w-10 h-px bg-gradient-to-r from-transparent to-gold" />
        <GoldBow width={36} opacity={0.85} />
        <span className="block w-10 h-px bg-gradient-to-l from-transparent to-gold" />
      </div>
    </div>
  );
}
