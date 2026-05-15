"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import type { homeContent } from "@/content/home";

type FinalCtaSection = typeof homeContent.sections.finalCta;

interface FinalCtaProps {
  content: FinalCtaSection;
}

export default function FinalCta({ content }: FinalCtaProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#132331] to-[#0E1A24]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6">
            {content.heading}
          </h2>
          <p className="text-[#A7B0B8] text-lg md:text-xl mb-10">{content.subheading}</p>
          <Button href={content.cta.href} variant="primary" size="lg">
            {content.cta.label}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
