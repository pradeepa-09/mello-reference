"use client";

import React, { useState } from "react";
import { ActCommandDemo } from "./ActCommandDemo";

export function HowMelloWorks() {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);

  return (
    <section
      id="how-it-works"
      className="py-14 sm:py-18 px-4 w-full bg-white text-black border-b border-neutral-200 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(0,0,0,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Eyebrow Header & Headline (Matching Reference Typography Exactly) */}
        <div className="w-full text-left mb-8 sm:mb-12">
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black mb-3 select-none">
            01 · SEE THE PLAN AND APPROVE
          </p>

          <h2
            className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-black leading-[1.12] max-w-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            Mello shows the plan before it acts.
          </h2>

          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal max-w-2xl">
            Mello resolves names, dates, accounts, and destinations before anything happens. Review the plan once, then approve, edit, or cancel.
          </p>
        </div>

        {/* Dynamic Multi-Command Detect-and-Scatter Demo */}
        <div className="w-full">
          <ActCommandDemo onStepChange={setActiveStep} externalActiveStep={activeStep} />
        </div>

        {/* Minimalist Step Timeline Footer (LISTEN — WRITE — ACT) - Centered */}
        <div className="w-full mt-12 sm:mt-14 flex items-center justify-center gap-4 select-none">
          <button
            type="button"
            onClick={() => setActiveStep(0)}
            className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              activeStep === 0 ? "text-black scale-105" : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            LISTEN
          </button>

          <div
            className={`w-12 sm:w-16 h-[1.5px] transition-colors duration-300 ${
              activeStep >= 1 ? "bg-black" : "bg-neutral-200"
            }`}
          />

          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              activeStep === 1 ? "text-black scale-105" : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            WRITE
          </button>

          <div
            className={`w-12 sm:w-16 h-[1.5px] transition-colors duration-300 ${
              activeStep === 2 ? "bg-black" : "bg-neutral-200"
            }`}
          />

          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors cursor-pointer ${
              activeStep === 2 ? "text-black scale-105" : "text-neutral-400 hover:text-neutral-700"
            }`}
          >
            ACT
          </button>
        </div>
      </div>
    </section>
  );
}

export default HowMelloWorks;
