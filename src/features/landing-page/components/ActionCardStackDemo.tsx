"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scenario = ACTION_SCENARIOS[currentIndex];

  // Pause loop when off-screen
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

  // Autonomous Card Cycling
  useEffect(() => {
    if (reduceMotion || !isInView || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACTION_SCENARIOS.length);
    }, 4600);

    return () => clearInterval(timer);
  }, [currentIndex, isInView, isHovered, reduceMotion]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full flex flex-col items-center select-none relative pt-8 pb-4"
    >
      {/* Visual Scenario Switcher Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8 z-20">
        {ACTION_SCENARIOS.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-sm scale-105"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
              }`}
            >
              {renderPillIcon(item.pillIcon)}
              <span>{item.pillLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Main Stack Container with Subtle Faux Tilted Background Cards */}
      <div className="relative w-full max-w-[480px] sm:max-w-[520px] mx-auto min-h-[520px] sm:min-h-[540px]">
        
        {/* Layer 1 (Back Left Tilted Card) */}
        <div
          className="absolute inset-0 rounded-[28px] border border-neutral-200/60 bg-gradient-to-b from-[#FDFDFD] to-[#F7F7F8] shadow-sm transform -rotate-3 -translate-x-3 translate-y-1 pointer-events-none opacity-60"
          aria-hidden="true"
        >
          <div className="w-full h-full p-8 flex flex-col justify-between opacity-30">
            <div className="space-y-4">
              <div className="h-2 w-24 bg-neutral-300 rounded" />
              <div className="h-3 w-4/5 bg-neutral-200 rounded" />
              <div className="h-px w-full bg-neutral-200" />
            </div>
            <div className="space-y-2.5">
              <div className="h-8 w-full bg-neutral-200/80 rounded-xl" />
              <div className="h-8 w-full bg-neutral-200/80 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Layer 2 (Back Right Tilted Card) */}
        <div
          className="absolute inset-0 rounded-[28px] border border-neutral-200/60 bg-gradient-to-b from-[#FFFFFF] to-[#F8F8F9] shadow-sm transform rotate-3 translate-x-3 translate-y-1 pointer-events-none opacity-70"
          aria-hidden="true"
        >
          <div className="w-full h-full p-8 flex flex-col justify-between opacity-30">
            <div className="space-y-4">
              <div className="h-2 w-24 bg-neutral-300 rounded" />
              <div className="h-3 w-3/4 bg-neutral-200 rounded" />
              <div className="h-px w-full bg-neutral-200" />
            </div>
            <div className="space-y-2.5">
              <div className="h-8 w-full bg-neutral-200/80 rounded-xl" />
              <div className="h-8 w-full bg-neutral-200/80 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Layer 3: Interactive Foreground Card with Animated Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full rounded-[28px] border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.08)] text-left"
          >
            {/* Top Floating App Pill Badge */}
            <div className="absolute -top-4 left-6 sm:left-8 z-20">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-950 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_4px_14px_rgba(0,0,0,0.25)] border border-neutral-800">
                {renderPillIcon(scenario.pillIcon)}
                <span>{scenario.pillLabel}</span>
              </div>
            </div>

            {/* Top: YOU ASKED */}
            <div className="pt-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-neutral-400 block mb-2">
                YOU ASKED
              </span>
              <p className="text-sm sm:text-base text-neutral-900 font-normal leading-relaxed min-h-[44px]">
                {scenario.youAsked}
              </p>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-neutral-200/80 my-5" />

            {/* Middle: Step Action Row */}
            <div className="flex items-center gap-3.5">
              <div className="w-6 h-6 rounded-full bg-neutral-950 text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 shadow-sm">
                {scenario.stepNumber}
              </div>
              <span className="text-sm sm:text-base font-semibold text-neutral-950">
                {scenario.stepTitle}
              </span>
            </div>

            {/* Separator */}
            <div className="h-px w-full bg-neutral-200/80 my-5" />

            {/* Bottom: STRUCTURED DETAILS */}
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-neutral-400 block mb-3">
                STRUCTURED DETAILS
              </span>

              <div className="space-y-2">
                {scenario.details.map((field, idx) => (
                  <motion.div
                    key={field.label}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 + 0.1, duration: 0.25 }}
                    className="bg-[#FAFAFA] border border-neutral-200/80 rounded-xl px-4 py-2.5 sm:py-3 flex items-center justify-between gap-4 text-xs sm:text-sm"
                  >
                    <span className="text-neutral-500 font-normal shrink-0">
                      {field.label}
                    </span>
                    <span className="text-neutral-950 font-semibold text-right truncate">
                      {field.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

export default ActionCardStackDemo;
