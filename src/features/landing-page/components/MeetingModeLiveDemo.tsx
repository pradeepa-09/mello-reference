"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Mic,
  Video,
  PhoneOff,
  Share2,
  Sparkles,
  FileText,
  Activity,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
}

const PARTICIPANTS: Participant[] = [
  { id: "elena", name: "Elena B.", initials: "EB", avatarBg: "from-blue-600 to-indigo-900" },
  { id: "marcus", name: "Marcus K.", initials: "MK", avatarBg: "from-emerald-600 to-teal-900" },
  { id: "devin", name: "Devin R.", initials: "DR", avatarBg: "from-amber-600 to-orange-900" },
  { id: "you", name: "You (Host)", initials: "ME", avatarBg: "from-purple-600 to-neutral-900" },
];

interface MeetingScenario {
  id: string;
  meetingTitle: string;
  capturingQuotes: [string, string];
  structuringPoints: [string, string];
  decision: string;
  action: string;
}

const MEETING_SCENARIOS: MeetingScenario[] = [
  {
    id: "arch-sync",
    meetingTitle: "Google Meet · Product Architecture Sync",
    capturingQuotes: [
      "“...keeping the launch scope tight on desktop makes the most sense...”",
      "“...Elena can we review the security pass by Thursday afternoon...”",
    ],
    structuringPoints: [
      "• Desktop-first launch target",
      "• Security review · Thursday",
    ],
    decision: "Ship on-device speech model for v2.",
    action: "Other to finalize QA sign-off by 5 PM.",
  },
  {
    id: "design-review",
    meetingTitle: "Google Meet · Design & Brand Alignment",
    capturingQuotes: [
      "“...the contrast on the floating navbar feels super crisp now...”",
      "“...let’s lock in the dark monochrome theme across all sections...”",
    ],
    structuringPoints: [
      "• Obsidian glassmorphic standard",
      "• Dark monochrome theme lock-in",
    ],
    decision: "Approved dark monochrome design system.",
    action: "Marcus to update Figma component tokens.",
  },
  {
    id: "launch-prep",
    meetingTitle: "Google Meet · Go-to-Market & Launch Prep",
    capturingQuotes: [
      "“...private beta waitlist hit 4,200 requests this morning...”",
      "“...onboarding flow is down to under 45 seconds on macOS...”",
    ],
    structuringPoints: [
      "• 4.2k waitlist milestone",
      "• 45s instant onboarding benchmark",
    ],
    decision: "Expand beta invites to first 1,000 users.",
    action: "Send launch cohort emails tomorrow at 9 AM.",
  },
];

