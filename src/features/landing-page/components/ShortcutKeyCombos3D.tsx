"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles, Play, Pause, RotateCcw } from "lucide-react";

interface SplineKeyProps {
  symbol: string;
  isSpace?: boolean;
  isPressed: boolean;
  onClick: () => void;
  width?: string;
  height?: string;
}

function SplineKey({
  symbol,
  isSpace = false,
  isPressed,
  onClick,
  width = "w-[145px] sm:w-[165px]",
  height = "h-[125px] sm:h-[140px]",
}: SplineKeyProps) {
  return (
    <div
      onClick={onClick}
      className={`relative ${width} ${height} cursor-pointer select-none`}
      style={{
        transformStyle: "preserve-3d",
      }}
      title={`Click to press ${symbol}`}
    >
      {/* 1. Ambient Floor Drop Shadow */}
      <div
        className="absolute inset-x-2 -bottom-8 h-12 rounded-full pointer-events-none transition-all duration-200"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          filter: "blur(20px)",
          transform: isPressed ? "scale(0.88) translateY(-4px)" : "scale(1.02) translateY(6px)",
          opacity: isPressed ? 0.6 : 0.9,
        }}
      />

      {/* 2. Lower Extruded 3D Body (Extending Strictly DOWNWARD) */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none transition-all duration-150"
        style={{
          transform: "translateY(32px)",
          height: "100%",
          backgroundColor: "#101113",
          background: "linear-gradient(180deg, #18191c 0%, #121315 50%, #0a0b0c 100%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 24px 32px rgba(0, 0, 0, 0.8)",
        }}
      />

      {/* 3. Front Extrusion Side Wall */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none rounded-b-[28px] transition-all duration-150"
        style={{
          height: isPressed ? "14px" : "32px",
          transform: isPressed ? "translateY(14px)" : "translateY(32px)",
          background: "linear-gradient(180deg, #1b1c20 0%, #141517 60%, #0d0e10 100%)",
          borderLeft: "1.5px solid rgba(255, 255, 255, 0.12)",
          borderRight: "1.5px solid rgba(255, 255, 255, 0.12)",
          borderBottom: "1.5px solid rgba(255, 255, 255, 0.08)",
        }}
      />

      {/* 4. Sculpted Top Key Dish (Elevated & Depressing On Click) */}
      <div
        className="relative w-full h-full rounded-[28px] flex items-center justify-center transition-all duration-150"
        style={{
          transform: isPressed ? "translateY(18px)" : "translateY(0px)",
          background: isPressed
            ? "linear-gradient(165deg, #1f2023 0%, #17181a 60%, #121314 100%)"
            : "linear-gradient(165deg, #2d2e33 0%, #252629 55%, #1c1d20 100%)",
          border: "1.5px solid rgba(255, 255, 255, 0.22)",
          boxShadow: isPressed
            ? "inset 0 3px 6px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.12)"
            : "inset 0 2px 1.5px rgba(255, 255, 255, 0.4), inset 0 -3px 5px rgba(0, 0, 0, 0.65), 0 4px 12px rgba(0,0,0,0.4)",
        }}
      >
        {/* Top Rim Specular Highlight */}
        <div
          className="absolute inset-x-5 top-2 h-[1.5px] rounded-full pointer-events-none opacity-80"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)",
          }}
        />

        {/* Big Centered Symbol / Typography */}
        {isSpace ? (
          <div className="flex flex-col items-center justify-center gap-1.5">
            <span
              className="text-lg sm:text-xl font-semibold tracking-wider uppercase font-sans"
              style={{
                color: isPressed ? "#FFFFFF" : "#F5F5F2",
                textShadow: "0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              Space
            </span>
            <div
              className="w-16 sm:w-20 h-1 rounded-full opacity-60"
              style={{ backgroundColor: "#F5F5F2" }}
            />
          </div>
        ) : (
          <span
            className="font-mono text-3xl sm:text-4xl font-bold tracking-tight select-none"
            style={{
              color: isPressed ? "#FFFFFF" : "#F5F5F2",
              textShadow: "0 2px 6px rgba(0,0,0,0.9)",
            }}
          >
            {symbol}
          </span>
        )}
      </div>
    </div>
  );
}

