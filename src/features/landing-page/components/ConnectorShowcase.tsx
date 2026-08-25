"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarDays, Check, Github, Mail } from "lucide-react";

type DossierRow = {
  label: string;
  value: string;
  meta?: string;
  selected?: boolean;
};

type Dossier = {
  id: "gmail" | "calendar" | "github";
  name: string;
  command: string;
  action: string;
  Icon: typeof Mail;
  rows: DossierRow[];
};

const dossiers: Dossier[] = [
  {
    id: "gmail",
    name: "Gmail",
    command: "Draft an email to Atharva saying I’m ready for tomorrow’s 10 a.m. meeting.",
    action: "Prepare the email draft",
    Icon: Mail,
    rows: [
      {label: "Contact candidate", value: "Atharva Rao", meta: "atharva.rao@example.com", selected: true},
      {label: "Contact candidate", value: "Atharva Sharma", meta: "atharva.sharma@example.com"},
      {label: "Contact candidate", value: "Atharva Mehta", meta: "atharva.mehta@example.com"},
    ],
  },
  {
    id: "calendar",
    name: "Calendar",
    command: "Create a team meeting with Atharva tomorrow morning at 10 a.m.",
    action: "Prepare the calendar event",
    Icon: CalendarDays,
    rows: [
      {label: "Date", value: "Tuesday, August 4"},
      {label: "Starts", value: "10:00 AM"},
      {label: "Ends", value: "11:00 AM"},
      {label: "Length", value: "60 minutes"},
      {label: "Time zone", value: "India Standard Time"},
    ],
  },
  {
    id: "github",
    name: "GitHub",
    command: "Create a GitHub issue for the login redirect bug in the Mello desktop repo.",
    action: "Prepare the GitHub issue",
    Icon: Github,
    rows: [
      {label: "Repository", value: "mello-app/mello-desktop"},
      {label: "Title", value: "Fix login redirect after authentication"},
      {label: "Label", value: "bug"},
      {label: "Priority", value: "High"},
      {label: "Assignee", value: "Desktop engineering"},
    ],
  },
];

