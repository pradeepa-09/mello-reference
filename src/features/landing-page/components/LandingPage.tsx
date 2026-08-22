"use client";

import { AsyncPageState } from "@/src/shared/components";
import { useLandingPage } from "../hooks/useLandingPage";
import { LandingPageView } from "./LandingPageView";

export function LandingPage() {
  const page = useLandingPage();

  if (page.isLoading) return <AsyncPageState kind="loading" />;
  if (page.error) return <AsyncPageState kind="error" message={page.error} onRetry={page.retry} />;
  if (page.isEmpty || !page.content) return <AsyncPageState kind="empty" />;

  return <LandingPageView content={page.content} waitlist={page.waitlist} />;
}
