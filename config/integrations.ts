export const integrations = {
  analytics: {
    ga4Id: "",
    metaPixelId: "",
    enabled: false,
  },
  crm: {
    webhookUrl: "",
    enabled: false,
  },
  email: {
    provider: "resend" as const,
    apiKey: "",
    fromAddress: "hello@triofy.com",
    enabled: false,
  },
  calendly: {
    url: "https://calendly.com/triofy",
    enabled: true,
  },
  featureFlags: {
    show3D: true,
    showChatbot: false,
  },
} as const;
