"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Sparkles, Volume2, ArrowRight, Play, RefreshCw } from "lucide-react";

type ToneType = "casual" | "formal" | "legal" | "code";

interface ToneExample {
  tone: ToneType;
  label: string;
  badge: string;
  rawVoice: string;
  formattedOutput: string;
  targetApp: string;
}

const TONE_EXAMPLES: Record<ToneType, ToneExample> = {
  casual: {
    tone: "casual",
    label: "Casual Slack",
    badge: "Slack Message",
    rawVoice: "hey louis um yeah so basically lets hop on a call next tuesday and figure out the roadmap stuff lmk when you are free",
    formattedOutput: "Sure! Let's book a call for next Tuesday to go over the roadmap details. LMK when you're free! 👍",
    targetApp: "Slack · #product-strategy",
  },
  formal: {
    tone: "formal",
    label: "Executive Email",
    badge: "Gmail Draft",
    rawVoice: "hey louis um yeah so basically lets hop on a call next tuesday and figure out the roadmap stuff lmk when you are free",
    formattedOutput: "Dear Louis,\n\nFollowing up on our planning milestones, I propose scheduling a brief sync next Tuesday to finalize the roadmap deliverables. Kindly confirm your availability.\n\nBest regards,\nAlex",
    targetApp: "Gmail · Q3 Planning",
  },
  legal: {
    tone: "legal",
    label: "Legal Memo",
    badge: "Compliance Note",
    rawVoice: "hey louis um yeah so basically lets hop on a call next tuesday and figure out the roadmap stuff lmk when you are free",
    formattedOutput: "Pursuant to standard evaluation protocols, a bilateral roadmap review consultation is scheduled for Tuesday next. Please confirm stakeholder availability prior to external transmission.",
    targetApp: "Notion · Legal & Policy",
  },
  code: {
    tone: "code",
    label: "Developer Code",
    badge: "Cursor IDE",
    rawVoice: "hey louis um yeah so basically lets hop on a call next tuesday and figure out the roadmap stuff lmk when you are free",
    formattedOutput: "// Automated Calendar Hook via Mello\nconst roadmapMeeting = await calendar.schedule({\n  attendee: '@Louis',\n  date: 'next-tuesday',\n  topic: 'Q3 Roadmap Deliverables',\n  notify: true,\n});",
    targetApp: "Cursor · src/calendar/sync.ts",
  },
};

