"use client";

import React from "react";
import { motion } from "framer-motion";
import type { TranscriptLine } from "./meetingDemoScript";

interface TranscriptBubbleProps {
  line: TranscriptLine;
  isVisible: boolean;
  progress?: number; // 0 to 1 reveal progress
}

export function TranscriptBubble({ line, isVisible, progress = 1 }: TranscriptBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-end w-full"
    >
      <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl bg-neutral-900 text-white p-3.5 sm:p-4 shadow-sm relative overflow-hidden text-left border border-neutral-800">
        
        {/* Sweep-in highlighter shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none meeting-highlighter-sweep"
          style={{
            transform: `translateX(${(progress - 1) * 100}%)`,
            transition: "transform 0.4s ease-out",
          }}
          aria-hidden="true"
        />

        {/* Bubble Header: Speaker Name & Timestamp */}
        <div className="flex items-center justify-between gap-4 mb-1.5 text-[11px] font-mono text-neutral-400 select-none">
          <span className="font-semibold text-neutral-200">{line.speaker}</span>
          <span>{line.timestamp}</span>
        </div>

        {/* Bubble Text */}
        <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-100 font-normal">
          {line.text}
        </p>
      </div>
    </motion.div>
  );
}

export default TranscriptBubble;
