"use client";

import { motion } from "framer-motion";
import LogoMarquee from "@/components/ui/LogoMarquee";
import type { homeContent } from "@/content/home";

type SocialProofSection = typeof homeContent.sections.socialProof;

interface SocialProofProps {
  content: SocialProofSection;
}

export default function SocialProof({ content }: SocialProofProps) {
  return (
    <section className="py-16 bg-[#132331] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
            {content.heading}
          </h2>
        </motion.div>
        <LogoMarquee />
      </div>
    </section>
  );
}
