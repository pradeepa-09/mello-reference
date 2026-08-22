"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { 
  Bot, 
  Mic, 
  Video, 
  PhoneOff, 
  Share2, 
  Sparkles, 
  FileText, 
  PenTool, 
  Check, 
  MessageSquare, 
  ShieldCheck, 
  Lock,
  Volume2,
  CheckCircle2
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  isSpeaking: boolean;
}

const PARTICIPANTS: Participant[] = [
  { id: "elena", name: "Elena B.", initials: "EB", avatarBg: "from-blue-600 to-indigo-900", isSpeaking: true },
  { id: "marcus", name: "Marcus K.", initials: "MK", avatarBg: "from-emerald-600 to-teal-900", isSpeaking: false },
  { id: "devin", name: "Devin R.", initials: "DR", avatarBg: "from-amber-600 to-orange-900", isSpeaking: false },
  { id: "you", name: "You (Host)", initials: "ME", avatarBg: "from-purple-600 to-neutral-900", isSpeaking: true },
];

export function MeetingModeNotchDemo() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Timeline phase states:
  // 0: Normal meeting in progress (0.0s - 0.5s)
  // 1: Ghost Bot tries to enter (0.5s - 1.1s)
  // 2: Bot rejected with wiggle (1.1s - 1.7s)
  // 3: Bot dissolves away (1.7s - 2.2s)
  // 4: Floating Mello Notch activates (2.2s - 2.8s)
  // 5: Live transcription streams in (2.8s - 4.2s)
  // 6: User writes quick notes (4.2s - 5.4s)
  // 7: Mello synthesizes key takeaways (5.4s - 7.2s)
  // 7.2s: Reset & seamless loop
  const [phase, setPhase] = useState(0);
  const [userNoteChars, setUserNoteChars] = useState(0);

  const USER_NOTE_TEXT = "Follow up with Marcus on auth review checklist";

  // IntersectionObserver to pause loop when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Main 7.2s loop
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    let timers: NodeJS.Timeout[] = [];

    const runLoop = () => {
      setPhase(0);
      setUserNoteChars(0);

      timers.push(setTimeout(() => setPhase(1), 500));   // 0.5s: Bot scales in
      timers.push(setTimeout(() => setPhase(2), 1100));  // 1.1s: Bot wiggles & rejects
      timers.push(setTimeout(() => setPhase(3), 1700));  // 1.7s: Bot dissolves
      timers.push(setTimeout(() => setPhase(4), 2200));  // 2.2s: Mello Notch expands
      timers.push(setTimeout(() => setPhase(5), 2800));  // 2.8s: Live Transcript streams
      timers.push(setTimeout(() => {
        setPhase(6); // 4.2s: User jots note
        let c = 0;
        const typeInterval = setInterval(() => {
          c += 2;
          setUserNoteChars(c);
          if (c >= USER_NOTE_TEXT.length) {
            clearInterval(typeInterval);
          }
        }, 40);
      }, 4200));
      timers.push(setTimeout(() => setPhase(7), 5400));  // 5.4s: Summary generated
      timers.push(setTimeout(() => {
        runLoop(); // 7.2s: Reset
      }, 7200));
    };

    runLoop();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isInView, reduceMotion]);

  const botVisible = phase >= 1 && phase < 3;
  const botWiggling = phase === 2;
  const notchActive = phase >= 4;
  const transcriptActive = phase >= 5;
  const userNoteActive = phase >= 6;
  const summaryActive = phase >= 7;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto rounded-3xl border border-neutral-800 bg-neutral-950/90 shadow-2xl backdrop-blur-2xl overflow-hidden"
    >
      {/* 1. Master macOS Studio Window Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/90 border-b border-neutral-800/90">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-neutral-700/80" />
            <span className="w-3 h-3 rounded-full bg-neutral-700/80" />
            <span className="w-3 h-3 rounded-full bg-neutral-700/80" />
          </div>
          <span className="ml-3 text-xs font-mono font-medium text-neutral-400">
            Google Meet · Product Architecture Sync
          </span>
        </div>

        {/* Dynamic Mello Notch Status Badge in Window Header */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-[11px] font-mono">
            <span className={`w-2 h-2 rounded-full ${notchActive ? "bg-emerald-400 animate-pulse" : "bg-neutral-600"}`} />
            <span className="text-white font-semibold">
              {notchActive ? "Mello Active · On-Device Capture" : "Mello Standby"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Google Meet Video Call Grid (7 Cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-neutral-800 flex flex-col justify-between relative bg-neutral-950/60">
          
          {/* Floating Circle-Notch Indicator hovering on call */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-neutral-300 font-semibold">
                Live Call · 4 Participants
              </span>
            </div>

            {/* Mello Floating Circle Notch Pill */}
            <motion.div
              animate={{
                scale: notchActive ? 1.03 : 1,
                borderColor: notchActive ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.1)",
              }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border shadow-lg backdrop-blur-xl"
            >
              <div className="w-4 h-4 rounded-full bg-white text-black flex items-center justify-center font-bold text-[9px] shadow-sm">
                <Sparkles size={10} className="text-black" />
              </div>
              
              {/* Dynamic waveform */}
              <div className="flex items-center gap-0.5 h-3">
                {[0.4, 0.9, 0.5, 0.8].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      height: notchActive ? ["20%", `${h * 100}%`, "20%"] : "20%",
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }}
                    className={`w-[2px] rounded-full block ${notchActive ? "bg-white" : "bg-neutral-600"}`}
                  />
                ))}
              </div>

              <span className="text-[10px] font-mono font-semibold text-neutral-200">
                {notchActive ? "Zero Bots Allowed" : "System Audio Only"}
              </span>
            </motion.div>
          </div>

          {/* 2x2 Call Grid */}
          <div className="relative grid grid-cols-2 gap-3 my-auto">
            {PARTICIPANTS.map((user, idx) => (
              <div
                key={user.id}
                className={`relative rounded-2xl bg-neutral-900/90 border p-4 sm:p-5 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px] overflow-hidden shadow-inner transition-all ${
                  user.isSpeaking && notchActive
                    ? "border-neutral-500 shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                    : "border-neutral-800/80"
                }`}
              >
                {/* Participant Gradient Avatar */}
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${user.avatarBg} border border-neutral-700/80 flex items-center justify-center text-xs font-mono font-bold text-white mb-2 shadow-md`}>
                  {user.initials}
                </div>

                {/* Subtle speaking waveform indicator */}
                <div className="flex items-center gap-1 h-3 mb-1">
                  {[4, 10, 6, 8].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        height: [4, h * (idx % 2 === 0 ? 1.4 : 1.1), 4],
                      }}
                      transition={{
                        duration: 0.8 + (idx * 0.15),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: (idx * 0.2) + (i * 0.1),
                      }}
                      className="w-[2px] bg-neutral-400 rounded-full"
                    />
                  ))}
                </div>

                {/* Participant Name Badge */}
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-neutral-800 text-[10px] font-mono text-neutral-300 flex items-center gap-1">
                  <Mic size={10} className="text-neutral-400" />
                  <span>{user.name}</span>
                </div>
              </div>
            ))}

            {/* Ghost 5th Bot Tile Attempting to Join */}
            <AnimatePresence>
              {botVisible && (
                <motion.div
                  initial={{ scale: 0.7, opacity: 0, y: 30 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    rotate: botWiggling ? [-4, 4, -4, 4, 0] : 0,
                  }}
                  exit={{ scale: 0.6, opacity: 0, y: 20 }}
                  transition={
                    botWiggling
                      ? { duration: 0.35, ease: "easeInOut" }
                      : { type: "spring", stiffness: 300, damping: 20 }
                  }
                  className="absolute inset-x-4 inset-y-2 sm:inset-x-8 sm:inset-y-4 z-40 rounded-2xl border-2 border-dashed border-red-500/60 bg-neutral-950/95 backdrop-blur-xl p-4 flex flex-col items-center justify-center text-center shadow-2xl"
                >
                  <div className="w-11 h-11 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-400 mb-2">
                    <Bot size={22} className="text-neutral-400" />
                  </div>
                  <strong className="text-xs font-mono text-white">
                    Notetaker Bot · Attempting to Join
                  </strong>
                  <span className="text-[10px] font-mono text-neutral-300 mt-1.5 px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-800/80">
                    {botWiggling ? "❌ Blocked · No Third-Party Bots Allowed" : "Connecting..."}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Meeting Controls Bar */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-800/80">
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

        {/* Right Column: Live Transcription + User Notes + AI Summary (5 Cols) */}
        <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between gap-4 bg-neutral-900/40">
          
          {/* Sub-Card 1: Live Speech Transcription Stream */}
          <div className="rounded-2xl border border-neutral-800/90 bg-neutral-950/90 p-4 shadow-md flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <MessageSquare size={13} className="text-white" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-200">
                  Live Transcription
                </span>
              </div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                transcriptActive ? "bg-emerald-950 text-emerald-400 border-emerald-800" : "bg-neutral-900 text-neutral-500 border-neutral-800"
              }`}>
                {transcriptActive ? "● Real-Time" : "Standby"}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-400 font-bold block mb-0.5">
                  Elena B.
                </span>
                <p className="text-neutral-200 leading-snug">
                  The onboarding walkthrough is nearly ready for review.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80">
                <span className="text-[10px] font-mono text-neutral-400 font-bold block mb-0.5">
                  You
                </span>
                <p className="text-neutral-200 leading-snug">
                  Let&apos;s keep the launch focused on desktop before expanding scope.
                </p>
              </div>
            </div>
          </div>

          {/* Sub-Card 2: User's Private Notes Input */}
          <div className="rounded-2xl border border-neutral-800/90 bg-neutral-950/90 p-4 shadow-md">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <PenTool size={13} className="text-white" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-200">
                  My Meeting Notes
                </span>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-400 border border-neutral-800">
                User Context
              </span>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs min-h-[46px] flex items-center">
              {userNoteActive ? (
                <p className="text-white font-mono text-[11px]">
                  ✍️ {USER_NOTE_TEXT.slice(0, userNoteChars)}
                  <span className="inline-block w-1.5 h-3 bg-white ml-0.5 animate-pulse align-middle" />
                </p>
              ) : (
                <span className="text-neutral-500 font-mono text-[11px]">
                  Type your thoughts or key points during the call...
                </span>
              )}
            </div>
          </div>

          {/* Sub-Card 3: Auto Synthesized AI Takeaways */}
          <div className="rounded-2xl border border-neutral-800/90 bg-neutral-950/90 p-4 shadow-md">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-white" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-200">
                  Generated AI Summary
                </span>
              </div>
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border transition-all ${
                summaryActive ? "bg-white text-black font-bold border-white" : "bg-neutral-900 text-neutral-500 border-neutral-800"
              }`}>
                {summaryActive ? "✓ Synthesized" : "Awaiting"}
              </span>
            </div>

            <motion.div
              animate={{ opacity: summaryActive ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="space-y-1.5 text-xs"
            >
              <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-white shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-[11px] leading-snug">
                  <strong>Decision:</strong> Keep launch focused on desktop v1.0.
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 flex items-start gap-2">
                <CheckCircle2 size={14} className="text-white shrink-0 mt-0.5" />
                <span className="text-neutral-200 text-[11px] leading-snug">
                  <strong>Action:</strong> Complete security review checklist by Thursday.
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MeetingModeNotchDemo;
