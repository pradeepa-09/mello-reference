"use client";

import React from "react";
import { Mic, Check } from "lucide-react";
import { motion } from "framer-motion";

interface MelloNotchHUDProps {
  mode?: string;
  isListening?: boolean;
  transcriptionText?: string;
  statusText?: string;
  className?: string;
  compact?: boolean;
}

const DEFAULT_BARS = [5, 12, 18, 10, 22, 16, 8, 18, 7, 14, 10];

export function MelloNotchHUD({
  mode = "Dictation",
  isListening = true,
  transcriptionText = "",
  statusText,
  className = "",
  compact = false,
}: MelloNotchHUDProps) {
  return (
    <div
      className={`inline-flex items-center justify-between gap-2 sm:gap-3 ${
        compact ? "pl-1.5 pr-2.5 py-1 rounded-full" : "pl-2 sm:pl-2.5 pr-3 sm:pr-3.5 py-1.5 rounded-full"
      } bg-[#ECECEC]/95 backdrop-blur-2xl border border-white/85 shadow-[0_10px_30px_rgba(0,0,0,0.14)] transition-all duration-300 select-none ${className}`}
      style={{
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
      }}
    >
      {/* Left Pill Chip: MELLO / Mode */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className={`bg-white rounded-full ${compact ? "px-2.5 py-0.5" : "px-3 py-1"} shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-neutral-100/90 flex flex-col justify-center items-start leading-none`}>
          <span className={`${compact ? "text-[8px]" : "text-[9px] sm:text-[10px]"} font-black tracking-[0.14em] text-black uppercase font-mono`}>
            MELLO
          </span>
          <span className={`${compact ? "text-[7px]" : "text-[8px] sm:text-[9px]"} font-medium text-neutral-500 mt-0.5`}>
            {mode}
          </span>
        </div>

        {/* Dynamic Mic or Check Icon */}
        {isListening ? (
          <div className={`${compact ? "w-6 h-6" : "w-7 h-7 sm:w-7.5 sm:h-7.5"} rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-amber-500/25 ring-2 ring-amber-500/10 flex items-center justify-center shrink-0`}>
            <Mic className={`${compact ? "w-3 h-3" : "w-3.5 h-3.5"} text-black animate-pulse`} />
          </div>
        ) : (
          <div className={`${compact ? "w-5 h-5" : "w-6 h-6"} rounded-full flex items-center justify-center shrink-0`}>
            <Check className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"} text-[#2E7D32] stroke-[2.5]`} />
          </div>
        )}
      </div>

      {/* Center Dynamic Area */}
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 px-1">
        {isListening ? (
          <>
            {/* Animated Waveform Bars */}
            <div className={`flex items-center gap-[2px] ${compact ? "h-4" : "h-5"} shrink-0`} aria-hidden="true">
              {DEFAULT_BARS.map((h, i) => {
                const barH = compact ? Math.max(3, h * 0.7) : h;
                return (
                  <motion.span
                    key={i}
                    animate={{
                      height: [`${Math.max(3, barH * 0.35)}px`, `${barH}px`, `${Math.max(3, barH * 0.25)}px`],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: i * 0.08,
                      ease: "easeInOut",
                    }}
                    className="w-[2px] bg-black rounded-full block"
                  />
                );
              })}
            </div>

            {/* Listening Text */}
            <span className={`font-bold ${compact ? "text-[11px]" : "text-xs sm:text-[13px]"} text-black tracking-tight whitespace-nowrap`}>
              Listening...
            </span>
          </>
        ) : (
          /* Completed Transcription Text - Crisp & Fully Visible */
          <span className={`font-semibold ${compact ? "text-[10px] sm:text-[11px]" : "text-xs sm:text-[13px]"} text-black tracking-tight leading-snug truncate max-w-[240px] xs:max-w-[320px] sm:max-w-[440px]`}>
            {transcriptionText || "Done"}
          </span>
        )}
      </div>

      {/* Right Status Badge (ACTIVE / DONE) */}
      <div className="shrink-0 pl-1">
        {isListening ? (
          <span className={`font-black ${compact ? "text-[8px]" : "text-[9px] sm:text-[10px]"} tracking-[0.16em] uppercase text-black font-mono`}>
            {statusText || "ACTIVE"}
          </span>
        ) : (
          <span className={`font-black ${compact ? "text-[8px]" : "text-[9px] sm:text-[10px]"} tracking-[0.16em] uppercase text-[#2E7D32] font-mono`}>
            {statusText || "DONE"}
          </span>
        )}
      </div>
    </div>
  );
}

export default MelloNotchHUD;
