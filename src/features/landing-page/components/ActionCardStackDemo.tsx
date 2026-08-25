"use client";

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, MotionValue } from "framer-motion";
import { Calendar, Mail, ArrowDown } from "lucide-react";

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
    youAsked: "Create a team meeting with Atharva tomorrow morning at 10 a.m.",
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
    pillLabel: "GMAIL",
    pillIcon: "email",
    youAsked: "Send an email to Sarah asking for the latest design files for the landing page.",
    stepNumber: 1,
    stepTitle: "Prepare the email draft",
    details: [
      { label: "To", value: "sarah@gmail.com" },
      { label: "Subject", value: "Latest landing page design files" },
      { label: "Attachment", value: "None" },
      { label: "Account", value: "Google Workspace" },
      { label: "Status", value: "Awaiting your approval" },
    ],
  },
];

interface ActionCardStackDemoProps {
  scrollYProgress?: MotionValue<number>;
  onSelectIndex?: (index: number) => void;
}

export function ActionCardStackDemo({ scrollYProgress, onSelectIndex }: ActionCardStackDemoProps) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  // Synchronize activeCardIndex strictly from scroll progress
  useEffect(() => {
    if (!scrollYProgress) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      let nextIndex = 0;
      if (latest < 0.35) {
        nextIndex = 0;
      } else if (latest < 0.70) {
        nextIndex = 1;
      } else {
        nextIndex = 2;
      }
      setActiveIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const renderPillIcon = (icon: "calendar" | "github" | "email") => {
    switch (icon) {
      case "calendar":
        return <Calendar className="w-4 h-4 text-white stroke-[2.2]" />;
      case "github":
        return <GithubOfficialIcon className="w-4 h-4 text-white" />;
      case "email":
        return <Mail className="w-4 h-4 text-white stroke-[2.2]" />;
    }
  };

  // Cycle to next card manually on click
  const handleCardClick = () => {
    const next = (activeIndex + 1) % ACTION_SCENARIOS.length;
    setActiveIndex(next);
    if (onSelectIndex) onSelectIndex(next);
  };

  const handleTabClick = (idx: number) => {
    setActiveIndex(idx);
    if (onSelectIndex) onSelectIndex(idx);
  };

  return (
    <div className="w-full flex flex-col items-center select-none relative pt-4 pb-4 overflow-visible">
      {/* 3D Pristine Card Stack Stage */}
      <div
        className="relative w-full max-w-[480px] sm:max-w-[520px] mx-auto min-h-[510px] sm:min-h-[530px] flex items-center justify-center cursor-pointer"
        onClick={handleCardClick}
        style={{ perspective: 1200 }}
      >
        {/* Soft shadow underneath base of the card stack */}
        <div
          className="absolute inset-x-8 -bottom-4 h-8 bg-neutral-300/40 rounded-[32px] blur-md pointer-events-none transform translate-y-3 scale-95"
          aria-hidden="true"
        />

        {ACTION_SCENARIOS.map((card, index) => {
          // Relative position in deck: 0 = active, 1 = right background, 2 = left background
          const position = (index - activeIndex + ACTION_SCENARIOS.length) % ACTION_SCENARIOS.length;
          const isTop = position === 0;

          let y = 0;
          let x = 0;
          let z = 0;
          let rotate = 0;
          let scale = 1;
          let opacity = 1;
          let shadow = "0 30px 80px rgba(0,0,0,0.11), 0 4px 16px rgba(0,0,0,0.04)";
          const zIndex = 30 - position * 10;

          if (isTop) {
            // Active Center Front Card
            y = 0;
            x = 0;
            z = 0;
            rotate = 0;
            scale = 1;
            opacity = 1;
            shadow = "0 30px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)";
          } else if (position === 1) {
            // Right Side Peeking Card
            y = -16;
            x = 32;
            z = -35;
            rotate = 4.5;
            scale = 0.94;
            opacity = 0.88;
            shadow = "0 18px 45px rgba(0,0,0,0.07)";
          } else {
            // Left Side Peeking Card
            y = -16;
            x = -32;
            z = -65;
            rotate = -4.5;
            scale = 0.94;
            opacity = 0.88;
            shadow = "0 14px 35px rgba(0,0,0,0.06)";
          }

          return (
            <motion.div
              key={card.id}
              layout
              initial={reduceMotion ? false : { opacity: 0.6, scale: 0.9 }}
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
                  damping: 26,
                  mass: 0.8,
                },
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                transformStyle: "preserve-3d",
                boxShadow: shadow,
              }}
              className="absolute inset-x-0 top-6 rounded-[28px] border border-neutral-200/90 bg-white p-6 sm:p-8 text-left origin-center will-change-transform min-h-[480px] sm:min-h-[500px]"
            >
              {/* Top Floating App Pill Badge — Only rendered on active top card */}
              {isTop && (
                <motion.div 
                  key={`pill-${card.id}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute -top-5 left-7 sm:left-9 z-40"
                >
                  <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#111113] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_6px_20px_rgba(0,0,0,0.18)] border border-neutral-800">
                    {renderPillIcon(card.pillIcon)}
                    <span>{card.pillLabel}</span>
                  </div>
                </motion.div>
              )}

              {/* Card Body Content */}
              {isTop ? (
                <motion.div
                  key={`content-${card.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="pt-8 sm:pt-9"
                >
                  {/* YOU ASKED Header */}
                  <div>
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
                /* Clean Blank Silhouette for Left and Right Peeking Cards */
                <div className="pt-10 opacity-25 select-none pointer-events-none" aria-hidden="true">
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

      {/* Interactive Connector Selector Tabs & Scroll Indicator */}
      <div className="mt-7 sm:mt-8 flex flex-col items-center gap-3">
        {/* Connector Pills */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 shadow-xs">
          {ACTION_SCENARIOS.map((scenario, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => handleTabClick(idx)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-black text-white shadow-sm"
                    : "text-neutral-600 hover:text-black hover:bg-neutral-200/60"
                }`}
              >
                <span>{scenario.pillLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Subtle Scroll Hint */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
          <ArrowDown className="w-3 h-3 animate-bounce" />
          <span>Scroll to cycle actions</span>
        </div>
      </div>
    </div>
  );
}

export default ActionCardStackDemo;
