"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { MelloNotchHUD } from "./MelloNotchHUD";

interface DictationSample {
  id: string;
  category: string;
  text: string;
}

const DICTATION_SAMPLES: DictationSample[] = [
  {
    id: "sample-1",
    category: "PROJECT UPDATE",
    text: "The confirmation flow is ready for review. We resolved the final interaction details, tightened the copy, and added clear punctuation.",
  },
  {
    id: "sample-2",
    category: "PRODUCT FEEDBACK",
    text: "The new onboarding flow feels significantly faster. Removing the third configuration step cut down cognitive friction for all new desktop users.",
  },
  {
    id: "sample-3",
    category: "TEAM MESSAGE",
    text: "Hey team, thanks for sending over the architecture review. I verified the local latency numbers and pushed the fixes to main branch.",
  },
];

export function DictationStreamDemo() {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentSample = DICTATION_SAMPLES[sampleIndex];
  const fullText = currentSample.text;

  // IntersectionObserver to pause loop when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Real-time Smooth Character Streaming Loop
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    setTypedChars(0);
    setIsSpeaking(true);

    let charInterval: NodeJS.Timeout | null = null;
    let nextTimer: NodeJS.Timeout | null = null;
    let isCancelled = false;

    const startTimeout = setTimeout(() => {
      if (isCancelled) return;

      let charCount = 0;
      charInterval = setInterval(() => {
        if (isCancelled) return;
        if (charCount < fullText.length) {
          charCount += 1;
          setTypedChars(charCount);
        } else {
          if (charInterval) clearInterval(charInterval);
          setIsSpeaking(false);

          nextTimer = setTimeout(() => {
            if (isCancelled) return;
            setSampleIndex((prev) => (prev + 1) % DICTATION_SAMPLES.length);
          }, 3200);
        }
      }, 26);
    }, 400);

    return () => {
      isCancelled = true;
      clearTimeout(startTimeout);
      if (charInterval) clearInterval(charInterval);
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, [sampleIndex, fullText, isInView, reduceMotion]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center select-none relative">
      {/* Dictation Window Card — Matching Alignment Reference Exactly */}
      <div className="w-full rounded-[28px] border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] text-left relative overflow-hidden flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
        
        {/* Top Window Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <span className="text-xs font-semibold text-neutral-800">
            Notes
          </span>
          <span className="text-xs font-mono text-neutral-400">
            Edited just now
          </span>
        </div>

        {/* Note Body with Streaming Text */}
        <div className="py-6 sm:py-8 flex-1 flex flex-col justify-start">
          <span className="text-[11px] font-mono font-bold tracking-widest text-neutral-400 uppercase mb-4 block">
            {currentSample.category}
          </span>

          <p className="text-base sm:text-lg sm:leading-relaxed text-neutral-900 font-normal tracking-tight min-h-[80px]">
            <span>{fullText.slice(0, typedChars)}</span>
            {isSpeaking && (
              <span className="inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-black align-middle ml-1 animate-pulse rounded-xs" />
            )}
          </p>
        </div>

        {/* Floating Mello Notch HUD Docked at Lower Section */}
        <div className="w-full flex justify-center py-3">
          <MelloNotchHUD
            mode="Dictation"
            isListening={isSpeaking}
            transcriptionText={fullText}
            statusText={isSpeaking ? "ACTIVE" : "DONE"}
            className="w-full max-w-lg"
          />
        </div>

        {/* Bottom Footer Tags */}
        <div className="flex items-center gap-2 pt-4 border-t border-neutral-100 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-semibold text-[10px]">
            Dictation
          </span>
          <span className="text-neutral-500 text-[11px]">
            Speech → text only
          </span>
        </div>

      </div>
    </div>
  );
}

export default DictationStreamDemo;
