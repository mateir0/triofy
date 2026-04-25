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
        { label: "Branding", href: "/services#branding" },
        { label: "Performance Marketing", href: "/services#performance" },
        { label: "Web Design", href: "/services#web" },
        { label: "Content & Creative", href: "/services#content" },
        { label: "Automation", href: "/services#automation" },
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
