export const homeContent = {
  sectionOrder: [
    "hero",
    "intro",
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
      secondaryCta: { label: "Get a Quote", href: "/contact" },
    },
    intro: {
      enabled: true,
      heading: "Meet Triofy Agency",
      body:
        "Triofy is a growth-focused digital agency built around a managed expert network. We combine senior strategy with specialist execution to help businesses launch faster, convert better, and scale sustainably.",
      cta: { label: "Contact Us", href: "/contact" },
    },
    socialProof: {
      enabled: true,
      heading: "Trusted by forward-thinking brands",
      logos: [
        { name: "TechCorp", placeholder: true },
        { name: "GrowthCo", placeholder: true },
        { name: "BrandX", placeholder: true },
        { name: "ScaleUp", placeholder: true },
        { name: "NovaCo", placeholder: true },
      ],
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
      subheading: "Let's build something remarkable together. Book a call or request a custom quote today.",
      cta: { label: "Book a Call", href: "/contact" },
    },
  },
} as const;
