export const homeContent = {
  sectionOrder: [
    "hero",
    "socialProof",
    "services",
    "work",
    "process",
    "testimonials",
    "stats",
    "finalCta",
  ] as const,
  sections: {
    hero: {
      enabled: true,
      heading: "We Grow Brands That Matter",
      subheading:
        "Triofy Agency blends data-driven strategy, bold creative, and cutting-edge technology to help ambitious brands scale faster.",
      primaryCta: { label: "Start a Project", href: "/contact" },
      secondaryCta: { label: "View Our Work", href: "/work" },
    },
    socialProof: {
      enabled: true,
      heading: "Trusted by companies worldwide",
    },
    services: {
      enabled: true,
      heading: "What We Do",
      subheading: "End-to-end brand growth across every digital touchpoint.",
      showAll: false,
    },
    work: {
      enabled: true,
      heading: "Featured Work",
      subheading: "Real results for real brands.",
      limit: 3,
    },
    process: {
      enabled: true,
      heading: "How We Work",
    },
    testimonials: {
      enabled: true,
      heading: "What Clients Say",
    },
    stats: {
      enabled: true,
      heading: "Results That Speak",
    },
    finalCta: {
      enabled: true,
      heading: "Ready to Grow?",
      subheading: "Let's build something remarkable together. Book a free strategy call today.",
      cta: { label: "Book a Call", href: "/contact" },
    },
  },
} as const;
