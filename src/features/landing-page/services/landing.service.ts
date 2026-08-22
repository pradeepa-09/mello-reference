import { getLandingPageContent, submitWaitlist } from "@/src/services/api/landing.api";

export const landingService = {
  getContent: getLandingPageContent,
  submitWaitlist,
};
