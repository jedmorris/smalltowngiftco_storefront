interface GoldBowProps {
  width?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export default function GoldBow({ width = 92, color = "#B8935A", opacity = 1, className = "" }: GoldBowProps) {
  return (
    <svg
      width={width}
      height={width * 0.28}
      viewBox="0 0 200 56"
      fill="none"
      className={className}
      style={{ opacity, display: "block" }}
      aria-hidden="true"
    >
      <line x1="6" y1="30" x2="76" y2="30" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="124" y1="30" x2="194" y2="30" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      {/* left loop */}
      <path d="M100 30 C 88 14, 70 14, 76 30 C 70 46, 88 46, 100 30 Z" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      {/* right loop */}
      <path d="M100 30 C 112 14, 130 14, 124 30 C 130 46, 112 46, 100 30 Z" stroke={color} strokeWidth="1.2" fill="none" strokeLinejoin="round" />
      {/* knot */}
      <path d="M96 25 C 98 28, 102 28, 104 25 L 104 35 C 102 32, 98 32, 96 35 Z" stroke={color} strokeWidth="1.1" fill="none" strokeLinejoin="round" />
      {/* tails */}
      <path d="M96 36 C 93 44, 90 48, 86 52" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <path d="M104 36 C 107 44, 110 48, 114 52" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" />
    </svg>
  );
}
