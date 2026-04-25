"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FAQ } from "@/types";

interface FaqAccordionProps {
  faqs: FAQ[];
  allowMultiple?: boolean;
}

export default function FaqAccordion({ faqs, allowMultiple = false }: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openIds.has(faq.id);
        return (
          <div
            key={faq.id}
            className="rounded-xl border border-white/10 bg-[#132331] overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-6 text-left"
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
            >
              <span className="text-white font-medium pr-4">{faq.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#F4C542] flex-shrink-0 text-2xl leading-none"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-[#A7B0B8] leading-relaxed text-sm border-t border-white/10 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
