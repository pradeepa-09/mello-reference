"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "motion/react";
import { 
  Zap, 
  Keyboard, 
  Mic, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  Flame,
  ArrowRight,
  Play,
  Pause
} from "lucide-react";
import { Reveal } from "@/src/shared/components";

interface BenchmarkScenario {
  id: string;
  name: string;
  category: string;
  icon: string;
  text: string;
  voiceDurationMs: number;
  typingDurationMs: number;
}

const BENCHMARK_SCENARIOS: BenchmarkScenario[] = [
  {
    id: "slack",
    name: "Slack Sync Update",
    category: "Team Messaging",
    icon: "💬",
    text: "Hey team, the updated checkout flow designs are live in Figma with the new payment error boundaries. Let's sync tomorrow at 10 AM to review before sprint kickoff.",
    voiceDurationMs: 2600,
    typingDurationMs: 10800,
  },
  {
    id: "email",
    name: "Client Project Email",
    category: "Executive Comms",
    icon: "📧",
    text: "Thanks for meeting today! I've attached the finalized architecture proposal and timeline. Let me know if the engineering milestones look good for Q3.",
    voiceDurationMs: 2400,
    typingDurationMs: 9800,
  },
  {
    id: "linear",
    name: "Linear Issue Draft",
    category: "Product & Eng",
    icon: "🚀",
    text: "Refactor auth token refresh handler to retry on 401 status with exponential backoff and update the telemetry event payload.",
    voiceDurationMs: 1900,
    typingDurationMs: 7900,
  },
];

// Numeric Count-Up Component
function CountUpNumber({ end, duration = 1.2, decimals = 0 }: { end: number; duration?: number; decimals?: number }) {
  const reduceMotion = useReducedMotion();
  const [val, setVal] = useState(reduceMotion ? end : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setVal(end);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - startTime) / (duration * 1000));
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setVal(easeOut * end);
            if (progress < 1) requestAnimationFrame(tick);
            else setVal(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, hasStarted, reduceMotion]);

  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}

