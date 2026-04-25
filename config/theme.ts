import { z } from "zod";

export const theme = {
  colors: {
    bg: "#0E1A24",
    surface: "#132331",
    primary: "#F4C542",
    secondary: "#3B82F6",
    text: "#F8FAFC",
    mutedText: "#A7B0B8",
    border: "rgba(255,255,255,0.12)",
    success: "#22C55E",
    warning: "#F59E0B",
  },
  typography: {
    fontSans: "Inter, system-ui, sans-serif",
    fontMono: "JetBrains Mono, monospace",
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },
    weights: { normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
    lineHeights: { tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625 },
  },
  spacing: { 0: "0", 1: "0.25rem", 2: "0.5rem", 4: "1rem", 6: "1.5rem", 8: "2rem", 12: "3rem", 16: "4rem", 20: "5rem", 24: "6rem" },
  radius: { none: "0", sm: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", full: "9999px" },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 6px rgba(0,0,0,0.4)",
    lg: "0 10px 15px rgba(0,0,0,0.5)",
    xl: "0 20px 25px rgba(0,0,0,0.6)",
    glow: "0 0 20px rgba(244,197,66,0.3)",
  },
  animation: {
    duration: { fast: 150, normal: 300, slow: 500, slower: 800 },
    easing: { ease: "ease", easeIn: "ease-in", easeOut: "ease-out", spring: [0.175, 0.885, 0.32, 1.275] },
  },
  container: { maxWidth: "1280px", padding: "1.5rem" },
  motion: { level: "medium" as "low" | "medium" | "high", disableOnMobile: false },
} as const;

export const cssVars = {
  bg: "--bg",
  surface: "--surface",
  primary: "--primary",
  secondary: "--secondary",
  text: "--text",
  mutedText: "--muted-text",
  border: "--border",
  success: "--success",
  warning: "--warning",
} as const;

export const ThemeConfigSchema = z.object({
  motion: z.object({
    level: z.enum(["low", "medium", "high"]),
    disableOnMobile: z.boolean(),
  }),
});
