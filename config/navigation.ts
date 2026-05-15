import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  sections: [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Web Development", href: "/services#web-development" },
        { label: "Graphic Design", href: "/services#graphic-design" },
        { label: "Game Development", href: "/services#game-development" },
        { label: "Social Media Marketing", href: "/services#social-media-management" },
        { label: "UI/UX Design", href: "/services#ui-ux-design" },
        { label: "Custom Solutions", href: "/services#custom-solutions" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ],
} as const;
