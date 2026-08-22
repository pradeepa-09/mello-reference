"use client";

import { useEffect, useRef, useState } from "react";

const SENTENCES = [
  "Schedule a meeting with the design team for 10am tomorrow",
  "Draft a reply to Sarah confirming the launch plan for Friday",
  "Create a GitHub issue for the checkout bug and assign it to me",
];

const OUTCOMES = [
  { app: "Calendar", result: "Design team · Tomorrow, 10:00 AM", label: "Event ready" },
  { app: "Gmail", result: "Reply to Sarah · Launch plan", label: "Draft ready" },
  { app: "GitHub", result: "Checkout bug · Assigned to you", label: "Issue ready" },
];

const WAVEFORM_HEIGHTS = [8, 16, 22, 14, 20, 10];

export function HeroInteractiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver to pause loop when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A short, repeatable product demo: spoken request → structured result.
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const currentSentence = SENTENCES[sentenceIndex];
    let timeout: NodeJS.Timeout;

    if (charIndex < currentSentence.length) {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 32);
    } else {
      timeout = setTimeout(() => {
        setCharIndex(0);
        setSentenceIndex((prev) => (prev + 1) % SENTENCES.length);
      }, 2600);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isInView, reduceMotion, sentenceIndex]);

  const currentSentence = SENTENCES[sentenceIndex];
  const displayedText = reduceMotion
    ? SENTENCES[0]
    : currentSentence.slice(0, charIndex);
  const isReady = reduceMotion || charIndex === currentSentence.length;
  const outcome = OUTCOMES[sentenceIndex];

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center p-2 sm:p-4 select-none"
      style={{ perspective: "1200px" }}
      aria-label="3D Laptop live dictation demonstration"
    >
      {/* 3D Laptop Chassis */}
      <div
        className="w-full max-w-[480px] lg:max-w-[540px] transition-transform duration-500 ease-out"
        style={{
          transform: reduceMotion
            ? "none"
            : "rotateY(-10deg) rotateX(6deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Laptop Lid / Bezel */}
        <div
          className="relative rounded-2xl p-2.5 sm:p-3 shadow-2xl border"
          style={{
            backgroundColor: "var(--color-charcoal)",
            borderColor: "rgba(255, 255, 255, 0.16)",
            boxShadow:
              "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Top Bezel Camera Dot */}
          <div className="flex justify-center mb-1.5" aria-hidden="true">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-graphite)" }}
            />
          </div>

          {/* Screen Display */}
          <div
            className="relative rounded-xl overflow-hidden min-h-[260px] sm:min-h-[300px] flex flex-col border"
            style={{
              backgroundColor: "var(--color-obsidian)",
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Floating Notch HUD */}
            <div className="absolute top-3 inset-x-0 flex justify-center z-20 pointer-events-none px-4">
              <div
                className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border shadow-xl backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(15, 15, 16, 0.92)",
                  borderColor: "rgba(255, 255, 255, 0.14)",
                  borderRadius: "var(--radius-full)",
                }}
              >
                {/* Shortcut chip */}
                <span
                  className="font-mono text-[10px] font-medium tracking-tight px-1.5 py-0.5 rounded border"
                  style={{
                    backgroundColor: "var(--color-charcoal)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: "var(--color-mist)",
                  }}
                >
                  ⌥ Space
                </span>

                {/* Scripted Waveform Bars */}
                <div
                  className="flex items-center gap-1 h-5"
                  aria-hidden="true"
                >
                  {WAVEFORM_HEIGHTS.map((baseH, i) => (
                    <span
                      key={i}
                      className="w-[2px] rounded-full mock-waveform-bar"
                      style={{
                        backgroundColor: "var(--color-white)",
                        height: reduceMotion ? `${baseH * 0.6}px` : undefined,
                        animationDelay: reduceMotion
                          ? undefined
                          : `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>

                <span
                  className="text-[11px] font-medium"
                  style={{ color: "var(--color-pearl)" }}
                >
                  {isReady ? "Understood" : "Listening"}
                </span>
              </div>
            </div>

            {/* Mock App Window Chrome */}
            <div
              className="flex items-center justify-between px-3 py-2 border-b"
              style={{
                backgroundColor: "var(--color-charcoal)",
                borderColor: "rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Window Controls (Grayscale dots) */}
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.14)" }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.14)" }}
                />
              </div>

              {/* App Label */}
              <span
                className="text-[11px] font-medium tracking-wide"
                style={{ color: "var(--color-ash)" }}
              >
                Notes — Untitled
              </span>

              <div className="w-10" />
            </div>

            {/* Mock App Text Area with Streaming Dictation */}
            <div className="flex-1 p-5 pt-14 flex flex-col justify-between text-left font-sans gap-5">
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold tracking-[0.16em] uppercase" style={{ color: "var(--color-fog)" }}>
                  You said
                </span>
                <p
                  className="text-sm sm:text-base leading-relaxed font-normal"
                  style={{ color: "var(--color-white)" }}
                >
                  {displayedText}
                  {!isReady && <span
                    className="inline-block w-0.5 h-4 ml-0.5 align-middle mock-caret"
                    style={{ backgroundColor: "var(--color-white)" }}
                    aria-hidden="true"
                  />}
                </p>
              </div>

              <div
                className={`rounded-xl border p-3 transition-all duration-500 ${isReady ? "translate-y-0 opacity-100" : "translate-y-3 opacity-30"}`}
                style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.14)" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--color-ash)" }}>{outcome.app}</span>
                  <span className="text-[10px] rounded-full px-2 py-0.5 bg-white text-black font-bold">{outcome.label}</span>
                </div>
                <p className="text-xs font-semibold mt-2" style={{ color: "var(--color-white)" }}>{outcome.result}</p>
              </div>
            </div>

            {/* Bottom App Footer Bar */}
            <div
              className="px-3 py-1.5 border-t flex items-center justify-between text-[10px]"
              style={{
                backgroundColor: "rgba(28, 29, 31, 0.6)",
                borderColor: "rgba(255, 255, 255, 0.06)",
                color: "var(--color-fog)",
              }}
            >
              <span>Mello Dictate · Whisper Engine</span>
              <span>100% On-Device</span>
            </div>
          </div>
        </div>

        {/* Laptop Keyboard Base / Hinge Lip */}
        <div
          className="relative mx-auto -mt-1 h-3 sm:h-3.5 rounded-b-xl border-t"
          style={{
            width: "106%",
            marginLeft: "-3%",
            backgroundColor: "var(--color-graphite)",
            borderColor: "rgba(255, 255, 255, 0.25)",
            boxShadow:
              "0 20px 30px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Thumb Notch */}
          <div
            className="w-12 h-1 mx-auto rounded-b bg-black/40 border-b"
            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
          />
        </div>
      </div>
    </div>
  );
}
