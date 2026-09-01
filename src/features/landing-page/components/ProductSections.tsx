"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Apple, CalendarDays, Check, CheckCircle2, ChevronDown, ChevronRight, Mail, RotateCcw, Sparkles, Mic } from "lucide-react";
import { Reveal } from "@/src/shared/components";
import { ConnectorShowcase } from "./ConnectorShowcase";
import { ActNotchDemo } from "./ActNotchDemo";
import { DictationStreamDemo } from "./DictationStreamDemo";
import { MemoryAppShowcase, PersonalizationAppShowcase } from "./SettingsShowcases";
import { MeetingModeAnimation } from "./MeetingModeAnimation";
import { MeetingModeLiveDemo } from "./MeetingModeLiveDemo";
import type { DownloadPlatform, LandingFaq, LandingPageViewModel, PricingPlan } from "../types";

export { AppEcosystemGrid } from "./AppEcosystemGrid";
export { ModeChooser } from "./ModeChooser";
export { ShortcutKeyCombos3D } from "./ShortcutKeyCombos3D";
export { TrustFlow } from "./TrustFlow";
export { MemorySection } from "./MemorySection";
export { YourMello } from "./YourMello";

const SectionHead = ({eyebrow, title, copy}:{eyebrow:string;title:string;copy:string}) => (
  <div className="text-center max-w-2xl mx-auto mb-12">
    <p className="eyebrow text-xs font-mono font-bold tracking-widest uppercase text-neutral-400 mb-2">{eyebrow}</p>
    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">{title}</h2>
    <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed font-normal">{copy}</p>
  </div>
);

const Price = ({amount, monthly=false}:{amount:string;monthly?:boolean}) => (
  <div className="mello-price flex items-baseline gap-1 mt-4">
    <span className="text-lg font-bold text-white">$</span>
    <strong className="text-4xl font-extrabold text-white">{amount}</strong>
    {monthly && <small className="text-xs text-neutral-400 font-medium">/month</small>}
  </div>
);

function WindowsIcon({ className = "w-4 h-4", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 12.5H10.5V19.5L3 18.5V12.5ZM11.5 4.2L21 2.5V11.5H11.5V4.2ZM11.5 12.5H21V21.5L11.5 19.8V12.5Z" />
    </svg>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "macOS") return <Apple size={44} className="text-neutral-200" />;
  return <WindowsIcon size={44} />;
}

