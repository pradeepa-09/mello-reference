import { Mic, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const bars = [12, 23, 17, 34, 27, 45, 52, 40, 25, 35, 19, 27, 14];

export function RecordingBar({
  mode,
  compact = false,
}: {
  mode: "dictation" | "action";
  compact?: boolean;
}) {
  const Icon = mode === "dictation" ? Mic : Sparkles;
  const isDictation = mode === "dictation";

  return (
    <div className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 bg-neutral-900/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] ${compact ? 'scale-95 origin-left' : ''}`} aria-label={`Mello ${mode} is actively listening`}>
      {/* Brand & Mode Indicator */}
      <div className="flex items-center gap-2 pl-1 pr-3 py-1 bg-white/5 border border-white/10 rounded-full shadow-inner">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${isDictation ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'}`}>
          <Icon size={14} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-white leading-none">Mello</span>
          <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase leading-tight mt-0.5">{mode}</span>
        </div>
      </div>

      {/* Audio Wave */}
      <div className="flex items-center justify-center gap-[3px] h-8 px-2 border-l border-white/10">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height: [height * 0.3, height * 0.8, height * 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 1.15 + (index % 4) * 0.11,
              delay: index * -0.07,
              ease: "easeInOut"
            }}
            className={`w-[3px] rounded-full ${isDictation ? 'bg-indigo-400' : 'bg-rose-400'}`}
          />
        ))}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 pr-2">
        <span className="text-sm font-bold text-white tracking-wide">Listening<span className="animate-pulse">...</span></span>
      </div>

      {/* Active Indicator */}
      <div className="hidden sm:flex items-center gap-2 ml-auto pl-4 border-l border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-400">Active</span>
      </div>
    </div>
  );
}
