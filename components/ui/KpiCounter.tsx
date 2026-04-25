"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Stat } from "@/types";

interface KpiCounterProps {
  stat: Stat;
  delay?: number;
}

export default function KpiCounter({ stat, delay = 0 }: KpiCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");

  const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, "")) || 0;
  const hasNonNumeric = /[A-Za-z]/.test(stat.value);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        motionValue.set(numericValue);
      }, delay);
    }
  }, [inView, numericValue, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (hasNonNumeric) {
        setDisplayValue(latest.toFixed(0));
      } else {
        setDisplayValue(latest.toFixed(0));
      }
    });
    return unsubscribe;
  }, [springValue, hasNonNumeric]);

  const formattedValue = hasNonNumeric
    ? stat.value.replace(numericValue.toString(), displayValue)
    : displayValue;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
        {stat.suffix === "$" && <span className="text-[#F4C542]">$</span>}
        {formattedValue}
        {stat.suffix && stat.suffix !== "$" && (
          <span className="text-[#F4C542]">{stat.suffix}</span>
        )}
      </div>
      <p className="text-[#A7B0B8] text-sm font-medium">{stat.label}</p>
    </motion.div>
  );
}
