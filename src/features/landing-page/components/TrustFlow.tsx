"use client";

import React from "react";
import { IntegrationsBeamDemo } from "./IntegrationsBeamDemo";

export function TrustFlow() {
  return (
    <section id="trust-flow" className="py-24 sm:py-32 bg-white text-black border-b border-neutral-200 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-neutral-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="wrap max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header Matching 04 Meeting Mode */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-neutral-500 mb-3 select-none">
            02 · CONNECTED ACTIONS &amp; APPROVAL
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight">
            Every action follows the same approval flow.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal">
            Gmail, Google Calendar, and GitHub are deeply integrated. Mello parses names, dates, repositories, and accounts first — you review once before any connector executes.
          </p>
        </div>

        {/* 3 Capability Pills Matching 04 Meeting Mode */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-bold shadow-xs select-none">
            One review step
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-bold shadow-xs select-none">
            Sandboxed execution
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-bold shadow-xs select-none">
            Gmail · Calendar · GitHub
          </span>
        </div>

        {/* Animated Beams Integration Showcase (Black Studio Component) */}
        <IntegrationsBeamDemo />
      </div>
    </section>
  );
}

export default TrustFlow;
