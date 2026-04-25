"use client";

import { motion } from "framer-motion";
import CaseStudyCard from "@/components/ui/CaseStudyCard";
import Button from "@/components/ui/Button";
import { caseStudies } from "@/content/work";
import type { homeContent } from "@/content/home";

type WorkSection = typeof homeContent.sections.work;

interface FeaturedWorkProps {
  content: WorkSection;
}

export default function FeaturedWork({ content }: FeaturedWorkProps) {
  const featured = caseStudies.filter((s) => s.featured).slice(0, content.limit);

  return (
    <section className="py-20 md:py-28 bg-[#132331]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{content.heading}</h2>
          <p className="text-[#A7B0B8] text-lg">{content.subheading}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featured.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>
        <div className="text-center">
          <Button href="/work" variant="secondary">See All Work</Button>
        </div>
      </div>
    </section>
  );
}
