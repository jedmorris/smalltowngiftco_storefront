interface BadgeProps {
  children: React.ReactNode;
  variant?: "sale" | "new" | "soldOut" | "featured";
  className?: string;
}

const variants = {
  sale: "bg-brand-espresso text-white",
  new: "bg-brand-gold text-white",
  soldOut: "bg-gray-400 text-white",
  featured: "bg-brand-pink text-brand-charcoal border border-brand-gold/30",
};

export default function Badge({ children, variant = "sale", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
