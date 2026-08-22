"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarDays, Mic, Sparkles, Zap } from "lucide-react";

const COMMAND = "Schedule a call with Alex tomorrow at 3";
const EVENT = {
  title: "Call with Alex",
  time: "Tomorrow · 3:00 PM",
  duration: "30 min",
};

type Mode = "dictate" | "act" | null;

export function ActNotchDemo() {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(reduceMotion);
  const [mode, setMode] = useState<Mode>(reduceMotion ? "act" : null);
  const [characters, setCharacters] = useState(reduceMotion ? COMMAND.length : 0);
  const [showEvent, setShowEvent] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion || mode !== "act") return;

    setCharacters(0);
    setShowEvent(false);
    let index = 0;
    const typeTimer = window.setInterval(() => {
      index += 1;
      setCharacters(index);
      if (index >= COMMAND.length) {
        window.clearInterval(typeTimer);
        window.setTimeout(() => setShowEvent(true), 300);
      }
    }, 42);

    return () => window.clearInterval(typeTimer);
  }, [mode, reduceMotion]);

  const selectMode = (selected: Mode) => {
    setMode(selected);
    if (selected === "act") {
      setCharacters(0);
      setShowEvent(false);
    }
  };

  const typed = COMMAND.slice(0, characters);

  return (
    <div className="act-notch-demo-frame relative bg-neutral-950/80 border border-neutral-800 rounded-3xl p-6 min-h-[320px] overflow-hidden shadow-2xl">
      <div className="act-notch-demo-bg absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-neutral-950 pointer-events-none" />

      {/* Visible workspace context prevents the notch from floating in empty space. */}
      <div className="relative z-0 h-full max-w-[650px] p-5 pr-4 md:p-8 md:pr-10">
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.16em] text-neutral-500 uppercase">
          <span className="w-2 h-2 rounded-full bg-white" /> Active workspace
        </div>
        <h3 className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-white">Mello works on top of the app you are already using.</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">Speak naturally, then inspect the result before a connector is allowed to do anything.</p>

        <div className="mt-6 rounded-2xl border border-neutral-800 bg-black/40 p-4 shadow-inner">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">Spoken request</span>
            <span className="rounded-full border border-neutral-700 px-2 py-1 text-[10px] font-semibold text-neutral-300">Review first</span>
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-white">“Schedule a call with Alex tomorrow at 3 PM.”</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Alex", "Tomorrow", "3:00 PM"].map((detail) => (
              <span key={detail} className="rounded-lg bg-white px-2.5 py-1 text-[10px] font-bold text-black">{detail}</span>
            ))}
          </div>
        </div>
      </div>

      {/* L-shaped notch chooser — top-right anchor */}
      <div
        className="act-notch-anchor absolute top-4 right-4 z-20"
        onMouseEnter={() => !reduceMotion && setExpanded(true)}
        onMouseLeave={() => !reduceMotion && mode === null && setExpanded(false)}
        onClick={() => !expanded && setExpanded(true)}
      >
        <motion.div
          className="act-notch-panel bg-neutral-900/95 backdrop-blur-xl border border-neutral-700 rounded-2xl shadow-2xl overflow-hidden"
          style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.04)" }}
          animate={{
            width: expanded ? 240 : 120,
            height: expanded ? 112 : 44,
          }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
        >
          {!expanded ? (
            <div className="flex items-center gap-2 px-3 h-full">
              <span className="p-1.5 rounded-lg bg-white text-black font-bold">
                <Sparkles size={14} />
              </span>
              <span className="text-xs font-bold text-white">Mello</span>
            </div>
          ) : (
            <div className="act-notch-l-shape flex flex-col h-full">
              <div className="flex flex-1 min-h-0">
                <button
                  type="button"
                  className={`act-notch-zone flex-1 flex flex-col items-center justify-center gap-1 border-r border-neutral-800 transition-colors ${
                    mode === "dictate" ? "bg-white/10 text-white font-bold" : "hover:bg-neutral-800/80 text-neutral-300"
                  }`}
                  onClick={() => selectMode("dictate")}
                >
                  <Mic size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Dictate</span>
                </button>
                <button
                  type="button"
                  className={`act-notch-zone flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                    mode === "act" ? "bg-white/10 text-white font-bold" : "hover:bg-neutral-800/80 text-neutral-300"
                  }`}
                  onClick={() => selectMode("act")}
                >
                  <Zap size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Act</span>
                </button>
              </div>
              {mode === "act" && (
                <div className="px-3 py-2 border-t border-neutral-800 bg-neutral-950/80">
                  <p className="text-[11px] text-neutral-200 truncate font-medium">
                    {typed}
                    {characters < COMMAND.length && (
                      <i className="inline-block w-0.5 h-3 bg-white ml-0.5 animate-pulse align-middle" />
                    )}
                  </p>
                </div>
              )}
              {mode === "dictate" && (
                <div className="px-3 py-2 border-t border-neutral-800 flex items-center gap-2">
                  <div className="flex gap-0.5 h-4 items-end">
                    {[8, 14, 10, 16, 9].map((h, i) => (
                      <motion.i
                        key={i}
                        className="w-0.5 bg-white rounded-full block"
                        animate={{ height: [4, h, 4] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.08 }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-400">Listening…</span>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>

      {/* Calendar event card */}
      <AnimatePresence>
        {showEvent && (
          <motion.div
            className="act-event-card absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-72 bg-neutral-900/95 border border-neutral-700 rounded-2xl p-4 shadow-xl z-10"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="flex items-start gap-3">
              <span className="p-2 rounded-xl bg-neutral-800 text-white">
                <CalendarDays size={18} />
              </span>
              <div>
                <small className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">Calendar event</small>
                <strong className="text-sm font-bold text-white block">{EVENT.title}</strong>
                <p className="text-xs text-neutral-400 mt-1">{EVENT.time} · {EVENT.duration}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!expanded && !reduceMotion && (
        <p className="absolute bottom-4 left-6 text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
          Hover notch to choose mode
        </p>
      )}
    </div>
  );
}
