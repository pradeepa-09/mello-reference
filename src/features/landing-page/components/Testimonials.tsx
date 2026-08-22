"use client";

import { Twitter } from "lucide-react";

export function Testimonials() {
  const TESTIMONIALS = [
    {
      author: "Andrej Karpathy",
      handle: "@karpathy",
      role: "AI Researcher, Eureka Labs / Former OpenAI & Tesla",
      quote: "Voice dictation with local Whisper is one of the few magical 10x workflow improvements of the last year. Mello makes it instantaneous anywhere.",
    },
    {
      author: "Pieter Levels",
      handle: "@levelsio",
      role: "Founder, Nomad List & PhotoAI",
      quote: "Been using Mello daily to write code, respond to customer emails and write tweets. It literally never misses a word. Game changer.",
    },
    {
      author: "Guillermo Rauch",
      handle: "@rauchg",
      role: "CEO, Vercel",
      quote: "The combination of on-device Whisper Turbo with zero network latency makes voice feel like a natural extension of the keyboard.",
    },
    {
      author: "Andrew Wilkinson",
      handle: "@awilkinson",
      role: "Co-Founder, Tiny",
      quote: "I can't imagine writing long-form memos without Mello now. It pays for itself within the first 10 minutes of use.",
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-4 max-w-7xl mx-auto border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs font-mono font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-ash)" }}>
          05 · Wall of Love
        </p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight" style={{ letterSpacing: "var(--tracking-heading-lg)" }}>
          Loved by the world&apos;s most prolific builders
        </h2>
        <p className="text-sm sm:text-base mt-4 leading-relaxed" style={{ color: "var(--color-mist)" }}>
          Join thousands of founders, engineers, and creators who work 4.1× faster with Mello.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {TESTIMONIALS.map((item) => (
          <div
            key={item.handle}
            className="rounded-3xl border p-8 flex flex-col justify-between transition-all hover:border-white/20"
            style={{ backgroundColor: "var(--color-obsidian)", borderColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <p className="text-sm sm:text-base leading-relaxed mb-6 font-normal" style={{ color: "var(--color-pearl)" }}>
              &ldquo;{item.quote}&rdquo;
            </p>

            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
              <div>
                <strong className="text-sm font-semibold text-white block">{item.author}</strong>
                <span className="text-xs font-mono" style={{ color: "var(--color-ash)" }}>{item.handle} • {item.role}</span>
              </div>
              <Twitter className="w-4 h-4 text-white/40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
