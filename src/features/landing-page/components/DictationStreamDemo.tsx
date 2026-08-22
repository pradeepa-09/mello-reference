"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mic, CheckCircle2, Zap } from "lucide-react";

interface DictationSample {
  id: string;
  topic: string;
  wpm: number;
  text: string;
}

const DICTATION_SAMPLES: DictationSample[] = [
  {
    id: "sample-1",
    topic: "Engineering Spec",
    wpm: 168,
    text: "Let's add the payment error boundaries and verify the retry redirect logic on mobile checkout before deploying to staging tomorrow morning.",
  },
  {
    id: "sample-2",
    topic: "Product Feedback",
    wpm: 174,
    text: "The new onboarding flow feels significantly faster. Removing the third configuration step cut down cognitive friction for all new desktop users.",
  },
  {
    id: "sample-3",
    topic: "Team Message",
    wpm: 162,
    text: "Hey team, thanks for sending over the architecture review. I verified the local latency numbers and pushed the fixes to main branch.",
  },
  {
    id: "sample-4",
    topic: "Brainstorm Note",
    wpm: 180,
    text: "Idea for next sprint: allow users to configure global hotkeys for instant hands-free speech-to-text streaming across every active application.",
  },
];

const NUM_BARS = 22;

export function DictationStreamDemo() {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [sampleIndex, setSampleIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(DICTATION_SAMPLES[0].text.length);
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

    let charInterval: NodeJS.Timeout | null = null;
    let nextTimer: NodeJS.Timeout | null = null;
    let isCancelled = false;

    // Start streaming from 0 after a short delay on change
    const startTimeout = setTimeout(() => {
      if (isCancelled) return;
      setTypedChars(0);
      setIsSpeaking(true);

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
    }, 800);

    return () => {
      isCancelled = true;
      clearTimeout(startTimeout);
      if (charInterval) clearInterval(charInterval);
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, [sampleIndex, fullText, isInView, reduceMotion]);

  // Dynamic Audio Waveform during streaming
  const barHeights = useMemo(() => {
    return Array.from({ length: NUM_BARS }, (_, i) => {
      if (isSpeaking) {
        const centerDistance = Math.abs(i - NUM_BARS / 2) / (NUM_BARS / 2);
        const baseHeight = 26 - centerDistance * 14;
        const jitter = ((typedChars * 7 + i * 11) % 10) / 10;
        return Math.max(4, Math.floor(baseHeight * (0.6 + jitter * 0.6)));
      }
      return 4 + (i % 3) * 2;
    });
  }, [typedChars, isSpeaking]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* Dictation Streaming Window Card */}
      <div className="w-full rounded-[28px] border border-neutral-800/90 bg-neutral-950 p-6 sm:p-9 shadow-[0_16px_48px_rgba(0,0,0,0.3)] backdrop-blur-2xl text-left relative overflow-hidden">
        {/* Window Chrome Header Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800/90 pb-5 mb-6">
          {/* Left: macOS Window Controls + Tab Pills */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            </div>

            {/* Context Sample Switchers */}
            <div className="flex flex-wrap gap-1.5">
              {DICTATION_SAMPLES.map((sample, idx) => {
                const isActive = idx === sampleIndex;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => {
                      setSampleIndex(idx);
                      setTypedChars(0);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? "bg-white text-black font-semibold shadow-xs"
                        : "bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    {sample.topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Live Status & WPM Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                isSpeaking ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"
              }`}
            />
            <span className={isSpeaking ? "text-emerald-400 font-semibold" : "text-neutral-400"}>
              {isSpeaking ? "Listening…" : "Converted"}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono">
              {currentSample.wpm} WPM
            </span>
          </div>
        </div>

        {/* Body Pad: Spacious Real-time Streaming Speech-to-Text */}
        <div className="min-h-[220px] sm:min-h-[250px] rounded-2xl bg-neutral-900/60 border border-neutral-800/80 p-6 sm:p-8 mb-6 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                {currentSample.topic.toUpperCase()}
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                100% On-Device Neural Engine
              </span>
            </div>

            <div className="text-lg sm:text-2xl sm:leading-[1.5] text-white font-normal tracking-tight min-h-[140px]">
              <span>{fullText.slice(0, typedChars)}</span>
              {isSpeaking && (
                <span className="inline-block w-2 sm:w-2.5 h-5 sm:h-6 bg-white align-middle ml-1.5 animate-pulse rounded-xs" />
              )}
            </div>
          </div>

          <div className="text-right pt-2">
            <span className="text-[11px] font-mono text-neutral-500">
              Streaming into active text caret
            </span>
          </div>
        </div>

        {/* Bottom Bar: Mic + Real-time Audio Waveform + Processing Latency */}
        <div className="flex items-center justify-between gap-4 pt-1 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Mic size={16} className={isSpeaking ? "text-white animate-pulse" : "text-neutral-400"} />
            </div>
            <div>
              <p className="text-neutral-200 font-semibold text-xs leading-none">
                {isSpeaking ? "Dictating with Mello" : "Speech captured"}
              </p>
              <p className="text-neutral-500 text-[10px] mt-1 font-mono">
                Whisper-derived Local LLM
              </p>
            </div>
          </div>

          {/* Audio Waveform Bars (Bursts in sync with speech cadence) */}
          <div className="flex items-center gap-1 h-7 px-3 bg-neutral-900/60 rounded-full border border-neutral-800/80">
            {barHeights.map((h, i) => (
              <motion.span
                key={i}
                animate={{ height: `${h}px` }}
                transition={{ duration: 0.12, ease: "easeInOut" }}
                className={`w-[2.5px] rounded-full transition-colors ${
                  isSpeaking ? "bg-white" : "bg-neutral-600"
                }`}
              />
            ))}
          </div>

          {/* Processing Latency / Finished State */}
          <div className="flex items-center gap-1.5 shrink-0 text-right">
            {isSpeaking ? (
              <span className="text-neutral-300 text-xs flex items-center gap-1.5 font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                <Zap size={13} className="text-neutral-300" /> ~120ms latency
              </span>
            ) : (
              <span className="text-neutral-200 text-xs flex items-center gap-1.5 font-medium px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                <CheckCircle2 size={13} className="text-emerald-400" /> Done
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DictationStreamDemo;
