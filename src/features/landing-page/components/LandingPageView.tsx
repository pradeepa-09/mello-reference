"use client";

import type { LandingPageContent, LandingPageViewModel } from "../types";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { HowMelloWorks } from "./HowMelloWorks";
import { TrustFlow } from "./TrustFlow";
import { DictationShowcase, MeetingMode } from "./ProductSections";
import { MemorySection } from "./MemorySection";
import { YourMello } from "./YourMello";
import { PricingSection } from "./PricingSection";
import { FAQSection } from "./FAQSection";
import { FinalCtaBanner } from "./FinalCtaBanner";
import { Footer } from "./Footer";

interface LandingPageViewProps {
  content: LandingPageContent;
  waitlist: LandingPageViewModel["waitlist"];
}

export function LandingPageView({ content }: LandingPageViewProps) {
  return (
    <>
      {/* 1. Navigation */}
      <Navbar navigation={content.site.navigation} primaryCta={content.site.primaryCta} />

      <main className="bg-white text-black selection:bg-black selection:text-white">
        {/* 2. Hero — Desktop Notch & Live Interaction */}
        <Hero primaryCta={content.site.primaryCta} />

        {/* 3. How Mello Works — 3-Step Continuous Voice Parser & Action Executor */}
        <HowMelloWorks />

        {/* 4. TrustFlow — Sandboxed 4-Phase Approval Gate & Connector Drawer */}
        <TrustFlow />

        {/* 5. DictationShowcase — Real-time Desktop App Text Streaming */}
        <DictationShowcase />

        {/* 6. MeetingMode — Bot-Free Meeting Notes & Real-time Action Items */}
        <MeetingMode />

        {/* 7. MemorySection — Animated Dark Memory Showcase (Facts / Preferences / People / Team) */}
        <MemorySection />

        {/* 8. YourMello — Personalized Snippets & Custom Vocabulary */}
        <YourMello />

        {/* 9. Pricing Section, FAQ & Final Conversion Banner */}
        <PricingSection />
        <FAQSection />
        <FinalCtaBanner />
      </main>

      {/* Footer */}
      <Footer site={content.site} />
    </>
  );
}

export default LandingPageView;
