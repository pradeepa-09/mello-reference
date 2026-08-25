"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mic, Keyboard, Zap, Sparkles, Check, Clock, TrendingUp } from "lucide-react";
import { Reveal } from "@/src/shared/components";

interface SpeedSample {
  id: string;
  category: string;
  text: string;
  voiceSeconds: number;
  typingSeconds: number;
  multiplier: number;
}

const SPEED_SAMPLES: SpeedSample[] = [
  {
    id: "team-sync",
    category: "TEAM SYNC",
    text: "“Hey team, the updated checkout flow fixes are pushed to GitHub with the new payment error boundaries. Let's sync tomorrow at 10 AM.”",
    voiceSeconds: 2.4,
    typingSeconds: 9.8,
    multiplier: 4.1,
  },
  {
    id: "client-email",
    category: "EXECUTIVE EMAIL",
    text: "“Thanks for meeting today! I've attached the finalized architecture proposal and timeline. Let me know if the engineering milestones look good for Q3.”",
    voiceSeconds: 2.8,
    typingSeconds: 11.2,
    multiplier: 4.0,
  },
  {
    id: "github-issue",
    category: "ENG SPEC",
    text: "“Refactor auth token refresh handler to retry on 401 status with exponential backoff and update the telemetry event payload.”",
    voiceSeconds: 1.9,
    typingSeconds: 8.2,
    multiplier: 4.3,
  },
];

