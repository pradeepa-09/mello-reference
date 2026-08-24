"use client";

import { Mic, Zap, Check } from "lucide-react";

export function ModeChooser() {
  return (
    <section
      id="modes"
      className="section py-20 px-4 max-w-7xl mx-auto text-white border-b"
      style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
    >
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p
          className="text-xs font-mono font-bold tracking-widest uppercase mb-2"
          style={{ color: "var(--color-ash)" }}
        >
          02 · Two Core Modes
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight"
          style={{ letterSpacing: "var(--tracking-heading-lg)" }}
        >
          Dictate or Act. One simple shortcut.
        </h2>
        <p
          className="text-sm sm:text-base mt-3 leading-relaxed font-normal"
          style={{ color: "var(--color-mist)" }}
        >
          Switch seamlessly between fast, streaming transcription and automated desktop actions.
        </p>
      </div>

      {/* Two Side-by-Side Marketing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Card 1: Dictate Mode */}
        <div
          className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl border transition-all duration-200"
          style={{
            backgroundColor: "var(--color-obsidian)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "var(--radius-3xl)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
            e.currentTarget.style.backgroundColor = "var(--color-charcoal)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.backgroundColor = "var(--color-obsidian)";
          }}
        >
          <div>
            {/* Header with Icon + Tag */}
            <div className="flex items-center justify-between mb-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: "var(--color-charcoal)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                }}
              >
                <Mic className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border"
                style={{
                  backgroundColor: "var(--color-charcoal)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  color: "var(--color-mist)",
                }}
              >
                Mode 01
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-semibold text-white tracking-tight">Dictate</h3>
            <p className="text-base font-medium text-white mt-1">Speak, and it types.</p>
            <p
              className="text-sm mt-2 leading-relaxed font-normal"
              style={{ color: "var(--color-mist)" }}
            >
              Zero-latency voice transcription directly injected into any focused text box, editor, or chat window.
            </p>
          </div>

          {/* Static Preview Inset Box */}
          <div
            className="mt-8 p-4 rounded-xl border flex flex-col gap-2"
            style={{
              backgroundColor: "var(--color-midnight)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono" style={{ color: "var(--color-fog)" }}>
              <span>SLACK · #PRODUCT</span>
              <span>STREAMING</span>
            </div>
            <p className="text-xs sm:text-sm font-mono leading-relaxed" style={{ color: "var(--color-pearl)" }}>
              &ldquo;Drafting the proposal for the new enterprise deployment schedule...&rdquo;
            </p>
          </div>
        </div>

        {/* Card 2: Act Mode */}
        <div
          className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl border transition-all duration-200"
          style={{
            backgroundColor: "var(--color-obsidian)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "var(--radius-3xl)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
            e.currentTarget.style.backgroundColor = "var(--color-charcoal)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.backgroundColor = "var(--color-obsidian)";
          }}
        >
          <div>
            {/* Header with Icon + Tag */}
            <div className="flex items-center justify-between mb-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: "var(--color-charcoal)",
                  borderColor: "rgba(255, 255, 255, 0.12)",
                }}
              >
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span
                className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border"
                style={{
                  backgroundColor: "var(--color-charcoal)",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  color: "var(--color-mist)",
                }}
              >
                Mode 02
              </span>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl font-semibold text-white tracking-tight">Act</h3>
            <p className="text-base font-medium text-white mt-1">Speak, and it happens.</p>
            <p
              className="text-sm mt-2 leading-relaxed font-normal"
              style={{ color: "var(--color-mist)" }}
            >
              Natural language instructions parsed into structured, confirmable multi-app automations.
            </p>
          </div>

          {/* Static Preview Inset Box */}
          <div
            className="mt-8 p-4 rounded-xl border flex flex-col gap-2.5"
            style={{
              backgroundColor: "var(--color-midnight)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono" style={{ color: "var(--color-fog)" }}>
              <span>CALENDAR &amp; GMAIL</span>
              <span>CONFIRMATION READY</span>
            </div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border w-fit text-xs font-semibold"
              style={{
                backgroundColor: "var(--color-charcoal)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                color: "var(--color-white)",
              }}
            >
              <Check className="w-3.5 h-3.5 text-white shrink-0" />
              <span>Meeting scheduled: Alex Brooks (Tomorrow · 3:00 PM)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
