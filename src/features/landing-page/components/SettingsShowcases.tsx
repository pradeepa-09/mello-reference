"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BookOpen, CalendarDays, ChevronRight, FileText, Github, Mail, Moon, Plug, Search, Sun, Trash2, UserRound } from "lucide-react";

const snippetRows = [
  { name: "/intro", value: "Hi, I'm with the Mello product team." },
  { name: "/review", value: "Thanks. I've reviewed this and left a few focused notes." },
  { name: "/signature", value: "Best,\nThe Product Team" },
];

const dictionaryRows = [
  { name: "NexaGrid", value: "Sounds like: nex-a-grid" },
  { name: "OAuth", value: "Sounds like: oh-auth" },
  { name: "Mello", value: "Sounds like: mellow" },
];

const connectors = [
  { name: "Gmail", Icon: Mail, color: "text-white", status: "Connected" },
  { name: "Calendar", Icon: CalendarDays, color: "text-white", status: "Connected" },
  { name: "GitHub", Icon: Github, color: "text-white", status: "Connected" },
];

const TABS = ["Snippets & Dictionary", "Connectors", "Appearance"] as const;
type Tab = (typeof TABS)[number];

function SettingsPreviewShell({ isLight, children }: { isLight: boolean; children: React.ReactNode }) {
  return (
    <div className={`settings-app settings-preview-shell rounded-2xl overflow-hidden border ${isLight ? "is-light border-neutral-300" : "border-neutral-800"}`}>
      <div className="settings-titlebar">
        <i /><i /><i /><strong>Mello</strong>
      </div>
      <div className="settings-frame !block !min-h-0">{children}</div>
    </div>
  );
}

