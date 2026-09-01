"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { MEETING_DEMO_DATA } from "./meetingDemoScript";
import type { AnimationPhase } from "./MeetingModeSection";

interface SimplifiedMeetingCardProps {
  phase: AnimationPhase;
  sweepProgress: number; // 0 to 1 for summary sweep
}

export function SimplifiedMeetingCard({
  phase,
  sweepProgress,
}: SimplifiedMeetingCardProps) {
  const { summary, transcript } = MEETING_DEMO_DATA;

  // Determine spotlight focus based on phase
  const isTitleFocused = phase === "report_title";
  const isSummaryFocused = phase === "report_summary" || phase === "report_overview";
  const isDimmed = isTitleFocused || isSummaryFocused;

  return (
    <div className="w-full max-w-3xl rounded-3xl bg-white border border-neutral-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.03)] overflow-hidden text-neutral-900 select-none relative transition-all duration-300">
      
      {/* Main Content Viewport: Seamless crossfade from Transcript to Report */}
      <div className="min-h-[360px] relative bg-white flex flex-col justify-between text-left">
        <AnimatePresence mode="wait">
          
          {/* ========================================================================= */}
          {/* STEP 1: TRANSCRIPTION RECEIVED                                            */}
          {/* ========================================================================= */}
          {phase === "transcribing" && (
            <motion.div
              key="phase-transcribing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="p-5 sm:p-7 space-y-4 flex-1"
            >
              {/* Meeting Header with Action Buttons on Right Parallel to Weekly Design Sync */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                      LIVE CONVERSATION
                    </span>
                    <span className="text-[10.5px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.2 rounded-full border border-neutral-200">
                      Google Meet · 11:20 AM
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                    Weekly Design Sync
                  </h3>
                </div>

                {/* Right Side: Generate Summary & Close Meeting Buttons */}
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-950 text-white shadow-xs hover:bg-neutral-800 transition-all scale-100"
                  >
                    <Sparkles size={11} className="text-white animate-pulse" />
                    <span>Generate Summary</span>
                  </button>

                  <span className="w-px h-3.5 bg-neutral-200" />

                  <button
                    type="button"
                    className="text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors px-1"
                  >
                    Close Meeting
                  </button>
                </div>
              </div>

              {/* Streaming Transcript Bubbles with "Other" and "You" */}
              <div className="space-y-2.5">
                {transcript.map((line, idx) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -8, y: 4 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.18 }}
                    className="p-3 sm:p-3.5 rounded-xl bg-[#FAFAFA] border border-neutral-200/80 shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-1 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            line.isHost ? "bg-neutral-900" : "bg-neutral-500"
                          }`}
                        />
                        <span className="font-bold text-neutral-900 font-sans">
                          {line.speaker}
                        </span>
                        {line.isHost && (
                          <span className="text-[9.5px] font-mono bg-neutral-200/70 text-neutral-600 px-1.5 py-0.2 rounded">
                            Host
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-neutral-400 text-[10.5px]">
                        {line.timestamp}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-neutral-700 leading-snug font-normal">
                      &ldquo;{line.text}&rdquo;
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: REPORT GENERATED                                                   */}
          {/* ========================================================================= */}
          {phase.startsWith("report_") && (
            <motion.div
              key="phase-report"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="p-5 sm:p-7 space-y-4 sm:space-y-5 flex-1 relative"
            >
              {/* SECTION A: Title & Metadata Block */}
              <div
                id="focus-target-title"
                className={`transition-all duration-300 rounded-xl p-3.5 sm:p-4 relative ${
                  isTitleFocused
                    ? "bg-neutral-50/90 ring-1 ring-neutral-300 shadow-sm scale-[1.008] opacity-100"
                    : isDimmed
                    ? "opacity-45"
                    : "opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-400">
                    {summary.eyebrow}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                    <Clock size={11} className="text-neutral-400" />
                    <span>Today · 11:20 AM</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight leading-snug">
                  {summary.reportTitle}
                </h3>
              </div>

              {/* SECTION B: Executive Summary Block */}
              <div
                id="focus-target-summary"
                className={`transition-all duration-300 rounded-xl p-3.5 sm:p-4 relative ${
                  isSummaryFocused
                    ? "bg-neutral-50/90 ring-1 ring-neutral-300 shadow-sm scale-[1.008] opacity-100"
                    : isDimmed
                    ? "opacity-45"
                    : "opacity-100"
                }`}
              >
                <div className="inline-block px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[9.5px] font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                  {summary.summaryBadge}
                </div>

                <h4 className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight mb-2">
                  {summary.summaryHeading}
                </h4>

                {/* Paragraph Box with Left Accent Border & Highlighter Sweep */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-neutral-200/90 border-l-4 border-l-black shadow-2xs relative overflow-hidden mb-3">
                  <div
                    className="absolute inset-0 pointer-events-none meeting-highlighter-sweep"
                    style={{
                      transform: `translateX(${(sweepProgress - 1) * 100}%)`,
                      transition: "transform 0.4s ease-out",
                    }}
                    aria-hidden="true"
                  />
                  <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700 font-normal">
                    {summary.summaryParagraph}
                  </p>
                </div>

                {/* Key Takeaways Points */}
                <div className="space-y-1.5 pt-1">
                  {summary.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-neutral-800 font-medium">
                      <CheckCircle2 size={13} className="text-neutral-900 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

export default SimplifiedMeetingCard;
