interface BadgeProps {
  children: React.ReactNode;
  variant?: "sale" | "new" | "soldOut" | "featured" | "limited";
  className?: string;
}

const variants = {
  sale: "bg-espresso text-paper",
  new: "bg-apricot-deep text-white",
  soldOut: "bg-ink-subtle text-white",
  featured: "bg-peach-soft text-espresso border border-border-soft",
  limited: "bg-ocean text-white",
};

export default function Badge({ children, variant = "sale", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-[10px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.14em] rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
