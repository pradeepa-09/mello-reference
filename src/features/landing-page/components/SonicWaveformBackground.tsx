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
    const NUM_LINES = 42; // Number of strands forming the dense sonic ribbon
    const STEP = 8; // Horizontal resolution step in pixels

    const render = () => {
      if (isVisible) {
        time += 0.008; // Smooth ambient flow speed

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        const centerY = height * 0.46; // Positioned comfortably in the center of the viewport
        const ribbonWidth = width;

        for (let i = 0; i < NUM_LINES; i++) {
          // Normalized strand position from -1 to 1
          const norm = (i / (NUM_LINES - 1)) * 2 - 1;
          const absNorm = Math.abs(norm);

          // Alpha curve: denser in center, fading smoothly toward outer strands
          const alpha = (0.32 - absNorm * 0.22) * (0.8 + 0.2 * Math.sin(time * 2 + i * 0.15));

          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 0, 0, ${Math.max(0.04, alpha)})`;
          ctx.lineWidth = 1.1;

          let isFirst = true;

          for (let x = -40; x <= ribbonWidth + 40; x += STEP) {
            // Horizontal progress normalized [0..1]
            const xNorm = x / ribbonWidth;

            // Envelope window: smooth swell in middle, tapered at left and right edges
            const envelope = Math.sin(xNorm * Math.PI);
            const smoothEnv = Math.pow(Math.max(0, envelope), 1.2);

            // Primary carrier wave
            const wave1 = Math.sin(xNorm * 4.5 + time * 1.4) * 55;

            // Secondary undulating harmonic wave
            const wave2 = Math.sin(xNorm * 7.2 - time * 1.1 + norm * 0.8) * 32;

            // Micro turbulence / acoustic vibration
            const wave3 = Math.cos(xNorm * 11.5 + time * 2.2 + i * 0.05) * 12;

            // Ribbon spread / thickness modulation across strands
            const ribbonSpread = (norm * 75 + Math.sin(xNorm * 3.8 + time + norm * 1.2) * 28) * smoothEnv;

            // Calculate final Y position for this strand
            const y = centerY + (wave1 + wave2 + wave3) * smoothEnv + ribbonSpread;

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

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={style}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default SonicWaveformBackground;
