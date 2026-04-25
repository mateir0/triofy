"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/types";

interface CaseStudyCardProps {
  study: CaseStudy;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group rounded-2xl overflow-hidden bg-[#132331] border border-white/10 hover:border-[#F4C542]/30 transition-all duration-300"
    >
      <div className="relative h-56 bg-gradient-to-br from-[#132331] to-[#0E1A24] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl font-black text-white/5 select-none">{study.client[0]}</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#132331] via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="text-xs font-semibold bg-[#F4C542] text-[#0E1A24] px-3 py-1 rounded-full">
            {study.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-[#0E1A24]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/work/${study.slug}`}
            className="bg-[#F4C542] text-[#0E1A24] font-bold px-6 py-3 rounded-xl text-sm"
          >
            View Case Study →
          </Link>
        </div>
      </div>
      <div className="p-6">
        <p className="text-[#A7B0B8] text-xs font-medium mb-1">{study.client} · {study.year}</p>
        <h3 className="text-white font-semibold text-lg mb-2">{study.title}</h3>
        <p className="text-[#A7B0B8] text-sm leading-relaxed mb-4">{study.description}</p>
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-white/5 rounded-md text-[#A7B0B8] border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
