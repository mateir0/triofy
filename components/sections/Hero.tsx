"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import type { homeContent } from "@/content/home";

type HeroSection = typeof homeContent.sections.hero;

interface HeroProps {
  content: HeroSection;
  SceneComponent?: React.ComponentType;
}

export default function Hero({ content, SceneComponent }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0E1A24]">
      {SceneComponent && (
        <div className="absolute inset-0 opacity-60">
          <SceneComponent />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0E1A24]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
          >
            {content.heading.split(" ").map((word, i) =>
              word === "Brands" ? (
                <span key={i} className="text-[#F4C542]">
                  {" "}
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{i === 0 ? word : ` ${word}`}</span>
              )
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#A7B0B8] text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            {content.subheading}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button href={content.primaryCta.href} variant="primary" size="lg">
              {content.primaryCta.label}
            </Button>
            <Button href={content.secondaryCta.href} variant="secondary" size="lg">
              {content.secondaryCta.label}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
