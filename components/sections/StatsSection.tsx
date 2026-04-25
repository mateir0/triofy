"use client";

import { motion } from "framer-motion";
import KpiCounter from "@/components/ui/KpiCounter";
import { stats } from "@/content/stats";
import type { homeContent } from "@/content/home";

type StatsSection = typeof homeContent.sections.stats;

interface StatsSectionProps {
  content: StatsSection;
}

export default function StatsSection({ content }: StatsSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-[#0E1A24]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{content.heading}</h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <KpiCounter key={stat.label} stat={stat} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
