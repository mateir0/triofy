import type { Service } from "@/types";

export const servicesContent: Service[] = [
  {
    id: "branding",
    title: "Brand Strategy & Identity",
    slug: "branding",
    category: "Branding",
    description:
      "We craft compelling brand identities that resonate with your audience and differentiate you in the market.",
    icon: "✦",
    features: [
      "Brand positioning & messaging",
      "Visual identity & logo design",
      "Brand guidelines & style guide",
      "Tone of voice development",
      "Competitive analysis",
    ],
    colorAccent: "#F4C542",
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    slug: "performance-marketing",
    category: "Performance Marketing",
    description:
      "Data-driven paid media campaigns that maximize ROI across Google, Meta, and beyond.",
    icon: "◈",
    features: [
      "Google Ads & PPC management",
      "Meta & social paid advertising",
      "Conversion rate optimization",
      "A/B testing & optimization",
      "Analytics & reporting dashboards",
    ],
    colorAccent: "#3B82F6",
  },
  {
    id: "web-design",
    title: "Web Design & Development",
    slug: "web-design",
    category: "Web Design & Development",
    description:
      "High-performance websites and landing pages built to convert visitors into customers.",
    icon: "⬡",
    features: [
      "Custom website design",
      "Landing page development",
      "E-commerce solutions",
      "Performance optimization",
      "CMS integration",
    ],
    colorAccent: "#22C55E",
  },
  {
    id: "content-creative",
    title: "Content & Creative",
    slug: "content-creative",
    category: "Content & Creative",
    description:
      "Compelling content that tells your story, builds authority, and drives organic growth.",
    icon: "◐",
    features: [
      "Content strategy & planning",
      "Copywriting & SEO content",
      "Social media management",
      "Video production & editing",
      "Graphic design & illustration",
    ],
    colorAccent: "#EC4899",
  },
  {
    id: "automation",
    title: "Automation & Funnel Ops",
    slug: "automation",
    category: "Automation / Funnel Ops",
    description:
      "Streamline your growth with intelligent automation, funnels, and CRM integrations.",
    icon: "⟳",
    features: [
      "Marketing automation setup",
      "Sales funnel design & build",
      "CRM integration & optimization",
      "Email sequence development",
      "Lead scoring & nurturing",
    ],
    colorAccent: "#8B5CF6",
  },
];
