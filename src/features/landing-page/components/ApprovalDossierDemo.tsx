"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

interface DossierField {
  label: string;
  value: string;
}

interface DossierPreset {
  id: string;
  headerTitle: string;
  fields: DossierField[];
  summary: string;
}

const DOSSIER_PRESETS: DossierPreset[] = [
  {
    id: "gmail-1",
    headerTitle: "Gmail Action Review",
    fields: [
      { label: "Recipient", value: "Elena Brooks (elena@mello.ai)" },
      { label: "Subject", value: "Review Notes: Payment Checkout Flow" },
      { label: "Action", value: "Create Email Draft + Attach Notes" },
      { label: "App Connector", value: "Gmail" },
    ],
    summary: "Draft prepared in Gmail with design feedback attached.",
  },
  {
    id: "calendar-1",
    headerTitle: "Google Calendar Event",
    fields: [
      { label: "Event Name", value: "Team Product Sync" },
      { label: "Date & Time", value: "Tomorrow · 10:00 AM – 10:30 AM" },
      { label: "Action", value: "Schedule Meeting + Google Meet Link" },
      { label: "App Connector", value: "Google Calendar" },
    ],
    summary: "Calendar invite created with Google Meet link included.",
  },
  {
    id: "github-1",
    headerTitle: "GitHub Issue Tracker",
    fields: [
      { label: "Repository", value: "mello-ai / desktop-core" },
      { label: "Issue Title", value: "Fix mobile login redirect failure" },
      { label: "Action", value: "Create Issue (High Priority · P1)" },
      { label: "App Connector", value: "GitHub" },
    ],
    summary: "Issue #492 formatted with reproduction steps and labels.",
  },
  {
    id: "gmail-2",
    headerTitle: "Gmail Quick Reply",
    fields: [
      { label: "Recipient", value: "Marcus Vance (marcus@venture.io)" },
      { label: "Subject", value: "Re: Partnership Agreement" },
      { label: "Action", value: "Send Reply + Attach Signed PDF" },
      { label: "App Connector", value: "Gmail" },
    ],
    summary: "Reply queued to Marcus with attached countersigned PDF.",
  },
  {
    id: "calendar-2",
    headerTitle: "Calendar Focus Time",
    fields: [
      { label: "Event Name", value: "Sprint Design Review (Focus Block)" },
      { label: "Date & Time", value: "Friday · 2:00 PM – 4:00 PM" },
      { label: "Action", value: "Block 2 Hours (Do Not Disturb)" },
      { label: "App Connector", value: "Google Calendar" },
    ],
    summary: "Focus time hold scheduled on Friday afternoon calendar.",
  },
  {
    id: "github-2",
    headerTitle: "GitHub Pull Request Review",
    fields: [
      { label: "Target Repo", value: "mello-ai / desktop-core" },
      { label: "Pull Request", value: "PR #381 · Payment Error Boundaries" },
      { label: "Action", value: "Approve Changes with Comment: “LGTM!”" },
      { label: "App Connector", value: "GitHub" },
    ],
    summary: "Pull Request #381 approved with LGTM review comment.",
  },
];

export function ApprovalDossierDemo({ externalIndex }: { externalIndex?: number }) {
  const reduceMotion = useReducedMotion();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [internalIndex, setInternalIndex] = useState(0);
  const [visibleFieldsCount, setVisibleFieldsCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const activeIndex = externalIndex !== undefined ? externalIndex % DOSSIER_PRESETS.length : internalIndex;
  const currentPreset = DOSSIER_PRESETS[activeIndex];

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

  // Parse-in Animation Timeline
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const timeouts: NodeJS.Timeout[] = [];

    // t=0: Reset fields, hide summary & payoff chip, status = "Parsing"
    setVisibleFieldsCount(0);
    setShowSummary(false);
    setIsDone(false);

    // t=0.4s: Field 1
    timeouts.push(
      setTimeout(() => {
        setVisibleFieldsCount(1);
      }, 400)
    );

    // t=0.8s: Field 2
    timeouts.push(
      setTimeout(() => {
        setVisibleFieldsCount(2);
      }, 800)
    );

    // t=1.2s: Field 3
    timeouts.push(
      setTimeout(() => {
        setVisibleFieldsCount(3);
      }, 1200)
    );

    // t=1.6s: Field 4
    timeouts.push(
      setTimeout(() => {
        setVisibleFieldsCount(4);
      }, 1600)
    );

    // t=1.8s (~200ms after last field): Summary line fades in
    timeouts.push(
      setTimeout(() => {
        setShowSummary(true);
      }, 1800)
    );

    // t=2.4s (~600ms after summary): Status -> "Done" + Confirmation chip appears
    timeouts.push(
      setTimeout(() => {
        setIsDone(true);
      }, 2400)
    );

    // If unmanaged externally, advance internal index after ~3.2s hold
    if (externalIndex === undefined) {
      timeouts.push(
        setTimeout(() => {
          setInternalIndex((prev) => (prev + 1) % DOSSIER_PRESETS.length);
        }, 5600)
      );
    }

    return () => {
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [activeIndex, externalIndex, isInView, reduceMotion]);

  return (
    <div ref={containerRef} className="w-full max-w-2xl rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-7 text-left shadow-2xl backdrop-blur-2xl relative overflow-hidden">
      {/* Top Header: Title on Left, Single Parsing/Done Status on Right */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-neutral-800/60">
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
          {currentPreset.headerTitle}
        </span>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isDone ? "bg-white" : "bg-neutral-500 animate-pulse"
            }`}
          />
          <span
            className={`transition-colors duration-300 ${
              isDone ? "text-white font-semibold" : "text-neutral-400"
            }`}
          >
            {isDone ? "Done" : "Parsing"}
          </span>
        </div>
      </div>

      {/* Flat 2-Column Grid for Fields (Human-Friendly Values) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-6">
        {currentPreset.fields.map((field, idx) => {
          const isVisible = visibleFieldsCount > idx;
          return (
            <div key={`${currentPreset.id}-${field.label}`} className="min-h-[44px]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-0.5 font-medium">
                {field.label}
              </span>
              <AnimatePresence>
                {isVisible && (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-xs sm:text-sm font-semibold text-neutral-100 block truncate"
                  >
                    {field.value}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Hairline Divider Separating Fields from Footer Row */}
      <div className="border-t border-neutral-800/80 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-h-[42px]">
        {/* Left: Plain-prose Summary Line */}
        <div className="text-xs text-neutral-400 font-sans min-h-[18px] flex items-center">
          <AnimatePresence>
            {showSummary && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="leading-snug text-neutral-300"
              >
                {currentPreset.summary}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Single Payoff Moment Confirmation Chip */}
        <div className="flex items-center shrink-0 self-start sm:self-center">
          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-black text-[11px] font-mono font-bold shadow-sm"
              >
                <Check size={13} className="stroke-[2.5]" />
                <span>Approved &amp; executed</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ApprovalDossierDemo;
