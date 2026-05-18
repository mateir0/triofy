import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { site } from "@/config/site";
import { defaultSeo } from "@/config/seo";

export const metadata: Metadata = {
  title: { default: defaultSeo.defaultTitle, template: defaultSeo.titleTemplate },
  description: defaultSeo.description,
  metadataBase: new URL(site.url),
  openGraph: {
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: defaultSeo.twitterCard,
    site: defaultSeo.twitterSite,
  },
  robots: defaultSeo.robots,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0E1A24] text-[#F8FAFC] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