export function ConnectorShowcase() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [runKey, setRunKey] = useState(0);
  const [characters, setCharacters] = useState(0);
  const [showAction, setShowAction] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);
  const dossier = dossiers[active];
  const rows = dossier.rows;
  const ActiveIcon = dossier.Icon;

  useEffect(() => {
    setCharacters(reduceMotion ? dossier.command.length : 0);
    setShowAction(Boolean(reduceMotion));
    setVisibleRows(reduceMotion ? rows.length : 0);
    if (reduceMotion) return;

    const timers: number[] = [];
    let typeTimer: number | undefined;
    const typingStarts = 420;
    const typingDuration = dossier.command.length * 34;
    const actionAt = typingStarts + typingDuration + 180;
    const rowsAt = actionAt + 360;
    const stampAt = rowsAt + rows.length * 165 + 260;
    const nextAt = stampAt + 1650;

    timers.push(window.setTimeout(() => {
      let index = 0;
      typeTimer = window.setInterval(() => {
        index += 1;
        setCharacters(index);
        if (index >= dossier.command.length && typeTimer) {
          window.clearInterval(typeTimer);
          typeTimer = undefined;
        }
      }, 34);
    }, typingStarts));

    timers.push(window.setTimeout(() => setShowAction(true), actionAt));
    rows.forEach((_, index) => {
      timers.push(window.setTimeout(() => setVisibleRows(index + 1), rowsAt + index * 165));
    });

    return () => {
      timers.forEach(window.clearTimeout);
      if (typeTimer) window.clearInterval(typeTimer);
    };
  }, [active, runKey, reduceMotion, dossier.command, rows]);

  const choose = (index: number) => {
    setActive(index);
    setCharacters(dossiers[index].command.length);
    setShowAction(true);
    setVisibleRows(dossiers[index].rows.length);
    setRunKey(value => value + 1);
  };

  const getDossierTheme = (id: string) => {
    return { badge: "bg-neutral-800 text-white border-neutral-700", glow: "shadow-2xl", activeBtn: "bg-white text-black shadow-md" };
  };

  const theme = getDossierTheme(dossier.id);

  return (
    <div className="dossier-showcase w-full max-w-4xl mx-auto py-4">
      {/* Connector Selector Tabs */}
      <nav className="dossier-selector flex justify-center gap-3 mb-6" aria-label="Connector dossier">
        {dossiers.map(({ id, name, Icon }, index) => {
          const isSelected = active === index;
          return (
            <button
              type="button"
              key={name}
              aria-current={isSelected}
              onClick={() => choose(index)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
                isSelected
                  ? "bg-white text-black border-white shadow-xl scale-105"
                  : "bg-neutral-900 hover:bg-neutral-800 text-neutral-400 border-neutral-800"
              }`}
            >
              <Icon size={15} className={isSelected ? "text-black" : "text-neutral-400"} />
              <span>{name}</span>
            </button>
          );
        })}
      </nav>

      <div className="dossier-stage relative">
        <AnimatePresence mode="wait">
          <motion.article
            key={`${dossier.id}-${runKey}`}
            className="dossier-card bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 shadow-2xl"
            initial={reduceMotion ? false : {opacity:0,y:20,scale:.96}}
            animate={{opacity:1,y:0,scale:1}}
            exit={reduceMotion ? undefined : {opacity:0,y:-10,scale:.96}}
            transition={{duration:.4,ease:[.22,1,.36,1]}}
          >
            <div className="dossier-tab inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs font-bold text-white mb-4">
              <ActiveIcon size={14} className="text-white" />
              <span>{dossier.name} Integration</span>
            </div>

            <section className="dossier-request bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800/80 mb-4">
              <small className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block mb-1">YOU SPOKE</small>
              <p className="text-base text-neutral-100 font-medium">
                &ldquo;{dossier.command.slice(0, characters)}&rdquo;
                <i className={characters < dossier.command.length ? "typing animate-pulse text-white inline-block w-0.5 h-4 bg-white ml-0.5 align-middle" : ""} />
              </p>
            </section>

            <AnimatePresence>
              {showAction && (
                <motion.section
                  className="dossier-action flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-800 border border-neutral-700 text-white mb-4"
                  initial={{opacity:0,y:10}}
                  animate={{opacity:1,y:0}}
                >
                  <span className="w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs">1</span>
                  <div>
                    <strong className="text-sm font-bold text-white block">{dossier.action}</strong>
                    <small className="text-xs text-neutral-400">Pending your 1-click approval</small>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <section className="dossier-data">
              <div className="dossier-data-heading mb-2">
                <small className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                  {dossier.id === "gmail" ? "CONTACT MATCH" : "PARSED ATTRIBUTES"}
                </small>
              </div>
              <div className={`dossier-rows space-y-2`}>
                <AnimatePresence initial={false}>
                  {dossier.rows.slice(0, visibleRows).map((row, index) => (
                    <motion.div
                      key={`${row.label}-${row.value}`}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                        row.selected
                          ? "bg-neutral-800 border-neutral-600 text-white shadow-md"
                          : "bg-neutral-950/40 border-neutral-800 text-neutral-300"
                      }`}
                      initial={reduceMotion ? false : {opacity:0,x:16}}
                      animate={{opacity:1,x:0}}
                      transition={{duration:.28,delay:index*.04}}
                    >
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">{row.label}</span>
                      <div className="text-right">
                        <strong className="text-xs font-bold block">{row.value}</strong>
                        {row.meta && <small className="text-[10px] text-neutral-400 block">{row.meta}</small>}
                      </div>
                      {row.selected && (
                        <b className="p-1 rounded-full bg-white text-black ml-2">
                          <Check size={12} />
                        </b>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>
          </motion.article>
        </AnimatePresence>
      </div>

      <p className="dossier-caption text-center text-xs text-neutral-400 mt-4 font-medium">
        One spoken request → verified structured details before execution.
      </p>
    </div>
  );
}
