"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Mail } from "lucide-react";

function GithubOfficialIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface DetailField {
  label: string;
  value: string;
}

interface ActionCardScenario {
  id: "calendar" | "github" | "email";
  pillLabel: string;
  pillIcon: "calendar" | "github" | "email";
  tabOffsetLeft: string;
  youAsked: string;
  stepNumber: number;
  stepTitle: string;
  details: DetailField[];
}

const ACTION_SCENARIOS: ActionCardScenario[] = [
  {
    id: "calendar",
    pillLabel: "CALENDAR",
    pillIcon: "calendar",
    tabOffsetLeft: "left-6 sm:left-8",
    youAsked: "Create a team meeting with Alex tomorrow morning at 10 a.m.",
    stepNumber: 1,
    stepTitle: "Prepare the calendar event",
    details: [
      { label: "Date", value: "Tuesday, August 4" },
      { label: "Starts", value: "10:00 AM" },
      { label: "Ends", value: "11:00 AM" },
      { label: "Length", value: "60 minutes" },
      { label: "Time zone", value: "India Standard Time" },
    ],
  },
  {
    id: "github",
    pillLabel: "GITHUB",
    pillIcon: "github",
    tabOffsetLeft: "left-28 sm:left-36",
    youAsked: "Create a GitHub issue for the login redirect bug in the Mello desktop repo.",
    stepNumber: 1,
    stepTitle: "Prepare the GitHub issue",
    details: [
      { label: "Repository", value: "mello-app/mello-desktop" },
      { label: "Title", value: "Fix login redirect after authentication" },
      { label: "Label", value: "bug" },
      { label: "Priority", value: "High" },
      { label: "Assignee", value: "Desktop engineering" },
    ],
  },
  {
    id: "email",
    pillLabel: "EMAIL",
    pillIcon: "email",
    tabOffsetLeft: "left-52 sm:left-64",
    youAsked: "Send an email to Sarah asking for the latest design files for the landing page.",
    stepNumber: 1,
    stepTitle: "Prepare the email draft",
    details: [
      { label: "To", value: "sarah@mello.app" },
      { label: "Subject", value: "Latest landing page design files" },
      { label: "Attachment", value: "None" },
      { label: "Account", value: "Google Workspace" },
      { label: "Status", value: "Awaiting your approval" },
    ],
  },
];

