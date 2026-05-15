import type { Metadata } from "next";
import { servicesContent } from "@/content/services";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = createMetadata(
  "Services",
  "Explore Triofy services including web development, graphic design, game development, social media marketing, UI/UX design, and custom solutions."
);

export default function ServicesPage() {
  return (
    <>
      <SectionWrapper background="default" className="pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">What We Do</h1>
          <p className="text-[#A7B0B8] text-xl max-w-2xl mx-auto">
            Specialized services designed to solve growth, product, and conversion challenges.
          </p>
        </div>
      </SectionWrapper>
      <ServicesPageClient services={servicesContent} />
      <SectionWrapper background="gradient">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="text-[#A7B0B8] mb-8 max-w-xl mx-auto">
            Tell us your goals and we&apos;ll recommend the right service mix for your next growth stage.
          </p>
          <Button href="/contact" variant="primary" size="lg">Get a Quote</Button>
        </div>
      </SectionWrapper>
    </>
  );
}
