"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  Sparkles, 
  Check, 
  Calendar, 
  Mail, 
  MessageSquare, 
  User, 
  FileText, 
  Bell 
} from "lucide-react";

interface ActionCardData {
  icon: "calendar" | "mail" | "github" | "user" | "file" | "bell" | "check";
  title: string;
  subtitle: string;
}

interface CommandData {
  id: string;
  leadWords: string[];
  entity: string;
  cards: [ActionCardData, ActionCardData, ActionCardData];
}

const COMMANDS: CommandData[] = [
  {
    id: "cmd-1",
    leadWords: ["Schedule", "a", "product", "sync", "with"],
    entity: "Alex tomorrow at 10 AM",
    cards: [
      { icon: "calendar", title: "Google Calendar", subtitle: "Work account" },
      { icon: "user", title: "Sync with Alex", subtitle: "Tomorrow at 10:00 AM" },
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

// Generate organic randomized scatter start coordinates per cycle
function getRandomScatter() {
  return [
    {
      x: Math.round(Math.random() * 80 - 40),
      y: Math.round(40 + Math.random() * 30),
      rotate: Math.round(Math.random() * 24 - 12),
    },
    {
      x: Math.round(Math.random() * 80 - 40),
      y: Math.round(45 + Math.random() * 30),
      rotate: Math.round(Math.random() * 24 - 12),
    },
    {
      x: Math.round(Math.random() * 80 - 40),
      y: Math.round(40 + Math.random() * 30),
      rotate: Math.round(Math.random() * 24 - 12),
    },
  ];
}

export function ActCommandDemo() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  const [commandIndex, setCommandIndex] = useState(0);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isEntityFilled, setIsEntityFilled] = useState(false);
  const [isCheckmarkVisible, setIsCheckmarkVisible] = useState(false);
  const [areCardsVisible, setAreCardsVisible] = useState(false);
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const [scatterOffsets, setScatterOffsets] = useState(getRandomScatter);

  const currentCommand = COMMANDS[commandIndex];

  // Pause when off-screen
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

  // Continuous loop sequence
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const timeouts: NodeJS.Timeout[] = [];
    const intervals: NodeJS.Timeout[] = [];
    let isCancelled = false;

    // 1. Reset state & generate new randomized scatter coordinates
    setScatterOffsets(getRandomScatter());
    setVisibleWordCount(0);
    setIsDetecting(false);
    setIsEntityFilled(false);
    setIsCheckmarkVisible(false);
    setAreCardsVisible(false);
    setSceneOpacity(1);

    const totalWords = currentCommand.leadWords.length;
    let wordCounter = 0;

    // 2. Stream lead words one at a time (~160ms stagger)
    const wordInterval = setInterval(() => {
      if (isCancelled) return;
      wordCounter += 1;
      setVisibleWordCount(wordCounter);

      if (wordCounter >= totalWords) {
        clearInterval(wordInterval);

        // 3. ~250ms after last word: detecting pulse on sparkle icon
        const t1 = setTimeout(() => {
          if (isCancelled) return;
          setIsDetecting(true);

          // 4. ~400ms after detecting: entity transitions to solid filled tag + checkmark scales in
          const t2 = setTimeout(() => {
            if (isCancelled) return;
            setIsDetecting(false);
            setIsEntityFilled(true);
            setIsCheckmarkVisible(true);

            // 5. ~450ms after entity lands: 3 action cards scatter-and-settle with spring physics
            const t3 = setTimeout(() => {
              if (isCancelled) return;
              setAreCardsVisible(true);

              // 6. Hold fully assembled state ~2.2s
              const t4 = setTimeout(() => {
                if (isCancelled) return;
                // 7. Fade scene out (~300ms)
                setSceneOpacity(0);

                const t5 = setTimeout(() => {
                  if (isCancelled) return;
                  // Advance to next command
                  setCommandIndex((prev) => (prev + 1) % COMMANDS.length);
                }, 320);

                timeouts.push(t5);
              }, 2200);

              timeouts.push(t4);
            }, 450);

            timeouts.push(t3);
          }, 400);

          timeouts.push(t2);
        }, 250);

        timeouts.push(t1);
      }
    }, 160);

    intervals.push(wordInterval);

    return () => {
      isCancelled = true;
      intervals.forEach(clearInterval);
      timeouts.forEach(clearTimeout);
    };
  }, [commandIndex, currentCommand, isInView, reduceMotion]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      {/* Animated Scene Wrapper */}
      <div
        className="w-full flex flex-col items-center transition-opacity duration-300"
        style={{ opacity: sceneOpacity }}
      >
        {/* Top Action Notch Pill Component */}
        <div
          className="w-full rounded-full border border-neutral-300 bg-white p-3.5 sm:p-4.5 flex items-center justify-between gap-3 sm:gap-4 shadow-xl transition-all duration-300 relative min-h-[78px] sm:min-h-[86px]"
          style={{
            boxShadow: isEntityFilled
              ? "0 20px 45px rgba(0, 0, 0, 0.08), 0 0 0 1.5px rgba(0, 0, 0, 0.9)"
              : "0 20px 45px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Left: Sparkle Icon in Circle + MELLO Status */}
          <div className="flex items-center gap-3 sm:gap-3.5 shrink-0 pl-1 sm:pl-2">
            <motion.div
              animate={
                isDetecting
                  ? { rotate: [0, 180, 360], scale: [1, 1.25, 1] }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center shadow-2xs"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-900" />
            </motion.div>

            <div className="text-left hidden xs:block">
              <strong className="text-xs font-mono font-bold tracking-wider text-black block uppercase leading-tight">
                MELLO
              </strong>
              <span className="text-[11px] font-sans text-neutral-500 block leading-tight mt-0.5">
                {isEntityFilled
                  ? "Action ready"
                  : isDetecting
                  ? "Detecting intent…"
                  : "Listening…"}
              </span>
            </div>
          </div>

          {/* Thin Vertical Divider */}
          <div className="w-[1px] h-8 sm:h-9 bg-neutral-200 shrink-0" />

          {/* Center: Command Text Area */}
          <div className="flex-1 text-left px-1 sm:px-2 min-w-0">
            <small className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase block mb-0.5 select-none">
              READY TO ACT
            </small>

            {/* Stable Height Command Line */}
            <div className="text-sm sm:text-lg lg:text-xl font-bold text-neutral-950 tracking-tight font-sans flex flex-wrap items-center gap-1.5 leading-snug">
              {/* Lead Words (Fading in one by one) */}
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

              {/* Entity Recognition Tag */}
              <motion.span
                animate={{
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
            </div>
          </div>

          {/* Right: Black Circular Checkmark Action Button */}
          <div className="pr-1 sm:pr-2 shrink-0">
            <motion.div
              animate={{
                scale: isCheckmarkVisible || reduceMotion ? 1 : 0.6,
                opacity: isCheckmarkVisible || reduceMotion ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black text-white flex items-center justify-center shadow-md select-none"
              title="Action Approved"
            >
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]" />
            </motion.div>
          </div>
        </div>

        {/* Bottom 3 Cards Row (Scatter & Settle with Spring Physics) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-7 min-h-[92px]">
          {currentCommand.cards.map((card, idx) => {
            const scatter = scatterOffsets[idx] || { x: 0, y: 50, rotate: 0 };
            const isSettled = areCardsVisible || reduceMotion;

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
                        y: scatter.y,
                        rotate: scatter.rotate,
                        opacity: 0,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 19,
                  mass: 0.9,
                  delay: isSettled ? idx * 0.18 : 0,
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
    </div>
  );
}

export default ActCommandDemo;
