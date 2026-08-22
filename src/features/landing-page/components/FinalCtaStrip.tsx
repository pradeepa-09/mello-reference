import { Apple } from "lucide-react";
import { Reveal } from "@/src/shared/components";

function WindowsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 12.5H10.5V19.5L3 18.5V12.5ZM11.5 4.2L21 2.5V11.5H11.5V4.2ZM11.5 12.5H21V21.5L11.5 19.8V12.5Z" />
    </svg>
  );
}

export function FinalCtaStrip() {
  return (
    <section id="final-cta" className="final-cta-strip relative py-20 bg-gradient-to-b from-neutral-900 to-neutral-950 text-white border-b border-neutral-800 overflow-hidden">
      <div className="absolute inset-0 bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="wrap relative z-10 max-w-2xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Speak it, and it&apos;s{" "}
            <span className="text-white underline decoration-white/30 underline-offset-4">done.</span>
          </h2>
          <p className="text-neutral-400 mt-4 text-base sm:text-lg">
            Download Mello for macOS or join the Windows waitlist.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#download"
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-white/10 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <Apple size={20} /> Download for macOS
            </a>
            <a
              href="#download"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-neutral-700 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 font-semibold transition-all w-full sm:w-auto justify-center"
            >
              <WindowsIcon size={18} /> Join Windows waitlist
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
