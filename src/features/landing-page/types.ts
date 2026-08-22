export interface LandingCta {
  label: string;
  href: string;
}

export interface LandingNavigationItem {
  label: string;
  href: string;
}

export interface LandingLegalLinks {
  privacy: string;
  terms: string;
  security: string;
  contact: string;
}

export interface LandingSiteConfig {
  primaryCta: LandingCta;
  navigation: LandingNavigationItem[];
  links: LandingLegalLinks;
}

export interface LandingFaq {
  id: string;
  question: string;
  answer: string;
}

export type DesktopPlatformId = "macOS" | "Windows";

export interface DownloadPlatform {
  id: DesktopPlatformId;
  label: string;
  iconSrc: string;
  variants: string[];
  status: "waitlist" | "available";
}

export interface PricingPlan {
  id: "beta" | "pro";
  eyebrow: string;
  name: string;
  description: string;
  amount: string;
  interval?: "month";
  badge?: string;
  cta: LandingCta;
  disabled?: boolean;
}

export interface LandingPageContent {
  site: LandingSiteConfig;
  faqs: LandingFaq[];
  downloads: DownloadPlatform[];
  pricing: PricingPlan[];
}

export interface WaitlistRequest {
  email: string;
  platform: DesktopPlatformId;
}

export interface WaitlistReceipt {
  id: string;
  email: string;
  platform: DesktopPlatformId;
  status: "accepted";
  createdAt: string;
}

export interface LandingPageViewModel {
  content: LandingPageContent | null;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  retry: () => void;
  waitlist: {
    emails: Record<DesktopPlatformId, string>;
    submitted: Record<DesktopPlatformId, boolean>;
    submitting: DesktopPlatformId | null;
    error: string | null;
    setEmail: (platform: DesktopPlatformId, email: string) => void;
    submit: (platform: DesktopPlatformId) => Promise<void>;
  };
}
