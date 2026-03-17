import type { Metadata } from "next";
import BrandGuideContent from "./BrandGuideContent";

export const metadata: Metadata = {
  title: "Brand Guide",
  description:
    "Visual identity, components, and brand standards for The Small Town Gift Co.",
};

export default function BrandGuidePage() {
  return <BrandGuideContent />;
}
