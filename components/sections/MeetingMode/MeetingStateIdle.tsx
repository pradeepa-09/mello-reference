"use client";

import React from "react";
import { ArrowLeft, RefreshCw, Calendar, Plus, Search, User } from "lucide-react";
import { MEETING_DEMO_DATA } from "./meetingDemoScript";

interface MeetingStateIdleProps {
  isStartButtonPulsing?: boolean;
}

export function MeetingStateIdle({ isStartButtonPulsing = true }: MeetingStateIdleProps) {
  const { idleState } = MEETING_DEMO_DATA;

  return (
    <div className="w-full h-full p-5 sm:p-8 flex flex-col justify-between text-left select-none">
      <div>
        {/* Top Search Bar & Profile Icon Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs text-neutral-400 w-48 sm:w-56 justify-between">
              <div className="flex items-center gap-1.5">
                <Search size={12} />
                <span>Search anything...</span>
              </div>
              <kbd className="text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-neutral-200 text-neutral-500">
                ⌘K
              </kbd>
            </div>
            <div className="w-7 h-7 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-600">
              <User size={13} />
            </div>
          </div>
        </div>

        {/* Header Row: Heading & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-tight">
              {idleState.heading}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl font-normal leading-relaxed">
              {idleState.subtext}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="px-3 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>{idleState.pastTitle}</span>
            </button>

            {/* Start Meeting Button with Subtle Pulse Animation */}
            <button
              type="button"
              className={`px-3.5 py-2 rounded-xl bg-black text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 relative ${
                isStartButtonPulsing
                  ? "ring-4 ring-neutral-200 animate-pulse scale-[1.02]"
                  : "hover:bg-neutral-800"
              }`}
            >
              <Plus size={13} />
              <span>{idleState.startMeetingButtonText}</span>
            </button>
          </div>
        </div>

        {/* Meeting Cards Stack */}
        <div className="space-y-3.5">
          
          {/* 1. Upcoming Meetings Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col justify-between min-h-[90px]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                {idleState.upcomingTitle}
              </h4>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg border border-neutral-200 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50 flex items-center gap-1 transition-colors"
              >
                <RefreshCw size={10} />
                <span>{idleState.upcomingActionText}</span>
              </button>
            </div>
            <p className="text-xs text-neutral-400 font-normal">
              {idleState.upcomingEmptyText}
            </p>
          </div>

          {/* 2. Past Meetings Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col justify-between min-h-[90px]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                {idleState.pastTitle}
              </h4>
              <button
                type="button"
                className="px-2.5 py-1 rounded-lg border border-neutral-200 text-[11px] font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                <span>{idleState.pastActionText}</span>
              </button>
            </div>
            <p className="text-xs text-neutral-400 font-normal">
              {idleState.pastSubtext}
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Subtle Status Line */}
      <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <span>Ready to record on-device</span>
        <span>Local CoreML Engine</span>
      </div>
    </div>
  );
}

export default MeetingStateIdle;
