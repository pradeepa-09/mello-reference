"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Database, SlidersHorizontal, User, Users } from "lucide-react";

interface MemoryItem {
  title: string;
  description: string;
}

interface MemoryCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  items: MemoryItem[];
}

const CATEGORIES: MemoryCategory[] = [
  {
    id: "facts",
    name: "Facts",
    icon: Database,
    eyebrow: "STABLE DETAILS",
    items: [
      {
        title: "Tech Stack Default",
        description: "TypeScript, Next.js App Router, and Tailwind CSS.",
      },
      {
        title: "Primary Workspace",
        description: "macOS Desktop with dual 4K monitors in San Francisco office.",
      },
    ],
  },
  {
    id: "preferences",
    name: "Preferences",
    icon: SlidersHorizontal,
    eyebrow: "HOW YOU WORK",
    items: [
      {
        title: "Concise Status Updates",
        description: "Keep status emails concise: three short bullet points or fewer.",
      },
      {
        title: "Tone & Formatting",
        description: "Direct, professional, active voice with no filler phrases.",
      },
    ],
  },
  {
    id: "people",
    name: "People",
    icon: User,
    eyebrow: "CONFIRMED CONTACTS",
    items: [
      {
        title: "Elena Rostova",
        description: "VP of Product. Reach via Gmail (elena@mello.ai) or calendar invite.",
      },
      {
        title: "Marcus Vance",
        description: "Staff Infrastructure Architect. Ping for cloud security approvals.",
      },
    ],
  },
  {
    id: "team",
    name: "Team",
    icon: Users,
    eyebrow: "WORKING GROUPS",
    items: [
      {
        title: "Core Systems Pod",
        description: "Engineering team syncs Tue/Thu at 10:00 AM PT.",
      },
      {
        title: "Design Ops Sync",
        description: "Bi-weekly design crit and design token review squad.",
      },
    ],
  },
];

export function MemorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const reduceMotion = useReducedMotion();

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [visibleItemCount, setVisibleItemCount] = useState(2);
  const [savedCount, setSavedCount] = useState(2);

  // Performance throttling: IntersectionObserver
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

  // Main animation timeline: 8.8s cycle (4 categories × 1.9s + 1.2s hold)
  useEffect(() => {
    if (reduceMotion || !isInView) {
      setActiveCategoryIndex(0);
      setVisibleItemCount(2);
      setSavedCount(2);
      return;
    }

    let isMounted = true;
    const timeouts: NodeJS.Timeout[] = [];

    const runTimeline = () => {
      // Step 0: Reset at start of loop
      setActiveCategoryIndex(0);
      setVisibleItemCount(0);
      setSavedCount(0);

      CATEGORIES.forEach((_, catIdx) => {
        const catStartTime = catIdx * 1900;

        // t + 0ms: Swap active category tab, reset items in pane
        timeouts.push(
          setTimeout(() => {
            if (!isMounted) return;
            setActiveCategoryIndex(catIdx);
            setVisibleItemCount(0);
          }, catStartTime)
        );

        // t + 300ms: Item 1 fades up, counter increments
        timeouts.push(
          setTimeout(() => {
            if (!isMounted) return;
            setVisibleItemCount(1);
            setSavedCount(catIdx * 2 + 1);
          }, catStartTime + 300)
        );

        // t + 750ms: Item 2 fades up, counter increments again
        timeouts.push(
          setTimeout(() => {
            if (!isMounted) return;
            setVisibleItemCount(2);
            setSavedCount(catIdx * 2 + 2);
          }, catStartTime + 750)
        );
      });

      // After all 4 categories (7600ms) + 1200ms hold = 8800ms -> restart loop
      timeouts.push(
        setTimeout(() => {
          if (!isMounted) return;
          runTimeline();
        }, 8800)
      );
    };

    runTimeline();

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, [isInView, reduceMotion]);

  const currentCategory = CATEGORIES[activeCategoryIndex];

  return (
    <section
      id="memory"
      ref={containerRef}
      className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white text-black border-b border-neutral-200 relative overflow-hidden"
    >
      <div className="wrap max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with Scroll-In */}
        <motion.div 
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-left max-w-4xl mb-6 sm:mb-10"
        >
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black mb-3 select-none">
            05 · MEMORY
          </p>
          <h2
            className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-black leading-[1.12] max-w-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            Work gets easier every time you use Mello.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal max-w-2xl">
            Mello remembers the facts, people, teams, and preferences you choose to keep, so future requests become faster and more accurate.
          </p>
        </motion.div>

        {/* Animated Dark Card Demo with Scroll Entrance */}
        <motion.div 
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduceMotion ? undefined : { y: -4, boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}
          className="max-w-4xl mx-auto rounded-[28px] border border-neutral-800/80 bg-neutral-950 p-6 sm:p-8 shadow-[0_16px_48px_rgba(0,0,0,0.25)] relative overflow-hidden text-white transition-all cursor-default"
        >
          {/* Tab Row (4 Pills) */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pb-6 border-b border-neutral-900">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = idx === activeCategoryIndex;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategoryIndex(idx);
                    setVisibleItemCount(2);
                    setSavedCount((idx + 1) * 2);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 select-none cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-xs"
                      : "bg-transparent text-neutral-400 hover:text-white"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-black" : "text-neutral-500"}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Bordered Content Pane */}
          <div className="mt-6 rounded-2xl border border-neutral-900 bg-neutral-900/40 p-5 sm:p-6 min-h-[220px] flex flex-col justify-between text-left">
            <div>
              {/* Content Header Row */}
              <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b border-neutral-800/60">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 select-none">
                  {currentCategory.eyebrow}
                </span>

                {/* Saved Counter Pill with Smooth Digit Transition */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] font-mono font-semibold text-neutral-300 shadow-2xs select-none">
                  <span>Saved</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={savedCount}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block min-w-[12px] text-white font-bold text-center"
                    >
                      {savedCount}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Items List (2 Line Items) */}
              <div className="space-y-3.5">
                {currentCategory.items.map((item, itemIdx) => {
                  const isVisible = visibleItemCount > itemIdx;

                  return (
                    <React.Fragment key={item.title}>
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isVisible ? 1 : 0.2,
                          y: isVisible ? 0 : 4,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="flex flex-col"
                      >
                        <h4 className="text-sm sm:text-[15px] font-bold text-white tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </motion.div>

                      {/* Hairline divider between items */}
                      {itemIdx < currentCategory.items.length - 1 && (
                        <div
                          className={`border-b border-neutral-800/60 transition-opacity duration-300 ${
                            isVisible ? "opacity-100" : "opacity-20"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default MemorySection;
