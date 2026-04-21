// Payment method badges — pure SVG marks (no brand-image downloads).
// Renders subtle, monochromatic ink-muted icons to avoid trademark-heavy brand art.

const methods: { label: string; text: string }[] = [
  { label: "Visa", text: "VISA" },
  { label: "Mastercard", text: "MC" },
  { label: "American Express", text: "AMEX" },
  { label: "Discover", text: "DISC" },
  { label: "Apple Pay", text: "Pay" },
  { label: "Shop Pay", text: "Shop" },
  { label: "Google Pay", text: "GPay" },
  { label: "PayPal", text: "PayPal" },
];

export default function PaymentIconsRow() {
  return (
    <ul className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
      {methods.map((m) => (
        <li
          key={m.label}
          title={m.label}
          aria-label={m.label}
          className="inline-flex items-center justify-center h-6 px-2 rounded-[4px] border border-border-soft bg-white text-[10px] font-semibold tracking-wide text-ink-muted"
        >
          {m.text}
        </li>
      ))}
    </ul>
  );
}
