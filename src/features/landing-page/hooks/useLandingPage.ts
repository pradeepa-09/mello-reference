"use client";

import type { LandingPageViewModel } from "../types";
import { useLandingPageData } from "./useLandingPageData";
import { useWaitlist } from "./useWaitlist";

export function useLandingPage(): LandingPageViewModel {
  const page = useLandingPageData();
  const waitlist = useWaitlist();
  return { ...page, waitlist };
}
