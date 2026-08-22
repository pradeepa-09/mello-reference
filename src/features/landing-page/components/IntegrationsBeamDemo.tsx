"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { ApprovalDossierDemo } from "./ApprovalDossierDemo";
import { 
  Mic, 
  Check, 
  ShieldCheck, 
  Mail, 
  Calendar, 
  GitPullRequest, 
  Send, 
  Clock, 
  User, 
  Tag, 
  FolderGit2, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Users
} from "lucide-react";

interface ParsedCard {
  iconType: "user" | "mail" | "lock" | "check" | "calendar" | "clock" | "users" | "repo" | "tag" | "file";
  label: string;
  value: string;
  detail: string;
  badge?: string;
}

interface AppActionScenario {
  id: "gmail" | "calendar" | "github";
  appName: string;
  appBadge: string;
  command: string;
  actionTitle: string;
  actionBadge: string;
  actionIcon: "mail" | "calendar" | "github";
  beamStartColor: string;
  beamStopColor: string;
  curvature: number;
  cards: ParsedCard[];
  resultSummary: string;
}

const SCENARIOS: AppActionScenario[] = [
  {
    id: "gmail",
    appName: "Gmail",
    appBadge: "Email Action",
    command: "“Email Elena the review notes for the new payment checkout flow.”",
    actionTitle: "Draft Email",
    actionBadge: "Draft Ready",
    actionIcon: "mail",
    beamStartColor: "#EA4335",
    beamStopColor: "#000000",
    curvature: -55,
    cards: [
      {
        iconType: "user",
        label: "RECIPIENT",
        value: "Elena Brooks",
        detail: "elena@mello.ai · Team Lead",
        badge: "Verified Contact",
      },
      {
        iconType: "mail",
        label: "DRAFT SUBJECT",
        value: "Checkout Flow Review Notes",
        detail: "Markdown notes & edge cases attached",
        badge: "Formatted",
      },
      {
        iconType: "lock",
        label: "SANDBOX SECURITY",
        value: "Gmail API (OAuth2 Local)",
        detail: "Zero external server relay",
        badge: "Encrypted",
      },
      {
        iconType: "check",
        label: "APPROVAL GATE",
        value: "1-Click Human Approval",
        detail: "Review before message dispatches",
        badge: "Required",
      },
    ],
    resultSummary: "Draft prepared in Gmail with design feedback attached.",
  },
  {
    id: "calendar",
    appName: "Google Calendar",
    appBadge: "Calendar Action",
    command: "“Schedule team product sync tomorrow from 10 to 10:30 AM.”",
    actionTitle: "10:00 AM Sync",
    actionBadge: "Event Planned",
    actionIcon: "calendar",
    beamStartColor: "#4285F4",
    beamStopColor: "#000000",
    curvature: 0,
    cards: [
      {
        iconType: "calendar",
        label: "EVENT TITLE",
        value: "Team Product Sync",
        detail: "Includes Google Meet link",
        badge: "Video Sync",
      },
      {
        iconType: "clock",
        label: "DATE & TIME",
        value: "Tomorrow · 10:00 – 10:30 AM",
        detail: "Availability checked · No conflicts",
        badge: "Slot Open",
      },
      {
        iconType: "users",
        label: "ATTENDEES",
        value: "Alex, Sarah, Core Product",
        detail: "3 team members invited",
        badge: "Auto-Resolved",
      },
      {
        iconType: "lock",
        label: "CONNECTOR",
        value: "Google Calendar API",
        detail: "Direct on-device calendar sync",
        badge: "Connected",
      },
    ],
    resultSummary: "Calendar invite created with Google Meet link included.",
  },
  {
    id: "github",
    appName: "GitHub",
    appBadge: "Issue Tracker",
    command: "“Create a GitHub issue for the login redirect bug with High priority.”",
    actionTitle: "Issue #492",
    actionBadge: "P1 Bug Queued",
    actionIcon: "github",
    beamStartColor: "#10B981",
    beamStopColor: "#000000",
    curvature: 55,
    cards: [
      {
        iconType: "repo",
        label: "TARGET REPOSITORY",
        value: "mello-ai/desktop-core",
        detail: "Default branch: main",
        badge: "Repo Linked",
      },
      {
        iconType: "tag",
        label: "ISSUE TITLE",
        value: "Fix login redirect failure on mobile",
        detail: "Priority: High (P1) · Bug Report",
        badge: "P1 Critical",
      },
      {
        iconType: "file",
        label: "LABELS & ASSIGNEE",
        value: "bug, safari, core-eng",
        detail: "Assigned to Engineering On-Call",
        badge: "Triaged",
      },
      {
        iconType: "lock",
        label: "CONNECTOR",
        value: "GitHub REST API v3",
        detail: "Personal access token authenticated",
        badge: "OAuth Token",
      },
    ],
    resultSummary: "Issue #492 formatted with reproduction steps and labels.",
  },
  {
    id: "gmail",
    appName: "Gmail",
    appBadge: "Quick Reply",
    command: "“Reply to Marcus saying the updated contract is signed and attached.”",
    actionTitle: "Reply Email",
    actionBadge: "Response Drafted",
    actionIcon: "mail",
    beamStartColor: "#EA4335",
    beamStopColor: "#000000",
    curvature: -55,
    cards: [
      {
        iconType: "user",
        label: "RECIPIENT",
        value: "Marcus Vance",
        detail: "marcus@venture.io · Partner",
        badge: "Contact",
      },
      {
        iconType: "mail",
        label: "THREAD",
        value: "Re: Partnership Agreement",
        detail: "Attached: mello-countersigned.pdf",
        badge: "1 Attachment",
      },
      {
        iconType: "lock",
        label: "CONNECTOR",
        value: "Gmail API (OAuth2)",
        detail: "Sandboxed mail client",
        badge: "Encrypted",
      },
      {
        iconType: "check",
        label: "QUEUE STATUS",
        value: "Ready to Dispatch",
        detail: "Signed PDF validated locally",
        badge: "Verified",
      },
    ],
    resultSummary: "Reply queued to Marcus with attached countersigned PDF.",
  },
  {
    id: "calendar",
    appName: "Google Calendar",
    appBadge: "Deep Work Hold",
    command: "“Block 2 hours on Friday afternoon for sprint design review.”",
    actionTitle: "Focus Block",
    actionBadge: "2h Hold",
    actionIcon: "calendar",
    beamStartColor: "#4285F4",
    beamStopColor: "#000000",
    curvature: 0,
    cards: [
      {
        iconType: "calendar",
        label: "EVENT TITLE",
        value: "Sprint Design Review",
        detail: "Deep Work / Focus Time hold",
        badge: "Focus Mode",
      },
      {
        iconType: "clock",
        label: "DATE & TIME",
        value: "Friday · 2:00 PM – 4:00 PM",
        detail: "2-hour uninterrupted block",
        badge: "120 Mins",
      },
      {
        iconType: "users",
        label: "CALENDAR TYPE",
        value: "Primary Work Calendar",
        detail: "Status set to: Busy / Do Not Disturb",
        badge: "DND Active",
      },
      {
        iconType: "lock",
        label: "CONNECTOR",
        value: "Google Calendar API",
        detail: "Instant sync to macOS & mobile",
        badge: "Connected",
      },
    ],
    resultSummary: "Focus time hold scheduled on Friday afternoon calendar.",
  },
  {
    id: "github",
    appName: "GitHub",
    appBadge: "Pull Request",
    command: "“Approve pull request #381 on desktop-core and leave note: LGTM!”",
    actionTitle: "PR #381 Review",
    actionBadge: "Approved",
    actionIcon: "github",
    beamStartColor: "#10B981",
    beamStopColor: "#000000",
    curvature: 55,
    cards: [
      {
        iconType: "repo",
        label: "TARGET REPO",
        value: "mello-ai/desktop-core",
        detail: "PR #381: Error Boundary Fallbacks",
        badge: "PR #381",
      },
      {
        iconType: "tag",
        label: "REVIEW VERDICT",
        value: "Approve Changes",
        detail: "Review Comment: “LGTM! Ready for merge”",
        badge: "Approved",
      },
      {
        iconType: "file",
        label: "CI/CD STATUS",
        value: "All 18 Checks Passing",
        detail: "Unit, E2E, and Lint tests verified",
        badge: "Green CI",
      },
      {
        iconType: "lock",
        label: "CONNECTOR",
        value: "GitHub REST API",
        detail: "Authenticated reviewer access",
        badge: "Signed",
      },
    ],
    resultSummary: "Pull Request #381 approved with LGTM review comment.",
  },
];

