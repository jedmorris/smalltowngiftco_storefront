import Link from "next/link";

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-lg lg:text-2xl",
} as const;

interface TextLogoProps {
  size?: keyof typeof sizeClasses;
  className?: string;
  asLink?: boolean;
}

export default function TextLogo({ size = "md", className = "", asLink = true }: TextLogoProps) {
  const logo = (
    <span
      className={`font-serif font-bold text-brand-charcoal whitespace-nowrap ${sizeClasses[size]} ${className}`}
    >
      The Small Town Gift Co.
    </span>
  );

  if (asLink) {
    return <Link href="/">{logo}</Link>;
  }

  return logo;
}
