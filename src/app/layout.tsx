import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Caveat } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { QuickViewProvider } from "@/context/QuickViewContext";
import { AuthProvider } from "@/context/AuthContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/product/QuickViewModal";
import CookieConsent from "@/components/ui/CookieConsent";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import Toaster from "@/components/ui/Toaster";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Small Town Gift Co. | Thoughtful Gifts for Every Occasion",
    template: "%s | The Small Town Gift Co.",
  },
  description:
    "Designer shirts, sweaters, and personalized gifts for bachelorette parties, weddings, and every celebration. Curated with love from our small town to yours.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://smalltowngiftco.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "The Small Town Gift Co.",
    type: "website",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#E39A6E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-apricot-deep focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <CartProvider>
          <WishlistProvider>
            <QuickViewProvider>
              <AuthProvider>
                <AnnouncementBar />
                <Header />
                <main id="main-content" className="min-h-screen">{children}</main>
                <Footer />
                <CartDrawer />
                <QuickViewModal />
                <CookieConsent />
                <GoogleAnalytics />
                <MetaPixel />
                <Toaster />
              </AuthProvider>
            </QuickViewProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