export function SpeedMultiplier() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  const [sampleIdx, setSampleIdx] = useState(0);
  const [phase, setPhase] = useState<"accelerating" | "peaked" | "cooldown">("accelerating");
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [typedChars, setTypedChars] = useState(0);

  const currentSample = SPEED_SAMPLES[sampleIdx];
  const fullText = currentSample.text;

  // Pause animation when scrolled off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autonomous Tachometer Speed Rev Loop
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    let isCancelled = false;
    const timeouts: NodeJS.Timeout[] = [];
    let textInterval: NodeJS.Timeout | null = null;

    // Phase 1: Start at 1.0x, accelerate needle to 4.1x (0s - 1.2s)
    setPhase("accelerating");
    setTypedChars(0);
    setCurrentMultiplier(1.0);

    const startTime = Date.now();
    const accelInterval = setInterval(() => {
      if (isCancelled) return;
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed < 1.2) {
        const progress = elapsed / 1.2;
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrentMultiplier(1.0 + (currentSample.multiplier - 1.0) * eased);
      } else {
        clearInterval(accelInterval);
        setCurrentMultiplier(currentSample.multiplier);
      }
    }, 20);

    // Stream text rapidly while needle is revved
    const t1 = setTimeout(() => {
      if (isCancelled) return;
      setPhase("peaked");

      let charCount = 0;
      textInterval = setInterval(() => {
        if (isCancelled) return;
        if (charCount < fullText.length) {
          charCount += 4;
          setTypedChars(Math.min(charCount, fullText.length));
        } else {
          if (textInterval) clearInterval(textInterval);
        }
      }, 35);

      // Hold peak delivery
      const t2 = setTimeout(() => {
        if (isCancelled) return;
        setPhase("cooldown");

        // Advance to next sample
        const t3 = setTimeout(() => {
          if (isCancelled) return;
          setSampleIdx((prev) => (prev + 1) % SPEED_SAMPLES.length);
        }, 1800);

        timeouts.push(t3);
      }, 2600);

      timeouts.push(t2);
    }, 400);

    timeouts.push(t1);

    return () => {
      isCancelled = true;
      clearInterval(accelInterval);
      if (textInterval) clearInterval(textInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [sampleIdx, isInView, fullText, currentSample.multiplier, reduceMotion]);

  // SVG Gauge Calculations: 220 degree arc
  // Angle: -110deg (at 0x) to +110deg (at 5x)
  const maxScale = 5.0;
  const gaugeAngle = useMemo(() => {
    const fraction = Math.min(1, Math.max(0, currentMultiplier / maxScale));
    return -110 + fraction * 220;
  }, [currentMultiplier]);

  // Tick marks definition (0 to 5)
  const ticks = [1.0, 2.0, 3.0, 4.0, 5.0];

  return (
    <section
      ref={containerRef}
      id="speed"
      className="py-24 sm:py-32 bg-white text-black border-b border-neutral-200 relative overflow-hidden select-none"
    >
      <div className="wrap max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-neutral-500 mb-3 select-none">
              SPEED
            </p>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight">
              Speaking is 4.1x faster than typing. Mello does both.
            </h2>
            
            <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
              Dictate naturally to write text instantly anywhere, or use actions to execute multi step plans across Gmail, Calendar, and GitHub.
            </p>
          </div>
        </Reveal>

        {/* Tachometer / Speedometer HUD Card */}
        <Reveal delay={0.1}>
          <div className="rounded-[36px] border border-neutral-800 bg-[#0A0A0C] p-6 sm:p-10 lg:p-12 shadow-[0_24px_80px_rgba(0,0,0,0.35)] text-white relative overflow-hidden">
            
            {/* Top Ambient Glow behind Dial */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

            {/* Top HUD Status Row */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-800/80 relative z-10">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                  {currentSample.category} · SUPERSONIC SPEED HUD
                </span>
              </div>

              <div className="text-xs font-mono text-neutral-500 font-semibold tracking-wider uppercase">
                Continuous Benchmark
              </div>
            </div>

            {/* Main Center Stage: Tachometer HUD + Live Speech Output */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left: The Circular Supersonic Tachometer Gauge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                
                {/* SVG Gauge Container */}
                <div className="relative w-[260px] h-[260px] sm:w-[290px] sm:h-[290px] flex items-center justify-center">
                  
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    {/* Outer Gauge Track Background */}
                    <circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="#1A1A1E"
                      strokeWidth="10"
                      strokeDasharray="345 502"
                      strokeDashoffset="-78"
                      strokeLinecap="round"
                    />

                    {/* Active Supersonic Laser Arc (fills up with multiplier) */}
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="80"
                      fill="none"
                      stroke="url(#gaugeGlowGradient)"
                      strokeWidth="10"
                      strokeDasharray="345 502"
                      strokeDashoffset={345 - ((currentMultiplier - 0) / maxScale) * 345 - 78}
                      strokeLinecap="round"
                      className="transition-all duration-75"
                    />

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="gaugeGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="70%" stopColor="#E5E5E5" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Centered Dial Readout */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold mb-1">
                      THROUGHPUT
                    </span>

                    {/* Big Bold Multiplier */}
                    <div className="flex items-baseline justify-center tracking-tight font-mono">
                      <span className="text-5xl sm:text-6xl font-black text-white leading-none">
                        {currentMultiplier.toFixed(1)}
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-neutral-400 ml-0.5">
                        x
                      </span>
                    </div>

                    <span className="text-xs font-mono font-semibold text-emerald-400 mt-2 flex items-center gap-1">
                      <Sparkles size={11} /> 168 WPM SPEECH
                    </span>
                  </div>

                  {/* Dynamic Needle Pin */}
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75 ease-out"
                    style={{ transform: `rotate(${gaugeAngle}deg)` }}
                  >
                    <div className="w-1 h-20 bg-gradient-to-t from-transparent via-white/80 to-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)] -translate-y-10" />
                  </div>

                </div>

                {/* Dial Legend Tick Badges */}
                <div className="flex items-center justify-between w-[240px] text-[11px] font-mono text-neutral-500 font-semibold px-2 mt-1">
                  <span>1.0x (Typing)</span>
                  <span className="text-white font-bold">4.1x (Speech)</span>
                  <span>5.0x</span>
                </div>
              </div>

              {/* Right: Live Stream Real-Time Spoken Output */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
                
                {/* Spoken Text Stream Pad */}
                <div className="p-6 sm:p-7 rounded-3xl bg-neutral-900/70 border border-neutral-800/90 flex flex-col justify-between min-h-[190px] relative shadow-inner">
                  
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-800/80">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                      <Mic size={12} className="text-emerald-400 animate-pulse" />
                      Instant Speech Stream
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {currentSample.voiceSeconds}s delivery
                    </span>
                  </div>

                  {/* Flowing Text */}
                  <p className="text-base sm:text-lg sm:leading-relaxed text-white font-normal tracking-tight">
                    <span>{fullText.slice(0, typedChars)}</span>
                    {phase === "peaked" && typedChars < fullText.length && (
                      <span className="inline-block w-2 h-4 bg-white align-middle ml-1.5 animate-pulse" />
                    )}
                  </p>

                  <div className="text-right pt-2 border-t border-neutral-800/60 mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>Manual Typing: ~{currentSample.typingSeconds}s</span>
                    <span className="text-emerald-400 font-bold">
                      Saved {(currentSample.typingSeconds - currentSample.voiceSeconds).toFixed(1)}s
                    </span>
                  </div>
                </div>

                {/* 3 Metric Value Pillars */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 text-center">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">
                      Time Saved
                    </span>
                    <strong className="text-base sm:text-lg font-bold text-white font-mono block">
                      +75%
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 text-center">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">
                      Natural Cadence
                    </span>
                    <strong className="text-base sm:text-lg font-bold text-emerald-400 font-mono block">
                      4.1x Peak
                    </strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 text-center">
                    <span className="text-[9px] font-mono text-neutral-400 uppercase block mb-1">
                      Effort
                    </span>
                    <strong className="text-base sm:text-lg font-bold text-white font-mono block">
                      Hands Free
                    </strong>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default SpeedMultiplier;