export function ToneAdaptability() {
  const [activeTone, setActiveTone] = useState<ToneType>("casual");
  const [isRecording, setIsRecording] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isDoneTyping, setIsDoneTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentExample = TONE_EXAMPLES[activeTone];

  // Typewriter streaming effect when tone changes or user triggers dictation
  useEffect(() => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setIsRecording(true);
    setIsDoneTyping(false);
    setDisplayedText("");

    const fullText = currentExample.formattedOutput;
    let charIdx = 0;

    // Simulate short voice listening delay
    const listenDelay = setTimeout(() => {
      setIsRecording(false);
      typingTimerRef.current = setInterval(() => {
        if (charIdx < fullText.length) {
          setDisplayedText(fullText.slice(0, charIdx + 1));
          charIdx++;
        } else {
          setIsDoneTyping(true);
          if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        }
      }, 16);
    }, 600);

    return () => {
      clearTimeout(listenDelay);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [activeTone, currentExample]);

  const handleManualReplay = () => {
    setActiveTone((prev) => {
      // re-trigger effect
      return prev;
    });
    setDisplayedText("");
    setIsRecording(true);
    setIsDoneTyping(false);

    setTimeout(() => {
      setIsRecording(false);
      let charIdx = 0;
      const fullText = currentExample.formattedOutput;
      const timer = setInterval(() => {
        if (charIdx < fullText.length) {
          setDisplayedText(fullText.slice(0, charIdx + 1));
          charIdx++;
        } else {
          setIsDoneTyping(true);
          clearInterval(timer);
        }
      }, 16);
    }, 500);
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <p className="text-xs font-mono font-bold tracking-widest uppercase mb-3 text-white/60">
          02 · Speech-to-Intent Adaptability
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Communication isn&apos;t
          <br />
          one-size-fits-all
        </h2>
        <p className="text-sm sm:text-base mt-4 leading-relaxed text-white/70">
          Ramble naturally in your own words. Mello instantly transforms your raw speech into polished prose tailored for your active app.
        </p>
      </div>

      {/* Main Interactive Showcase Grid */}
      <div
        className="max-w-5xl mx-auto rounded-3xl border p-6 sm:p-10 relative overflow-hidden shadow-2xl"
        style={{
          backgroundColor: "#0c0d10",
          borderColor: "rgba(255, 255, 255, 0.14)",
          borderRadius: "var(--radius-3xl)",
        }}
      >
        {/* Ambient Radial Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.35) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Top Tone Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b z-10 relative" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Select Mode:</span>
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full border bg-black/50" style={{ borderColor: "rgba(255, 255, 255, 0.12)" }}>
              {(["casual", "formal", "legal", "code"] as ToneType[]).map((t) => {
                const isActive = activeTone === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTone(t)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer capitalize"
                    style={{
                      backgroundColor: isActive ? "#007aff" : "transparent",
                      color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.65)",
                    }}
                  >
                    {TONE_EXAMPLES[t].label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={handleManualReplay}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-colors hover:bg-white/10 text-white/80 cursor-pointer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              borderColor: "rgba(255, 255, 255, 0.14)",
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Replay Voice Stream</span>
          </button>
        </div>

        {/* Live Transformation Workspace: Left (Spoken Input) -> Right (Polished Output) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 z-10 relative">
          {/* Left Box: Raw Spoken Voice Stream (What you actually say) */}
          <div
            className="lg:col-span-5 rounded-2xl border p-5 sm:p-6 flex flex-col justify-between"
            style={{
              backgroundColor: "#131418",
              borderColor: isRecording ? "#007aff" : "rgba(255, 255, 255, 0.1)",
              boxShadow: isRecording ? "0 0 20px rgba(0, 122, 255, 0.25)" : "none",
            }}
          >
            <div>
              {/* Notch HUD Simulator */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-black/60 text-[11px] font-mono" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                  <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white">⌥ Space</span>
                  <span className={isRecording ? "text-blue-400 font-semibold" : "text-white/60"}>
                    {isRecording ? "Listening & Transcribing..." : "Voice Input"}
                  </span>
                </div>

                {/* Animated Audio Equalizer Waveform */}
                <div className="flex items-center gap-1 h-5">
                  <span className={`w-1 rounded-full bg-blue-500 transition-all ${isRecording ? "h-5 animate-pulse" : "h-2 opacity-40"}`} />
                  <span className={`w-1 rounded-full bg-blue-400 transition-all ${isRecording ? "h-3 animate-pulse delay-75" : "h-1.5 opacity-40"}`} />
                  <span className={`w-1 rounded-full bg-blue-500 transition-all ${isRecording ? "h-6 animate-pulse delay-150" : "h-3 opacity-40"}`} />
                  <span className={`w-1 rounded-full bg-blue-300 transition-all ${isRecording ? "h-4 animate-pulse delay-100" : "h-1 opacity-40"}`} />
                </div>
              </div>

              <span className="text-xs font-mono uppercase tracking-wider block mb-2 text-white/50">
                1. Your Raw Spoken Words:
              </span>

              {/* Raw Rambling Speech */}
              <p className="text-sm font-mono leading-relaxed text-white/90 italic bg-black/40 p-3.5 rounded-xl border border-white/5">
                &ldquo;{currentExample.rawVoice}&rdquo;
              </p>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs font-mono text-white/50" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-blue-400" />
                <span>Live Speech</span>
              </span>
              <span>Natural Cadence</span>
            </div>
          </div>

          {/* Center Connector Arrow */}
          <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center gap-2 select-none">
            <div className="w-10 h-10 rounded-full border flex items-center justify-center shadow-lg bg-[#1a1b22] border-white/20">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            </div>
            <span className="text-[10px] font-mono uppercase text-white/50 text-center tracking-tight">
              AI Tone Engine
            </span>
          </div>

          {/* Right Box: Polished Real-Time Output in Target App */}
          <div
            className="lg:col-span-5 rounded-2xl border p-5 sm:p-6 flex flex-col justify-between"
            style={{
              backgroundColor: "#16171d",
              borderColor: "rgba(255, 255, 255, 0.16)",
            }}
          >
            <div>
              {/* App Window Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono px-2.5 py-1 rounded-full border bg-white/5 text-white/90" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                  {currentExample.targetApp}
                </span>

                <span className="text-[11px] font-mono text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                  Live Output
                </span>
              </div>

              <span className="text-xs font-mono uppercase tracking-wider block mb-2 text-white/50">
                2. Formatted Output:
              </span>

              {/* Streaming Output Box */}
              <div className="rounded-xl border p-4 font-sans text-sm sm:text-base leading-relaxed min-h-[120px] bg-black/60 border-white/10 text-white">
                <pre className="whitespace-pre-wrap font-sans text-sm sm:text-base">
                  {displayedText}
                  {!isDoneTyping && (
                    <span className="inline-block w-2 h-4 ml-0.5 bg-blue-500 animate-pulse" />
                  )}
                </pre>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs font-mono text-white/50" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span>Zero cloud latency</span>
              <span className="text-blue-400 font-semibold">100% Precision</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
