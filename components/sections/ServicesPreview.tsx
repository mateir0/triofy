"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";
import Button from "@/components/ui/Button";
import { servicesContent } from "@/content/services";
import type { homeContent } from "@/content/home";

type ServicesSection = typeof homeContent.sections.services;

interface ServicesPreviewProps {
  content: ServicesSection;
}

export default function ServicesPreview({ content }: ServicesPreviewProps) {
  const displayServices = content.showAll ? servicesContent : servicesContent.slice(0, 4);

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
          <p className="text-[#A7B0B8] text-lg max-w-2xl mx-auto">{content.subheading}</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayServices.map((service) => (
            <ServiceCard key={service.id} service={service} variant="glass" />
          ))}
        </div>
        <div className="text-center">
          <Button href="/services" variant="secondary" size="md">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
