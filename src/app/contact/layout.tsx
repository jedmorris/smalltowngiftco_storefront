import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with The Small Town Gift Co. Questions, orders, or just saying hello — reach out anytime.",
  openGraph: {
    title: "Contact Us | The Small Town Gift Co.",
    description: "Questions, orders, or just saying hello — reach out anytime.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
