"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  User,
  Users,
  Mail,
  Calendar,
  Github,
  GitBranch,
  Clock,
  Mic,
  Check,
  ArrowRight,
  Sparkles
} from "lucide-react";

// ============================================================================
// TYPES & MULTI-SCENARIO ACCURATE DATA
// Supported connectors: Gmail, Google Calendar, GitHub
// ============================================================================

const SCENARIO_DURATION = 7.6; // 7.6s calm interval per scenario

interface MemoryCardData {
  id: "people" | "team" | "preferences" | "facts";
  category: "PEOPLE" | "TEAM" | "PREFERENCES" | "FACTS";
  value: string;
  subLabel: string;
  icon: React.ElementType;
}

interface Scenario {
  id: string;
  transcript: {
    text: string;
    isEntity?: boolean;
    entityCategory?: "people" | "team" | "preferences" | "facts";
  }[];
  activeCards: ("people" | "team" | "preferences" | "facts")[];
  cardValues: Record<string, { value: string; subLabel: string; icon: React.ElementType }>;
  actionPreview: {
    service: "Gmail" | "Google Calendar" | "GitHub";
    serviceIcon: React.ElementType;
    title: string;
    details: string;
    tag: string;
  };
}

const SCENARIOS: Scenario[] = [
  // Scenario 1: Email Sarah (Gmail + People + Team)
  {
    id: "scenario-1",
    transcript: [
      { text: "Email " },
      { text: "Sarah", isEntity: true, entityCategory: "people" },
      { text: " the " },
      { text: "Platform Eng", isEntity: true, entityCategory: "team" },
      { text: " weekly recap." },
    ],
    activeCards: ["people", "team", "preferences"],
    cardValues: {
      people: { value: "Sarah Miller", subLabel: "Known contact", icon: User },
      team: { value: "Platform Eng", subLabel: "Working group", icon: Users },
      preferences: { value: "Gmail", subLabel: "Preferred email account", icon: Mail },
      facts: { value: "Main repo", subLabel: "mello-app/Mello-2026", icon: GitBranch },
    },
    actionPreview: {
      service: "Gmail",
      serviceIcon: Mail,
      title: "Email Sarah Miller",
      details: "Subject: Platform Eng weekly recap",
      tag: "Ready for approval",
    },
  },
  // Scenario 2: Calendar Sync (Google Calendar + People + Facts)
  {
    id: "scenario-2",
    transcript: [
      { text: "Schedule a sync with " },
      { text: "Sarah", isEntity: true, entityCategory: "people" },
      { text: " " },
      { text: "tomorrow morning", isEntity: true, entityCategory: "facts" },
      { text: "." },
    ],
    activeCards: ["people", "preferences", "facts"],
    cardValues: {
      people: { value: "Sarah Miller", subLabel: "Known contact", icon: User },
      team: { value: "Platform Eng", subLabel: "Working group", icon: Users },
      preferences: { value: "Google Calendar", subLabel: "Work calendar", icon: Calendar },
      facts: { value: "10:00 AM", subLabel: "Default morning slot", icon: Clock },
    },
    actionPreview: {
      service: "Google Calendar",
      serviceIcon: Calendar,
      title: "Sync with Sarah Miller",
      details: "Tomorrow · 10:00 AM – 10:30 AM",
      tag: "Ready for approval",
    },
  },
  // Scenario 3: GitHub Issue in Main Repo (GitHub + Facts + Team)
  {
    id: "scenario-3",
    transcript: [
      { text: "Create an issue for the login bug in our " },
      { text: "main repo", isEntity: true, entityCategory: "facts" },
      { text: "." },
    ],
    activeCards: ["facts", "preferences", "team"],
    cardValues: {
      people: { value: "Sarah Miller", subLabel: "Known contact", icon: User },
      team: { value: "Platform Eng", subLabel: "Working group", icon: Users },
      preferences: { value: "GitHub", subLabel: "Developer account", icon: Github },
      facts: { value: "mello-app/core", subLabel: "Remembered main repo", icon: GitBranch },
    },
    actionPreview: {
      service: "GitHub",
      serviceIcon: Github,
      title: "Create Issue · #142",
      details: "Repo: mello-app/core · Bug: Login flow",
      tag: "Ready for approval",
    },
  },
];

