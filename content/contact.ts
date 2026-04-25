import type { FormField } from "@/types";

export const contactContent = {
  heading: "Let's Build Something Great",
  subheading: "Tell us about your project and we'll get back to you within 24 hours.",
  fields: [
    { name: "name", label: "Full Name", type: "text", placeholder: "Jane Smith", required: true },
    { name: "email", label: "Email Address", type: "email", placeholder: "jane@company.com", required: true },
    { name: "company", label: "Company Name", type: "text", placeholder: "Acme Corp", required: false },
    { name: "budget", label: "Monthly Budget", type: "select", placeholder: "Select budget range", required: false, options: ["< $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000+"] },
    { name: "service", label: "Service Interest", type: "select", placeholder: "What are you looking for?", required: false, options: ["Branding", "Performance Marketing", "Web Design", "Content & Creative", "Automation", "Full Service"] },
    { name: "message", label: "Tell Us About Your Project", type: "textarea", placeholder: "What are your goals? What challenges are you facing?", required: true },
  ] as FormField[],
  success: {
    heading: "Message Sent!",
    message: "Thanks for reaching out. We'll be in touch within 24 hours.",
  },
  error: {
    heading: "Something went wrong",
    message: "Please try again or email us directly at hello@triofy.com.",
  },
} as const;
