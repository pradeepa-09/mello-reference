"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  Check, 
  Calendar, 
  Mail, 
  User, 
  FileText, 
  Bell 
} from "lucide-react";

export interface ActionCardData {
  icon: "calendar" | "mail" | "github" | "user" | "file" | "bell" | "check";
  title: string;
  subtitle: string;
}

export interface CommandData {
  id: string;
  leadWords: string[];
  entity: string;
  cards: [ActionCardData, ActionCardData, ActionCardData];
}

export const COMMANDS: CommandData[] = [
  {
    id: "cmd-1",
    leadWords: ["Schedule", "a", "product", "sync", "with"],
    entity: "Atharva tomorrow at 10 AM",
    cards: [
      { icon: "calendar", title: "Google Calendar", subtitle: "Work account" },
      { icon: "user", title: "Sync with Atharva", subtitle: "Tomorrow at 10:00 AM" },
      { icon: "check", title: "Plan ready", subtitle: "Review before scheduling" },
    ],
  },
  {
    id: "cmd-2",
    leadWords: ["Send", "the", "invoice", "to"],
    entity: "Priya by Friday",
    cards: [
      { icon: "mail", title: "Gmail", subtitle: "Work account" },
      { icon: "file", title: "Invoice to Priya", subtitle: "Due Friday" },
      { icon: "check", title: "Draft ready", subtitle: "Awaiting send" },
    ],
  },
  {
    id: "cmd-3",
    leadWords: ["Open", "a", "GitHub", "issue", "for"],
    entity: "Payment timeout bug",
    cards: [
      { icon: "github", title: "GitHub", subtitle: "mello-app/backend" },
      { icon: "file", title: "Payment timeout bug", subtitle: "High priority" },
      { icon: "check", title: "Issue ready", subtitle: "Review before opening" },
    ],
  },
];

// Audio frequency heights matching RecordingBar notch structure
const AUDIO_BARS = [8, 14, 20, 28, 38, 26, 34, 22, 16, 12, 8, 6, 4];

function SparkleSvgIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5L14.2 9.6L21.5 12L14.2 14.4L12 21.5L9.8 14.4L2.5 12L9.8 9.6L12 2.5Z" />
      <circle cx="19.5" cy="5" r="1.5" />
      <circle cx="4.5" cy="19.5" r="1" />
    </svg>
  );
}

function RecordingTargetIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" />
    </svg>
  );
}

function GithubSvgIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function CardIcon({ type }: { type: ActionCardData["icon"] }) {
  switch (type) {
    case "calendar":
      return <Calendar className="w-5 h-5 text-white" />;
    case "mail":
      return <Mail className="w-5 h-5 text-white" />;
    case "github":
      return <GithubSvgIcon className="w-5 h-5 text-white fill-current" />;
    case "user":
      return <User className="w-5 h-5 text-white" />;
    case "file":
      return <FileText className="w-5 h-5 text-white" />;
    case "bell":
      return <Bell className="w-5 h-5 text-white" />;
    case "check":
    default:
      return <Check className="w-5 h-5 text-white stroke-[2.5]" />;
  }
}

// Organic scatter coordinates per cycle
function getRandomScatter() {
  return [
    {
      x: Math.round(Math.random() * 50 - 25),
      y: Math.round(35 + Math.random() * 20),
      rotate: Math.round(Math.random() * 16 - 8),
    },
    {
      x: Math.round(Math.random() * 50 - 25),
      y: Math.round(40 + Math.random() * 20),
      rotate: Math.round(Math.random() * 16 - 8),
    },
    {
      x: Math.round(Math.random() * 50 - 25),
      y: Math.round(35 + Math.random() * 20),
      rotate: Math.round(Math.random() * 16 - 8),
    },
  ];
}

type DemoPhase = "listening" | "expanding" | "transcribing" | "ready" | "collapsing";

interface ActCommandDemoProps {
  onStepChange?: (step: 0 | 1 | 2) => void;
  externalActiveStep?: 0 | 1 | 2;
}

