import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Mic, Sparkles, Check, CheckCircle2, ChevronRight, Target, Navigation } from "lucide-react";

type MeetingLine = {
  speaker: "You" | "Other";
  text: string;
  note?: {
    type: "Decision" | "Next step";
    title: string;
    detail: string;
  };
};

const LINES: MeetingLine[] = [
  { speaker: "You", text: "The desktop experience should stay at the center of this release." },
  { speaker: "Other", text: "The onboarding walkthrough is nearly ready for review.", note: { type: "Next step", title: "Finish onboarding walkthrough", detail: "Share the final version by Thursday." } },
  { speaker: "You", text: "Let's keep the launch focused on desktop before expanding the scope.", note: { type: "Decision", title: "Prioritize the desktop launch", detail: "Keep the first release focused and deliberate." } },
  { speaker: "Other", text: "That gives us enough time to polish the first-run experience." },
  { speaker: "You", text: "We need the final security review completed before release.", note: { type: "Next step", title: "Complete security review", detail: "Confirm the outcome before launch approval." } },
  { speaker: "Other", text: "I'll coordinate the review and post the result for the team." },
  { speaker: "You", text: "Perfect. We can make the release call once those two items are done." },
];

const wait = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export function MeetingModeAnimation() {
  const demoRef = useRef<HTMLDivElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [visible, setVisible] = useState<number[]>([]);
  const [typed, setTyped] = useState<Record<number, number>>({});
  const [sweeping, setSweeping] = useState<number | null>(null);
  const [notes, setNotes] = useState<number[]>([]);
  const [peelingNote, setPeelingNote] = useState<number | null>(null);
  const [summarized, setSummarized] = useState(false);
  const [checkedNotes, setCheckedNotes] = useState<Record<number, boolean>>({});
  const [recapSent, setRecapSent] = useState(false);

  useEffect(() => {
    const node = demoRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const runSimulation = async () => {
    setVisible([]);
    setTyped({});
    setSweeping(null);
    setNotes([]);
    setPeelingNote(null);
    setSummarized(false);
    setCheckedNotes({});
    setRecapSent(false);

    let collectedNotes = 0;
    for (let index = 0; index < LINES.length; index += 1) {
      setVisible((items) => [...items, index].slice(-6));
      for (let character = 1; character <= LINES[index].text.length; character += 1) {
        setTyped((values) => ({ ...values, [index]: character }));
        await wait(22);
      }
      await wait(200);

      if (LINES[index].note) {
        setSweeping(index);
        await wait(500);
        setPeelingNote(index);
        await wait(200);
        setNotes((items) => [...items, index]);
        setSweeping(null);
        setPeelingNote(null);
        collectedNotes += 1;
        if (collectedNotes >= 2) setSummarized(true);
      }
      await wait(250);
    }
  };

  useEffect(() => {
    if (!hasEnteredView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(LINES.map((_, index) => index).slice(-6));
      setTyped(Object.fromEntries(LINES.map((line, index) => [index, line.text.length])));
      setNotes(LINES.map((line, index) => (line.note ? index : -1)).filter((index) => index >= 0));
      setSummarized(true);
    } else {
      void runSimulation();
    }
  }, [hasEnteredView]);

  const toggleCheck = (index: number) => {
    setCheckedNotes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div ref={demoRef} className={`meeting-highlight-demo max-w-4xl mx-auto ${hasEnteredView ? "has-started" : "is-waiting"}`}>
      
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-[#111] rounded-2xl border border-neutral-800">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={runSimulation}
            className="px-4 py-2 bg-white text-black font-extrabold rounded-lg text-xs transition-transform active:scale-95 flex items-center gap-2 hover:bg-neutral-200 cursor-pointer"
          >
            <Mic size={14} /> Simulate Live Call
          </button>
          <span className="text-xs text-neutral-400 font-medium tracking-wide">Live highlighter sweep · auto note extraction</span>
        </div>
        <AnimatePresence>
          {summarized && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              type="button"
              onClick={() => setRecapSent(true)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                recapSent
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-neutral-700 hover:bg-neutral-800"
              }`}
            >
              {recapSent ? (
                <><CheckCircle2 size={14} /> Email recap sent</>
              ) : (
                <>Send Meeting Summary <ChevronRight size={14} /></>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Transcript Panel */}
        <section className="bg-[#151515] rounded-2xl border border-neutral-800 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-5 bg-[#111] border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800">
                <Mic size={14} className="text-neutral-400" />
              </div>
              <div>
                <strong className="text-sm font-bold text-white tracking-wide block">Active Conversation</strong>
                <small className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block mt-0.5">Live Transcript</small>
              </div>
            </div>
            <div className="flex items-end gap-1 h-3">
              {[8, 12, 6, 10, 5].map((h, i) => (
                <span key={i} className="w-[3px] rounded-full bg-neutral-600 animate-pulse" style={{ animationDelay: `${i * 0.15}s`, height: `${h}px` }} />
              ))}
            </div>
          </header>

          <div className="p-6 space-y-6 flex-1 min-h-[380px]">
            {visible.map((index) => {
              const line = LINES[index];
              const isYou = line.speaker === "You";
              const isSweeping = sweeping === index;
              const isPeeling = peelingNote === index;
              
              return (
                <article
                  key={index}
                  className={`relative flex flex-col ${isYou ? "items-end" : "items-start"} ${isPeeling ? "meeting-line-peel" : ""}`}
                >
                  <div className={`flex items-center gap-2 mb-1.5 px-1 ${isYou ? "flex-row-reverse" : "flex-row"}`}>
                    <b className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">{line.speaker}</b>
                    <small className="text-[9px] font-mono text-neutral-600">{`00:${String(index * 7 + 4).padStart(2, "0")}`}</small>
                  </div>
                  
                  <div className={`relative px-4 py-3 max-w-[85%] transition-all ${
                    isYou 
                      ? "bg-neutral-800 text-white rounded-xl rounded-tr-sm" 
                      : "bg-transparent border border-neutral-800 text-neutral-300 rounded-xl rounded-tl-sm"
                  }`}>
                    {isSweeping && (
                      <motion.div
                         className="absolute inset-0 bg-neutral-100/10 origin-left pointer-events-none rounded-inherit"
                         style={{ borderRadius: "inherit" }}
                         initial={{ scaleX: 0 }}
                         animate={{ scaleX: 1 }}
                         transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <p className="relative z-10 text-xs leading-relaxed font-medium">
                      {line.text.slice(0, typed[index] || 0)}
                      {(typed[index] || 0) < line.text.length && (
                        <i className={`inline-block w-[2px] h-3 ml-0.5 align-middle ${isYou ? "bg-white" : "bg-neutral-500"} animate-pulse`} />
                      )}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Running Summary Panel */}
        <section className="bg-[#151515] rounded-2xl border border-neutral-800 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-5 bg-[#111] border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800">
                <FileText size={14} className="text-neutral-400" />
              </div>
              <div>
                <strong className="text-sm font-bold text-white tracking-wide block">Running Summary</strong>
                <small className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block mt-0.5">Top-line Notes</small>
              </div>
            </div>
            {notes.length > 0 && (
              <span className="px-2.5 py-1 border border-neutral-700 rounded-md text-[9px] font-bold text-neutral-400 tracking-widest uppercase">
                {notes.length} Captured
              </span>
            )}
          </header>

          <div className="p-6 space-y-3 flex-1 min-h-[380px]">
            <AnimatePresence>
              {notes.map((index) => {
                const note = LINES[index].note!;
                const isChecked = checkedNotes[index];
                const isDecision = note.type === "Decision";
                
                return (
                  <motion.article
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    onClick={() => toggleCheck(index)}
                    className={`p-4 rounded-xl border cursor-pointer transition-colors duration-200 ${
                      isChecked
                        ? "bg-transparent border-neutral-800 opacity-60"
                        : "bg-[#1a1a1a] border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-[4px] border transition-colors ${
                        isChecked 
                          ? "bg-white border-white text-black" 
                          : "bg-transparent border-neutral-600 text-transparent hover:border-neutral-400"
                      }`}>
                        <Check size={12} className={isChecked ? "opacity-100" : "opacity-0"} strokeWidth={3} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {isDecision ? (
                            <Target size={10} className="text-neutral-500" />
                          ) : (
                            <Navigation size={10} className="text-neutral-500" />
                          )}
                          <small className="text-[9px] font-mono uppercase font-bold tracking-widest text-neutral-500">
                            {note.type}
                          </small>
                        </div>
                        <strong className={`text-sm font-semibold block mb-1 transition-colors ${isChecked ? "text-neutral-500 line-through" : "text-neutral-200"}`}>
                          {note.title}
                        </strong>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                          {note.detail}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
            
            {notes.length === 0 && (
              <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center mb-4">
                  <Sparkles size={16} className="text-neutral-500" />
                </div>
                <p className="text-xs text-neutral-400 font-medium tracking-wide">Waiting for key takeaways...</p>
                <p className="text-[10px] text-neutral-500 mt-1 max-w-[200px]">Notes will automatically build here as you speak.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
