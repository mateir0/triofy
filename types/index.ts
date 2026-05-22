export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  description: string;
  icon: string;
  features: string[];
  colorAccent: string;
}

export type ServiceCategory =
  | "Branding"
  | "Performance Marketing"
  | "Web Design & Development"
  | "Content & Creative"
  | "Automation / Funnel Ops";

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  heroImage: string;
  gallery: string[];
  featured: boolean;
  year: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface CTA {
  label: string;
  href: string;
  variant?: ButtonVariant;
}

export interface ThemeConfig {
  motion: {
    level: "low" | "medium" | "high";
    disableOnMobile: boolean;
  };
}

export interface SectionToggle {
  enabled: boolean;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type CardVariant = "glass" | "solid" | "outlined";
export type SectionBackground = "default" | "muted" | "gradient" | "mesh";
export type CtaLayout = "centered" | "left" | "split";

export type TextField = {
  name: string;
  label: string;
  type: "text" | "email";
  placeholder: string;
  required: boolean;
};

export type SelectField = {
  name: string;
  label: string;
  type: "select";
  placeholder: string;
  required: boolean;
  options: string[];
};

export type TextareaField = {
  name: string;
  label: string;
  type: "textarea";
  placeholder: string;
  required: boolean;
};

export type FormField = TextField | SelectField | TextareaField;
