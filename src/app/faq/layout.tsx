import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about shipping, returns, orders, and products at The Small Town Gift Co.",
  openGraph: {
    title: "FAQ | The Small Town Gift Co.",
    description: "Find answers to common questions about shipping, returns, and more.",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
