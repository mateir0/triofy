"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/content/process";
import type { homeContent } from "@/content/home";

type ProcessSectionContent = typeof homeContent.sections.process;

interface ProcessSectionProps {
  content: ProcessSectionContent;
}

export default function ProcessSection({ content }: ProcessSectionProps) {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="bg-[#132331] rounded-2xl p-8 border border-white/10 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <span className="text-6xl font-black text-white/5 leading-none">
                    {String(step.step).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-[#A7B0B8] text-sm leading-relaxed">{step.description}</p>
              </div>
              {i < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-[#F4C542]/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
