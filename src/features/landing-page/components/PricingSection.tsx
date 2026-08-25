"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export function PricingSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7] text-black border-b border-neutral-200/80 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header with Scroll-In */}
        <motion.div 
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-left max-w-4xl mb-8 sm:mb-12"
        >
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black mb-3 select-none">
            07 · PRICING
          </p>
          <h2
            className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-black leading-[1.12] max-w-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            Transparent, simple pricing.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal max-w-2xl">
            Free during private beta. Simple rates when we launch.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Private Beta */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { 
              y: -6, 
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.08)",
              borderColor: "rgba(0,0,0,0.2)" 
            }}
            className="rounded-[28px] border border-neutral-200/90 bg-white p-8 sm:p-9 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative text-left transition-colors cursor-default"
          >
            <div>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 mb-2">
                BETA PLAN
              </p>
              <h3 className="text-[22px] font-bold text-black tracking-tight mb-2.5">
                Private Beta
              </h3>
              <p className="text-neutral-500 text-[13px] leading-relaxed mb-8 min-h-[38px]">
                Access during our invite only beta period.
              </p>
              <div className="flex items-start gap-1 mb-8">
                <span className="text-sm font-bold font-mono text-black mt-1">$</span>
                <span className="text-[44px] font-extrabold font-mono tracking-tight text-black leading-none">
                  0
                </span>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#waitlist"
              className="w-full py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-semibold hover:bg-neutral-900 transition-all text-center block shadow-2xs cursor-pointer"
            >
              Request beta access
            </motion.a>
          </motion.div>

          {/* Card 2: Mello Pro */}
          <motion.div 
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { 
              y: -6, 
              boxShadow: "0 24px 48px -12px rgba(0,0,0,0.08)",
              borderColor: "rgba(0,0,0,0.2)" 
            }}
            className="rounded-[28px] border border-neutral-200/90 bg-white p-8 sm:p-9 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative overflow-hidden text-left transition-colors cursor-default group"
          >
            {/* Top-Right UPCOMING Corner Tag */}
            <span className="absolute top-0 right-0 px-4 py-1.5 rounded-tr-[28px] rounded-bl-xl bg-black text-white text-[9px] font-mono uppercase tracking-[0.15em] font-bold select-none">
              UPCOMING
            </span>

            <div>
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 mb-2">
                PRO PLAN
              </p>
              <h3 className="text-[22px] font-bold text-black tracking-tight mb-2.5">
                Mello Pro
              </h3>
              <p className="text-neutral-500 text-[13px] leading-relaxed mb-8 min-h-[38px]">
                Unlimited actions, high-frequency synchronization, and custom personalization.
              </p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-sm font-bold font-mono text-black self-start mt-1">$</span>
                <span className="text-[44px] font-extrabold font-mono tracking-tight text-black leading-none">
                  10
                </span>
                <span className="text-xs font-mono text-neutral-500 ml-1">/month</span>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="w-full py-3.5 rounded-xl bg-[#737373] text-white text-xs sm:text-sm font-semibold cursor-not-allowed opacity-90 transition-all text-center block"
            >
              Coming soon
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
