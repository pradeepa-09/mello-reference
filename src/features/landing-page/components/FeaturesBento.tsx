"use client";

import { useState } from "react";
import { ShieldCheck, Sparkles, Globe, BookOpen, Layers, Users } from "lucide-react";

export function FeaturesBento() {
  const [activeMode, setActiveMode] = useState<"standard" | "code" | "email" | "raw">("standard");

  const MODES = {
    standard: {
      title: "Standard Mode",
      desc: "Polished, grammatically correct prose with perfect punctuation and casing.",
      example: "Hey team, just pushed the new release to staging. Let me know if you hit any edge cases during testing!",
    },
    code: {
      title: "Coding Mode",
      desc: "Translates spoken instructions into clean snake_case, camelCase, markdown, or code snippets.",
      example: "const handleSpeechInput = async (audioStream: MediaStream): Promise<TranscriptionResult> => { ... }",
    },
    email: {
      title: "Executive Email",
      desc: "Concise, professional bulleted updates with appropriate greetings and sign-offs.",
      example: "Hi Alex,\n\nFollowing up on Q3 milestones:\n• Core engine shipped\n• Latency down 45%\n\nBest,\nDavid",
    },
    raw: {
      title: "Raw Transcript",
      desc: "Exact verbatim transcription without AI post-processing or restructuring.",
      example: "hey team just pushed the new release to staging let me know if you hit any edge cases during testing",
    },
  };

  return (
    <section id="features" className="py-24 px-4 max-w-7xl mx-auto border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs font-mono font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-ash)" }}>
          02 · Core Capabilities
        </p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight" style={{ letterSpacing: "var(--tracking-heading-lg)" }}>
          Everything you need to write at the speed of thought
        </h2>
        <p className="text-sm sm:text-base mt-4 leading-relaxed" style={{ color: "var(--color-mist)" }}>
          Mello runs locally on Apple Silicon and modern GPUs with custom AI modes and deep system integration.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1: 100% Offline & Private (Spans 2 columns) */}
        <div
          className="md:col-span-2 rounded-3xl border p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden transition-all hover:border-white/20"
          style={{ backgroundColor: "var(--color-obsidian)", borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div className="z-10">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: "var(--color-charcoal)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">100% Offline & Private</h3>
            <p className="text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: "var(--color-mist)" }}>
              Your voice never leaves your device. State-of-the-art Whisper models run directly on your GPU and Neural Engine with zero network requests. Fully HIPAA compliant &amp; SOC 2 certified.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t flex flex-wrap items-center gap-3 font-mono text-xs" style={{ borderColor: "rgba(255, 255, 255, 0.08)", color: "var(--color-pearl)" }}>
            <span className="px-3 py-1 rounded-full border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>Whisper Turbo</span>
            <span className="px-3 py-1 rounded-full border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>Distil-Whisper</span>
            <span className="px-3 py-1 rounded-full border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>Whisper Large v3</span>
            <span className="px-3 py-1 rounded-full border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>Zero Cloud Latency</span>
          </div>
        </div>

        {/* Card 2: 100+ Languages */}
        <div
          className="rounded-3xl border p-8 flex flex-col justify-between transition-all hover:border-white/20"
          style={{ backgroundColor: "var(--color-obsidian)", borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: "var(--color-charcoal)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white tracking-tight mb-2">100+ Languages</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-mist)" }}>
              Speak naturally in Spanish, Japanese, German, Hindi, French, or mix languages within the same sentence. Automatic detection without switching models.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs font-mono" style={{ color: "var(--color-ash)" }}>
            <span>Auto-detect</span>
            <span>•</span>
            <span>Instant Translation</span>
          </div>
        </div>

        {/* Card 3: Custom AI Modes (Interactive Playground) - Spans 2 columns */}
        <div
          className="md:col-span-2 rounded-3xl border p-8 sm:p-10 flex flex-col justify-between transition-all hover:border-white/20"
          style={{ backgroundColor: "var(--color-obsidian)", borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "var(--color-charcoal)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              {/* Mode Selector Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-full border bg-black/40" style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}>
                {(["standard", "code", "email", "raw"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveMode(mode)}
                    className="px-3.5 py-1 rounded-full text-xs font-medium capitalize transition-all cursor-pointer"
                    style={{
                      backgroundColor: activeMode === mode ? "var(--color-white)" : "transparent",
                      color: activeMode === mode ? "var(--color-midnight)" : "var(--color-mist)",
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">{MODES[activeMode].title}</h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-mist)" }}>
              {MODES[activeMode].desc}
            </p>

            {/* Live Mode Output Window */}
            <div className="rounded-2xl border p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed" style={{ backgroundColor: "var(--color-charcoal)", borderColor: "rgba(255,255,255,0.1)", color: "var(--color-pearl)" }}>
              <pre className="whitespace-pre-wrap font-mono">{MODES[activeMode].example}</pre>
            </div>
          </div>
        </div>

        {/* Card 4: Smart Vocabulary */}
        <div
          className="rounded-3xl border p-8 flex flex-col justify-between transition-all hover:border-white/20"
          style={{ backgroundColor: "var(--color-obsidian)", borderColor: "rgba(255, 255, 255, 0.1)" }}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: "var(--color-charcoal)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white tracking-tight mb-2">Smart Vocabulary</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-mist)" }}>
              Add personal names, company acronyms, project code names, and technical terms to ensure 100% spelling precision every time.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5 font-mono text-[11px]" style={{ color: "var(--color-pearl)" }}>
            <span className="px-2 py-0.5 rounded border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>Mello</span>
            <span className="px-2 py-0.5 rounded border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>Next.js</span>
            <span className="px-2 py-0.5 rounded border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>GraphQL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
