"use client";

import { useCallback, useState } from "react";
import { landingService } from "../services/landing.service";
import type { DesktopPlatformId } from "../types";

const emptyByPlatform = { macOS: "", Windows: "" };
const falseByPlatform = { macOS: false, Windows: false };

export function useWaitlist() {
  const [emails, setEmails] = useState<Record<DesktopPlatformId, string>>(emptyByPlatform);
  const [submitted, setSubmitted] = useState<Record<DesktopPlatformId, boolean>>(falseByPlatform);
  const [submitting, setSubmitting] = useState<DesktopPlatformId | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setEmail = useCallback((platform: DesktopPlatformId, email: string) => {
    setEmails((value) => ({ ...value, [platform]: email }));
    setError(null);
  }, []);

  const submit = useCallback(async (platform: DesktopPlatformId) => {
    const email = emails[platform].trim();
    if (!email) {
      setError("Enter an email address to join the waitlist.");
      return;
    }

    setSubmitting(platform);
    setError(null);
    try {
      await landingService.submitWaitlist({ email, platform });
      setSubmitted((value) => ({ ...value, [platform]: true }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to join the waitlist.");
    } finally {
      setSubmitting(null);
    }
  }, [emails]);

  return { emails, submitted, submitting, error, setEmail, submit };
}