export function PersonalizationAppShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<Tab>("Snippets & Dictionary");
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveTab((current) => {
        const idx = TABS.indexOf(current);
        return TABS[(idx + 1) % TABS.length];
      });
    }, 4000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const cardBg = isLight ? "bg-white border-neutral-300 text-neutral-900 shadow-sm" : "bg-neutral-900/50 border-neutral-800 text-white";
  const titleText = isLight ? "text-neutral-900" : "text-white";
  const subText = isLight ? "text-neutral-600" : "text-neutral-400";
  const iconColor = isLight ? "text-neutral-900" : "text-white";
  const iconBoxBg = isLight ? "bg-neutral-100 text-neutral-900 border border-neutral-300" : "bg-neutral-800 text-white border border-neutral-700";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === tab
                ? "bg-white text-black border-white"
                : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
        >
          {activeTab === "Snippets & Dictionary" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SettingsPreviewShell isLight={isLight}>
                <div className="settings-main p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={16} className={iconColor} />
                    <strong className={`text-sm ${titleText}`}>Dictionary</strong>
                  </div>
                  <div className="space-y-2">
                    {dictionaryRows.map((row) => (
                      <div key={row.name} className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${cardBg}`}>
                        <div>
                          <strong className={`block ${titleText}`}>{row.name}</strong>
                          <small className={subText}>{row.value}</small>
                        </div>
                        <button type="button" aria-label={`Delete ${row.name}`} className={`${subText} hover:text-neutral-900`}>
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </SettingsPreviewShell>
              <SettingsPreviewShell isLight={isLight}>
                <div className="settings-main p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText size={16} className={iconColor} />
                    <strong className={`text-sm ${titleText}`}>Snippets</strong>
                  </div>
                  <div className="space-y-2">
                    {snippetRows.map((row) => (
                      <div key={row.name} className={`p-2.5 rounded-lg border text-xs ${cardBg}`}>
                        <strong className={`block ${titleText}`}>{row.name}</strong>
                        <small className={`${subText} whitespace-pre-wrap`}>{row.value}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </SettingsPreviewShell>
            </div>
          )}

          {activeTab === "Connectors" && (
            <SettingsPreviewShell isLight={isLight}>
              <div className="settings-main p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Plug size={16} className={iconColor} />
                  <strong className={`text-sm ${titleText}`}>Connected apps</strong>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {connectors.map(({ name, Icon, status }) => (
                    <div key={name} className={`flex items-center gap-3 p-4 rounded-xl border ${cardBg}`}>
                      <span className={`p-2 rounded-lg ${iconBoxBg}`}>
                        <Icon size={18} />
                      </span>
                      <div>
                        <strong className={`text-sm block ${titleText}`}>{name}</strong>
                        <small className={`${subText} text-[10px] font-bold uppercase`}>{status}</small>
                      </div>
                      <ChevronRight size={14} className={`ml-auto ${subText}`} />
                    </div>
                  ))}
                </div>
              </div>
            </SettingsPreviewShell>
          )}

          {activeTab === "Appearance" && (
            <SettingsPreviewShell isLight={isLight}>
              <div className="settings-main p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <strong className={`text-sm block ${titleText}`}>Theme</strong>
                    <small className={`${subText} text-xs`}>Preview light and dark mode</small>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLight((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isLight
                        ? "bg-neutral-900 text-white border-neutral-800 hover:bg-neutral-800"
                        : "bg-white text-black border-white hover:bg-neutral-200"
                    }`}
                  >
                    {isLight ? <Sun size={14} /> : <Moon size={14} />}
                    {isLight ? "Switch to Dark" : "Switch to Light"}
                  </button>
                </div>
                <div className={`p-4 rounded-xl border border-dashed text-xs ${isLight ? "border-neutral-300 text-neutral-800 bg-white" : "border-neutral-700 text-neutral-300 bg-neutral-950/60"}`}>
                  <label className="flex items-center gap-2 mb-3">
                    <Search size={14} className={iconColor} />
                    <span className={titleText}>Search settings…</span>
                    <kbd className={`ml-auto px-1.5 py-0.5 rounded text-[10px] ${isLight ? "bg-neutral-200 text-neutral-800 font-bold" : "bg-neutral-800 text-neutral-200"}`}>⌘ K</kbd>
                  </label>
                  <div className="flex items-center gap-2">
                    <UserRound size={14} className={iconColor} />
                    <span className={subText}>Demo Workspace · team@mello.ai</span>
                  </div>
                </div>
              </div>
            </SettingsPreviewShell>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const MEMORY_CATEGORY_NAMES = ["Facts", "Preferences", "People", "Team"] as const;

export function MemoryAppShowcase() {
  const [active, setActive] = useState("Facts");
  const reduceMotion = useReducedMotion();
  const categories = [
    { name: "Facts", hint: "Stable details", Icon: BookOpen, items: [
      { title: "Northstar is the active workspace", detail: "Use it for product and release requests.", meta: "Confirmed by you · Jul 12" },
      { title: "Product Review is the default calendar", detail: "Schedule design reviews and team syncs here.", meta: "Confirmed by you · Jul 15" },
    ] },
    { name: "Preferences", hint: "How you work", Icon: FileText, items: [
      { title: "Keep status emails concise", detail: "Use three short paragraphs or fewer.", meta: "Set by you · Jul 18" },
      { title: "Ask before creating anything", detail: "Show the complete action for approval first.", meta: "Set by you · Jul 19" },
    ] },
    { name: "People", hint: "Confirmed contacts", Icon: UserRound, items: [
      { title: "Elena Brooks", detail: "Design lead · elena@northstar.co", meta: "Confirmed contact · Jul 24" },
      { title: "Maya Chen", detail: "Product manager · maya@northstar.co", meta: "Confirmed contact · Jul 21" },
    ] },
    { name: "Team", hint: "Working groups", Icon: Plug, items: [
      { title: "Product and Design", detail: "Product managers, researchers, and designers.", meta: "Work context · Jul 08" },
      { title: "Desktop engineering", detail: "Developers working on the Mello desktop app.", meta: "Work context · Jul 14" },
    ] },
  ];
  
  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const currentIndex = MEMORY_CATEGORY_NAMES.indexOf(current as (typeof MEMORY_CATEGORY_NAMES)[number]);
        return MEMORY_CATEGORY_NAMES[(currentIndex + 1) % MEMORY_CATEGORY_NAMES.length];
      });
    }, 4800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const selected = categories.find((category) => category.name === active) ?? categories[0];
  
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto relative">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-[3rem]" />

      {/* Tabs */}
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-2 p-2 bg-neutral-900/60 backdrop-blur-2xl rounded-2xl border border-white/5 shadow-xl" role="tablist" aria-label="Memory categories">
        {categories.map(({ name, hint, Icon }) => {
          const isActive = active === name;
          return (
            <button 
              key={name} 
              role="tab" 
              aria-selected={isActive} 
              onClick={() => setActive(name)}
              className="relative flex-1 flex items-center justify-between gap-3 px-4 py-3 min-w-[200px] text-left outline-none transition-colors group cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${isActive ? 'bg-white text-black' : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700 group-hover:text-white'}`}>
                  <Icon size={14} />
                </span>
                <div className="flex flex-col">
                  <strong className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>{name}</strong>
                  <small className={`text-[10px] font-medium transition-colors ${isActive ? 'text-neutral-300' : 'text-neutral-500 group-hover:text-neutral-400'}`}>{hint}</small>
                </div>
              </div>
              <ChevronRight size={16} className={`relative z-10 transition-transform ${isActive ? 'text-white translate-x-1' : 'text-neutral-600 group-hover:text-neutral-400'}`} />
            </button>
          );
        })}
      </div>
      
      {/* Active Panel */}
      <div className="relative bg-neutral-900/40 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden min-h-[300px]" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selected.name} 
            initial={{ opacity: 0, y: 15, scale: 0.98 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -10, scale: 0.98 }} 
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col h-full"
          >
            <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
              <div>
                <small className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block mb-1">{selected.name} · Saved Context</small>
                <strong className="text-xl font-bold text-white tracking-wide block">Remembered Details</strong>
              </div>
              <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] font-bold text-white tracking-widest uppercase shadow-inner">
                {selected.items.length} saved
              </span>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
              {selected.items.map((item, i) => (
                <motion.article 
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                  className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  
                  <div className="relative z-10 mb-6">
                    <strong className="text-sm font-bold text-white block mb-2 leading-snug">{item.title}</strong>
                    <p className="text-xs text-neutral-400 leading-relaxed">{item.detail}</p>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <small className="text-[9px] font-mono tracking-wider text-neutral-500 uppercase">{item.meta}</small>
                    <button 
                      aria-label={`Remove ${item.title}`}
                      className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-neutral-400 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 border border-transparent transition-all cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
