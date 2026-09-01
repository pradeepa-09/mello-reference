"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface SonicWaveformBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
}

export function SonicWaveformBackground({
  className = "",
  style,
}: SonicWaveformBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isVisible = true;
    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      if (!canvas || !container) return;
      dpr = window.devicePixelRatio || 1;
      width = container.offsetWidth || window.innerWidth;
      height = container.offsetHeight || 800;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // IntersectionObserver to pause loop when scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let time = 0;
    const NUM_LINES = 42; // Number of strands forming the rich, dense acoustic wave
    const STEP = 8; // Smooth horizontal resolution step

    const render = () => {
      if (isVisible) {
        time += 0.009; // Smooth living flow cadence

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        const centerY = height * 0.44; // Centered directly behind the headline
        const ribbonWidth = width;

        for (let i = 0; i < NUM_LINES; i++) {
          // Normalized strand position from -1 to 1
          const norm = (i / (NUM_LINES - 1)) * 2 - 1;
          const absNorm = Math.abs(norm);

          // Alpha curve: denser in center, subtle toward outer strands
          const alpha = (0.22 - absNorm * 0.15) * (0.85 + 0.15 * Math.sin(time * 2 + i * 0.15));

          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 0, 0, ${Math.max(0.015, alpha)})`;
          ctx.lineWidth = 1.1;

          let isFirst = true;

          for (let x = -40; x <= ribbonWidth + 40; x += STEP) {
            // Horizontal progress normalized [0..1]
            const xNorm = x / ribbonWidth;

            // Envelope window: smooth full swell in center, tapered at left and right edges
            const envelope = Math.sin(xNorm * Math.PI);
            const smoothEnv = Math.pow(Math.max(0, envelope), 1.15);

            // Primary carrier wave (large live amplitude)
            const wave1 = Math.sin(xNorm * 4.5 + time * 1.4) * 65;

            // Secondary undulating harmonic wave
            const wave2 = Math.sin(xNorm * 7.2 - time * 1.1 + norm * 0.8) * 36;

            // Tertiary acoustic ripple
            const wave3 = Math.cos(xNorm * 11.5 + time * 1.6 + norm * 0.5) * 18;

            const y = centerY + (wave1 + wave2 + wave3) * smoothEnv + norm * (48 * smoothEnv);

            if (isFirst) {
              ctx.moveTo(x, y);
              isFirst = false;
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

export default SonicWaveformBackground;
