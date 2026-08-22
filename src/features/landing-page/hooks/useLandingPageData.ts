"use client";

import { useCallback, useEffect, useState } from "react";
import { landingService } from "../services/landing.service";
import type { LandingPageContent } from "../types";

export function useLandingPageData() {
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestKey, setRequestKey] = useState(0);

  const retry = useCallback(() => setRequestKey((value) => value + 1), []);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    landingService.getContent()
      .then((result) => {
        if (active) setContent(result);
      })
      .catch((reason: unknown) => {
        if (!active) return;
        setContent(null);
        setError(reason instanceof Error ? reason.message : "Unable to load the landing page.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => { active = false; };
  }, [requestKey]);

  return {
    content,
    isLoading,
    error,
    isEmpty: !isLoading && !error && content === null,
    retry,
  };
}
