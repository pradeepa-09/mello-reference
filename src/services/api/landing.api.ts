import type {
  LandingPageContent,
  WaitlistReceipt,
  WaitlistRequest,
} from "@/src/features/landing-page/types";
import { appConfig } from "@/src/shared/lib/config";
import { getMockLandingPageContent, submitMockWaitlist } from "@/src/services/mocks/landing.mock";

/**
 * Fetch landing page content metadata.
 */
export async function getLandingPageContent(): Promise<LandingPageContent> {
  // Return static/mock structure or fetch from external CMS if configured
  return getMockLandingPageContent();
}

/**
 * Submit waitlist request to backend API route.
 */
export async function submitWaitlist(request: WaitlistRequest): Promise<WaitlistReceipt> {
  if (appConfig.useMocks) {
    return submitMockWaitlist(request);
  }

  const endpoint = `${appConfig.apiBaseUrl}/api/waitlist`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      const message = json.error?.message || "Failed to submit waitlist request.";
      throw new Error(message);
    }

    return json.data as WaitlistReceipt;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unable to connect to waitlist server.");
  }
}
