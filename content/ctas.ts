import type { CTA } from "@/types";

export const ctas = {
  primary: { label: "Start a Project", href: "/contact", variant: "primary" } as CTA,
  secondary: { label: "View Our Work", href: "/work", variant: "secondary" } as CTA,
  bookCall: { label: "Book a Call", href: "/contact", variant: "primary" } as CTA,
  getQuote: { label: "Get a Quote", href: "/contact", variant: "primary" } as CTA,
  learnMore: { label: "Learn More", href: "/about", variant: "ghost" } as CTA,
  seeWork: { label: "See All Work", href: "/work", variant: "secondary" } as CTA,
  allServices: { label: "All Services", href: "/services", variant: "secondary" } as CTA,
} as const;
