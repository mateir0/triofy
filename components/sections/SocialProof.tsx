"use client";

import { motion } from "framer-motion";
import type { homeContent } from "@/content/home";

type SocialProofSection = typeof homeContent.sections.socialProof;

interface SocialProofProps {
  content: SocialProofSection;
}

export default function SocialProof({ content }: SocialProofProps) {
  return (
    <section className="py-16 bg-[#132331] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[#A7B0B8] text-sm font-medium uppercase tracking-widest mb-10">
          {content.heading}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {content.logos.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-[#A7B0B8]/40 text-xl font-black tracking-wider hover:text-[#A7B0B8]/70 transition-colors"
            >
              {logo.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
