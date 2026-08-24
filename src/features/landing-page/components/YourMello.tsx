"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  FileText, 
  Trash2, 
  Plus, 
  Search
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
  { id: "fastapi", term: "FastAPI", phonetic: "Sounds like: fast A-P-I", tag: "Personal" },
  { id: "oauth", term: "OAuth 2.0", phonetic: "Sounds like: oh-auth two point oh", tag: "Personal" },
];

const INITIAL_SNIPPETS: SnippetItem[] = [
  { id: "intro", trigger: "/intro", expansion: "Hi, I'm with the Mello product team.", tag: "Personal" },
  { id: "standup", trigger: "/standup", expansion: "Shipped v2 beta. Today: architecture review.", tag: "Personal" },
  { id: "feedback", trigger: "/feedback", expansion: "Thanks for the notes! Applying edits now.", tag: "Personal" },
];

export function YourMello() {
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
    <section id="personalize" className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-[#F7F7F7] text-black border-b border-neutral-200/80">
      <div id="personalization" className="scroll-mt-24" />
      <div id="your-mello" className="scroll-mt-24" />
      <div className="max-w-4xl mx-auto text-left">
        {/* Section Header */}
        <div className="text-left max-w-4xl mb-8 sm:mb-10">
          <p className="eyebrow text-xs font-mono font-bold tracking-[0.2em] uppercase text-neutral-400 mb-3 select-none">
            06 · PERSONALIZATION
          </p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-black leading-tight">
            Make Mello sound like you.
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal">
            Teach Mello how names, acronyms, and technical terms should be understood. Snippets turn a short trigger into a complete phrase you can reuse.
          </p>
        </div>

        {/* Top 2 Callout Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
          {/* Card 1: Dictionary Summary */}
          <div className="rounded-[22px] border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 mb-2">
              DICTIONARY
            </span>
            <div className="my-1.5">
              <span className="text-xl sm:text-[22px] font-bold text-black tracking-tight">
                “NexaGrid”
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 mt-1">
              corrected → saved → recognised next time
            </span>
          </div>

          {/* Card 2: Snippet Summary */}
          <div className="rounded-[22px] border border-neutral-200/90 bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 mb-2">
              SNIPPET
            </span>
            <div className="my-1.5">
              <span className="text-xl sm:text-[22px] font-bold text-black tracking-tight">
                Say “intro”
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500 mt-1">
              expands → “Hi, I&apos;m with the product team...”
            </span>
          </div>
        </div>

        {/* Bottom 2 Interactive App Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Panel 1: Dictionary */}
          <div className="rounded-[28px] border border-neutral-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center text-black shrink-0 shadow-2xs">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 block mb-0.5">
                      PERSONALIZATION
                    </span>
                    <h3 className="text-[22px] font-bold text-black tracking-tight leading-tight">
                      Dictionary
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-snug">
                      Names, acronyms, and technical terms with pronunciation.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddWord(!showAddWord)}
                  className="px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-900 transition-all flex items-center gap-1 shrink-0 shadow-2xs cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add word</span>
                </button>
              </div>

              {/* Add Word Form */}
              {showAddWord && (
                <form onSubmit={handleAddWord} className="mb-4 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <input
                    type="text"
                    required
                    value={newWordTerm}
                    onChange={(e) => setNewWordTerm(e.target.value)}
                    placeholder="Word (e.g. NexaGrid)"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <input
                    type="text"
                    value={newWordPhonetic}
                    onChange={(e) => setNewWordPhonetic(e.target.value)}
                    placeholder="Phonetic (e.g. nex-a-grid)"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddWord(false)}
                      className="px-3 py-1 rounded-lg text-xs text-neutral-600 hover:bg-neutral-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-lg bg-black text-white text-xs font-semibold hover:bg-neutral-900 cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}

              {/* Search Bar */}
              <div className="relative mb-5">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={dictSearch}
                  onChange={(e) => setDictSearch(e.target.value)}
                  placeholder="Search dictionary..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200/90 bg-white text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black shadow-2xs"
                />
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {filteredDict.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-100 shadow-2xs flex items-center justify-between gap-3 hover:border-neutral-200 transition-all"
                  >
                    <div>
                      <span className="text-sm font-bold text-black block">
                        {item.term}
                      </span>
                      <span className="text-xs text-neutral-500 block mt-0.5">
                        {item.phonetic}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] font-mono">
                        {item.tag}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteWord(item.id)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label={`Delete ${item.term}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 2: Snippets */}
          <div className="rounded-[28px] border border-neutral-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative">
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-neutral-100/90 border border-neutral-200/80 flex items-center justify-center text-black shrink-0 shadow-2xs">
                    <FileText size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.16em] text-neutral-400 block mb-0.5">
                      PERSONALIZATION
                    </span>
                    <h3 className="text-[22px] font-bold text-black tracking-tight leading-tight">
                      Snippets
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1 leading-snug">
                      Reusable phrases ready when you say their trigger.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddSnippet(!showAddSnippet)}
                  className="px-3.5 py-1.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-neutral-900 transition-all flex items-center gap-1 shrink-0 shadow-2xs cursor-pointer"
                >
                  <Plus size={13} />
                  <span>Add snippet</span>
                </button>
              </div>

              {/* Add Snippet Form */}
              {showAddSnippet && (
                <form onSubmit={handleAddSnippet} className="mb-4 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                  <input
                    type="text"
                    required
                    value={newSnippetTrigger}
                    onChange={(e) => setNewSnippetTrigger(e.target.value)}
                    placeholder="Trigger (e.g. /intro)"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <input
                    type="text"
                    required
                    value={newSnippetExpansion}
                    onChange={(e) => setNewSnippetExpansion(e.target.value)}
                    placeholder="Expansion (e.g. Hi, I'm with the team.)"
                    className="w-full px-3 py-2 rounded-lg border border-neutral-200 bg-white text-xs text-black focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAddSnippet(false)}
                      className="px-3 py-1 rounded-lg text-xs text-neutral-600 hover:bg-neutral-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-lg bg-black text-white text-xs font-semibold hover:bg-neutral-900 cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}

              {/* Search Bar */}
              <div className="relative mb-5">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={snippetSearch}
                  onChange={(e) => setSnippetSearch(e.target.value)}
                  placeholder="Search snippets..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200/90 bg-white text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-black shadow-2xs"
                />
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {filteredSnippets.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white border border-neutral-100 shadow-2xs flex items-center justify-between gap-3 hover:border-neutral-200 transition-all"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="text-sm font-mono font-bold text-black block">
                        {item.trigger}
                      </span>
                      <p className="text-xs text-neutral-500 truncate leading-snug mt-0.5">
                        {item.expansion}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] font-mono">
                        {item.tag}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteSnippet(item.id)}
                        className="p-1 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                        aria-label={`Delete ${item.trigger}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default YourMello;
