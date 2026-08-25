"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  Trash2, 
  Plus, 
  Search,
  Sparkles
} from "lucide-react";

interface DictionaryItem {
  id: string;
  term: string;
  phonetic: string;
  tag: string;
}

interface SnippetItem {
  id: string;
  trigger: string;
  expansion: string;
  tag: string;
}

const INITIAL_DICTIONARY: DictionaryItem[] = [
  { id: "nexagrid", term: "NexaGrid", phonetic: "Sounds like: nex-a-grid", tag: "Personal" },
  { id: "oauth", term: "OAuth", phonetic: "Sounds like: oh-auth", tag: "Personal" },
  { id: "fastapi", term: "FastAPI", phonetic: "Sounds like: fast A-P-I", tag: "Personal" },
];

const INITIAL_SNIPPETS: SnippetItem[] = [
  { id: "intro", trigger: "/intro", expansion: "Hi, I'm with the Mello product team.", tag: "Personal" },
  { id: "review", trigger: "/review", expansion: "Thanks. I've reviewed this and left a few focused notes.", tag: "Personal" },
  { id: "signature", trigger: "/signature", expansion: "Best, The Product Team", tag: "Personal" },
];

export function YourMello() {
  const reduceMotion = useReducedMotion();
  const [dictionary, setDictionary] = useState<DictionaryItem[]>(INITIAL_DICTIONARY);
  const [snippets, setSnippets] = useState<SnippetItem[]>(INITIAL_SNIPPETS);

  const [dictSearch, setDictSearch] = useState("");
  const [snippetSearch, setSnippetSearch] = useState("");

  const [showAddWord, setShowAddWord] = useState(false);
  const [newWordTerm, setNewWordTerm] = useState("");
  const [newWordPhonetic, setNewWordPhonetic] = useState("");

  const [showAddSnippet, setShowAddSnippet] = useState(false);
  const [newSnippetTrigger, setNewSnippetTrigger] = useState("");
  const [newSnippetExpansion, setNewSnippetExpansion] = useState("");

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWordTerm) return;
    setDictionary([
      ...dictionary,
      {
        id: Date.now().toString(),
        term: newWordTerm,
        phonetic: newWordPhonetic ? `Sounds like: ${newWordPhonetic}` : "Sounds like: as written",
        tag: "Personal",
      },
    ]);
    setNewWordTerm("");
    setNewWordPhonetic("");
    setShowAddWord(false);
  };

  const handleAddSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSnippetTrigger || !newSnippetExpansion) return;
    setSnippets([
      ...snippets,
      {
        id: Date.now().toString(),
        trigger: newSnippetTrigger.startsWith("/") ? newSnippetTrigger : `/${newSnippetTrigger}`,
        expansion: newSnippetExpansion,
        tag: "Personal",
      },
    ]);
    setNewSnippetTrigger("");
    setNewSnippetExpansion("");
    setShowAddSnippet(false);
  };

  const handleDeleteWord = (id: string) => {
    setDictionary(dictionary.filter((item) => item.id !== id));
  };

  const handleDeleteSnippet = (id: string) => {
    setSnippets(snippets.filter((item) => item.id !== id));
  };

  const filteredDict = dictionary.filter(
    (item) =>
      item.term.toLowerCase().includes(dictSearch.toLowerCase()) ||
      item.phonetic.toLowerCase().includes(dictSearch.toLowerCase())
  );

  const filteredSnippets = snippets.filter(
    (item) =>
      item.trigger.toLowerCase().includes(snippetSearch.toLowerCase()) ||
      item.expansion.toLowerCase().includes(snippetSearch.toLowerCase())
  );

  return (
    <section id="personalize" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7] text-black border-b border-neutral-200/80 overflow-hidden">
      <div id="personalization" className="scroll-mt-24" />
      <div id="your-mello" className="scroll-mt-24" />
      <div className="max-w-5xl lg:max-w-6xl mx-auto text-left">
        {/* Section Header with Scroll-In */}
        <motion.div 
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-left max-w-4xl mb-8 sm:mb-12"
        >
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-black mb-3 select-none">
            06 · PERSONALIZATION
          </p>
          <h2
            className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-black leading-[1.12] max-w-3xl"
            style={{ letterSpacing: "-0.035em" }}
          >
            Make Mello sound like you.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal max-w-2xl">
            Teach Mello how names, acronyms, and technical terms should be understood. Snippets turn a short trigger into a complete phrase you can reuse.
          </p>
        </motion.div>

        {/* Perfectly Aligned 2-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          
          {/* COLUMN 1: DICTIONARY */}
          <div className="flex flex-col space-y-6 sm:space-y-7">
            {/* Top Dictionary Summary Card with Scroll Entrance & Hover Lift */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { 
                y: -5, 
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.07)",
                borderColor: "rgba(0,0,0,0.18)" 
              }}
              className="rounded-[24px] border border-neutral-200/90 bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[135px] transition-colors relative overflow-hidden group cursor-default"
            >
              {/* Subtle light ambient sweep on card hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-100/50 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  DICTIONARY
                </span>
                <span className="w-2 h-2 rounded-full bg-black/40 animate-pulse" />
              </div>
              <div className="my-1.5 relative z-10">
                <span className="text-2xl sm:text-[26px] font-extrabold text-black tracking-tight group-hover:tracking-normal transition-all">
                  “NexaGrid”
                </span>
              </div>
              <span className="text-xs sm:text-[13px] font-mono text-neutral-500 mt-1 relative z-10">
                corrected → saved → recognised next time
              </span>
            </motion.div>

            {/* Bottom Dictionary App Panel */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { 
                y: -6, 
                boxShadow: "0 26px 50px -15px rgba(0,0,0,0.08)",
                borderColor: "rgba(0,0,0,0.18)" 
              }}
              className="rounded-[30px] border border-neutral-200/90 bg-white p-7 sm:p-9 lg:p-10 flex-1 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative min-h-[420px] transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-6 sm:mb-7">
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.08, rotate: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-12 h-12 rounded-2xl bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center text-black shrink-0 shadow-2xs cursor-default"
                    >
                      <BookOpen size={20} />
                    </motion.div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 block mb-0.5">
                        PERSONALIZATION
                      </span>
                      <h3 className="text-2xl sm:text-[26px] font-extrabold text-black tracking-tight leading-tight">
                        Dictionary
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-snug">
                        Names, acronyms, and technical terms with pronunciation.
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowAddWord(!showAddWord)}
                    className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-900 transition-all flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add word</span>
                  </motion.button>
                </div>

                {/* Add Word Form with Smooth Height Animation */}
                <AnimatePresence>
                  {showAddWord && (
                    <motion.form 
                      initial={{ opacity: 0, height: 0, scale: 0.96 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      onSubmit={handleAddWord} 
                      className="mb-5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5 overflow-hidden"
                    >
                      <input
                        type="text"
                        required
                        value={newWordTerm}
                        onChange={(e) => setNewWordTerm(e.target.value)}
                        placeholder="Word (e.g. NexaGrid)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                      />
                      <input
                        type="text"
                        value={newWordPhonetic}
                        onChange={(e) => setNewWordPhonetic(e.target.value)}
                        placeholder="Phonetic (e.g. nex-a-grid)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                      />
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddWord(false)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-neutral-600 hover:bg-neutral-200 cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-900 cursor-pointer shadow-2xs transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Search Bar with focus animation */}
                <div className="relative mb-6 group">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" />
                  <input
                    type="text"
                    value={dictSearch}
                    onChange={(e) => setDictSearch(e.target.value)}
                    placeholder="Search dictionary..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200/90 bg-white text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black shadow-2xs transition-all"
                  />
                </div>

                {/* Items List with Staggered Entrance and Micro-interactions */}
                <div className="space-y-3 sm:space-y-3.5">
                  <AnimatePresence>
                    {filteredDict.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92, height: 0 }}
                        whileHover={{ scale: 1.015, x: 3 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 sm:p-4.5 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-300 shadow-2xs flex items-center justify-between gap-3 transition-colors cursor-default"
                      >
                        <div>
                          <span className="text-[15px] sm:text-base font-bold text-black block">
                            {item.term}
                          </span>
                          <span className="text-xs sm:text-[13px] text-neutral-500 block mt-0.5">
                            {item.phonetic}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] sm:text-[11px] font-mono">
                            {item.tag}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.25, rotate: 6 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => handleDeleteWord(item.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                            aria-label={`Delete ${item.term}`}
                          >
                            <Trash2 size={15} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMN 2: SNIPPETS */}
          <div className="flex flex-col space-y-6 sm:space-y-7">
            {/* Top Snippet Summary Card with Scroll Entrance & Hover Lift */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { 
                y: -5, 
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.07)",
                borderColor: "rgba(0,0,0,0.18)" 
              }}
              className="rounded-[24px] border border-neutral-200/90 bg-white p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[135px] transition-colors relative overflow-hidden group cursor-default"
            >
              {/* Subtle light ambient sweep on card hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-100/50 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  SNIPPET
                </span>
                <span className="w-2 h-2 rounded-full bg-black/40 animate-pulse" />
              </div>
              <div className="my-1.5 relative z-10">
                <span className="text-2xl sm:text-[26px] font-extrabold text-black tracking-tight group-hover:tracking-normal transition-all">
                  Say “intro”
                </span>
              </div>
              <span className="text-xs sm:text-[13px] font-mono text-neutral-500 mt-1 relative z-10">
                expands → “Hi, I&apos;m with the product team...”
              </span>
            </motion.div>

            {/* Bottom Snippets App Panel */}
            <motion.div 
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { 
                y: -6, 
                boxShadow: "0 26px 50px -15px rgba(0,0,0,0.08)",
                borderColor: "rgba(0,0,0,0.18)" 
              }}
              className="rounded-[30px] border border-neutral-200/90 bg-white p-7 sm:p-9 lg:p-10 flex-1 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative min-h-[420px] transition-colors"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-6 sm:mb-7">
                  <div className="flex items-start gap-3.5 sm:gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.08, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="w-12 h-12 rounded-2xl bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center text-black shrink-0 shadow-2xs cursor-default"
                    >
                      <FileText size={20} />
                    </motion.div>
                    <div>
                      <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 block mb-0.5">
                        PERSONALIZATION
                      </span>
                      <h3 className="text-2xl sm:text-[26px] font-extrabold text-black tracking-tight leading-tight">
                        Snippets
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-snug">
                        Reusable phrases ready when you say their trigger.
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowAddSnippet(!showAddSnippet)}
                    className="px-4 py-2 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-900 transition-all flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add snippet</span>
                  </motion.button>
                </div>

                {/* Add Snippet Form with Smooth Height Animation */}
                <AnimatePresence>
                  {showAddSnippet && (
                    <motion.form 
                      initial={{ opacity: 0, height: 0, scale: 0.96 }}
                      animate={{ opacity: 1, height: "auto", scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      onSubmit={handleAddSnippet} 
                      className="mb-5 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5 overflow-hidden"
                    >
                      <input
                        type="text"
                        required
                        value={newSnippetTrigger}
                        onChange={(e) => setNewSnippetTrigger(e.target.value)}
                        placeholder="Trigger (e.g. /intro)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                      />
                      <input
                        type="text"
                        required
                        value={newSnippetExpansion}
                        onChange={(e) => setNewSnippetExpansion(e.target.value)}
                        placeholder="Expansion (e.g. Hi, I'm with the team.)"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-white text-xs sm:text-sm text-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                      />
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAddSnippet(false)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-neutral-600 hover:bg-neutral-200 cursor-pointer transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-900 cursor-pointer shadow-2xs transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Search Bar with focus animation */}
                <div className="relative mb-6 group">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-black transition-colors" />
                  <input
                    type="text"
                    value={snippetSearch}
                    onChange={(e) => setSnippetSearch(e.target.value)}
                    placeholder="Search snippets..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-neutral-200/90 bg-white text-xs sm:text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black shadow-2xs transition-all"
                  />
                </div>

                {/* Items List with Staggered Entrance and Micro-interactions */}
                <div className="space-y-3 sm:space-y-3.5">
                  <AnimatePresence>
                    {filteredSnippets.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92, height: 0 }}
                        whileHover={{ scale: 1.015, x: 3 }}
                        transition={{ duration: 0.2 }}
                        className="p-4 sm:p-4.5 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-300 shadow-2xs flex items-center justify-between gap-3 transition-colors cursor-default"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <span className="text-[15px] sm:text-base font-mono font-bold text-black block">
                            {item.trigger}
                          </span>
                          <p className="text-xs sm:text-[13px] text-neutral-500 truncate leading-snug mt-0.5">
                            {item.expansion}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] sm:text-[11px] font-mono">
                            {item.tag}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.25, rotate: -6 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => handleDeleteSnippet(item.id)}
                            className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                            aria-label={`Delete ${item.trigger}`}
                          >
                            <Trash2 size={15} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default YourMello;

