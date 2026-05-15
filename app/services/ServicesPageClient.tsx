"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";
import type { Service, ServiceCategory } from "@/types";

interface ServicesPageClientProps {
  services: Service[];
}

const categories: ServiceCategory[] = [
  "Web Development",
  "Graphic Design",
  "Game Development",
  "Social Media Management / Marketing",
  "UI/UX Design",
  "Custom Solutions",
];

export default function ServicesPageClient({ services }: ServicesPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | "All">("All");

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section className="py-12 bg-[#0E1A24]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all min-h-11 ${
              activeCategory === "All"
                ? "bg-[#F4C542] text-[#0E1A24]"
                : "border border-white/20 text-[#A7B0B8] hover:border-[#F4C542]/50 hover:text-white"
            }`}
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all min-h-11 ${
                  activeCategory === cat
                    ? "bg-[#F4C542] text-[#0E1A24]"
                    : "border border-white/20 text-[#A7B0B8] hover:border-[#F4C542]/50 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} variant="solid" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
