import Link from "next/link";
import GoldBow from "./GoldBow";

const sizeConfig = {
  sm: { base: "text-[13px]", big: "text-[23px]", bowWidth: 74 },
  md: { base: "text-[15px]", big: "text-[25px]", bowWidth: 80 },
  lg: { base: "text-[22px]", big: "text-[32px]", bowWidth: 102 },
} as const;

interface TextLogoProps {
  size?: keyof typeof sizeConfig;
  className?: string;
  asLink?: boolean;
  withBow?: boolean;
  color?: string;
}

export default function TextLogo({
  size = "md",
  className = "",
  asLink = true,
  withBow = true,
  color,
}: TextLogoProps) {
  const { base, big, bowWidth } = sizeConfig[size];
  const colorClass = color ? "" : "text-gold";

  const logo = (
    <span
      className={`font-serif font-semibold text-center leading-none inline-flex flex-col items-center ${colorClass} ${className}`}
      style={color ? { color } : undefined}
    >
      <span className={`${base} tracking-[0.26em] uppercase`}>THE</span>
      <span className={`${big} tracking-[0.05em] uppercase mt-[3px]`}>Small Town</span>
      <span className={`${base} tracking-[0.22em] uppercase mt-[3px]`}>GIFT CO.</span>
      {withBow && (
        <span className="mt-1">
          <GoldBow width={bowWidth} color={color || "#B8935A"} />
        </span>
      )}
    </span>
  );

  if (asLink) {
    return <Link href="/">{logo}</Link>;
  }

  return logo;
}
