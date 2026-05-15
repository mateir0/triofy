import type { FormField } from "@/types";

export const contactContent = {
  heading: "Let's Build Something Great",
  subheading: "Tell us about your project and we'll get back to you within 24 hours.",
  fields: [
    { name: "name", label: "Name", type: "text", placeholder: "Jane Smith", required: true },
    { name: "email", label: "Email", type: "email", placeholder: "jane@company.com", required: true },
    {
      name: "projectType",
      label: "Project Type",
      type: "select",
      placeholder: "Select project type",
      required: true,
      options: ["Web Development", "Graphic Design", "Game Development", "Social Media Marketing", "UI/UX Design", "Custom Solution"],
    },
    {
      name: "budget",
      label: "Budget",
      type: "select",
      placeholder: "Select budget range",
      required: true,
      options: ["< $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000+"],
    },
    { name: "message", label: "Message", type: "textarea", placeholder: "What are your goals? What challenges are you facing?", required: true },
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