export function MemorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const [globalTime, setGlobalTime] = useState<number>(0);

  // Performance intersection observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous animation clock
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    let animId: number;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = (now - start) / 1000;
      setGlobalTime(elapsed);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isInView, reduceMotion]);

  // Derive active scenario & timeline phase
  const scenarioIndex = Math.floor(globalTime / SCENARIO_DURATION) % SCENARIOS.length;
  const loopTime = globalTime % SCENARIO_DURATION;
  const currentScenario = SCENARIOS[scenarioIndex] || SCENARIOS[0];

  // Timeline phase flags:
  // Phase 1: 0.0s - 1.2s -> Phrase appears, Listening
  // Phase 2: 1.2s - 2.8s -> Entities highlighted & Context cards activate
  // Phase 3: 2.8s - 4.4s -> Resolving context...
  // Phase 4: 4.4s - 7.0s -> Context resolved + Action Preview Output Card
  // Phase 5: 7.0s - 7.6s -> Smooth crossfade transition
  const isListening = loopTime < 2.8;
  const isResolving = loopTime >= 2.8 && loopTime < 4.4;
  const isResolved = loopTime >= 4.4;
  const showActionPreview = loopTime >= 4.4 && loopTime < 7.2;

  // Smooth stage crossfade between scenarios
  const stageOpacity = loopTime >= 7.1 ? Math.max(0.2, 1 - (loopTime - 7.1) / 0.4) : 1;

  return (
    <section
      id="memory"
      ref={containerRef}
      className="py-14 sm:py-20 lg:py-24 bg-white text-black border-b border-neutral-200 relative overflow-hidden"
    >
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
            05 · MEMORY &amp; CONTEXT
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-black leading-[1.14] max-w-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            Work gets easier every time you use Mello.
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-3 leading-relaxed font-normal max-w-2xl">
            Mello resolves your contacts, working groups, and preferences using remembered context — turning natural phrases into actions across Gmail, Google Calendar, and GitHub without repeating setup.
          </p>
        </motion.div>

        {/* Dynamic Memory Context Showcase Card */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div
            className="w-full max-w-3xl relative rounded-3xl border border-neutral-200/90 bg-white p-4 sm:p-6 shadow-[0_16px_40px_-15px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.03)] overflow-hidden select-none transition-opacity duration-300"
            style={{ opacity: stageOpacity }}
          >
              
              {/* 1. Spoken Monospace Natural Language Command Bar */}
              <div className="w-full text-center mb-5 font-mono text-xs sm:text-[13px] tracking-tight text-neutral-500 overflow-x-auto whitespace-nowrap py-2.5 px-4 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 flex items-center justify-center gap-0.5">
                <span className="text-neutral-400 mr-1 select-none">“</span>
                {currentScenario.transcript.map((segment, idx) => {
                  if (!segment.isEntity) {
                    return <span key={idx}>{segment.text}</span>;
                  }

                  const isEmphasized = loopTime >= 1.2;

                  return (
                    <span
                      key={idx}
                      className={`transition-all duration-300 font-mono ${
                        isEmphasized
                          ? "text-black font-bold scale-[1.02]"
                          : "text-neutral-400 font-normal"
                      }`}
                    >
                      {segment.text}
                    </span>
                  );
                })}
                <span className="text-neutral-400 ml-1 select-none">”</span>
              </div>

              {/* 2. Desktop/Tablet 4-Corner Symmetrical Spatial Stage Canvas */}
              <div className="hidden sm:block relative w-full aspect-[16/10] min-h-[380px] rounded-2xl border border-neutral-200/70 bg-[#FAFAFA] p-4 sm:p-5 overflow-hidden">
                
                {/* Subtle Dot Grid */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                  aria-hidden="true"
                />

                {/* Extremely Subtle 1px Hairline Connector Paths (Active Only on Matching Context) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  {/* Preferences (Top-Left: ~24, 24) to Center (50, 50) */}
                  <path
                    d="M 26 26 Q 36 36 50 50"
                    fill="none"
                    stroke={currentScenario.activeCards.includes("preferences") && loopTime >= 1.4 ? "#171717" : "#E5E5E5"}
                    strokeWidth={currentScenario.activeCards.includes("preferences") && loopTime >= 1.4 ? "1.2" : "0.75"}
                    strokeDasharray={currentScenario.activeCards.includes("preferences") && loopTime >= 1.4 ? "none" : "2,2"}
                    className="transition-colors duration-300"
                  />
                  {/* People (Top-Right: ~76, 24) to Center (50, 50) */}
                  <path
                    d="M 74 26 Q 64 36 50 50"
                    fill="none"
                    stroke={currentScenario.activeCards.includes("people") && loopTime >= 1.4 ? "#171717" : "#E5E5E5"}
                    strokeWidth={currentScenario.activeCards.includes("people") && loopTime >= 1.4 ? "1.2" : "0.75"}
                    strokeDasharray={currentScenario.activeCards.includes("people") && loopTime >= 1.4 ? "none" : "2,2"}
                    className="transition-colors duration-300"
                  />
                  {/* Team (Bottom-Left: ~24, 76) to Center (50, 50) */}
                  <path
                    d="M 26 74 Q 36 64 50 50"
                    fill="none"
                    stroke={currentScenario.activeCards.includes("team") && loopTime >= 1.4 ? "#171717" : "#E5E5E5"}
                    strokeWidth={currentScenario.activeCards.includes("team") && loopTime >= 1.4 ? "1.2" : "0.75"}
                    strokeDasharray={currentScenario.activeCards.includes("team") && loopTime >= 1.4 ? "none" : "2,2"}
                    className="transition-colors duration-300"
                  />
                  {/* Facts (Bottom-Right: ~76, 76) to Center (50, 50) */}
                  <path
                    d="M 74 74 Q 64 64 50 50"
                    fill="none"
                    stroke={currentScenario.activeCards.includes("facts") && loopTime >= 1.4 ? "#171717" : "#E5E5E5"}
                    strokeWidth={currentScenario.activeCards.includes("facts") && loopTime >= 1.4 ? "1.2" : "0.75"}
                    strokeDasharray={currentScenario.activeCards.includes("facts") && loopTime >= 1.4 ? "none" : "2,2"}
                    className="transition-colors duration-300"
                  />
                </svg>

                {/* Dead-Center Minimal Mello Listening Notch Anchor */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ECECEC]/95 border border-white/90 shadow-[0_10px_25px_rgba(0,0,0,0.1)] backdrop-blur-xl select-none">
                    <span className="text-[9px] font-black tracking-[0.14em] text-black uppercase font-mono">
                      MELLO
                    </span>

                    {/* Dynamic Icon State: Mic -> Loading Dots -> Check */}
                    {isListening && (
                      <div className="w-5 h-5 rounded-full bg-white shadow-2xs border border-neutral-200 flex items-center justify-center">
                        <Mic className="w-2.5 h-2.5 text-black animate-pulse" />
                      </div>
                    )}
                    {isResolving && (
                      <div className="w-5 h-5 rounded-full bg-white shadow-2xs border border-neutral-200 flex items-center justify-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-900 animate-ping" />
                      </div>
                    )}
                    {isResolved && (
                      <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    {/* Waveform Bars (During Listening) */}
                    {isListening && (
                      <div className="flex items-center gap-[2px] h-3.5" aria-hidden="true">
                        {[4, 10, 14, 8, 12, 6, 11].map((h, i) => (
                          <motion.span
                            key={i}
                            animate={{
                              height: [`${Math.max(2, h * 0.35)}px`, `${h}px`, `${Math.max(2, h * 0.25)}px`],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.75,
                              delay: i * 0.08,
                              ease: "easeInOut",
                            }}
                            className="w-[2px] bg-black rounded-full block"
                          />
                        ))}
                      </div>
                    )}

                    {/* Text Status */}
                    <span className="text-[10.5px] font-mono text-neutral-700 tracking-tight font-medium">
                      {isListening
                        ? "Listening..."
                        : isResolving
                        ? "Resolving context..."
                        : "Context resolved"}
                    </span>
                  </div>
                </div>

                {/* 4 Spatial Context Cards (Brought 15% Closer to Center) */}
                <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-4 p-1 z-10 pointer-events-none">
                  
                  {/* Top-Left: PREFERENCES */}
                  <div className="flex items-start justify-start">
                    <ContextCard
                      category="PREFERENCES"
                      value={currentScenario.cardValues.preferences.value}
                      subLabel={currentScenario.cardValues.preferences.subLabel}
                      icon={currentScenario.cardValues.preferences.icon}
                      isActive={currentScenario.activeCards.includes("preferences")}
                      loopTime={loopTime}
                    />
                  </div>

                  {/* Top-Right: PEOPLE */}
                  <div className="flex items-start justify-end">
                    <ContextCard
                      category="PEOPLE"
                      value={currentScenario.cardValues.people.value}
                      subLabel={currentScenario.cardValues.people.subLabel}
                      icon={currentScenario.cardValues.people.icon}
                      isActive={currentScenario.activeCards.includes("people")}
                      loopTime={loopTime}
                    />
                  </div>

                  {/* Bottom-Left: TEAM */}
                  <div className="flex items-end justify-start">
                    <ContextCard
                      category="TEAM"
                      value={currentScenario.cardValues.team.value}
                      subLabel={currentScenario.cardValues.team.subLabel}
                      icon={currentScenario.cardValues.team.icon}
                      isActive={currentScenario.activeCards.includes("team")}
                      loopTime={loopTime}
                    />
                  </div>

                  {/* Bottom-Right: FACTS */}
                  <div className="flex items-end justify-end">
                    <ContextCard
                      category="FACTS"
                      value={currentScenario.cardValues.facts.value}
                      subLabel={currentScenario.cardValues.facts.subLabel}
                      icon={currentScenario.cardValues.facts.icon}
                      isActive={currentScenario.activeCards.includes("facts")}
                      loopTime={loopTime}
                    />
                  </div>

                </div>

                {/* 3. Output Resolution State: Compact Action Preview Overlay */}
                <AnimatePresence>
                  {showActionPreview && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 w-[92%] sm:w-[380px]"
                    >
                      <div className="p-3.5 rounded-2xl bg-neutral-950 text-white shadow-[0_16px_36px_rgba(0,0,0,0.28)] border border-neutral-800 flex items-center justify-between gap-3 select-none">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center shrink-0">
                            {React.createElement(currentScenario.actionPreview.serviceIcon, {
                              size: 15,
                              className: "text-white",
                            })}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">
                                {currentScenario.actionPreview.service}
                              </span>
                            </div>
                            <h5 className="text-xs sm:text-[13px] font-bold text-white tracking-tight truncate leading-tight mt-0.5">
                              {currentScenario.actionPreview.title}
                            </h5>
                            <p className="text-[10.5px] text-neutral-400 truncate mt-0.5">
                              {currentScenario.actionPreview.details}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-1 text-[11px] font-mono font-semibold text-neutral-300 pl-2 border-l border-neutral-800">
                          <span>Approve</span>
                          <ArrowRight size={11} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* 4. Mobile Sequential Flow (Phrase -> Mello -> Cards -> Resolved Action) */}
              <div className="sm:hidden space-y-3 pt-1">
                {/* Mello State */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F5] border border-neutral-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black font-mono">MELLO</span>
                    <Mic size={12} className="text-neutral-800 animate-pulse" />
                  </div>
                  <span className="font-mono text-[11px] text-neutral-600 font-medium">
                    {isListening
                      ? "Listening..."
                      : isResolving
                      ? "Resolving context..."
                      : "Context resolved"}
                  </span>
                </div>

                {/* 4 Cards Stack */}
                <div className="grid grid-cols-2 gap-2">
                  <ContextCard
                    category="PEOPLE"
                    value={currentScenario.cardValues.people.value}
                    subLabel={currentScenario.cardValues.people.subLabel}
                    icon={currentScenario.cardValues.people.icon}
                    isActive={currentScenario.activeCards.includes("people")}
                    loopTime={loopTime}
                  />
                  <ContextCard
                    category="TEAM"
                    value={currentScenario.cardValues.team.value}
                    subLabel={currentScenario.cardValues.team.subLabel}
                    icon={currentScenario.cardValues.team.icon}
                    isActive={currentScenario.activeCards.includes("team")}
                    loopTime={loopTime}
                  />
                  <ContextCard
                    category="PREFERENCES"
                    value={currentScenario.cardValues.preferences.value}
                    subLabel={currentScenario.cardValues.preferences.subLabel}
                    icon={currentScenario.cardValues.preferences.icon}
                    isActive={currentScenario.activeCards.includes("preferences")}
                    loopTime={loopTime}
                  />
                  <ContextCard
                    category="FACTS"
                    value={currentScenario.cardValues.facts.value}
                    subLabel={currentScenario.cardValues.facts.subLabel}
                    icon={currentScenario.cardValues.facts.icon}
                    isActive={currentScenario.activeCards.includes("facts")}
                    loopTime={loopTime}
                  />
                </div>

                {/* Mobile Action Preview */}
                {showActionPreview && (
                  <div className="p-3 rounded-xl bg-neutral-950 text-white border border-neutral-800 flex items-center justify-between text-xs mt-2">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        {currentScenario.actionPreview.service}
                      </span>
                      <strong className="text-white text-xs block leading-tight">
                        {currentScenario.actionPreview.title}
                      </strong>
                    </div>
                    <span className="text-[10.5px] font-mono text-neutral-300 flex items-center gap-1">
                      Approve →
                    </span>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

        </div>
      </section>
    );
  }

// ---------------------------------------------------------------------------
// CONTEXT CARD COMPONENT (Refined, High Contrast Monochrome, Responsive)
// ---------------------------------------------------------------------------

function ContextCard({
  category,
  value,
  subLabel,
  icon: Icon,
  isActive,
  loopTime,
}: {
  category: "PEOPLE" | "TEAM" | "PREFERENCES" | "FACTS";
  value: string;
  subLabel: string;
  icon: React.ElementType;
  isActive: boolean;
  loopTime: number;
}) {
  const isEmphasized = isActive && loopTime >= 1.2;

  return (
    <div
      className={`w-[130px] xs:w-[145px] sm:w-[155px] p-3 rounded-xl border transition-all duration-300 pointer-events-auto bg-white ${
        isEmphasized
          ? "border-neutral-900 shadow-md ring-1 ring-neutral-950/10 -translate-y-0.5 opacity-100"
          : "border-neutral-200/90 shadow-2xs opacity-50"
      }`}
    >
      <div className="flex items-center justify-between gap-1 mb-1">
        <span
          className={`text-[9.5px] font-mono font-bold uppercase tracking-wider transition-colors ${
            isEmphasized ? "text-neutral-900" : "text-neutral-500"
          }`}
        >
          {category}
        </span>
        <div
          className={`w-4.5 h-4.5 rounded-full flex items-center justify-center transition-colors ${
            isEmphasized ? "bg-neutral-100 text-neutral-900" : "bg-neutral-100/60 text-neutral-400"
          }`}
        >
          <Icon size={10} />
        </div>
      </div>

      {/* Recognized Entity Value: Bold typography */}
      <div className="my-0.5 sm:my-1">
        <h4 className="text-xs sm:text-[13.5px] font-bold text-neutral-950 tracking-tight leading-tight truncate">
          {value}
        </h4>
      </div>

      <div className="flex items-center justify-between text-[9px] sm:text-[9.5px] text-neutral-500 font-mono leading-tight">
        <span className="truncate">{subLabel}</span>
        {isEmphasized && (
          <Check size={10} className="text-neutral-950 stroke-[2.5] shrink-0 ml-1" />
        )}
      </div>
    </div>
  );
}

export default MemorySection;