export function ActCommandDemo({ onStepChange, externalActiveStep }: ActCommandDemoProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  const [commandIndex, setCommandIndex] = useState(0);
  const [phase, setPhase] = useState<DemoPhase>("listening");
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [isEntityVisible, setIsEntityVisible] = useState(false);
  const [isEntityFilled, setIsEntityFilled] = useState(false);
  const [scatterOffsets, setScatterOffsets] = useState(getRandomScatter);

  const currentCommand = COMMANDS[commandIndex];

  // Report step changes to parent timeline (0: LISTEN, 1: WRITE, 2: ACT)
  const notifyStep = useCallback(
    (step: 0 | 1 | 2) => {
      onStepChange?.(step);
    },
    [onStepChange]
  );

  // Pause loop when off-screen
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

  // Main synchronized execution cycle (snappy & quick)
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const timeouts: NodeJS.Timeout[] = [];
    let wordInterval: NodeJS.Timeout | null = null;
    let isCancelled = false;

    // 1. Initial State: Compact Listening (~1000ms)
    setScatterOffsets(getRandomScatter());
    setPhase("listening");
    setVisibleWordCount(0);
    setIsEntityVisible(false);
    setIsEntityFilled(false);
    notifyStep(0); // Timeline: LISTEN

    // 2. Begin smooth expansion
    const tExpand = setTimeout(() => {
      if (isCancelled) return;
      setPhase("expanding");
      notifyStep(1); // Timeline: WRITE

      // 3. After notch expands (~200ms), start streaming words quickly
      const tTypingStart = setTimeout(() => {
        if (isCancelled) return;
        setPhase("transcribing");

        const totalWords = currentCommand.leadWords.length;
        let wordCounter = 0;

        wordInterval = setInterval(() => {
          if (isCancelled) return;
          wordCounter += 1;
          setVisibleWordCount(wordCounter);

          if (wordCounter >= totalWords) {
            if (wordInterval) clearInterval(wordInterval);

            // 4. Words finished, show entity text quickly
            const tEntityAppear = setTimeout(() => {
              if (isCancelled) return;
              setIsEntityVisible(true);

              // 5. Highlight intent entity and pop action checkmark
              const tReady = setTimeout(() => {
                if (isCancelled) return;
                setPhase("ready");
                setIsEntityFilled(true);
                notifyStep(2); // Timeline: ACT

                // 6. Hold assembled cards for review (~1600ms)
                const tHold = setTimeout(() => {
                  if (isCancelled) return;
                  setPhase("collapsing");

                  // 7. After smooth collapse (~250ms), cycle to next command
                  const tNext = setTimeout(() => {
                    if (isCancelled) return;
                    setCommandIndex((prev) => (prev + 1) % COMMANDS.length);
                  }, 250);

                  timeouts.push(tNext);
                }, 1600);

                timeouts.push(tHold);
              }, 200);

              timeouts.push(tReady);
            }, 100);

            timeouts.push(tEntityAppear);
          }
        }, 80);
      }, 200);

      timeouts.push(tTypingStart);
    }, 1000);

    timeouts.push(tExpand);

    return () => {
      isCancelled = true;
      if (wordInterval) clearInterval(wordInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [commandIndex, currentCommand, isInView, reduceMotion, notifyStep]);

  const isCompact = phase === "listening" || phase === "collapsing";
  const isActionReady = phase === "ready";
  const isCardsVisible = phase === "ready";

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* Top Action Notch Pill Component (Fluid Spring Morphing) */}
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 24,
          mass: 0.8,
        }}
        className={`${
          isCompact
            ? "w-fit max-w-[480px] min-h-[54px] sm:min-h-[58px] px-3.5 sm:px-4 py-2 sm:py-2.5"
            : "w-full max-w-3xl sm:max-w-4xl min-h-[76px] sm:min-h-[82px] px-4 sm:px-5 py-3 sm:py-3.5"
        } rounded-full border border-neutral-200/90 bg-white/95 backdrop-blur-2xl flex items-center justify-between gap-3 sm:gap-4 shadow-xl relative mx-auto overflow-hidden`}
        style={{
          boxShadow: isActionReady
            ? "0 20px 45px rgba(0, 0, 0, 0.08), 0 0 0 1.5px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.95)"
            : "0 12px 36px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
        }}
        aria-label={`Mello is ${isCompact ? "listening" : isActionReady ? "action ready" : "transcribing"}`}
      >
        {/* Left: Sparkle Circle Button & Mode Name */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <motion.div
            layout
            animate={{
              rotate: isActionReady ? 360 : 0,
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`${
              isCompact ? "w-8 h-8 sm:w-9 sm:h-9" : "w-10 h-10 sm:w-11 sm:h-11"
            } rounded-full border border-neutral-200 bg-white flex items-center justify-center shadow-2xs select-none transition-all duration-300`}
          >
            <SparkleSvgIcon
              className={`${
                isCompact ? "w-3.5 h-3.5 sm:w-4 sm:h-4" : "w-4 h-4 sm:w-4.5 sm:h-4.5"
              } text-neutral-900`}
            />
          </motion.div>

          {/* Brand Text: Only shown in expanded mode */}
          <AnimatePresence>
            {!isCompact && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-left hidden xs:flex flex-col select-none overflow-hidden"
              >
                <span className="text-xs font-mono font-extrabold tracking-[0.14em] text-black uppercase leading-none">
                  MELLO
                </span>
                <span className="text-[11px] font-sans text-neutral-500 font-medium leading-tight mt-1">
                  {isActionReady ? "Action ready" : "Dictation"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Thin Vertical Divider */}
        <div
          className={`${
            isCompact ? "h-6 sm:h-7" : "h-8 sm:h-9"
          } w-[1px] bg-neutral-200 shrink-0 mx-0.5 sm:mx-1 transition-all duration-300`}
        />

        {/* Center: Listening Waveform vs. Transcribed Words */}
        <div className="flex-1 min-w-0 px-1 sm:px-2 flex items-center">
          <AnimatePresence mode="wait">
            {isCompact ? (
              /* Compact Listening Waveform State */
              <motion.div
                key="compact-listening"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 sm:gap-4 w-full"
              >
                {/* Audio Wave */}
                <div
                  className="flex items-center justify-center gap-[2.5px] sm:gap-[3.5px] h-7 sm:h-8 shrink-0"
                  aria-label="Audio waveform listening"
                >
                  {AUDIO_BARS.map((height, idx) => (
                    <motion.div
                      key={`bar-${idx}`}
                      animate={{
                        height: [
                          Math.max(3, height * 0.25),
                          height * 0.75,
                          Math.max(3, height * 0.25),
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.1 + (idx % 4) * 0.11,
                        delay: idx * -0.07,
                        ease: "easeInOut",
                      }}
                      className="w-[2.5px] sm:w-[3px] rounded-full bg-neutral-500/80 shrink-0"
                    />
                  ))}
                </div>

                {/* "Listening..." Status */}
                <span className="text-xs sm:text-sm lg:text-[15px] font-medium text-neutral-500 font-sans tracking-tight select-none whitespace-nowrap">
                  Listening...
                </span>
              </motion.div>
            ) : (
              /* Expanded Spoken Text & Intent Tag State */
              <motion.div
                key="expanded-command"
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.22 }}
                className="text-left w-full py-0.5"
              >
                <small className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-0.5 select-none">
                  {isActionReady ? "READY TO ACT" : "VOICE DICTATION"}
                </small>

                <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-neutral-950 tracking-tight font-sans flex flex-wrap items-center gap-1.5 leading-snug">
                  {/* Lead Words */}
                  {currentCommand.leadWords.map((word, idx) => (
                    <span
                      key={`${currentCommand.id}-word-${idx}`}
                      className="transition-opacity duration-150 inline-block"
                      style={{
                        opacity: reduceMotion || idx < visibleWordCount ? 1 : 0,
                      }}
                    >
                      {word}
                    </span>
                  ))}

                  {/* Highlighted Entity Tag */}
                  {isEntityVisible && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        backgroundColor: isEntityFilled || reduceMotion ? "#000000" : "transparent",
                        color: isEntityFilled || reduceMotion ? "#ffffff" : "#171717",
                        paddingLeft: isEntityFilled || reduceMotion ? "12px" : "0px",
                        paddingRight: isEntityFilled || reduceMotion ? "12px" : "0px",
                        paddingTop: isEntityFilled || reduceMotion ? "4px" : "0px",
                        paddingBottom: isEntityFilled || reduceMotion ? "4px" : "0px",
                        borderRadius: isEntityFilled || reduceMotion ? "12px" : "0px",
                      }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-flex items-center text-sm sm:text-base lg:text-lg font-bold shadow-xs whitespace-nowrap"
                    >
                      {currentCommand.entity}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Circular Action Button */}
        <div className="shrink-0 flex items-center gap-3">
          {!isCompact && (
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-neutral-200 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-900" />
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-400">
                Active
              </span>
            </div>
          )}

          <motion.div
            layout
            animate={{
              scale: isActionReady ? [1, 1.18, 1] : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${
              isCompact ? "w-8 h-8 sm:w-9 sm:h-9" : "w-10 h-10 sm:w-11 sm:h-11"
            } rounded-full bg-black text-white flex items-center justify-center shadow-md select-none transition-all duration-300 shrink-0`}
            title={isActionReady ? "Action Approved" : "Listening Active"}
          >
            <AnimatePresence mode="wait">
              {isActionReady ? (
                <motion.div
                  key="check-icon"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
                </motion.div>
              ) : (
                <motion.div
                  key="target-icon"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <RecordingTargetIcon
                    className={`${isCompact ? "w-3.5 h-3.5" : "w-4 h-4"} text-white`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom 3 Cards Row (Scatter & Settle) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-7 min-h-[92px]">
        {currentCommand.cards.map((card, idx) => {
          const scatter = scatterOffsets[idx] || { x: 0, y: 40, rotate: 0 };
          const isSettled = isCardsVisible || reduceMotion;

          return (
            <motion.div
              key={`${currentCommand.id}-card-${idx}`}
              initial={
                reduceMotion
                  ? false
                  : {
                      x: scatter.x,
                      y: scatter.y,
                      rotate: scatter.rotate,
                      opacity: 0,
                    }
              }
              animate={
                isSettled
                  ? {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 1,
                    }
                  : {
                      x: scatter.x,
                      y: scatter.y + 20,
                      rotate: scatter.rotate,
                      opacity: 0,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 0.85,
                delay: isSettled ? idx * 0.12 : 0,
              }}
              className="p-5 rounded-3xl border border-neutral-200 bg-white shadow-md flex items-center gap-4 text-left hover:border-neutral-300 transition-colors will-change-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CardIcon type={card.icon} />
              </div>
              <div className="min-w-0">
                <strong className="text-sm font-bold text-black block truncate">
                  {card.title}
                </strong>
                <span className="text-xs text-neutral-500 block truncate">
                  {card.subtitle}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ActCommandDemo;