export function DictationShowcase() {
  return (
    <section id="dictation" className="py-14 sm:py-20 bg-white text-black border-b border-neutral-200 overflow-hidden">
      <div className="wrap max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading and Text with Scroll Entrance */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 text-left flex flex-col justify-center"
          >
            <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black select-none mb-2.5">
              03 · DICTATION
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-black leading-[1.14]"
              style={{ letterSpacing: "-0.035em" }}
            >
              Fast, accurate dictation anywhere.
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-3 leading-relaxed font-normal max-w-md">
              Speak naturally and Mello turns your words into text in the active field across your desktop.
            </p>
          </motion.div>

          {/* Right Column: Dictation Streaming Window Card Demo with Scroll Entrance */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 w-full"
          >
            <DictationStreamDemo />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export function ConfirmGate() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState(reduceMotion ? 3 : 0);
  const [autoPlay, setAutoPlay] = useState(!reduceMotion);
  const [requestIdx, setRequestIdx] = useState(0);
  const [approved, setApproved] = useState(false);

  const sampleRequests = [
    {
      request: "“Email Elena the review notes and schedule tomorrow’s sync at 10 AM.”",
      entities: [
        ["Person", "Elena Brooks"],
        ["Date", "2 August 2026"],
        ["Time", "10:00 AM"],
        ["Account", "work@mello.ai"],
      ],
      plans: [
        "Draft email to Elena Brooks",
        "Attach design review notes",
        "Create calendar event for 10:00 AM",
      ],
      reviews: [
        { label: "EMAIL", name: "Elena Brooks", detail: "Review notes" },
        { label: "EVENT", name: "Design Review", detail: "10:00 AM" },
        { label: "ACCOUNT", name: "work@mello.ai", detail: "Gmail" },
      ]
    },
    {
      request: "“Create a GitHub issue for the payment timeout bug in backend repo.”",
      entities: [
        ["Service", "GitHub"],
        ["Repo", "mello-app/backend"],
        ["Issue", "Payment timeout bug"],
        ["Priority", "High"],
      ],
      plans: [
        "Connect to GitHub workspace",
        "Select mello-app/backend repository",
        "Draft issue title & apply priority label",
      ],
      reviews: [
        { label: "GITHUB", name: "mello-app/backend", detail: "Target Repo" },
        { label: "ISSUE", name: "Payment timeout bug", detail: "High priority" },
      ]
    }
  ];

  const currentReq = sampleRequests[requestIdx];

  useEffect(() => {
    if (reduceMotion) {
      setPhase(3);
      setAutoPlay(false);
      return;
    }
    if (!autoPlay) return;
    const durations = [1400, 2400, 3200, 4200];
    const timer = window.setTimeout(
      () => setPhase(value => (value === 3 ? 0 : value + 1)),
      durations[phase],
    );
    return () => window.clearTimeout(timer);
  }, [autoPlay, phase, reduceMotion]);

  const progress = ["Voice", "Parse", "Plan", "Review"];

  const selectPhase = (index: number) => {
    setAutoPlay(false);
    setPhase(index);
    setApproved(false);
  };

  const switchRequest = (idx: number) => {
    setRequestIdx(idx);
    setPhase(0);
    setApproved(false);
    setAutoPlay(false);
  };

  return (
    <section id="confirm" className="section dark py-20 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="wrap max-w-4xl mx-auto">
        <Reveal>
          <SectionHead 
            eyebrow="01 · Approval Gate" 
            title="Plan before action." 
            copy="Mello parses names, dates, and accounts first. Review once, then approve."
          />
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => switchRequest(0)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                requestIdx === 0 ? "bg-white text-black border-white shadow-md shadow-white/10" : "bg-neutral-900 text-neutral-400 border-neutral-800"
              }`}
            >
              📧 Email + Calendar Sync
            </button>
            <button
              type="button"
              onClick={() => switchRequest(1)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                requestIdx === 1 ? "bg-white text-black border-white shadow-md shadow-white/10" : "bg-neutral-900 text-neutral-400 border-neutral-800"
              }`}
            >
              🐛 GitHub Bug Issue
            </button>
          </div>
        </Reveal>

        <Reveal>
          <div className="approval-demo bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 shadow-2xl">
            {/* Step Nodes */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
              {progress.map((label, index) => (
                <button
                  type="button"
                  key={label}
                  onClick={() => selectPhase(index)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    index === phase
                      ? "bg-white text-black border-white shadow-md shadow-white/10 scale-105"
                      : index < phase
                      ? "bg-neutral-800 text-white border-neutral-700"
                      : "bg-neutral-950 text-neutral-500 border-neutral-800"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center text-[10px]">
                    {index < phase ? <Check size={11} className="text-white" /> : index + 1}
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="bg-neutral-950/80 p-4 rounded-2xl border border-neutral-800/80 mb-4">
              <small className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block mb-1">SPOKEN REQUEST</small>
              <p className="text-sm font-medium !text-white">{currentReq.request}</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${requestIdx}-${phase}`}
                initial={{opacity:0,y:10}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0,y:-10}}
                transition={{duration:.3}}
                className="approval-stage min-h-[140px]"
              >
                {phase === 0 && (
                  <div className="relative p-8 rounded-2xl bg-[#111] border border-neutral-800 text-center flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
                    {/* Ripple effects */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        animate={{ scale: [1, 2, 2.5], opacity: [0.3, 0.1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute w-20 h-20 rounded-full border border-neutral-500 bg-neutral-800/20"
                      />
                      <motion.div
                        animate={{ scale: [1, 2, 2.5], opacity: [0.3, 0.1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                        className="absolute w-20 h-20 rounded-full border border-neutral-500 bg-neutral-800/20"
                      />
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-4">
                      <Mic size={26} />
                    </div>
                    
                    <strong className="relative z-10 text-sm text-white font-bold tracking-wide">Listening & Recording Intent...</strong>
                    
                    <div className="relative z-10 flex items-end justify-center gap-1.5 mt-5 h-6">
                      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ height: ["20%", "100%", "20%"] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.1,
                          }}
                          className="w-1 bg-neutral-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {phase === 1 && (
                  <div className="space-y-2">
                    <small className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">PARSED ENTITIES</small>
                    <div className="grid grid-cols-2 gap-2">
                      {currentReq.entities.map(([label, value]) => (
                        <div key={label} className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 flex justify-between items-center text-xs">
                          <span className="text-neutral-400 font-mono">{label}</span>
                          <strong className="text-white font-bold">{value}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {phase === 2 && (
                  <div className="space-y-2">
                    <small className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">PLANNED ACTIONS</small>
                    <ol className="space-y-2">
                      {currentReq.plans.map((item, idx) => (
                        <li key={item} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs text-neutral-200">
                          <span className="w-6 h-6 rounded-full bg-white text-black font-bold flex items-center justify-center text-[10px]">{idx + 1}</span>
                          <span className="font-semibold">{item}</span>
                          <Check size={14} className="text-white ml-auto" />
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {phase === 3 && (
                  <div className="space-y-2">
                    <small className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block">FINAL DOSSIER REVIEW</small>
                    <div className="grid grid-cols-2 gap-2">
                      {currentReq.reviews.map((item) => (
                        <div key={item.label} className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs">
                          <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">{item.label}</span>
                          <strong className="text-white font-bold block mt-0.5">{item.name}</strong>
                          <span className="text-neutral-400 text-[10px] block">{item.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {approved && (
              <motion.div
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                className="mt-4 p-3 bg-neutral-800 border border-neutral-700 rounded-xl text-center flex items-center justify-center gap-2 text-white font-bold text-xs"
              >
                <CheckCircle2 size={18} className="text-white" />
                <span>Approved & Executed cleanly!</span>
              </motion.div>
            )}

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800">
              <button type="button" className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-semibold cursor-pointer" onClick={() => selectPhase(0)}>
                <RotateCcw size={12}/> Restart
              </button>
              {phase === 3 && !approved && (
                <button
                  type="button"
                  onClick={() => setApproved(true)}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs shadow-lg shadow-white/10 hover:bg-neutral-200 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Approve Workflow <ChevronRight size={15}/>
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ActionsShowcase() {
  const [showConnectors, setShowConnectors] = useState(false);

  return (
    <section id="actions" className="section dark py-20 bg-neutral-950 border-b border-neutral-900">
      <div className="wrap max-w-5xl mx-auto">
        <Reveal>
          <SectionHead
            eyebrow="03 · Act"
            title="Speak a command. Mello executes it."
            copy="Hover the notch, choose Act, and watch your words become a calendar event, email draft, or GitHub issue."
          />
        </Reveal>
        <Reveal>
          <ActNotchDemo />
        </Reveal>
        <Reveal>
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowConnectors((v) => !v)}
              className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider font-mono"
            >
              {showConnectors ? "Hide connector details" : "See all connectors →"}
            </button>
          </div>
          {showConnectors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 overflow-hidden"
            >
              <ConnectorShowcase />
            </motion.div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export { MeetingMode } from "@/components/sections/MeetingMode/MeetingModeSection";

export function MemoryShowcase(){
  return (
    <section id="memory" className="section dark py-20 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="wrap max-w-5xl mx-auto">
        <Reveal>
          <SectionHead
            eyebrow="05 · Smart Memory"
            title="Context that grows with you"
            copy="Mello remembers contacts, repositories, and preferences for zero friction."
          />
        </Reveal>
        <Reveal>
          <MemoryAppShowcase />
        </Reveal>
      </div>
    </section>
  );
}

export { SpeedMultiplier } from "./SpeedMultiplier";
export { SpeedMultiplier as SocialProof } from "./SpeedMultiplier";

export function PersonalizationShowcase() {
  return (
    <section id="personalization" className="section dark py-20 bg-neutral-900/60 text-white border-b border-neutral-900">
      <div className="wrap max-w-5xl mx-auto">
        <Reveal>
          <SectionHead
            eyebrow="05 · Settings"
            title="Snippets, connectors, and your style."
            copy="Personalize vocabulary, connect your apps, and switch appearance — all from one settings panel."
          />
        </Reveal>
        <Reveal>
          <PersonalizationAppShowcase />
        </Reveal>
      </div>
    </section>
  );
}

interface DownloadPricingProps {
  platforms: DownloadPlatform[];
  waitlist: LandingPageViewModel["waitlist"];
}

export function DownloadPricing({ platforms, waitlist }: DownloadPricingProps){
  return (
    <section id="download" className="section dark py-20 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="wrap max-w-4xl mx-auto">
        <Reveal>
          <SectionHead 
            eyebrow="08 · Beta Access" 
            title="Get Mello Desktop" 
            copy="Join our private beta waitlist for early access."
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {platforms.map((platform) => (
            <article key={platform.id} className="p-6 bg-neutral-900/90 border border-neutral-800 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <span className="mb-3 block"><PlatformIcon platform={platform.id} /></span>
                <small className="font-mono text-[10px] uppercase text-neutral-400 font-bold block mb-1">DESKTOP APP</small>
                <h3 className="text-xl font-bold text-white">{platform.label}</h3>
                <div className="flex gap-2 mt-2 mb-6">
                  <span className="px-2.5 py-1 bg-neutral-800 rounded-lg text-[10px] text-neutral-300 font-mono">
                    {platform.variants.join(" / ")}
                  </span>
                </div>
              </div>
              {waitlist.submitted[platform.id] ? (
                <div className="p-3 bg-neutral-800 border border-neutral-700 rounded-2xl text-center text-xs text-white font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 size={16}/> Waitlist Confirmed!
                </div>
              ) : (
                <form onSubmit={(event)=>{event.preventDefault();void waitlist.submit(platform.id);}} className="flex flex-col gap-3 w-full">
                  <input 
                    type="email" 
                    required 
                    value={waitlist.emails[platform.id]}
                    onChange={(event) => waitlist.setEmail(platform.id,event.target.value)}
                    placeholder={`Enter email for ${platform.label}`}
                    aria-label={`Email for ${platform.label} waitlist`}
                    className="px-4 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-white" 
                  />
                  <button type="submit" disabled={waitlist.submitting===platform.id} className="py-2.5 px-4 bg-white text-black font-bold rounded-xl text-xs hover:bg-neutral-200 transition-transform active:scale-95 cursor-pointer">
                    {waitlist.submitting===platform.id ? "Joining…" : `Join Waitlist`} <ChevronRight size={14} className="inline ml-1"/>
                  </button>
                </form>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingShowcase({ plans }: { plans: PricingPlan[] }) {
  return (
    <section id="pricing" className="section dark py-20 bg-neutral-900/60 text-white border-b border-neutral-900">
      <div className="wrap max-w-4xl mx-auto">
        <Reveal>
          <SectionHead eyebrow="09 · Pricing" title="Transparent & Simple" copy="Free during private beta." />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {plans.map((plan)=>(
            <div key={plan.id} className={`p-6 border ${plan.id==="pro"?"border-white bg-neutral-900":"border-neutral-800 bg-neutral-950/80"} rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl`}>
              {plan.badge && <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase font-mono">{plan.badge}</div>}
              <div>
                <small className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">{plan.eyebrow}</small>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-neutral-400 mt-2">{plan.description}</p>
                <Price amount={plan.amount} monthly={plan.interval==="month"} />
              </div>
              <a href={plan.cta.href} className={`mt-6 w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${plan.id==="pro"?"bg-white text-black hover:bg-neutral-200":"bg-neutral-800 text-white hover:bg-neutral-700"}`}>
                {plan.cta.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ({ faqs }: { faqs: LandingFaq[] }){
  const [open,setOpen]=useState(0);
  return (
    <section id="faq" className="section dark py-20 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="wrap max-w-3xl mx-auto">
        <Reveal>
          <SectionHead eyebrow="10 · FAQ" title="Frequently Asked Questions" copy="Everything you need to know about Mello." />
        </Reveal>
        <div className="space-y-3 mt-8">
          {faqs.map((faq,i)=>(
            <article className="border border-neutral-800 rounded-2xl bg-neutral-900/80 overflow-hidden" key={faq.id}>
              <h3>
                <button
                  aria-expanded={open===i}
                  onClick={()=>setOpen(open===i?-1:i)}
                  className="flex items-center justify-between w-full p-4 text-left font-bold text-sm text-white hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <small className="text-xs font-mono text-neutral-500 font-bold">{String(i+1).padStart(2,"0")}</small>
                    {faq.question}
                  </span>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${open===i?"rotate-180 text-white":""}`}/>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open===i && (
                  <motion.div
                    initial={{height:0,opacity:0}}
                    animate={{height:"auto",opacity:1}}
                    exit={{height:0,opacity:0}}
                    transition={{duration:.28}}
                  >
                    <p className="px-4 pb-4 text-xs text-neutral-300 leading-relaxed pl-10 border-t border-neutral-800/60 pt-3">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