function CardIcon({ type, className = "w-4 h-4" }: { type: ParsedCard["iconType"]; className?: string }) {
  switch (type) {
    case "user":
      return <User className={className} />;
    case "mail":
      return <Mail className={className} />;
    case "calendar":
      return <Calendar className={className} />;
    case "clock":
      return <Clock className={className} />;
    case "users":
      return <Users className={className} />;
    case "repo":
      return <FolderGit2 className={className} />;
    case "tag":
      return <Tag className={className} />;
    case "file":
      return <GitPullRequest className={className} />;
    case "lock":
      return <Lock className={className} />;
    case "check":
    default:
      return <Check className={className} />;
  }
}

// Authentic Gmail Envelope Icon
function GmailOfficialIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 6.5C1.5 5.11929 2.61929 4 4 4H5.5L12 9.5L18.5 4H20C21.3807 4 22.5 5.11929 22.5 6.5V17.5C22.5 18.8807 21.3807 20 20 20H18V10L12 15L6 10V20H4C2.61929 20 1.5 18.8807 1.5 17.5V6.5Z" fill="#EA4335" />
      <path d="M18 10V20H20C21.3807 20 22.5 18.8807 22.5 17.5V6.5L18 10Z" fill="#34A853" />
      <path d="M6 10V20H4C2.61929 20 1.5 18.8807 1.5 17.5V6.5L6 10Z" fill="#4285F4" />
      <path d="M18.5 4H20C21.3807 4 22.5 5.11929 22.5 6.5L18 10L12 9.5L18.5 4Z" fill="#FBBC05" />
      <path d="M5.5 4H4C2.61929 4 1.5 5.11929 1.5 6.5L6 10L12 9.5L5.5 4Z" fill="#C5221F" />
    </svg>
  );
}