export function ShortcutKeyCombos3D() {
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [pressedKeys, setPressedKeys] = useState<Record<string, boolean>>({});
  const [hudMessage, setHudMessage] = useState<string>("⌘ + ⌥ + Space activated");
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Automated Simulation Loop cycling through 1-key -> 2-key -> 3-key combos
  useEffect(() => {
    if (!isAutoPlaying) return;

    const runSimulationStep = () => {
      // Step 1: 1-Key Trigger (fn)
      setActiveStep(1);
      setHudMessage("1-Key Trigger: Single tap fn");
      setPressedKeys({});

      setTimeout(() => {
        setPressedKeys({ fn: true });
        setHudMessage("🎙️ Listening... (fn held)");
      }, 700);

      setTimeout(() => {
        setPressedKeys({});
      }, 1900);

      // Step 2: 2-Key Trigger (⌥ + Space)
      setTimeout(() => {
        setActiveStep(2);
        setHudMessage("2-Key Shortcut: ⌥ + Space");
        setPressedKeys({});

        setTimeout(() => {
          setPressedKeys({ opt: true });
        }, 600);

        setTimeout(() => {
          setPressedKeys({ opt: true, space: true });
          setHudMessage("⚡ Mello Triggered: ⌥ + Space");
        }, 900);

        setTimeout(() => {
          setPressedKeys({});
        }, 2200);
      }, 2600);

      // Step 3: 3-Key Trigger (⌘ + ⌥ + Space)
      setTimeout(() => {
        setActiveStep(3);
        setHudMessage("3-Key Pro Shortcut: ⌘ + ⌥ + Space");
        setPressedKeys({});

        setTimeout(() => {
          setPressedKeys({ cmd: true });
        }, 500);

        setTimeout(() => {
          setPressedKeys({ cmd: true, opt: true });
        }, 800);

        setTimeout(() => {
          setPressedKeys({ cmd: true, opt: true, space: true });
          setHudMessage("🚀 Global Action: ⌘ + ⌥ + Space");
        }, 1100);

        setTimeout(() => {
          setPressedKeys({});
        }, 2400);
      }, 5400);
    };

    runSimulationStep();
    autoPlayTimerRef.current = setInterval(runSimulationStep, 8600);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying]);

  // Physical Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newPressed: Record<string, boolean> = {};
      if (e.key === "Alt" || e.altKey) newPressed["opt"] = true;
      if (e.key === "Meta" || e.metaKey) newPressed["cmd"] = true;
      if (e.key === "Control" || e.ctrlKey) newPressed["ctrl"] = true;
      if (e.key === " " || e.code === "Space") newPressed["space"] = true;
      if (e.key === "Fn" || e.key === "Globe") newPressed["fn"] = true;

      if (Object.keys(newPressed).length > 0) {
        setIsAutoPlaying(false);
        setPressedKeys((prev) => ({ ...prev, ...newPressed }));
        setHudMessage("Keyboard Trigger Detected");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const next = { ...prev };
        if (e.key === "Alt") delete next["opt"];
        if (e.key === "Meta") delete next["cmd"];
        if (e.key === "Control") delete next["ctrl"];
        if (e.key === " " || e.code === "Space") delete next["space"];
        if (e.key === "Fn") delete next["fn"];
        return next;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleManualKeyClick = (keyId: string) => {
    setIsAutoPlaying(false);
    setPressedKeys((prev) => ({ ...prev, [keyId]: true }));
    setHudMessage(`Tactile Press: ${keyId.toUpperCase()}`);
    setTimeout(() => {
      setPressedKeys((prev) => ({ ...prev, [keyId]: false }));
    }, 280);
  };

  const handleTabSelect = (step: 1 | 2 | 3) => {
    setIsAutoPlaying(false);
    setActiveStep(step);
    setPressedKeys({});
    if (step === 1) setHudMessage("1-Key Shortcut: fn / Globe");
    if (step === 2) setHudMessage("2-Key Shortcut: ⌥ + Space");
    if (step === 3) setHudMessage("3-Key Shortcut: ⌘ + ⌥ + Space");
  };

  return (
    <section
      id="shortcuts"
      className="section py-24 px-4 max-w-7xl mx-auto text-white border-b"
      style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
    >
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <p
          className="text-xs font-mono font-bold tracking-widest uppercase mb-2"
          style={{ color: "var(--color-ash)" }}
        >
          03 · Tactile Triggers
        </p>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight"
          style={{ letterSpacing: "var(--tracking-heading-lg)" }}
        >
          1, 2, or 3-key customizable triggers
        </h2>
        <p
          className="text-sm sm:text-base mt-3 leading-relaxed font-normal"
          style={{ color: "var(--color-mist)" }}
        >
          Sculpted 3D tactile keycaps simulating Mello&apos;s instant voice activations.
        </p>
      </div>

      {/* 3D Scene Viewport (Pure Floating 3D Object Showcase) */}
      <div className="max-w-4xl mx-auto flex flex-col items-center relative select-none">
        {/* Top Controls: 1-Key / 2-Key / 3-Key Tabs + AutoPlay Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 z-20">
          <div
            className="flex items-center gap-1 p-1 rounded-full border shadow-xl backdrop-blur-md"
            style={{
              backgroundColor: "var(--color-obsidian)",
              borderColor: "rgba(255, 255, 255, 0.12)",
            }}
          >
            {[
              { step: 1 as const, label: "1 Key" },
              { step: 2 as const, label: "2 Keys" },
              { step: 3 as const, label: "3 Keys" },
            ].map(({ step, label }) => (
              <button
                key={step}
                type="button"
                onClick={() => handleTabSelect(step)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer"
                style={{
                  backgroundColor: activeStep === step ? "var(--color-white)" : "transparent",
                  color: activeStep === step ? "var(--color-midnight)" : "var(--color-mist)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-colors hover:bg-white/10"
            style={{
              backgroundColor: "var(--color-obsidian)",
              borderColor: isAutoPlaying ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)",
              color: isAutoPlaying ? "var(--color-white)" : "var(--color-ash)",
            }}
          >
            {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isAutoPlaying ? "Simulation Playing" : "Paused"}</span>
          </button>
        </div>

        {/* Floating Mello HUD Notch Trigger Feedback */}
        <div className="flex flex-col items-center text-center z-20 mb-4 min-h-[44px]">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono shadow-2xl transition-all"
            style={{
              backgroundColor: "rgba(15, 15, 16, 0.95)",
              borderColor: "rgba(255, 255, 255, 0.22)",
              color: "var(--color-white)",
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>{hudMessage}</span>
          </div>
        </div>

        {/* Spline-Style 3D Isometric Cluster Container */}
        <div
          className="w-full flex items-center justify-center py-12 sm:py-16"
          style={{ perspective: "1100px" }}
        >
          {/* Isometric Transform Cluster (rotateX: 52deg, rotateZ: -20deg) */}
          <div
            className="flex items-center justify-center gap-5 sm:gap-6 transition-all duration-700 ease-out"
            style={{
              transform: "rotateX(52deg) rotateZ(-20deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Step 1: Single Key Trigger (fn) */}
            {activeStep === 1 && (
              <div className="flex items-center justify-center">
                <SplineKey
                  symbol="fn"
                  width="w-[160px] sm:w-[180px]"
                  height="h-[140px] sm:h-[155px]"
                  isPressed={!!pressedKeys["fn"]}
                  onClick={() => handleManualKeyClick("fn")}
                />
              </div>
            )}

            {/* Step 2: Two-Key Combo (⌥ + Space) */}
            {activeStep === 2 && (
              <div className="flex items-center justify-center gap-5 sm:gap-6">
                <SplineKey
                  symbol="⌥"
                  width="w-[145px] sm:w-[165px]"
                  height="h-[130px] sm:h-[145px]"
                  isPressed={!!pressedKeys["opt"]}
                  onClick={() => handleManualKeyClick("opt")}
                />
                <SplineKey
                  symbol="Space"
                  isSpace
                  width="w-[280px] sm:w-[330px]"
                  height="h-[130px] sm:h-[145px]"
                  isPressed={!!pressedKeys["space"]}
                  onClick={() => handleManualKeyClick("space")}
                />
              </div>
            )}

            {/* Step 3: Three-Key Pro Combo (⌘ + ⌥ + Space) */}
            {activeStep === 3 && (
              <div className="flex items-center justify-center gap-5 sm:gap-6">
                <SplineKey
                  symbol="⌘"
                  width="w-[140px] sm:w-[155px]"
                  height="h-[130px] sm:h-[145px]"
                  isPressed={!!pressedKeys["cmd"]}
                  onClick={() => handleManualKeyClick("cmd")}
                />
                <SplineKey
                  symbol="⌥"
                  width="w-[140px] sm:w-[155px]"
                  height="h-[130px] sm:h-[145px]"
                  isPressed={!!pressedKeys["opt"]}
                  onClick={() => handleManualKeyClick("opt")}
                />
                <SplineKey
                  symbol="Space"
                  isSpace
                  width="w-[260px] sm:w-[310px]"
                  height="h-[130px] sm:h-[145px]"
                  isPressed={!!pressedKeys["space"]}
                  onClick={() => handleManualKeyClick("space")}
                />
              </div>
            )}
          </div>
        </div>

        {/* Restart Demo Button */}
        <div className="mt-2 z-20">
          <button
            type="button"
            onClick={() => {
              setIsAutoPlaying(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono transition-all border hover:bg-white/10 cursor-pointer"
            style={{
              backgroundColor: "var(--color-obsidian)",
              borderColor: "rgba(255, 255, 255, 0.14)",
              color: "var(--color-pearl)",
            }}
          >
            <RotateCcw className="w-3.5 h-3.5 text-white" />
            <span>Restart Simulation</span>
          </button>
        </div>
      </div>
    </section>
  );
}
