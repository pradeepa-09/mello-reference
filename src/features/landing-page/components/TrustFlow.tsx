"use client";

import React, { useRef } from "react";
import { useScroll } from "framer-motion";
import { ActionCardStackDemo } from "./ActionCardStackDemo";

export function TrustFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const handleSelectIndex = (index: number) => {
    if (!sectionRef.current) return;
    const top = sectionRef.current.offsetTop;
    const height = sectionRef.current.offsetHeight;
    const targetScroll = top + (index / 2.5) * (height - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="trust-flow"
      className="relative bg-white text-black border-b border-neutral-200 min-h-[230vh] sm:min-h-[250vh]"
    >
      <div id="actions" className="scroll-mt-24" />
      <div id="beam" className="scroll-mt-24" />

      {/* Sticky Fullscreen Presentation Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-4 sm:px-6">
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-neutral-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          {/* Section Header */}
          <div className="text-left w-full max-w-4xl mb-4 sm:mb-6">
            <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black mb-3 select-none">
              02 · CONNECTED ACTIONS &amp; APPROVAL
            </p>
            <h2
              className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-black leading-[1.12] max-w-3xl"
              style={{ letterSpacing: "-0.035em" }}
            >
              Every action follows the same approval flow.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-3 leading-relaxed font-normal max-w-2xl">
              Mello currently supports Actions across Gmail, Google Calendar, and GitHub. Speak naturally, review the resolved details, and approve before anything is created or sent.
            </p>
          </div>

          {/* Interactive On-Scroll 3D Card Stack */}
          <div className="w-full flex justify-center">
            <ActionCardStackDemo
              scrollYProgress={scrollYProgress}
              onSelectIndex={handleSelectIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustFlow;
