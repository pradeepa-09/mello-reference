"use client";

import React from "react";
import {
  Mic,
  Calendar,
  Sparkles,
  Search,
  BookOpen,
  Settings,
  HelpCircle,
  Sun,
  LayoutGrid,
  User,
  AudioWaveform,
  Check
} from "lucide-react";

interface MeetingModeChromeProps {
  children: React.ReactNode;
  activeNav?: string;
}

export function MeetingModeChrome({
  children,
  activeNav = "Meeting Mode",
}: MeetingModeChromeProps) {
  return (
    <div className="w-full max-w-5xl rounded-[24px] sm:rounded-[32px] bg-[#EBEAE8] p-1.5 sm:p-2.5 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.05)] border border-neutral-300/80 relative text-neutral-900 select-none overflow-hidden">
      
      {/* Outer macOS Application Frame */}
      <div className="w-full rounded-[20px] sm:rounded-[26px] bg-white border border-neutral-200/80 overflow-hidden shadow-inner flex flex-col relative">
        
        {/* macOS Window Top Header Bar */}
        <div className="h-10 px-4 bg-[#F7F7F6] border-b border-neutral-200/80 flex items-center justify-between relative z-20">
          
          {/* Traffic Lights (Grayscale / Monochrome as required) */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-neutral-300 border border-neutral-400/60" />
            <span className="w-3 h-3 rounded-full bg-neutral-300 border border-neutral-400/60" />
            <span className="w-3 h-3 rounded-full bg-neutral-300 border border-neutral-400/60" />
            <span className="ml-3 text-xs font-medium text-neutral-600 tracking-tight hidden xs:inline">
              Mello
            </span>
          </div>

          {/* Central Top Dynamic Notch HUD Overlay (Exact Screenshot Replica) */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-1">
            <div className="h-7 px-3.5 rounded-full bg-black text-white flex items-center justify-center gap-1.5 shadow-md border border-neutral-800">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <div className="flex items-center gap-0.5">
                <span className="w-[2px] h-2 bg-neutral-300 rounded-full" />
                <span className="w-[2px] h-3.5 bg-white rounded-full" />
                <span className="w-[2px] h-2 bg-neutral-300 rounded-full" />
              </div>
            </div>
          </div>

          {/* Right empty spacer for symmetry */}
          <div className="w-12" />
        </div>

        {/* Main 3-Column App Interface (Slim Icon Rail + Navigation Sub-Sidebar + Main Viewport) */}
        <div className="flex w-full min-h-[460px] sm:min-h-[520px] bg-white relative">
          
          {/* 1. Leftmost Faint Non-Interactive Sidebar Rail (Matching Screenshots) */}
          <div className="hidden md:flex w-12 bg-[#171816] text-neutral-400 flex-col items-center justify-between py-4 border-r border-neutral-800 shrink-0">
            {/* Top wave button */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-xs">
                <span className="text-xs font-mono font-extrabold tracking-tighter">≈</span>
              </div>
              <div className="w-5 h-5 text-neutral-500 hover:text-white transition-colors cursor-default">
                <LayoutGrid size={17} />
              </div>
            </div>

            {/* Middle tool icons */}
            <div className="flex flex-col items-center gap-5">
              <Mic size={16} className="text-neutral-500 hover:text-white" />
              <Sparkles size={16} className="text-white" />
              <Search size={16} className="text-neutral-500 hover:text-white" />
            </div>

            {/* Bottom utility icons */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] text-neutral-300 font-bold">
                A
              </div>
              <Sun size={15} className="text-neutral-500 hover:text-white" />
            </div>
          </div>

          {/* 2. Sub-Sidebar Navigation Panel (Matching Screenshots) */}
          <div className="hidden sm:flex w-52 lg:w-56 bg-[#F8F8F7] border-r border-neutral-200/90 flex-col justify-between p-3.5 shrink-0">
            <div>
              {/* User Profile Card */}
              <div className="flex items-center gap-2.5 px-2 py-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-xs font-bold text-neutral-800 shadow-2xs">
                  A
                </div>
                <div className="overflow-hidden text-left">
                  <p className="text-xs font-bold text-neutral-900 leading-none truncate">
                    Alex Chen
                  </p>
                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5 truncate">
                    alex@acme.ai
                  </p>
                </div>
              </div>

              {/* Navigation Menu List */}
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-600 hover:bg-neutral-200/50 transition-colors font-medium">
                  <Mic size={14} className="text-neutral-500" />
                  <span>Dictation</span>
                </div>

                {/* ACTIVE NAV ITEM: Meeting Mode */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs bg-white text-neutral-950 font-bold border border-neutral-200/80 shadow-2xs">
                  <Calendar size={14} className="text-black" />
                  <span>Meeting Mode</span>
                </div>

                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-600 hover:bg-neutral-200/50 transition-colors font-medium">
                  <Sparkles size={14} className="text-neutral-500" />
                  <span>Personalization</span>
                </div>

                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-600 hover:bg-neutral-200/50 transition-colors font-medium">
                  <BookOpen size={14} className="text-neutral-500" />
                  <span>What Mello Knows</span>
                </div>
              </div>
            </div>

            {/* Bottom Usage & Settings Card */}
            <div className="space-y-3 pt-4 border-t border-neutral-200/70 text-left">
              <div className="px-2">
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className="text-neutral-500">Usage this week</span>
                </div>
                <p className="text-xs font-bold text-neutral-900">
                  1,627 <span className="text-neutral-400 font-normal font-mono">/ 5,000 words</span>
                </p>
                <div className="w-full h-1.5 bg-neutral-200 rounded-full mt-1.5 overflow-hidden">
                  <div className="w-[33%] h-full bg-neutral-900 rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-neutral-400 mt-1 block">33%</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 px-2 py-1 text-xs text-neutral-600 hover:text-black">
                  <HelpCircle size={13} />
                  <span>Tutorial</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 text-xs text-neutral-600 hover:text-black">
                  <Settings size={13} />
                  <span>Settings</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Main Dynamic Content Viewport */}
          <div className="flex-1 bg-white flex flex-col overflow-hidden relative">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}

export default MeetingModeChrome;
