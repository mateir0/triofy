import type { Metadata } from "next";
import { caseStudies } from "@/content/work";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = createMetadata(
  "Our Work",
  "Explore our portfolio of brand transformations, performance marketing campaigns, and web design projects."
);

export default function WorkPage() {
  return (
    <>
      <SectionWrapper background="default" className="pt-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">Our Work</h1>
          <p className="text-[#A7B0B8] text-lg sm:text-xl max-w-2xl mx-auto">
            Real brands. Real results. See how we&apos;ve helped ambitious companies grow.
          </p>
        </div>
      </SectionWrapper>
      <WorkPageClient studies={caseStudies} />
      <SectionWrapper background="muted">
        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-4">Want Results Like These?</h2>
          <p className="text-[#A7B0B8] mb-8">Let&apos;s talk about your brand growth goals.</p>
          <Button href="/contact" variant="primary" size="lg">Start a Project</Button>
        </div>
      </SectionWrapper>
    </>
  );
}
