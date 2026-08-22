"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CalendarDays, Mic, Plug, Settings, Sparkles } from "lucide-react";
import { Reveal } from "@/src/shared/components";

const frames = [
  {
    label: "Notch",
    Icon: Sparkles,
    preview: (
      <div className="onboard-frame-notch flex items-center gap-2 px-3 py-2 bg-neutral-800 rounded-xl border border-neutral-700">
        <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
          <Sparkles size={12} className="text-white" />
        </span>
        <div className="flex gap-0.5 items-end h-4">
          {[6, 10, 8, 12, 7].map((h, i) => (
            <i key={i} className="w-0.5 bg-white rounded-full" style={{ height: h }} />
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "Settings",
    Icon: Settings,
    preview: (
      <div className="onboard-frame-settings space-y-1.5 p-2">
        <div className="h-2 w-16 bg-neutral-700 rounded" />
        <div className="h-2 w-full bg-neutral-800 rounded" />
        <div className="h-2 w-3/4 bg-neutral-800 rounded" />
        <div className="flex gap-1 mt-2">
          <div className="h-5 flex-1 bg-white/20 rounded border border-white/30" />
          <div className="h-5 flex-1 bg-neutral-800 rounded" />
        </div>
      </div>
    ),
  },
  {
    label: "Connectors",
    Icon: Plug,
    preview: (
      <div className="onboard-frame-connectors flex flex-wrap gap-1.5 p-2 justify-center">
        {["Gmail", "Cal", "GH"].map((name) => (
          <span key={name} className="px-2 py-1 text-[9px] font-bold bg-neutral-800 border border-neutral-700 rounded-lg text-neutral-300">
            {name}
          </span>
        ))}
      </div>
    ),
  },
  {
    label: "Meeting",
    Icon: Mic,
    preview: (
      <div className="onboard-frame-meeting p-2 space-y-1">
        <div className="flex items-center gap-1">
          <CalendarDays size={10} className="text-white" />
          <div className="h-1.5 flex-1 bg-white/30 rounded" />
        </div>
        <div className="h-1.5 w-full bg-neutral-800 rounded" />
        <div className="h-1.5 w-4/5 bg-white/20 rounded" />
      </div>
    ),
  },
] as const;

export function OnboardingStrip() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActive((v) => (v + 1) % frames.length);
    }, 2500);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section id="onboarding" className="section py-16 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="wrap max-w-4xl mx-auto">
        <Reveal>
          <p className="text-center text-sm text-neutral-400 mb-8 font-medium">
            We&apos;ll walk you through it.
          </p>
        </Reveal>
        <div className="onboarding-frames grid grid-cols-2 sm:grid-cols-4 gap-4">
          {frames.map((frame, index) => {
            const isActive = active === index;
            return (
              <motion.button
                key={frame.label}
                type="button"
                onClick={() => setActive(index)}
                className={`onboarding-frame relative rounded-2xl border bg-neutral-900/80 p-4 text-left transition-colors ${
                  isActive ? "border-white ring-2 ring-white/20" : "border-neutral-800 hover:border-neutral-700"
                }`}
                animate={reduceMotion ? {} : { scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <frame.Icon size={14} className={isActive ? "text-white" : "text-neutral-500"} />
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${isActive ? "text-white" : "text-neutral-500"}`}>
                    {frame.label}
                  </span>
                </div>
                <div className="onboarding-frame-preview min-h-[64px] flex items-center justify-center bg-neutral-950/80 rounded-xl border border-neutral-800/80 overflow-hidden">
                  {frame.preview}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
