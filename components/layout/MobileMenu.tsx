"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { navItems } from "@/config/navigation";

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 bg-[#0E1A24] flex flex-col p-6"
    >
      <div className="flex items-center justify-between mb-12">
        <span className="text-2xl font-bold">
          <span className="text-[#F4C542]">Triofy</span>
          <span className="text-white"> Agency</span>
        </span>
        <button onClick={onClose} className="p-2 text-white min-w-11 min-h-11 inline-flex items-center justify-center" aria-label="Close menu">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <nav className="flex flex-col gap-6">
        {navItems.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="text-2xl font-semibold text-white hover:text-[#F4C542] transition-colors inline-flex items-center min-h-11"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className="mt-auto">
        <Link
          href="/contact"
          onClick={onClose}
          className="block w-full min-h-11 text-center bg-[#F4C542] text-[#0E1A24] font-bold py-3 rounded-xl text-lg"
        >
          Start a Project
        </Link>
      </div>
    </motion.div>
  );
}
