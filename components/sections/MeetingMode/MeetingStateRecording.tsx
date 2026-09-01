"use client";

import React from "react";
import { ArrowLeft, Pause, Square, Volume2 } from "lucide-react";
import { MEETING_DEMO_DATA, TranscriptLine } from "./meetingDemoScript";
import { TranscriptBubble } from "./TranscriptBubble";

interface MeetingStateRecordingProps {
  visibleBubblesCount: number; // 0 to 4
  currentBubbleSweepProgress?: number; // 0 to 1
  isListeningPillPulsing?: boolean;
}

export function MeetingStateRecording({
  visibleBubblesCount = 4,
  currentBubbleSweepProgress = 1,
  isListeningPillPulsing = true,
}: MeetingStateRecordingProps) {
  const { recordingState, transcript } = MEETING_DEMO_DATA;

  return (
    <div className="w-full h-full p-5 sm:p-8 flex flex-col justify-between text-left select-none bg-white">
      <div>
        
        {/* Top Header Row: Back button, Meeting Title, Status Timer, and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 mb-4">
          <div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-black mb-1 transition-colors"
            >
              <ArrowLeft size={12} />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight leading-tight">
                {recordingState.meetingTitle}
              </h3>
              <span className="px-2 py-0.5 rounded-md border border-neutral-200 text-[11px] font-mono text-neutral-600 bg-neutral-50">
                {recordingState.badgeText}
              </span>
            </div>

            {/* Live Recording Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mt-1">
              <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
              <span>{recordingState.statusText}</span>
            </div>
          </div>

          {/* Decorative Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl border border-neutral-200 bg-white text-xs font-medium text-neutral-800 shadow-2xs cursor-default flex items-center gap-1.5"
            >
              <Pause size={12} />
              <span>{recordingState.pauseButtonText}</span>
            </button>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-bold shadow-xs cursor-default flex items-center gap-1.5"
            >
              <Square size={10} className="fill-white" />
              <span>{recordingState.stopButtonText}</span>
            </button>
          </div>
        </div>

        {/* Tabs Row: My Notes / Transcript (Active) / Summary */}
        <div className="flex items-center justify-between border-b border-neutral-200 mb-4">
          <div className="flex items-center gap-6 text-xs font-semibold">
            <span className="py-2 text-neutral-400 cursor-default">
              My Notes
            </span>
            <span className="py-2 text-neutral-950 border-b-2 border-black cursor-default flex items-center gap-1.5">
              <span>Transcript</span>
            </span>
            <span className="py-2 text-neutral-400 cursor-default">
              Summary
            </span>
          </div>

          {/* Pulsing "Listening" Pill (Top Right of Content Area) */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/90 text-[11px] font-mono text-neutral-800 shadow-2xs">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-neutral-900 ${
                isListeningPillPulsing ? "animate-ping" : ""
              }`}
            />
            <span className="font-semibold">{recordingState.listeningPillText}</span>
          </div>
        </div>

        {/* Chat-Style Transcript Stream Bubble Area */}
        <div className="space-y-3 pt-1 max-h-[300px] sm:max-h-[340px] overflow-y-auto pr-1">
          {transcript.slice(0, visibleBubblesCount).map((line, index) => {
            const isLast = index === visibleBubblesCount - 1;
            const progress = isLast ? currentBubbleSweepProgress : 1;

            return (
              <TranscriptBubble
                key={line.id}
                line={line}
                isVisible={true}
                progress={progress}
              />
            );
          })}
        </div>

      </div>

      {/* Bottom Live Waveform / Diarization Subtext */}
      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <span className="flex items-center gap-1.5">
          <Volume2 size={12} className="text-neutral-500" />
          <span>Multi-speaker diarization active</span>
        </span>
        <span>Local CoreML speech-to-text</span>
      </div>
    </div>
  );
}

export default MeetingStateRecording;
