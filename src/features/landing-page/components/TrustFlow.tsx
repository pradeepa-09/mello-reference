"use client";

import React from "react";
import { IntegrationsBeamDemo } from "./IntegrationsBeamDemo";

export function TrustFlow() {
  return (
    <section id="trust-flow" className="py-14 sm:py-18 bg-white text-black border-b border-neutral-200 relative overflow-hidden">
      <div id="actions" className="scroll-mt-24" />
      <div id="beam" className="scroll-mt-24" />
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-neutral-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="wrap max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-left max-w-4xl mb-8 sm:mb-10">
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-neutral-500 mb-3 select-none">
            02 · CONNECTED ACTIONS &amp; APPROVAL
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight">
            Every action follows the same approval flow.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal">
            Mello currently supports Actions across Gmail, Google Calendar, and GitHub. Speak naturally, review the resolved details, and approve before anything is created or sent.
          </p>
        </div>

        {/* Animated Beams Integration Showcase */}
        <IntegrationsBeamDemo />
      </div>
    </section>
  );
}

export default TrustFlow;
