"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: string;
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    id: "01",
    q: "What is the difference between Dictation and Actions?",
    a: "Dictation turns speech into text in the active text field. Actions interpret a request, resolve its details, show a plan, and only perform it after your approval.",
  },
  {
    id: "02",
    q: "Which applications does Mello support?",
    a: "Actions currently support Gmail, Google Calendar, and GitHub. Dictation works anywhere you can type.",
  },
  {
    id: "03",
    q: "Can I customise the shortcut?",
    a: "Yes, you can configure custom global hotkeys for instant dictation and voice actions from the Mello preferences menu.",
  },
  {
    id: "04",
    q: "Does Mello listen continuously?",
    a: "No. Mello only captures audio when you hold or toggle your hotkey. It never records in the background without explicit invocation.",
  },
  {
    id: "05",
    q: "Does Mello act without confirmation?",
    a: "Never. Every multi-step action shows a clear review plan with parsed details. Nothing executes until you click or approve.",
  },
  {
    id: "06",
    q: "Can I edit or cancel a plan?",
    a: "Yes. You can edit any parameter (recipient, date, time, issue title) or dismiss the plan entirely with a single keystroke or click.",
  },
  {
    id: "07",
    q: "Can I review or delete memory?",
    a: "Yes. Your personal memory vault and custom dictionary are stored locally on your device. You can view, edit, or purge entries anytime.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 sm:py-18 px-4 max-w-5xl mx-auto border-b border-neutral-200 bg-white text-black">
      <div className="max-w-3xl mx-auto text-left mb-8 sm:mb-10">
        <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black mb-3 select-none">
          08 · FAQ
        </p>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-3.5 max-w-3xl mx-auto">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-black bg-white shadow-md ring-1 ring-black/5"
                  : "border-neutral-200 bg-white hover:border-neutral-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  {/* Numbered Circle: Black when open, Light Gray when closed */}
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                      isOpen
                        ? "bg-black text-white"
                        : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {faq.id}
                  </span>

                  {/* Question Title */}
                  <span className="text-sm sm:text-base font-bold text-black tracking-tight leading-snug">
                    {faq.q}
                  </span>
                </div>

                {/* Right Arrow / Chevron Circle */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    isOpen
                      ? "bg-black text-white"
                      : "bg-neutral-50 border border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : "text-neutral-700"
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                      {/* Inner Box with Solid Black Left Border Bar (Matching Image 1) */}
                      <div className="border-l-[3px] border-black bg-neutral-100/80 p-4 sm:p-5 rounded-r-xl rounded-l-xs text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQSection;
