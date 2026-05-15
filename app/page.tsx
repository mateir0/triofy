import { homeContent } from "@/content/home";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import ServicesPreview from "@/components/sections/ServicesPreview";
import FeaturedWork from "@/components/sections/FeaturedWork";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import StatsSection from "@/components/sections/StatsSection";
import FinalCta from "@/components/sections/FinalCta";
import SceneWrapper from "@/components/3d/SceneWrapper";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { faqs } from "@/content/faqs";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

const { sections } = homeContent;

export default function HomePage() {
  return (
    <>
      {sections.hero.enabled && (
        <Hero content={sections.hero} SceneComponent={SceneWrapper} />
      )}
      {sections.intro.enabled && (
        <SectionWrapper background="muted">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
              {sections.intro.heading}
            </h2>
            <p className="text-[#A7B0B8] text-base sm:text-lg leading-relaxed mb-8">
              {sections.intro.body}
            </p>
            <Button href={sections.intro.cta.href} variant="secondary">
              {sections.intro.cta.label}
            </Button>
          </div>
        </SectionWrapper>
      )}
      {sections.socialProof.enabled && (
        <SocialProof content={sections.socialProof} />
      )}
      {sections.services.enabled && (
        <ServicesPreview content={sections.services} />
      )}
      {sections.work.enabled && (
        <FeaturedWork content={sections.work} />
      )}
      {sections.process.enabled && (
        <ProcessSection content={sections.process} />
      )}
      {sections.testimonials.enabled && (
        <TestimonialsSection content={sections.testimonials} />
      )}
      {sections.stats.enabled && (
        <StatsSection content={sections.stats} />
      )}
      <SectionWrapper background="muted" id="faq">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <FaqAccordion faqs={faqs} />
        </div>
      </SectionWrapper>
      {sections.finalCta.enabled && (
        <FinalCta content={sections.finalCta} />
      )}
    </>
  );
}
