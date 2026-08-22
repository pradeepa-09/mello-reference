"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Mail, Pencil, Sparkles } from "lucide-react";
import { RecordingBar } from "./RecordingBar";

type AppKey = "Notes" | "Notion" | "Slack" | "Gmail";

const appPresets = {
  Notes: {
    title: "PROJECT UPDATE",
    text: "The confirmation flow is ready for you to receive feedback. Interaction details are tightened and copy is verified.",
    icon: Pencil,
    color: "text-white",
    typoIndex: 8,
    typoWord: "recieve",
    correctWord: "receive",
  },
  Notion: {
    title: "SPRINT ROADMAP",
    text: "Priority 1: Complete Mello interactive visual flow. Priority 2: Verify zero-reading visual cards.",
    icon: Sparkles,
    color: "text-white",
    typoIndex: -1,
    typoWord: "",
    correctWord: "",
  },
  Slack: {
    title: "#engineering-channel",
    text: "Pushed live dictation update. Voice-to-text is streaming into active text focus area.",
    icon: Mail,
    color: "text-white",
    typoIndex: -1,
    typoWord: "",
    correctWord: "",
  },
  Gmail: {
    title: "Subject: Q3 Release Notes",
    text: "Hi Sarah, release notes for Mello v2.0 attached. Dictation and voice actions verified.",
    icon: Mail,
    color: "text-white",
    typoIndex: -1,
    typoWord: "",
    correctWord: "",
  },
} as const;

export function DictationTypingDemo({ targetApp = "Notes" }: { targetApp?: AppKey }) {
  const reduceMotion = useReducedMotion();
  const preset = appPresets[targetApp];
  const words = useMemo(() => preset.text.split(" "), [preset.text]);
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? words.length : 0);
  const [isRecording, setIsRecording] = useState(false);
  const [correctionFlash, setCorrectionFlash] = useState(false);
  const [typoActive, setTypoActive] = useState(false);

  const startDictation = useCallback(() => {
    if (reduceMotion) {
      setVisibleCount(words.length);
      setIsRecording(false);
      return;
    }
    setVisibleCount(0);
    setIsRecording(true);
    setCorrectionFlash(false);
    setTypoActive(false);
  }, [reduceMotion, words.length]);

  useEffect(() => {
    startDictation();
  }, [startDictation, targetApp]);

  useEffect(() => {
    if (reduceMotion || !isRecording) return;
    if (visibleCount >= words.length) {
      setIsRecording(false);
      return;
    }

    const atTypo = preset.typoIndex >= 0 && visibleCount === preset.typoIndex;

    const timer = window.setTimeout(() => {
      if (atTypo && !typoActive) {
        setTypoActive(true);
        window.setTimeout(() => {
          setCorrectionFlash(true);
          window.setTimeout(() => {
            setCorrectionFlash(false);
            setTypoActive(false);
            setVisibleCount((c) => c + 1);
          }, 400);
        }, 350);
        return;
      }
      setVisibleCount((c) => c + 1);
    }, 80);

    return () => window.clearTimeout(timer);
  }, [visibleCount, isRecording, reduceMotion, words.length, preset.typoIndex, typoActive]);

  const displayWords = words.slice(0, visibleCount).map((word, index) => {
    if (typoActive && index === preset.typoIndex) return preset.typoWord;
    return word;
  });

  const Icon = preset.icon;

  return (
    <div className="dictation-ui bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 shadow-2xl">
      <div className="note-bar flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
        <span className={`flex items-center gap-2 font-bold text-xs ${preset.color}`}>
          <Icon size={14} /> {targetApp} Target Window
        </span>
        <em className="text-xs font-mono font-semibold text-neutral-400 flex items-center gap-1.5">
          <i className={`w-2 h-2 rounded-full ${isRecording ? "bg-white animate-ping" : "bg-neutral-500"}`} />
          {isRecording ? "Streaming Voice…" : "Ready"}
        </em>
      </div>

      <div
        className={`note-page min-h-[140px] bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800/80 mb-4 transition-colors duration-300 ${
          correctionFlash ? "bg-white/10 border-white/40" : ""
        }`}
      >
        <small className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold block mb-2">
          {preset.title}
        </small>
        <p className="text-sm leading-relaxed text-neutral-100 font-medium flex flex-wrap gap-x-1.5 gap-y-1">
          {displayWords.map((word, index) => (
            <motion.span
              key={`${targetApp}-${index}-${word}-${typoActive}`}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className={typoActive && index === preset.typoIndex ? "text-white underline decoration-white decoration-2 font-semibold" : ""}
            >
              {word}
            </motion.span>
          ))}
          {isRecording && (
            <motion.i
              className="inline-block w-0.5 h-4 bg-white animate-pulse align-middle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-neutral-800/60">
        <RecordingBar mode="dictation" compact />
        <button
          type="button"
          onClick={startDictation}
          className="px-5 py-2.5 bg-gradient-to-br from-white to-neutral-300 text-black font-extrabold rounded-xl text-xs transition-transform active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] cursor-pointer whitespace-nowrap"
        >
          {isRecording ? "Streaming…" : "Test Input"}
        </button>
      </div>
    </div>
  );
}

export { appPresets, type AppKey };
