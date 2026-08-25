"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calendar, Mail, Sparkles } from "lucide-react";

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

  // Handler to deal top card to the bottom of the deck
  const dealTopCard = () => {
    setDeck((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  // Continuous Physical 3D Card Dealing Loop (every 4s)
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const timer = setInterval(() => {
      dealTopCard();
    }, 4000);

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
      className="w-full flex flex-col items-center select-none relative pt-4 pb-8 overflow-visible"
    >
      {/* 3D Physical Card Deck Stage */}
      <div
        className="relative w-full max-w-[480px] sm:max-w-[520px] mx-auto min-h-[530px] sm:min-h-[550px] flex items-center justify-center cursor-pointer"
        onClick={dealTopCard}
        style={{ perspective: 1500 }}
      >
        {/* Subtle deck base rim (gives stacked paper thickness) */}
        <div
          className="absolute inset-x-8 -bottom-3 h-6 bg-neutral-200/50 rounded-[30px] blur-[1px] pointer-events-none transform translate-y-3 scale-95"
          aria-hidden="true"
        />

        <AnimatePresence initial={false}>
          {deck.map((card, index) => {
            // Index 0 = Front (Active Top Card)
            // Index 1 = Middle (Fanned right)
            // Index 2 = Back (Fanned left)
            const isTop = index === 0;
            const isMiddle = index === 1;

            let y = 0;
            let x = 0;
            let z = 0;
            let rotateZ = 0;
            let rotateX = 4;
            let rotateY = -1;
            let scale = 1;
            let opacity = 1;
            let shadow = "0 32px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)";
            const zIndex = 30 - index * 10;

            if (isTop) {
              y = 0;
              x = 0;
              z = 0;
              rotateZ = 0;
              rotateX = 4;
              rotateY = -1;
              scale = 1;
              opacity = 1;
              shadow = "0 32px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)";
            } else if (isMiddle) {
              y = -18;
              x = 10;
              z = -40;
              rotateZ = 4.5;
              rotateX = 5;
              rotateY = 1;
              scale = 0.95;
              opacity = 0.85;
              shadow = "0 20px 50px rgba(0,0,0,0.08)";
            } else {
              // Back card
              y = -34;
              x = -12;
              z = -80;
              rotateZ = -5.2;
              rotateX = 6;
              rotateY = -2;
              scale = 0.90;
              opacity = 0.60;
              shadow = "0 12px 30px rgba(0,0,0,0.05)";
            }

            return (
              <motion.div
                key={card.id}
                layout
                initial={{
                  x: 260,
                  y: -10,
                  z: 60,
                  rotateZ: 16,
                  rotateX: 10,
                  scale: 1.05,
                  opacity: 0,
                }}
                animate={{
                  x,
                  y,
                  z,
                  rotateZ,
                  rotateX,
                  rotateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                exit={{
                  x: 280,
                  y: 20,
                  z: 80,
                  rotateZ: 18,
                  rotateX: 12,
                  scale: 1.04,
                  opacity: 0,
                }}
                transition={{
                  layout: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: shadow,
                }}
                className="absolute inset-x-0 top-6 rounded-[28px] border border-neutral-200/95 bg-white p-6 sm:p-8 text-left origin-center will-change-transform"
              >
                {/* Top Floating App Pill Badge */}
                <div className="absolute -top-4 left-6 sm:left-8 z-30">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-950 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_6px_18px_rgba(0,0,0,0.25)] border border-neutral-800">
                    {renderPillIcon(card.pillIcon)}
                    <span>{card.pillLabel}</span>
                  </div>
                </div>

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
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ActionCardStackDemo;
