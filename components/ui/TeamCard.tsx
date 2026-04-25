"use client";

import { motion } from "framer-motion";
import type { TeamMember } from "@/types";

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center rounded-2xl bg-[#132331] border border-white/10 p-8"
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F4C542] to-[#e6b83c] flex items-center justify-center text-[#0E1A24] text-3xl font-black mb-4">
        {member.name[0]}
      </div>
      <h3 className="text-white font-semibold text-xl mb-1">{member.name}</h3>
      <p className="text-[#F4C542] text-sm font-medium mb-4">{member.role}</p>
      <p className="text-[#A7B0B8] text-sm leading-relaxed mb-6">{member.bio}</p>
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[#A7B0B8] hover:text-[#F4C542] transition-colors text-sm"
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>
    </motion.div>
  );
}
