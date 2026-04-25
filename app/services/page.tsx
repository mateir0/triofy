import type { Metadata } from "next";
import { servicesContent } from "@/content/services";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = createMetadata(
  "Services",
  "Explore our full range of digital marketing services including branding, performance marketing, web design, content, and automation."
);

export default function ServicesPage() {
  return (
    <>
      <SectionWrapper background="default" className="pt-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">What We Do</h1>
          <p className="text-[#A7B0B8] text-xl max-w-2xl mx-auto">
            End-to-end brand growth solutions across every digital touchpoint.
          </p>
        </div>
      </SectionWrapper>
      <ServicesPageClient services={servicesContent} />
      <SectionWrapper background="gradient">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="text-[#A7B0B8] mb-8 max-w-xl mx-auto">
            Book a free strategy call and let&apos;s discuss how we can grow your brand.
          </p>
          <Button href="/contact" variant="primary" size="lg">Book a Free Call</Button>
        </div>
      </SectionWrapper>
    </>
  );
}
