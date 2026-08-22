"use client";

import { useState } from "react";
import { CheckCircle2, Paperclip } from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  title: string;
  handle: string;
  avatarColor: string;
  initials: string;
  quote: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "karpathy",
    name: "Andrej Karpathy",
    title: "Founder Eureka Labs",
    handle: "@karpathy",
    avatarColor: "#4f772d",
    initials: "AK",
    quote:
      'There\'s a new kind of coding I call "vibe coding", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It\'s possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. I just talk to Composer with @melloapp so I barely even touch the keyboard....',
  },
  {
    id: "levels",
    name: "Pieter Levels",
    title: "Serial entrepreneur",
    handle: "@levelsio",
    avatarColor: "#d97706",
    initials: "PL",
    quote:
      "Mello is by far the fastest voice-to-action tool for Mac. I use it all day to write code, reply to emails and trigger workflows. It's completely replaced typing for most of my work.",
  },
  {
    id: "wilkinson",
    name: "Andrew Wilkinson",
    title: "CEO tiny",
    handle: "@awilkinson",
    avatarColor: "#2563eb",
    initials: "AW",
    quote:
      "I dictated an entire 4,000-word shareholder letter using Mello in under an hour. The fact that it runs locally with zero latency is pure magic.",
  },
  {
    id: "rauch",
    name: "Guillermo Rauch",
    title: "CEO Vercel",
    handle: "@rauchg",
    avatarColor: "#7c3aed",
    initials: "GR",
    quote:
      "On-device Whisper Turbo transcription with zero latency is the future of input. Mello nailed the UX across macOS and Windows.",
  },
];

export function InteractiveTestimonialStack() {
  const [selectedId, setSelectedId] = useState<string>("karpathy");

  const current = TESTIMONIALS.find((t) => t.id === selectedId) || TESTIMONIALS[0];

  return (
    <section id="testimonials" className="py-24 px-4 max-w-7xl mx-auto border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Loved by thousands,
          <br />
          built for how you work
        </h2>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Stacked Paperclipped Tweet Card */}
        <div className="lg:col-span-7 relative flex justify-center">
          {/* Background Card Offset 2 */}
          <div
            className="absolute inset-x-6 -top-4 bottom-4 rounded-3xl opacity-30 shadow-2xl transition-all"
            style={{
              backgroundColor: "#2a2b30",
              transform: "rotate(-4deg)",
            }}
          />

          {/* Background Card Offset 1 */}
          <div
            className="absolute inset-x-3 -top-2 bottom-2 rounded-3xl opacity-60 shadow-2xl transition-all"
            style={{
              backgroundColor: "#3a3b42",
              transform: "rotate(-2deg)",
            }}
          />

          {/* Main Top Tweet Card */}
          <div
            className="relative w-full rounded-3xl p-7 sm:p-9 shadow-2xl border transition-all duration-300"
            style={{
              backgroundColor: "#ffffff",
              color: "#000000",
              borderColor: "rgba(0, 0, 0, 0.1)",
              transform: "rotate(0deg)",
            }}
          >
            {/* Realistic Paperclip Graphic in Upper Right */}
            <div className="absolute -top-4 -right-2 w-10 h-16 pointer-events-none opacity-80" style={{ transform: "rotate(15deg)" }}>
              <div className="w-8 h-14 rounded-full border-4 border-gray-400/80 shadow-md" />
            </div>

            {/* Author Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm shadow-md"
                style={{ backgroundColor: current.avatarColor }}
              >
                {current.initials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <strong className="text-base font-bold text-gray-900">{current.name}</strong>
                  <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
                  <span className="text-xs font-mono text-gray-500">{current.handle}</span>
                </div>
                <span className="text-xs text-gray-600 block">{current.title}</span>
              </div>
            </div>

            {/* Quote Body */}
            <p className="text-sm sm:text-base leading-relaxed text-gray-800 font-normal">
              {current.quote}
            </p>
          </div>
        </div>

        {/* Right Column: Clickable Testimonial Selector List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-white">Testimonies</h3>
            <p className="text-xs font-mono text-white/50">Endless happy users</p>
          </div>

          {TESTIMONIALS.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white/10 border-white/30 shadow-xl"
                    : "bg-transparent border-transparent hover:bg-white/5"
                }`}
              >
                {/* Active Indicator Dot */}
                <div className="flex items-center justify-center w-3">
                  {isSelected && <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />}
                </div>

                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0"
                  style={{ backgroundColor: item.avatarColor }}
                >
                  {item.initials}
                </div>

                {/* Info */}
                <div className="flex flex-col">
                  <strong className="text-sm font-semibold text-white">{item.name}</strong>
                  <span className="text-xs font-mono text-white/60">{item.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
