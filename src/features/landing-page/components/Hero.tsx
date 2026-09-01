"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { LandingCta } from "../types";
import { HeroInteractiveDemo } from "./HeroInteractiveDemo";
import { SonicWaveformBackground } from "./SonicWaveformBackground";

export function Hero({ primaryCta }: { primaryCta?: LandingCta }) {
  const [scrollY, setScrollY] = useState(0);

  // Throttled scroll effect tracking for 3D laptop parallax
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll interpolation for 3D laptop
  const laptopScale = Math.min(1.12, 0.96 + scrollY * 0.0003);
  const laptopRotateY = Math.max(-2, -10 + scrollY * 0.015);
  const laptopRotateX = Math.max(0, 6 - scrollY * 0.012);
  const laptopTranslateY = Math.min(30, scrollY * 0.06);

  return (
    <section
      id="top"
      className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 pb-16 px-4 bg-white text-black border-b border-neutral-200"
    >
      {/* Live Subtle Animated Sonic Waveform Background */}
      <SonicWaveformBackground />

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto w-full">
        
        {/* Eyebrow: Generous letter spacing, close to headline */}
        <p className="eyebrow text-xs sm:text-[13px] font-mono font-bold tracking-[0.22em] uppercase text-neutral-800 mb-3 sm:mb-4 select-none">
          VOICE ACTIONS YOU APPROVE
        </p>

        {/* Headline: Editorial 3-line composition directly in hero without card container */}
        <h1
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[66px] xl:text-[70px] font-bold leading-[1.12] tracking-tight text-neutral-900 text-center flex flex-col items-center max-w-4xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          <span className="block">Your voice starts it.</span>
          <span className="block mt-1 sm:mt-1.5 font-bold text-neutral-900">
            Mello shows the plan.
          </span>
          <span className="block mt-1 sm:mt-1.5 font-black text-neutral-950">
            You decide what happens next.
          </span>
        </h1>

        {/* Supporting Copy: Comfortable ~2 lines on desktop */}
        <p className="mt-8 sm:mt-9 max-w-2xl mx-auto text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal">
          Dictate anywhere, draft emails, schedule meetings, and create GitHub issues with your voice. Mello shows you the plan before anything happens.
        </p>

        {/* Action CTA Area */}
        <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          <a
            href={primaryCta?.href || "#download"}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold tracking-tight shadow-lg hover:bg-neutral-800 transition-all active:scale-95 cursor-pointer"
          >
            <span>Request access</span>
            <ArrowDown size={14} />
          </a>

          <a
            href="#how-it-works"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-800 hover:text-black transition-colors"
          >
            <span>See Mello in action</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* 3D Dynamic Laptop Demonstration (Smooth Scroll Parallax) */}
      <div
        className="relative z-20 w-full max-w-5xl mx-auto mt-14 sm:mt-18 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translateY(${laptopTranslateY}px) scale(${laptopScale}) rotateX(${laptopRotateX}deg) rotateY(${laptopRotateY}deg)`,
          transformStyle: "preserve-3d",
          perspective: "1200px",
        }}
      >
        <HeroInteractiveDemo />
      </div>
    </section>
  );
}

export default Hero;
