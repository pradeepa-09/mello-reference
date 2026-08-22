import type {
  LandingPageContent,
  WaitlistReceipt,
  WaitlistRequest,
} from "@/src/features/landing-page/types";
import { appConfig } from "@/src/shared/lib/config";
import { getMockLandingPageContent, submitMockWaitlist } from "@/src/services/mocks/landing.mock";
import { apiClient } from "./client";

export async function getLandingPageContent(): Promise<LandingPageContent> {
  if (appConfig.useMocks) return getMockLandingPageContent();
  return apiClient.backendNotConfigured("landing page");
}

export async function submitWaitlist(request: WaitlistRequest): Promise<WaitlistReceipt> {
  if (appConfig.useMocks) return submitMockWaitlist(request);
  return apiClient.backendNotConfigured("waitlist");
}