export function SpeedMultiplier() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [voiceProgress, setVoiceProgress] = useState(0); // 0 to 100
  const [typingProgress, setTypingProgress] = useState(0); // 0 to 100
  const [voiceFinished, setVoiceFinished] = useState(false);
  const [typingFinished, setTypingFinished] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  // Scroll parallax depth effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.6, 0.2]);

  const scenario = BENCHMARK_SCENARIOS[selectedScenarioIdx];
  const words = useMemo(() => scenario.text.split(" "), [scenario.text]);
  const chars = scenario.text;

  // Reset and restart animation when scenario changes or replay requested
  const restartBenchmark = (idx = selectedScenarioIdx) => {
    setSelectedScenarioIdx(idx);
    setVoiceProgress(0);
    setTypingProgress(0);
    setVoiceFinished(false);
    setTypingFinished(false);
    setElapsedMs(0);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (reduceMotion) {
      setVoiceProgress(100);
      setTypingProgress(100);
      setVoiceFinished(true);
      setTypingFinished(true);
      return;
    }

    if (!isPlaying) return;

    const intervalMs = 40;
    const interval = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + intervalMs;

        // Voice progress (fast stream)
        const vProg = Math.min(100, (next / scenario.voiceDurationMs) * 100);
        setVoiceProgress(vProg);
        if (vProg >= 100) setVoiceFinished(true);

        // Typing progress (traditional speed)
        const tProg = Math.min(100, (next / scenario.typingDurationMs) * 100);
        setTypingProgress(tProg);
        if (tProg >= 100) {
          setTypingFinished(true);
          setIsPlaying(false);
        }

        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isPlaying, scenario, reduceMotion]);

  // Words revealed for voice
  const voiceWordsVisible = useMemo(() => {
    if (voiceProgress >= 100) return words.length;
    return Math.floor((voiceProgress / 100) * words.length);
  }, [voiceProgress, words.length]);

  // Chars revealed for typing
  const typingCharsVisible = useMemo(() => {
    if (typingProgress >= 100) return chars.length;
    return Math.floor((typingProgress / 100) * chars.length);
  }, [typingProgress, chars.length]);

  const voiceSec = (Math.min(elapsedMs, scenario.voiceDurationMs) / 1000).toFixed(1);
  const typingSec = (Math.min(elapsedMs, scenario.typingDurationMs) / 1000).toFixed(1);
  const timeSavedSec = ((scenario.typingDurationMs - scenario.voiceDurationMs) / 1000).toFixed(1);
  const speedPercentageFaster = Math.round(
    (scenario.typingDurationMs / scenario.voiceDurationMs) * 10
  ) / 10;

  return (
    <section 
      ref={sectionRef} 
      id="speed-multiplier" 
      className="section dark py-24 sm:py-32 bg-neutral-950 text-white border-b border-neutral-900 relative overflow-hidden"
    >
      {/* Scroll-linked Parallax Background Light Bloom */}
      <motion.div 
        style={{ y: reduceMotion ? 0 : backgroundY, opacity: reduceMotion ? 0.3 : glowOpacity }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" 
      />
      <motion.div 
        style={{ y: reduceMotion ? 0 : backgroundY, opacity: reduceMotion ? 0.3 : glowOpacity }}
        className="absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-neutral-800/[0.1] rounded-full blur-3xl pointer-events-none" 
      />

      <div className="wrap max-w-5xl mx-auto relative z-10 px-4 sm:px-6">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold tracking-widest uppercase text-neutral-300 mb-4 shadow-sm">
              <Flame size={13} className="text-white animate-pulse" />
              <span>03 · Speed Multiplier</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Speaking is{" "}
              <span className="relative inline-block text-white">
                <span className="relative z-10 underline decoration-white/40 underline-offset-8">
                  <CountUpNumber end={4.1} decimals={1} />x faster
                </span>
                <span className="absolute -inset-1 bg-white/10 filter blur-sm -z-0 rounded-lg" />
              </span>{" "}
              than typing.
            </h2>
            
            <p className="text-neutral-400 text-sm sm:text-base lg:text-lg mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
              Stream dictation into active windows instantly, or trigger multi-step workflows without ever taking your hands off natural thought.
            </p>

            {/* Scenario Selector Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <span className="text-xs font-mono uppercase text-neutral-400 font-semibold mr-1 hidden sm:inline">
                Test Benchmark:
              </span>
              {BENCHMARK_SCENARIOS.map((sc, idx) => {
                const isActive = selectedScenarioIdx === idx;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => restartBenchmark(idx)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isActive
                        ? "bg-white text-black border-white shadow-lg shadow-white/10 scale-105"
                        : "bg-neutral-900/90 text-neutral-400 border-neutral-800 hover:bg-neutral-800 hover:text-white"
                    }`}
                  >
                    <span>{sc.icon}</span>
                    <span>{sc.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Live Race Arena */}
        <Reveal delay={0.1}>
          <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/90 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Arena Header Bar with Live Controller */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral-800/80">
              <div className="flex items-center gap-3">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono uppercase font-bold text-neutral-300 tracking-wider">
                  Live Throughput Benchmark Race
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={13} />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={13} />
                      <span>Resume</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => restartBenchmark()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
                >
                  <RotateCcw size={13} className="text-neutral-400" />
                  <span>Replay Race</span>
                </button>
              </div>
            </div>

            {/* Side-by-Side Comparison Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lane 1: Voice with Mello (Fast Stream) */}
              <div className="relative rounded-2xl bg-neutral-950/90 border border-neutral-700/80 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-inner ring-1 ring-white/10">
                {/* Winner Pill Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-black text-[11px] font-extrabold shadow-md">
                  <Zap size={12} className="fill-black" />
                  <span>{speedPercentageFaster}x FASTER</span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-lg">
                      <Mic size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">Speaking with Mello</h3>
                      </div>
                      <p className="text-xs text-neutral-400 font-mono">
                        <CountUpNumber end={160} /> WPM · Real-time streaming
                      </p>
                    </div>
                  </div>

                  {/* Audio Waveform visualization */}
                  <div className="h-6 flex items-center gap-1 my-3 px-3 py-1 bg-neutral-900/60 rounded-lg border border-neutral-800/60">
                    <span className="text-[10px] font-mono text-neutral-400 mr-2 uppercase">Audio Wave</span>
                    {[0.3, 0.7, 1, 0.5, 0.9, 0.4, 0.8, 0.6, 1, 0.7, 0.4, 0.8, 0.5, 0.9, 0.3].map((height, i) => (
                      <motion.span
                        key={i}
                        animate={
                          voiceFinished
                            ? { height: "20%" }
                            : { height: [`${height * 20}%`, `${height * 100}%`, `${height * 30}%`] }
                        }
                        transition={{
                          duration: 0.6,
                          repeat: voiceFinished ? 0 : Infinity,
                          ease: "easeInOut",
                          delay: i * 0.04,
                        }}
                        className={`w-1 rounded-full ${
                          voiceFinished ? "bg-neutral-600" : "bg-white"
                        }`}
                        style={{ height: "40%" }}
                      />
                    ))}
                  </div>

                  {/* Dictated text box */}
                  <div className="min-h-[110px] p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 font-normal text-sm leading-relaxed text-neutral-200">
                    {words.slice(0, voiceWordsVisible).join(" ")}
                    {!voiceFinished && (
                      <span className="inline-block w-2 h-4 ml-1 bg-white animate-pulse align-middle rounded-sm" />
                    )}
                    {voiceFinished && (
                      <span className="ml-2 inline-flex items-center text-xs font-mono font-semibold text-emerald-400">
                        <CheckCircle2 size={13} className="inline mr-1" /> Complete
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress & Speed Stats */}
                <div className="mt-5 pt-4 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-400">Elapsed Time: <strong className="text-white">{voiceSec}s</strong></span>
                    <span className="text-white font-bold">{Math.round(voiceProgress)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-neutral-200 to-white"
                      style={{ width: `${voiceProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[11px] text-neutral-400">
                    <span>Target: { (scenario.voiceDurationMs / 1000).toFixed(1) }s</span>
                    <span className="text-neutral-300 font-mono">~120ms latency</span>
                  </div>
                </div>
              </div>

              {/* Lane 2: Traditional Keyboard Typing */}
              <div className="relative rounded-2xl bg-neutral-950/50 border border-neutral-800 p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 text-neutral-300 border border-neutral-800 flex items-center justify-center">
                      <Keyboard size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-300">Keyboard Typing</h3>
                      <p className="text-xs text-neutral-400 font-mono">
                        <CountUpNumber end={38} /> WPM · Average keyboard typing
                      </p>
                    </div>
                  </div>

                  {/* Keystroke cadence indicator */}
                  <div className="h-6 flex items-center justify-between px-3 py-1 my-3 bg-neutral-900/40 rounded-lg border border-neutral-800/40 text-[11px] font-mono text-neutral-400">
                    <span>KEYSTROKE CADENCE</span>
                    <span>3.2 chars/sec</span>
                  </div>

                  {/* Typed text box */}
                  <div className="min-h-[110px] p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/60 font-normal text-sm leading-relaxed text-neutral-400">
                    <span className="text-neutral-300">{chars.slice(0, typingCharsVisible)}</span>
                    {!typingFinished && (
                      <span className="inline-block w-2 h-4 ml-0.5 bg-neutral-400 animate-pulse align-middle rounded-sm" />
                    )}
                    {typingFinished && (
                      <span className="ml-2 inline-flex items-center text-xs font-mono text-neutral-400">
                        Done
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress & Speed Stats */}
                <div className="mt-5 pt-4 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-neutral-400">Elapsed Time: <strong className="text-neutral-300">{typingSec}s</strong></span>
                    <span className="text-neutral-400 font-bold">{Math.round(typingProgress)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden">
                    <div
                      className="h-full bg-neutral-600 transition-all duration-75"
                      style={{ width: `${typingProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[11px] text-neutral-400">
                    <span>Target: { (scenario.typingDurationMs / 1000).toFixed(1) }s</span>
                    <span className="text-neutral-400 font-mono">Keystroke bottleneck</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Saved Celebration Banner */}
            <div className="mt-6 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {timeSavedSec} seconds saved on this single message alone
                  </h4>
                  <p className="text-xs text-neutral-400">
                    That is a <strong className="text-white">76% reduction</strong> in drafting time.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono font-bold text-neutral-200">
                  160 WPM vs 38 WPM
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Feature Bento Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <Reveal delay={0.1}>
            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3">
                <TrendingUp size={16} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">4.1x Faster Output</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Natural human speech clocks at 150–190 WPM, compared to 38 WPM on a physical keyboard.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3">
                <Clock size={16} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">3.2 Hours Saved / Wk</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Reclaim hundreds of hours every year spent drafting emails, tickets, and status reports.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3">
                <Sparkles size={16} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Zero Friction Flow</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Capture stream-of-consciousness ideas instantly before your mind loses momentum.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-all">
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white mb-3">
                <Layers size={16} />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Auto Formatting</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Mello cleans up filler words, applies smart punctuation, and formats code terms seamlessly.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default SpeedMultiplier;
