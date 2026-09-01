"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, X, Check, ArrowRight } from "lucide-react";
import { MEETING_DEMO_DATA } from "./meetingDemoScript";

interface MeetingStateSummaryProps {
  showActionItems?: boolean;
}

export function MeetingStateSummary({ showActionItems = true }: MeetingStateSummaryProps) {
  const { summary } = MEETING_DEMO_DATA;

  return (
    <div className="w-full h-full p-5 sm:p-8 flex flex-col justify-between text-left select-none bg-white">
      <div>
        
        {/* Top Header Row: Eyebrow, Title, and Action Buttons (Matching Screenshot 4) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100 mb-5">
          <div>
            <p className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-1">
              {summary.eyebrow}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight leading-tight">
              {summary.reportTitle}
            </h3>
          </div>

          {/* Decorative Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-700 shadow-2xs hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-default"
            >
              <Sparkles size={13} className="text-neutral-500" />
              <span>Regenerate</span>
            </button>

            <button
              type="button"
              className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-700 shadow-2xs hover:bg-neutral-50 transition-colors flex items-center gap-1.5 cursor-default"
            >
              <Copy size={13} className="text-neutral-500" />
              <span>Copy summary</span>
            </button>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-bold shadow-xs hover:bg-neutral-800 transition-colors cursor-default"
            >
              <span>Dismiss</span>
            </button>
          </div>
        </div>

        {/* Main Executive Summary Box */}
        <div className="mb-6">
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2.5">
            {summary.summaryBadge}
          </div>

          <h4 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight mb-3">
            {summary.summaryHeading}
          </h4>

          {/* Summary Paragraph with Left Thick Accent Border (Matching Screenshot 4) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 border-l-4 border-l-black shadow-2xs">
            <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-700 font-normal">
              {summary.summaryParagraph}
            </p>
          </div>
        </div>

        {/* Action Items Section (Staggered In) */}
        <div>
          <div className="mb-3">
            <h5 className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight">
              {summary.actionItemsHeading}
            </h5>
            <p className="text-[11px] text-neutral-500 font-normal">
              {summary.actionItemsSubtext}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {summary.actionItems.map((action, idx) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={
                  showActionItems
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 8, scale: 0.97 }
                }
                transition={{ duration: 0.35, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="p-3.5 rounded-xl bg-white border border-neutral-200/90 shadow-2xs flex items-start gap-2.5 text-left"
              >
                <span className="w-4 h-4 rounded bg-black text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                  <Check size={10} className="stroke-[3]" />
                </span>
                <div className="overflow-hidden">
                  <p className="text-xs text-neutral-800 font-medium leading-snug">
                    {action.text}
                  </p>
                  {action.assignee && (
                    <span className="text-[10px] font-mono text-neutral-400 mt-1 block">
                      Assignee: {action.assignee}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Footer Status Bar */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <span>Ready to export to Notion, Linear, or Slack</span>
        <span className="text-neutral-900 font-semibold flex items-center gap-1">
          <span>Saved to Mello Memory</span>
          <Check size={12} className="text-black stroke-[3]" />
        </span>
      </div>
    </div>
  );
}

export default MeetingStateSummary;
