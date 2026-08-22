import type {
  LandingPageContent,
  WaitlistReceipt,
  WaitlistRequest,
} from "@/src/features/landing-page/types";

const delay = (milliseconds = 300) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export const landingPageMock: LandingPageContent = {
  site: {
    primaryCta: { label: "Request access", href: "#waitlist" },
    navigation: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Act", href: "#trust-flow" },
      { label: "Dictate", href: "#dictation" },
      { label: "Meetings", href: "#meeting" },
      { label: "Memory", href: "#memory" },
      { label: "Personalize", href: "#personalize" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    links: {
      privacy: "/privacy",
      terms: "/terms",
      security: "/security",
      contact: "/contact",
    },
  },
  downloads: [
    { id: "macOS", label: "macOS", iconSrc: "/platforms/apple.png", variants: ["Apple Silicon", "Intel"], status: "waitlist" },
    { id: "Windows", label: "Windows", iconSrc: "/platforms/windows.png", variants: ["Windows 10", "Windows 11"], status: "waitlist" },
  ],
  pricing: [
    {
      id: "beta",
      eyebrow: "BETA PLAN",
      name: "Private Beta",
      description: "Access during our invite only beta period.",
      amount: "0",
      cta: { label: "Request beta access", href: "#download" },
    },
    {
      id: "pro",
      eyebrow: "PRO PLAN",
      name: "Mello Pro",
      description: "Unlimited actions, high-frequency synchronization, and custom personalization.",
      amount: "10",
      interval: "month",
      badge: "Upcoming",
      cta: { label: "Coming soon", href: "#pricing" },
      disabled: true,
    },
  ],
  faqs: [
    { id: "dictation-actions", question: "What is the difference between Dictation and Actions?", answer: "Dictation turns speech into text in the active text field. Actions interpret a request, resolve its details, show a plan, and only perform it after your approval." },
    { id: "applications", question: "Which applications does Mello support?", answer: "Actions currently support Gmail, Google Calendar, and GitHub. Dictation works anywhere you can type." },
    { id: "shortcut", question: "Can I customise the shortcut?", answer: "Yes. You can choose the keyboard shortcut that starts Mello." },
    { id: "listening", question: "Does Mello listen continuously?", answer: "No. Mello listens only when you deliberately start it; this page never requests microphone access." },
    { id: "confirmation", question: "Does Mello act without confirmation?", answer: "No. Mello shows the complete plan before an action is sent, scheduled, or created." },
    { id: "edit-cancel", question: "Can I edit or cancel a plan?", answer: "Yes. Every plan can be edited or cancelled before approval." },
    { id: "memory", question: "Can I review or delete memory?", answer: "Yes. Memory is visible, searchable, and removable, including a clear all control." },
    { id: "platforms", question: "Which desktop platforms are supported?", answer: "Mello is designed for macOS and Windows. Current availability is shown in the download section." },
    { id: "undo", question: "Can I undo an action?", answer: "Where the connected service supports it, Mello presents a short undo window after completion." },
  ],
};

export async function getMockLandingPageContent(): Promise<LandingPageContent> {
  await delay();
  return structuredClone(landingPageMock);
}

export async function submitMockWaitlist(request: WaitlistRequest): Promise<WaitlistReceipt> {
  await delay();
  return {
    id: `mock-${request.platform.toLowerCase()}-${Date.now()}`,
    email: request.email,
    platform: request.platform,
    status: "accepted",
    createdAt: new Date().toISOString(),
  };
}
