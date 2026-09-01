"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SimplifiedMeetingCard } from "./SimplifiedMeetingCard";

export type AnimationPhase =
  | "transcribing"
  | "report_title"
  | "report_summary"
  | "report_actions"
  | "report_overview";

export function MeetingMode() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Autonomous phase state
  const [phase, setPhase] = useState<AnimationPhase>("transcribing");
  const [sweepProgress, setSweepProgress] = useState<number>(0);

  // Pause when offscreen
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

  // Seamless transition: Transcription received -> Directly morphs into Report
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    let timeout: NodeJS.Timeout;

    if (phase === "transcribing") {
      setSweepProgress(0);
      timeout = setTimeout(() => {
        setPhase("report_title");
      }, 4000);
    } else if (phase === "report_title") {
      timeout = setTimeout(() => {
        setPhase("report_summary");
      }, 2400);
    } else if (phase === "report_summary") {
      setSweepProgress(0);
      const sweepTimer = setTimeout(() => setSweepProgress(1), 100);
      timeout = setTimeout(() => {
        setPhase("report_overview");
      }, 3500);
      return () => {
        clearTimeout(sweepTimer);
        clearTimeout(timeout);
      };
    } else if (phase === "report_overview") {
      setSweepProgress(1);
      timeout = setTimeout(() => {
        setPhase("transcribing");
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [phase, isInView, reduceMotion]);

  return (
    <section
      ref={containerRef}
      id="meeting"
      className="py-14 sm:py-20 lg:py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 50% 25%, rgba(0,0,0,0.03) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="wrap max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-left max-w-4xl mb-8 sm:mb-12"
        >
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black select-none mb-2.5">
            04 · MEETING MODE &amp; REPORT
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-black leading-[1.14] max-w-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            Zero bots in your call. Instant structured reports.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-3 leading-relaxed font-normal max-w-2xl">
            Mello runs local speaker diarization on your Mac — turning live discussions into decisions and follow-ups without inviting a recording bot.
          </p>
        </motion.div>

        {/* Meeting Report Card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <SimplifiedMeetingCard
            phase={phase}
            sweepProgress={sweepProgress}
          />
        </motion.div>

      </div>
    </section>
  );
}

export default MeetingMode;