export function ActionCardStackDemo() {
  const reduceMotion = useReducedMotion();
  const [deck, setDeck] = useState(ACTION_SCENARIOS);
  const [isInView, setIsInView] = useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  // Pop and cycle top card to the back
  const popNextCard = () => {
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  // Autonomous Smooth Popping Loop (every 3.6s)
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const timer = setInterval(() => {
      popNextCard();
    }, 3600);

    return () => clearInterval(timer);
  }, [isInView, reduceMotion]);

  const renderPillIcon = (icon: "calendar" | "github" | "email") => {
    switch (icon) {
      case "calendar":
        return <Calendar className="w-3.5 h-3.5 text-white stroke-[2.2]" />;
      case "github":
        return <GithubOfficialIcon className="w-3.5 h-3.5 text-white" />;
      case "email":
        return <Mail className="w-3.5 h-3.5 text-white stroke-[2.2]" />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col items-center select-none relative pt-6 pb-8 overflow-visible"
    >
      {/* 3D Stack Stage */}
      <div
        className="relative w-full max-w-[480px] sm:max-w-[520px] mx-auto min-h-[530px] sm:min-h-[550px] flex items-center justify-center cursor-pointer"
        onClick={popNextCard}
        style={{ perspective: 1200 }}
      >
        {/* Soft shadow underneath base of the card stack */}
        <div
          className="absolute inset-x-8 -bottom-4 h-8 bg-neutral-300/40 rounded-[32px] blur-md pointer-events-none transform translate-y-3 scale-95"
          aria-hidden="true"
        />

        {deck.map((card, index) => {
          // index 0: Front active card (popping in front)
          // index 1: Middle card (layered behind, peeking right & up)
          // index 2: Back card (layered furthest back, peeking left & up)
          const isTop = index === 0;

          let y = 0;
          let x = 0;
          let z = 0;
          let rotate = 0;
          let scale = 1;
          let opacity = 1;
          let shadow = "0 30px 80px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.04)";
          const zIndex = 30 - index * 10;

          if (isTop) {
            y = 0;
            x = 0;
            z = 0;
            rotate = 0;
            scale = 1;
            opacity = 1;
            shadow = "0 30px 80px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.04)";
          } else if (index === 1) {
            y = -14;
            x = 8;
            z = -30;
            rotate = 2.8;
            scale = 0.96;
            opacity = 0.92;
            shadow = "0 18px 45px rgba(0,0,0,0.07)";
          } else {
            // Back card
            y = -28;
            x = -8;
            z = -60;
            rotate = -3.2;
            scale = 0.92;
            opacity = 0.80;
            shadow = "0 10px 30px rgba(0,0,0,0.05)";
          }

          return (
            <motion.div
              key={card.id}
              layout
              initial={{
                y: -36,
                scale: 0.90,
                opacity: 0.5,
              }}
              animate={{
                y,
                x,
                z,
                rotate,
                scale,
                opacity,
                zIndex,
              }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                  mass: 0.9,
                },
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformStyle: "preserve-3d",
                boxShadow: shadow,
              }}
              className="absolute inset-x-0 top-6 rounded-[28px] border border-neutral-200/90 bg-white p-6 sm:p-8 text-left origin-center will-change-transform min-h-[480px] sm:min-h-[500px]"
            >
              {/* Top Floating App Pill Badge */}
              <div className={`absolute -top-4 ${card.tabOffsetLeft} z-30 transition-all duration-300`}>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-950 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_4px_14px_rgba(0,0,0,0.22)] border border-neutral-800">
                  {renderPillIcon(card.pillIcon)}
                  <span>{card.pillLabel}</span>
                </div>
              </div>

              {/* Card Body Content: Only visible on the active front popped card */}
              {isTop ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  {/* YOU ASKED */}
                  <div className="pt-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-neutral-400 block mb-2">
                      YOU ASKED
                    </span>
                    <p className="text-sm sm:text-base text-neutral-900 font-normal leading-relaxed min-h-[44px]">
                      {card.youAsked}
                    </p>
                  </div>

                  {/* Separator */}
                  <div className="h-px w-full bg-neutral-200/80 my-4 sm:my-5" />

                  {/* Step Action Row */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-neutral-950 text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 shadow-sm">
                      {card.stepNumber}
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-neutral-950">
                      {card.stepTitle}
                    </span>
                  </div>

                  {/* Separator */}
                  <div className="h-px w-full bg-neutral-200/80 my-4 sm:my-5" />

                  {/* STRUCTURED DETAILS */}
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-neutral-400 block mb-2.5 sm:mb-3">
                      STRUCTURED DETAILS
                    </span>

                    <div className="space-y-2">
                      {card.details.map((field) => (
                        <div
                          key={field.label}
                          className="bg-[#FAFAFA] border border-neutral-200/80 rounded-xl px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-4 text-xs sm:text-sm"
                        >
                          <span className="text-neutral-500 font-normal shrink-0">
                            {field.label}
                          </span>
                          <span className="text-neutral-950 font-semibold text-right truncate">
                            {field.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Clean Blank Silhouette for Stacked Background Cards — No Text Clutter */
                <div className="pt-6 opacity-30 select-none pointer-events-none" aria-hidden="true">
                  <div className="h-2 w-24 bg-neutral-200 rounded mb-4" />
                  <div className="h-3.5 w-3/4 bg-neutral-100 rounded mb-6" />
                  <div className="h-px w-full bg-neutral-100 mb-6" />
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-6 h-6 rounded-full bg-neutral-200" />
                    <div className="h-3 w-40 bg-neutral-200 rounded" />
                  </div>
                  <div className="h-px w-full bg-neutral-100 mb-6" />
                  <div className="space-y-2.5">
                    <div className="h-9 w-full bg-neutral-50 border border-neutral-100/80 rounded-xl" />
                    <div className="h-9 w-full bg-neutral-50 border border-neutral-100/80 rounded-xl" />
                    <div className="h-9 w-full bg-neutral-50 border border-neutral-100/80 rounded-xl" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ActionCardStackDemo;
