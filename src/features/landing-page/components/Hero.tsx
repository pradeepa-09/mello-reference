"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ShieldCheck } from "lucide-react";
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
      className="relative min-h-[94vh] w-full flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 pb-16 px-4 bg-white text-black border-b border-neutral-200"
    >
      {/* Live Animated Sonic Waveform Background */}
      <SonicWaveformBackground />

      {/* Center Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center my-auto w-full">
        {/* Eyebrow */}
        <p className="eyebrow text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase text-neutral-800 mb-6">
          VOICE ACTIONS YOU APPROVE
        </p>

        {/* Headline Glass Card Frame */}
        <div className="w-full max-w-3xl rounded-[32px] sm:rounded-[40px] bg-white/75 border border-neutral-200/80 px-6 py-8 sm:px-14 sm:py-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-md">
          <h1
            className="text-4xl sm:text-6xl lg:text-[70px] font-extrabold leading-[1.08] tracking-tight text-black"
            style={{ letterSpacing: "-0.04em" }}
          >
            Your voice starts it.
            <br />
            <span className="underline decoration-black decoration-[4px] underline-offset-[10px]">
              Mello
            </span>{" "}
            makes it happen.
          </h1>
        </div>

        {/* Subcopy */}
        <p className="mt-8 max-w-2xl mx-auto text-neutral-600 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal">
          Dictate anywhere you can type, or ask Mello to draft emails, schedule calendar events, and open GitHub issues from your spoken words. It waits for your approval before anything is sent or created.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
          <a
            href={primaryCta?.href || "#download"}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white text-xs sm:text-sm font-semibold tracking-tight shadow-lg hover:bg-neutral-800 transition-all active:scale-95 cursor-pointer"
          >
            <span>Request access</span>
            <ArrowDown size={14} />
          </a>

          <a
            href="#trust-flow"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-800 hover:text-black transition-colors"
          >
            <ShieldCheck size={16} className="text-black" />
            <span>See the confirmation gate</span>
          </a>
        </div>
      </div>

      {/* 3D Dynamic Laptop Demonstration (Smooth Scroll Parallax) */}
      <div
        className="relative z-20 w-full max-w-5xl mx-auto mt-14 sm:mt-20 transition-transform duration-300 ease-out will-change-transform"
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
