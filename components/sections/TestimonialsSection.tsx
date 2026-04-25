"use client";

import { motion } from "framer-motion";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import { testimonials } from "@/content/testimonials";
import type { homeContent } from "@/content/home";

type TestimonialsSection = typeof homeContent.sections.testimonials;

interface TestimonialsSectionProps {
  content: TestimonialsSection;
}

export default function TestimonialsSection({ content }: TestimonialsSectionProps) {
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
        </motion.div>
        <TestimonialCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