export function MeetingModeLiveDemo() {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

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

  // Multi-Scenario State
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const currentScenario = MEETING_SCENARIOS[scenarioIdx];

  // LEFT COLUMN: Faster active speaker cycle (~1.3s per speaker)
  const [activeSpeakerIdx, setActiveSpeakerIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion || !isInView) return;
    const interval = setInterval(() => {
      setActiveSpeakerIdx((prev) => (prev + 1) % PARTICIPANTS.length);
    }, 1300);
    return () => clearInterval(interval);
  }, [isInView, reduceMotion]);

  // RIGHT COLUMN: 3-State Morphing Card (4.6s loop per scenario)
  // State 0: "Capturing" (0 - 1.5s)
  // State 1: "Structuring" (1.5 - 2.7s)
  // State 2: "Summary ready" (2.7 - 4.6s)
  const [cardState, setCardState] = useState<0 | 1 | 2>(0);
  const [structuringStage, setStructuringStage] = useState(0);

  useEffect(() => {
    if (reduceMotion || !isInView) {
      setCardState(2);
      return;
    }

    let timeouts: NodeJS.Timeout[] = [];

    const startCycle = () => {
      setCardState(0);
      setStructuringStage(0);

      // t=1.5s -> Structuring state
      timeouts.push(
        setTimeout(() => {
          setCardState(1);
          setStructuringStage(1);
        }, 1500)
      );

      // t=2.0s -> Structuring line 2 appears
      timeouts.push(
        setTimeout(() => {
          setStructuringStage(2);
        }, 2000)
      );

      // t=2.7s -> Summary Ready payoff state
      timeouts.push(
        setTimeout(() => {
          setCardState(2);
        }, 2700)
      );

      // t=4.6s -> Loop restart & cycle to next scenario
      timeouts.push(
        setTimeout(() => {
          setScenarioIdx((prev) => (prev + 1) % MEETING_SCENARIOS.length);
          startCycle();
        }, 4600)
      );
    };

    startCycle();

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isInView, reduceMotion]);

  return (
    <div ref={containerRef} className="w-full max-w-5xl mx-auto rounded-3xl border border-neutral-800 bg-neutral-950 shadow-2xl backdrop-blur-2xl overflow-hidden text-left">
      {/* 1. Master macOS Window Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/90 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-neutral-700" />
            <span className="w-3 h-3 rounded-full bg-neutral-700" />
            <span className="w-3 h-3 rounded-full bg-neutral-700" />
          </div>
          <span className="ml-3 text-xs font-mono font-medium text-neutral-400">
            {currentScenario.meetingTitle}
          </span>
        </div>

        {/* Mello Active Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white font-semibold">Mello Active · On-Device Capture</span>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT COLUMN: Google Meet Video Call Grid (7 cols) */}
        <div className="lg:col-span-7 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between relative bg-neutral-950">
          {/* Header Row on call */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-neutral-300 font-semibold">
                Live call · 4 participants
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300">
              <Sparkles size={11} className="text-white" />
              <span>Zero bots allowed</span>
            </div>
          </div>

          {/* 2x2 Call Grid with Subtle, Slow Active Speaker Highlight */}
          <div className="grid grid-cols-2 gap-3 my-auto">
            {PARTICIPANTS.map((user, idx) => {
              const isSpeaker = activeSpeakerIdx === idx;
              return (
                <div
                  key={user.id}
                  className={`relative rounded-2xl border p-4 sm:p-5 flex flex-col items-center justify-center min-h-[125px] sm:min-h-[135px] overflow-hidden transition-all duration-700 ${
                    isSpeaker
                      ? "border-neutral-600 bg-neutral-900 shadow-md ring-1 ring-neutral-700"
                      : "border-neutral-800/80 bg-neutral-900/50 opacity-85"
                  }`}
                >
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${user.avatarBg} border border-neutral-700/80 flex items-center justify-center text-xs font-mono font-bold text-white mb-2 shadow-md transition-transform duration-500 ${
                      isSpeaker ? "scale-105" : "scale-100"
                    }`}
                  >
                    {user.initials}
                  </div>

                  {/* Name badge */}
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-neutral-800 text-[10px] font-mono text-neutral-300 flex items-center gap-1.5 transition-colors duration-500">
                    <Mic size={10} className={isSpeaker ? "text-emerald-400" : "text-neutral-500"} />
                    <span className={isSpeaker ? "text-neutral-100 font-semibold" : "text-neutral-400"}>
                      {user.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scrolling Raw Audio Ticker Line */}
          <div className="w-full overflow-hidden whitespace-nowrap mt-4 mb-2 py-1 relative border-t border-b border-neutral-900/90">
            <motion.div
              animate={{ x: [0, -400] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
              className="inline-block text-[10px] font-mono tracking-widest text-neutral-600 opacity-25 blur-[1.2px] select-none"
            >
              raw_pcm_16khz &gt;&gt; 0x4A81E9 · buffer_sync · local_whisper_engine · [speech_detected] · raw_pcm_16khz &gt;&gt; 0x4A81E9 · buffer_sync · local_whisper_engine · [speech_detected]
            </motion.div>
          </div>

          {/* Bottom Meeting Controls Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                <Mic size={14} />
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                <Video size={14} />
              </div>
              <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                <Share2 size={14} />
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-300">
              <ShieldCheck size={12} className="text-white" />
              <span>Native Audio Pipeline</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
              <PhoneOff size={14} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Single Morphing Card with Scenario Variety */}
        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-center bg-neutral-900/30">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6 shadow-2xl h-[280px] sm:h-[300px] flex flex-col justify-between text-left relative overflow-hidden">
            
            {/* Morphing Card Header: Icon + Label + Status Dot */}
            <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800/80">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
                  {cardState === 0 && <Activity size={14} className="text-white animate-pulse" />}
                  {cardState === 1 && <FileText size={14} className="text-white" />}
                  {cardState === 2 && <Sparkles size={14} className="text-white" />}
                </div>

                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200">
                  {cardState === 0 && "Capturing"}
                  {cardState === 1 && "Structuring"}
                  {cardState === 2 && "Summary ready"}
                </span>
              </div>

              {/* Status Dot */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    cardState === 2
                      ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      : "bg-neutral-600 animate-pulse"
                  }`}
                />
                <span className={cardState === 2 ? "text-white font-semibold" : "text-neutral-500"}>
                  {cardState === 0 && "Ambient"}
                  {cardState === 1 && "Parsing"}
                  {cardState === 2 && "Done"}
                </span>
              </div>
            </div>

            {/* Morphing Body: Stays fixed height with smooth state transitions */}
            <div className="flex-1 flex flex-col justify-center py-2">
              <AnimatePresence mode="wait">
                {/* State 1: Capturing (Dimmer, informal ghost fragments) */}
                {cardState === 0 && (
                  <motion.div
                    key={`capturing-${currentScenario.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3"
                  >
                    <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
                      <p className="text-xs font-mono text-neutral-400 blur-[0.3px] leading-relaxed">
                        {currentScenario.capturingQuotes[0]}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
                      <p className="text-xs font-mono text-neutral-500 blur-[0.5px] leading-relaxed">
                        {currentScenario.capturingQuotes[1]}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* State 2: Structuring (Crisp, noun-phrase fragments) */}
                {cardState === 1 && (
                  <motion.div
                    key={`structuring-${currentScenario.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-2.5"
                  >
                    {structuringStage >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800"
                      >
                        <span className="text-xs font-semibold text-neutral-100 block">
                          {currentScenario.structuringPoints[0]}
                        </span>
                      </motion.div>
                    )}

                    {structuringStage >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800"
                      >
                        <span className="text-xs font-semibold text-neutral-100 block">
                          {currentScenario.structuringPoints[1]}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* State 3: Summary ready (Checklist Payoff Moment) */}
                {cardState === 2 && (
                  <motion.div
                    key={`summary-${currentScenario.id}`}
                    initial={{ opacity: 0, scale: 0.95, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-2.5"
                  >
                    <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-start gap-2.5 shadow-sm">
                      <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-white font-medium leading-snug">
                        <strong>Decision:</strong> {currentScenario.decision}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-700/80 flex items-start gap-2.5 shadow-sm">
                      <CheckCircle2 size={16} className="text-white shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-white font-medium leading-snug">
                        <strong>Action:</strong> {currentScenario.action}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Sub-Label in Card */}
            <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Zero cloud transcript retention</span>
              <span className="text-neutral-400">100% Local AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingModeLiveDemo;
