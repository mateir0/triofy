"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ButtonVariant } from "@/types";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#F4C542] text-[#0E1A24] hover:bg-[#e6b83c] font-bold shadow-lg shadow-[#F4C542]/20",
  secondary: "border border-[#F4C542] text-[#F4C542] hover:bg-[#F4C542]/10 font-semibold",
  ghost: "text-[#A7B0B8] hover:text-white hover:bg-white/5 font-medium",
};

const sizeClasses = {
  sm: "px-4 min-h-11 text-sm rounded-lg",
  md: "px-6 min-h-11 text-base rounded-xl",
  lg: "px-8 min-h-12 text-lg rounded-xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  loading = false,
  disabled = false,
  className,
  iconLeft,
  iconRight,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) && "opacity-50 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        iconLeft
      )}
      {children}
      {!loading && iconRight}
    </>
  );

  if (href) {
    const isExternal = /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href);
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {isExternal ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
            {content}
          </a>
        ) : (
          <Link href={href} className={classes}>
            {content}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
