"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ShieldCheck } from "lucide-react";
import type { LandingCta } from "@/src/features/landing-page/types";
import { SonicWaveformBackground } from "@/src/features/landing-page/components/SonicWaveformBackground";
import { MelloNotchHUD } from "@/src/features/landing-page/components/MelloNotchHUD";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroToHowItWorksProps {
  primaryCta?: LandingCta;
}

export function HeroToHowItWorks({ primaryCta }: HeroToHowItWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const waveformWrapperRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const morphLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const pinWrapper = pinWrapperRef.current;
      const waveformWrapper = waveformWrapperRef.current;
      const hero = heroLayerRef.current;
      const morph = morphLayerRef.current;

      if (!pinWrapper || !hero || !morph) return;

      // Set initial states
      gsap.set(hero, { opacity: 1, scale: 1, filter: "blur(0px)" });
      gsap.set(morph, { opacity: 0, scale: 0.7 });
      if (waveformWrapper) {
        gsap.set(waveformWrapper, { opacity: 1, filter: "blur(0px)", scale: 1 });
      }

      // Master Scrubbed Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapper,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Beat 1 (0 -> 0.45): Hero content fades out, scales down, and softly blurs
      tl.to(
        hero,
        {
          opacity: 0,
          scale: 0.92,
          filter: "blur(6px)",
          ease: "power2.inOut",
          duration: 0.45,
        },
        0
      );

      // Beat 2 Waveform Defocus: Smoothly soften waveform into a silky fluid acoustic ribbon
      if (waveformWrapper) {
        tl.to(
          waveformWrapper,
          {
            filter: "blur(5px)",
            opacity: 0.85,
            scale: 1.04,
            ease: "power2.inOut",
            duration: 0.35,
          },
          0.1
        );
      }

      // Beat 2 (0.2 -> 1.0): Centered morph HUD zooms in, holds, and scales/fades out into Section 01
      tl.fromTo(
        morph,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          duration: 0.35,
        },
        0.2
      ).to(
        morph,
        {
          opacity: 0,
          scale: 1.2,
          ease: "power2.in",
          duration: 0.35,
        },
        0.65
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-white text-black">
      {/* Pinned Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="relative h-screen w-full overflow-hidden bg-white flex flex-col justify-center items-center"
      >
        {/* Layer 1: Live Sonic Waveform Ambient Canvas (Smoothly Defocused in Morph Beat) */}
        <div
          ref={waveformWrapperRef}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform z-0"
        >
          <SonicWaveformBackground />
        </div>

        {/* Layer 2: Hero Content Layer (Beat 1) */}
        <div
          ref={heroLayerRef}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 pt-16 sm:pt-20 z-20 select-none will-change-transform"
        >
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
            {/* Eyebrow */}
            <p className="eyebrow text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase text-neutral-800 mb-6">
              VOICE ACTIONS YOU APPROVE
            </p>

            {/* Headline Glass Card Frame (Exact 2-Line Reference Match) */}
            <div className="w-fit max-w-full rounded-[28px] sm:rounded-[38px] md:rounded-[44px] bg-white/95 border border-neutral-200/90 px-7 py-8 sm:px-14 sm:py-12 md:px-18 md:py-14 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.02)] backdrop-blur-xl flex flex-col items-center justify-center text-center mx-auto">
              <h1
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[74px] font-extrabold leading-[1.14] tracking-tight text-neutral-950 text-center flex flex-col items-center"
                style={{ letterSpacing: "-0.04em" }}
              >
                <span className="block whitespace-normal sm:whitespace-nowrap">
                  Your voice starts it.
                </span>
                <span className="block whitespace-normal sm:whitespace-nowrap mt-1 sm:mt-1.5">
                  <span className="inline-block border-b-[3.5px] sm:border-b-[5px] md:border-b-[6px] border-black pb-0.5 sm:pb-1">
                    Mello
                  </span>{" "}
                  makes it happen.
                </span>
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
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-800 hover:text-black transition-colors"
              >
                <ShieldCheck size={16} className="text-black" />
                <span>See how it works</span>
              </a>
            </div>
          </div>
        </div>

        {/* Layer 3: Central Notch & Waveform Morph Graphic (Beat 2 Flow Effect) */}
        <div
          ref={morphLayerRef}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-30 pointer-events-none px-4 will-change-transform"
        >
          <div className="flex flex-col items-center gap-7 sm:gap-8 text-center max-w-2xl">
            {/* Dynamic Mello Notch HUD Pulse Asset (Enlarged & Centered) */}
            <div className="shadow-2xl rounded-full p-2.5 sm:p-3 bg-white/95 border border-neutral-200/90 backdrop-blur-2xl scale-110 sm:scale-120 md:scale-125 transform origin-center transition-transform">
              <MelloNotchHUD
                mode="Mello Core"
                isListening={true}
                transcriptionText="Analyzing voice intent..."
                statusText="PROCESSING"
                compact={false}
                className="shadow-md"
              />
            </div>

            <div className="max-w-xl px-2">
              <p
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight leading-[1.2]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Parsing speech into structured, reviewable actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroToHowItWorks;