// Authentic Google Calendar Icon with "31"
function CalendarOfficialIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="44" height="44" rx="10" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
      <path d="M2 12C2 6.47715 6.47715 2 12 2H36C41.5228 2 46 6.47715 46 12V14H2V12Z" fill="#4285F4" />
      <circle cx="14" cy="8" r="2.2" fill="#FFFFFF" />
      <circle cx="34" cy="8" r="2.2" fill="#FFFFFF" />
      <text x="24" y="36" fontFamily="Inter, system-ui, sans-serif" fontSize="20" fontWeight="900" fill="#4285F4" textAnchor="middle">
        31
      </text>
    </svg>
  );
}

// Authentic GitHub Octocat Icon
function GithubOfficialIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

const NodeCircle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; label?: string; badge?: string; isActive?: boolean }
>(({ className, children, label, badge, isActive }, ref) => {
  return (
    <div className="flex flex-col items-center gap-1.5 z-10 transition-all duration-300">
      <div
        ref={ref}
        className={cn(
          "flex size-14 sm:size-16 items-center justify-center rounded-2xl border p-2.5 transition-all duration-300 shadow-sm",
          isActive
            ? "border-black bg-white shadow-xl scale-110 ring-2 ring-black/10"
            : "border-neutral-200 bg-white/70 opacity-45 hover:opacity-80",
          className
        )}
      >
        {children}
      </div>
      {label && (
        <span
          className={cn(
            "text-[11px] font-mono font-semibold tracking-tight text-center transition-colors leading-tight",
            isActive ? "text-black font-bold" : "text-neutral-400"
          )}
        >
          {label}
        </span>
      )}
      {badge && (
        <span
          className={cn(
            "text-[9px] font-mono px-2 py-0.5 rounded-full border text-center transition-all",
            isActive
              ? "bg-black text-white border-black font-semibold"
              : "bg-neutral-100 text-neutral-400 border-neutral-200"
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
});

NodeCircle.displayName = "NodeCircle";

export function IntegrationsBeamDemo() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  
  const [stepIndex, setStepIndex] = useState(0);
  const [isApproved, setIsApproved] = useState(false);

  const currentScenario = SCENARIOS[stepIndex];

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

  // Automatic Continuous Loop Across Diverse Voice Commands
  useEffect(() => {
    if (reduceMotion || !isInView) return;
    setIsApproved(false);

    const approveTimer = setTimeout(() => {
      setIsApproved(true);
    }, 1500);

    const cycleTimer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % SCENARIOS.length);
    }, 5000);

    return () => {
      clearTimeout(approveTimer);
      clearTimeout(cycleTimer);
    };
  }, [stepIndex, isInView, reduceMotion]);

  // Left 3 Apps: Gmail, Calendar, GitHub
  const gmailRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);

  // Center: Mello Hub
  const melloRef = useRef<HTMLDivElement>(null);

  // Right: 1 Dynamic Action Node
  const actionNodeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xl backdrop-blur-xl"
    >
      {/* Background subtle light ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Dynamic Spoken Voice Command Bar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScenario.command}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl mb-8 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm z-20 text-left"
        >
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-md">
              <Mic size={18} className="animate-pulse text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                  VOICE COMMAND · {currentScenario.appName.toUpperCase()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-sm sm:text-base font-bold text-black mt-0.5 tracking-tight">
                {currentScenario.command}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white text-[10px] font-mono text-black border border-neutral-200 font-semibold shrink-0 self-start sm:self-center shadow-xs">
            {currentScenario.appBadge}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Beam Diagram Grid: 3 Left Apps -> Center Mello -> 1 Dynamic Right Action */}
      <div className="flex size-full w-full max-w-3xl items-center justify-between gap-4 sm:gap-6 z-10 py-2">
        {/* Left Column: 3 Connected Apps */}
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-5">
          {/* 1. Gmail */}
          <NodeCircle
            ref={gmailRef}
            label="Gmail"
            badge="Email"
            isActive={currentScenario.id === "gmail"}
          >
            <GmailOfficialIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </NodeCircle>

          {/* 2. Google Calendar */}
          <NodeCircle
            ref={calendarRef}
            label="Calendar"
            badge="Schedule"
            isActive={currentScenario.id === "calendar"}
          >
            <CalendarOfficialIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </NodeCircle>

          {/* 3. GitHub */}
          <NodeCircle
            ref={githubRef}
            label="GitHub"
            badge="Issues"
            isActive={currentScenario.id === "github"}
          >
            <GithubOfficialIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </NodeCircle>
        </div>

        {/* Center Column: Mello */}
        <div className="flex flex-col items-center gap-1.5 z-20">
          <div
            ref={melloRef}
            className="flex size-14 sm:size-16 items-center justify-center rounded-2xl bg-black shadow-md border border-neutral-800 p-2 relative transition-transform duration-300 hover:scale-105 cursor-default select-none overflow-hidden"
          >
            <Image
              src="/brand/icon.png"
              alt="Mello"
              width={56}
              height={56}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-black text-center select-none">
            Mello
          </span>
        </div>

        {/* Right Column: 1 Dynamic Action Node that changes based on active app */}
        <div className="flex flex-col items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScenario.actionTitle}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <NodeCircle
                ref={actionNodeRef}
                label={currentScenario.actionTitle}
                badge={currentScenario.actionBadge}
                isActive={true}
                className="size-14 sm:size-16 bg-white border-neutral-300 shadow-md"
              >
                {currentScenario.actionIcon === "mail" && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-red-50 text-red-600 border border-red-200">
                    <Send className="w-4 h-4 text-[#EA4335]" />
                  </div>
                )}
                {currentScenario.actionIcon === "calendar" && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                    <Calendar className="w-4 h-4 text-[#4285F4]" />
                  </div>
                )}
                {currentScenario.actionIcon === "github" && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <GitPullRequest className="w-4 h-4 text-emerald-600" />
                  </div>
                )}
              </NodeCircle>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dynamic Animated Beams from Active App into Mello Hub and out to the Single Right Action */}
      {!reduceMotion && (
        <>
          {currentScenario.id === "gmail" && (
            <>
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={gmailRef}
                toRef={melloRef}
                curvature={-55}
                endYOffset={-10}
                gradientStartColor="#EA4335"
                gradientStopColor="#000000"
                pathColor="#E5E7EB"
                duration={2.4}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={melloRef}
                toRef={actionNodeRef}
                curvature={-55}
                startYOffset={-10}
                gradientStartColor="#000000"
                gradientStopColor="#EA4335"
                pathColor="#E5E7EB"
                duration={2.4}
                delay={0.2}
              />
            </>
          )}

          {currentScenario.id === "calendar" && (
            <>
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={calendarRef}
                toRef={melloRef}
                curvature={0}
                gradientStartColor="#4285F4"
                gradientStopColor="#000000"
                pathColor="#E5E7EB"
                duration={2.4}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={melloRef}
                toRef={actionNodeRef}
                curvature={0}
                gradientStartColor="#000000"
                gradientStopColor="#4285F4"
                pathColor="#E5E7EB"
                duration={2.4}
                delay={0.2}
              />
            </>
          )}

          {currentScenario.id === "github" && (
            <>
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={githubRef}
                toRef={melloRef}
                curvature={55}
                endYOffset={10}
                gradientStartColor="#10B981"
                gradientStopColor="#000000"
                pathColor="#E5E7EB"
                duration={2.4}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={melloRef}
                toRef={actionNodeRef}
                curvature={55}
                startYOffset={10}
                gradientStartColor="#000000"
                gradientStopColor="#10B981"
                pathColor="#E5E7EB"
                duration={2.4}
                delay={0.2}
              />
            </>
          )}
        </>
      )}

      {/* Redesigned Dark Monochrome Parse-in Approval Dossier */}
      <div className="mt-8 w-full max-w-3xl flex justify-center z-20">
        <ApprovalDossierDemo externalIndex={stepIndex} />
      </div>
    </div>
  );
}

export default IntegrationsBeamDemo;
