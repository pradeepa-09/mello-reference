"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, CheckCircle2 } from "lucide-react";

function AppleOfficialIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.37c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.65-2.84 1.44-.59.69-1.12 1.79-.98 2.87 1.12.09 2.22-.58 2.86-1.36z" />
    </svg>
  );
}

function WindowsOfficialIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 88 88" fill="currentColor">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L0 75.48v-29.5zm4.326-39.04L88 0v41.524l-48.004.288zm48.004 43.626L88 88l-48-6.734-.004-34.722z" />
    </svg>
  );
}

export function FinalCtaBanner() {
  const reduceMotion = useReducedMotion();
  const [macEmail, setMacEmail] = useState("");
  const [macSubmitted, setMacSubmitted] = useState(false);
  const [macSubmitting, setMacSubmitting] = useState(false);

  const [winEmail, setWinEmail] = useState("");
  const [winSubmitted, setWinSubmitted] = useState(false);
  const [winSubmitting, setWinSubmitting] = useState(false);

  const handleMacSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!macEmail) return;
    setMacSubmitting(true);
    setTimeout(() => {
      setMacSubmitting(false);
      setMacSubmitted(true);
    }, 600);
  };

  const handleWinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!winEmail) return;
    setWinSubmitting(true);
    setTimeout(() => {
      setWinSubmitting(false);
      setWinSubmitted(true);
    }, 600);
  };

  return (
    <section id="waitlist" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7] text-black border-b border-neutral-200/80 overflow-hidden">
      <div id="download" className="scroll-mt-24" />
      <div id="get-mello" className="scroll-mt-24" />
      <div className="max-w-4xl mx-auto text-left">
        {/* Section Header with Scroll-In */}
        <motion.div 
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-left max-w-4xl mb-8 sm:mb-12"
        >
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black mb-3 select-none">
            09 · GET MELLO
          </p>
          <h2
            className="text-3xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-black leading-[1.1] max-w-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            Bring Mello <span className="font-extrabold text-black">to your desktop</span>.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal max-w-2xl">
            Mello is currently in private beta. Sign up to join the waitlist and get notified when a slot opens.
          </p>
        </motion.div>

        {/* 2-Card Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: macOS */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { 
              y: -6, 
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.08)",
              borderColor: "rgba(0,0,0,0.2)" 
            }}
            className="rounded-[28px] border border-neutral-200/90 bg-white p-8 sm:p-9 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden text-left transition-colors cursor-default"
          >
            {/* Top Right Decorative Ambient Shape */}
            <div className="w-36 h-36 rounded-full bg-neutral-100/80 absolute -top-10 -right-10 pointer-events-none" />

            <div>
              {/* Icon Squircle with Hover Spin */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-12 h-12 rounded-2xl bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center mb-6 relative z-10 shadow-2xs cursor-default"
              >
                <AppleOfficialIcon className="w-6 h-6 text-black" />
              </motion.div>

              {/* Eyebrow & Title */}
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 mb-1">
                DESKTOP APP
              </p>
              <h3 className="text-[26px] sm:text-[28px] font-extrabold text-black tracking-tight mb-2.5">
                macOS
              </h3>

              {/* Variant Tag */}
              <div className="mb-8">
                <span className="inline-block px-2.5 py-1 rounded-md bg-neutral-100 text-[11px] font-medium text-neutral-600">
                  Apple Silicon / Intel
                </span>
              </div>
            </div>

            {/* Form */}
            {macSubmitted ? (
              <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-center text-xs font-semibold text-black flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-black" /> Waitlist confirmed for macOS!
              </div>
            ) : (
              <form onSubmit={handleMacSubmit} className="flex flex-col w-full relative z-10">
                <input
                  type="email"
                  required
                  value={macEmail}
                  onChange={(e) => setMacEmail(e.target.value)}
                  placeholder="Email for macOS access"
                  className="w-full px-4 py-3.5 rounded-xl border border-neutral-200/90 bg-white text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black mb-3 shadow-2xs transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={macSubmitting}
                  className="w-full py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold hover:bg-neutral-900 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-black">
                    <AppleOfficialIcon className="w-3.5 h-3.5 text-black" />
                  </span>
                  <span>{macSubmitting ? "Joining…" : "Join macOS waitlist"}</span>
                  <ChevronRight size={14} className="text-neutral-400" />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Card 2: Windows */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { 
              y: -6, 
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.08)",
              borderColor: "rgba(0,0,0,0.2)" 
            }}
            className="rounded-[28px] border border-neutral-200/90 bg-white p-8 sm:p-9 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden text-left transition-colors cursor-default"
          >
            {/* Top Right Decorative Ambient Shape */}
            <div className="w-36 h-36 rounded-full bg-neutral-100/80 absolute -top-10 -right-10 pointer-events-none" />

            <div>
              {/* Icon Squircle with Hover Spin */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-12 h-12 rounded-2xl bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center mb-6 relative z-10 shadow-2xs cursor-default"
              >
                <WindowsOfficialIcon className="w-5 h-5 text-black" />
              </motion.div>

              {/* Eyebrow & Title */}
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 mb-1">
                DESKTOP APP
              </p>
              <h3 className="text-[26px] sm:text-[28px] font-extrabold text-black tracking-tight mb-2.5">
                Windows
              </h3>

              {/* Variant Tag */}
              <div className="mb-8">
                <span className="inline-block px-2.5 py-1 rounded-md bg-neutral-100 text-[11px] font-medium text-neutral-600">
                  Windows 10 / Windows 11
                </span>
              </div>
            </div>

            {/* Form */}
            {winSubmitted ? (
              <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 text-center text-xs font-semibold text-black flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-black" /> Waitlist confirmed for Windows!
              </div>
            ) : (
              <form onSubmit={handleWinSubmit} className="flex flex-col w-full relative z-10">
                <input
                  type="email"
                  required
                  value={winEmail}
                  onChange={(e) => setWinEmail(e.target.value)}
                  placeholder="Email for Windows access"
                  className="w-full px-4 py-3.5 rounded-xl border border-neutral-200/90 bg-white text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black mb-3 shadow-2xs transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={winSubmitting}
                  className="w-full py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold hover:bg-neutral-900 transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-black">
                    <WindowsOfficialIcon className="w-3.5 h-3.5 text-black" />
                  </span>
                  <span>{winSubmitting ? "Joining…" : "Join Windows waitlist"}</span>
                  <ChevronRight size={14} className="text-neutral-400" />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaBanner;

