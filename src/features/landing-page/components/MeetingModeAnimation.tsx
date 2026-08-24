"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Mic, FileText, Activity } from "lucide-react";
import Image from "next/image";

interface MeetingLine {
  speaker: "You" | "Other";
  timestamp: string;
  text: string;
  note?: {
    type: "Next step" | "Decision";
    title: string;
    detail: string;
  };
}

const LINES: MeetingLine[] = [
  { 
    speaker: "You", 
    timestamp: "00:04",
    text: "The desktop experience should stay at the center of this release." 
  },
  { 
    speaker: "Other", 
    timestamp: "00:11",
    text: "The onboarding walkthrough is nearly ready for review.", 
    note: { 
      type: "Next step", 
      title: "Finish onboarding walkthrough", 
      detail: "Share the final version by Thursday." 
    } 
  },
  { 
    speaker: "You", 
    timestamp: "00:18",
    text: "Let's keep the launch focused on desktop before expanding the scope.", 
    note: { 
      type: "Decision", 
      title: "Prioritize the desktop launch", 
      detail: "Keep the first release focused and deliberate." 
    } 
  },
  { 
    speaker: "Other", 
    timestamp: "00:25",
    text: "That gives us enough time to polish the first-run experience." 
  },
  { 
    speaker: "You", 
    timestamp: "00:32",
    text: "We need the final security review completed before release." 
  },
];

export function MeetingModeAnimation() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  // IntersectionObserver to pause loop when off-screen
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

  // Autonomous progressive conversation progression
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (LINES.length + 2));
    }, 2800);

    return () => clearInterval(interval);
  }, [isInView, reduceMotion]);

  // Current active line index clamped to lines length
  const currentLineIndex = Math.min(activeStep, LINES.length - 1);
  const visibleLines = LINES.slice(0, currentLineIndex + 1);

  // Derived notes up to active step
  const activeNotes = visibleLines.filter((l) => l.note).map((l) => l.note!);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center select-none">
      {/* Outer Card Container Matching Screenshot Exactly */}
      <div className="w-full max-w-5xl rounded-[32px] border border-neutral-200/90 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden text-left relative">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-100 bg-[#FBFBFB]">
          {/* Left: Meeting Mode + Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-black text-white flex items-center justify-center shrink-0 shadow-xs">
              <Mic size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold leading-none mb-1">
                MEETING MODE
              </p>
              <h3 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight leading-tight">
                Product launch check-in
              </h3>
            </div>
          </div>

          {/* Right: Live Status Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-mono font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>LIVE</span>
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-100 bg-white min-h-[480px]">
          
          {/* Left Column: Live Transcript (Conversation) */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 leading-none mb-1">
                    LIVE TRANSCRIPT
                  </p>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight">
                    Conversation
                  </h4>
                </div>

                {/* Animated Waveform Icon */}
                <div className="flex items-center gap-0.5 text-neutral-800">
                  <span className="w-[3px] h-3 bg-neutral-800 rounded-full animate-pulse" />
                  <span className="w-[3px] h-4 bg-neutral-800 rounded-full animate-pulse delay-75" />
                  <span className="w-[3px] h-5 bg-neutral-800 rounded-full animate-pulse delay-150" />
                  <span className="w-[3px] h-3.5 bg-neutral-800 rounded-full animate-pulse delay-100" />
                  <span className="w-[3px] h-2 bg-neutral-800 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Messages Stack */}
              <div className="space-y-3">
                {visibleLines.map((line, idx) => {
                  const isCurrent = idx === currentLineIndex;

                  return (
                    <motion.div
                      key={line.timestamp}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28 }}
                      className={`p-4 rounded-2xl border transition-all duration-300 ${
                        isCurrent
                          ? "bg-black text-white border-black shadow-md"
                          : line.speaker === "Other"
                          ? "bg-neutral-100/70 border-neutral-200/60 text-neutral-700"
                          : "bg-white border-neutral-200/80 text-neutral-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span
                          className={`text-xs font-semibold ${
                            isCurrent ? "text-white" : "text-neutral-900"
                          }`}
                        >
                          {line.speaker}
                        </span>
                        <span
                          className={`text-xs font-mono ${
                            isCurrent ? "text-neutral-400" : "text-neutral-400"
                          }`}
                        >
                          {line.timestamp}
                        </span>
                      </div>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isCurrent ? "text-white font-medium" : "text-neutral-600"
                        }`}
                      >
                        {line.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Meeting Notes (Notebook) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between relative bg-[#FAFAFA]/50">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-100">
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 leading-none mb-1">
                    MEETING NOTES
                  </p>
                  <h4 className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight">
                    Notebook
                  </h4>
                </div>

                <div className="w-8 h-8 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 shadow-2xs">
                  <FileText size={14} />
                </div>
              </div>

              {/* Notes Stack with Thick Black Left Border Accent */}
              <div className="space-y-3">
                <AnimatePresence>
                  {activeNotes.map((note) => (
                    <motion.div
                      key={note.title}
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 rounded-2xl bg-white border border-neutral-200 border-l-4 border-l-black shadow-xs text-left"
                    >
                      <span className="text-[11px] font-mono font-bold text-black uppercase tracking-wider block mb-1">
                        {note.type}
                      </span>
                      <h5 className="text-sm font-bold text-neutral-950 tracking-tight mb-1">
                        {note.title}
                      </h5>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        {note.detail}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {activeNotes.length === 0 && (
                  <div className="p-8 text-center border border-dashed border-neutral-200 rounded-2xl text-neutral-400 text-xs font-mono">
                    Listening for key decisions &amp; action items…
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Right: Floating Mello Mascot */}
            <div className="flex justify-end pt-6 relative">
              <div className="relative group">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg hover:scale-105 transition-transform overflow-hidden p-2">
                  <Image
                    src="/brand/mello-core-icon.png"
                    alt="Mello Mascot"
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                {/* Floor Shadow for Mascot */}
                <div className="absolute -bottom-2 inset-x-2 h-2 bg-black/20 rounded-full blur-xs pointer-events-none" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default MeetingModeAnimation;
