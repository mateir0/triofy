"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Service, CardVariant } from "@/types";

interface ServiceCardProps {
  service: Service;
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  glass: "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10",
  solid: "bg-[#132331] border border-white/10 hover:border-[#F4C542]/30",
  outlined: "bg-transparent border border-white/20 hover:border-[#F4C542]/50",
};

export default function ServiceCard({ service, variant = "glass" }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300 flex flex-col gap-4",
        variantClasses[variant]
      )}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${service.colorAccent}20`, color: service.colorAccent }}
      >
        {service.icon}
      </div>
      <div>
        <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
        <p className="text-[#A7B0B8] text-sm leading-relaxed">{service.description}</p>
      </div>
      <ul className="space-y-1.5">
        {service.features.slice(0, 3).map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-[#A7B0B8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4C542] flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href={`/services#${service.id}`}
        className="mt-auto text-sm font-medium"
        style={{ color: service.colorAccent }}
      >
        Learn more →
      </Link>
    </motion.div>
  );
}
