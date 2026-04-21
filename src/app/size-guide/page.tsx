import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Find the perfect fit with our Comfort Colors® unisex sizing guide.",
  openGraph: {
    title: "Size Guide | The Small Town Gift Co.",
    description:
      "Find the perfect fit with our Comfort Colors® unisex sizing guide.",
  },
};

const UNISEX_TEES: { size: string; chest: string; length: string }[] = [
  { size: "XS", chest: "32–34", length: "27" },
  { size: "S", chest: "35–37", length: "28" },
  { size: "M", chest: "38–41", length: "29" },
  { size: "L", chest: "42–45", length: "30" },
  { size: "XL", chest: "46–49", length: "31" },
  { size: "2XL", chest: "50–53", length: "32" },
  { size: "3XL", chest: "54–57", length: "33" },
];

const YOUTH: { size: string; chest: string; length: string; age: string }[] = [
  { size: "XS", chest: "26–28", length: "21.5", age: "4–5" },
  { size: "S", chest: "28–30", length: "23", age: "6–7" },
  { size: "M", chest: "30–32", length: "24.5", age: "8–10" },
  { size: "L", chest: "32–34", length: "26", age: "11–12" },
];

export default function SizeGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-12">
        <span className="text-apricot-deep text-sm">✦</span>
        <h1 className="font-serif text-4xl lg:text-5xl text-ink mt-2 mb-4">
          Size guide
        </h1>
        <p className="text-ink-muted max-w-2xl mx-auto">
          Our tees and sweatshirts are unisex comfort-fit. All measurements in
          inches. If you&apos;re between sizes or prefer an oversized look, size up.
        </p>
        <div className="decorative-underline mx-auto" />
      </div>

      <section className="mb-14">
        <h2 className="font-serif text-2xl text-ink mb-4">Adult unisex tees & sweatshirts</h2>
        <div className="overflow-x-auto border border-border-soft rounded-[14px]">
          <table className="w-full text-sm">
            <thead className="bg-stucco">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-ink">Size</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">Chest (in)</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">Length (in)</th>
              </tr>
            </thead>
            <tbody>
              {UNISEX_TEES.map((r, i) => (
                <tr
                  key={r.size}
                  className={i % 2 === 0 ? "bg-paper" : "bg-paper-deep/40"}
                >
                  <td className="py-2.5 px-4 font-medium text-ink">{r.size}</td>
                  <td className="py-2.5 px-4 text-ink-muted">{r.chest}</td>
                  <td className="py-2.5 px-4 text-ink-muted">{r.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="font-serif text-2xl text-ink mb-4">Youth tees</h2>
        <div className="overflow-x-auto border border-border-soft rounded-[14px]">
          <table className="w-full text-sm">
            <thead className="bg-stucco">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-ink">Size</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">Age</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">Chest (in)</th>
                <th className="text-left py-3 px-4 font-semibold text-ink">Length (in)</th>
              </tr>
            </thead>
            <tbody>
              {YOUTH.map((r, i) => (
                <tr
                  key={r.size}
                  className={i % 2 === 0 ? "bg-paper" : "bg-paper-deep/40"}
                >
                  <td className="py-2.5 px-4 font-medium text-ink">{r.size}</td>
                  <td className="py-2.5 px-4 text-ink-muted">{r.age}</td>
                  <td className="py-2.5 px-4 text-ink-muted">{r.chest}</td>
                  <td className="py-2.5 px-4 text-ink-muted">{r.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="font-serif text-2xl text-ink mb-4">How to measure</h2>
        <ul className="text-ink-muted space-y-3 list-disc list-inside">
          <li>
            <strong className="text-ink">Chest:</strong> Measure around the
            fullest part of your chest, under the arms, keeping the tape level.
          </li>
          <li>
            <strong className="text-ink">Length:</strong> Measure from the
            highest point of the shoulder seam down to the bottom hem.
          </li>
          <li>
            <strong className="text-ink">Fit preference:</strong> Size up for a
            relaxed, oversized silhouette; size down for a slimmer fit.
          </li>
        </ul>
      </section>

      <section className="bg-stucco rounded-[18px] p-6 lg:p-10 text-center">
        <h2 className="font-serif text-2xl text-ink mb-2">Still unsure?</h2>
        <p className="text-ink-muted mb-5 max-w-xl mx-auto">
          Shoot us a note and we&apos;ll help you dial in the right size. We
          stand behind our Love It Guarantee — if a fit isn&apos;t right, we&apos;ll
          make it right.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 bg-apricot-deep text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-apricot-deep/90 transition-colors no-underline"
        >
          Contact us
        </Link>
      </section>
    </div>
  );
}
