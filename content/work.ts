import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "exosomes-course",
    slug: "exosomes-course",
    title: "Exosomes Course Production",
    client: "Ahmed (Freelancer)",
    category: "AI Video Production",
    tags: ["AI Video", "Course Production", "Script-to-Video", "Post-Production"],
    description: "Produced a concise 35-minute exosomes course using AI-assisted video workflows.",
    challenge: "The client needed a clear, compact course that explained complex exosomes concepts in a short runtime.",
    solution: "We structured the lesson flow, created AI-assisted visuals, and delivered a polished final cut.",
    results: [
      "35-minute exosomes course delivered",
      "AI-enhanced visuals and pacing optimized",
      "Ready-to-publish lesson package",
    ],
    heroImage: "/images/placeholder.jpg",
    gallery: ["/images/placeholder.jpg"],
    featured: true,
    year: 2026,
  },
  {
    id: "khuzama-social",
    slug: "khuzama-social",
    title: "Social Media Marketing",
    client: "Engr. Khuzama Tahir",
    category: "Marketing",
    tags: ["Social Media", "Content Strategy", "Community Growth"],
    description: "Managing an Islamic tutor’s social presence to grow awareness and student inquiries.",
    challenge: "The tutor needed consistent, trustworthy content to attract and convert interested students.",
    solution: "We manage the content calendar, produce posts, and optimize messaging for engagement.",
    results: [
      "Delivered 70+ students to Engr. Khuzama Tahir",
      "Ongoing social media page management",
      "Consistent content cadence established",
    ],
    heroImage: "/images/placeholder.jpg",
    gallery: ["/images/placeholder.jpg"],
    featured: true,
    year: 2026,
  },
];
