"use client";

import { Cpu, Cloud, Zap, CheckCircle2 } from "lucide-react";

export function ModelSpectrum() {
  const LOCAL_MODELS = [
    { name: "Whisper Turbo", speed: "Instant (<200ms)", accuracy: "98.5%", size: "Local (On-device)", vram: "1.2 GB" },
    { name: "Distil-Whisper", speed: "Ultra-fast (<120ms)", accuracy: "97.8%", size: "Local (On-device)", vram: "750 MB" },
    { name: "Whisper Large v3", speed: "Fast (<450ms)", accuracy: "99.4%", size: "Local (On-device)", vram: "3.1 GB" },
    { name: "Whisper Base / Small", speed: "Near-instant", accuracy: "96.2%", size: "Local (On-device)", vram: "500 MB" },
  ];

  const CLOUD_PROVIDERS = [
    { name: "OpenAI GPT-4o / Whisper", type: "Cloud Intelligence", badge: "API Key or Pro" },
    { name: "Anthropic Claude 3.5 Sonnet", type: "Deep Reasoning", badge: "API Key or Pro" },
    { name: "Google Gemini 1.5 Pro", type: "1M+ Token Context", badge: "API Key or Pro" },
    { name: "xAI Grok & Mistral Large", type: "Specialized LLMs", badge: "API Key or Pro" },
  ];

  return (
    <section id="models" className="py-24 px-4 max-w-7xl mx-auto border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs font-mono font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-ash)" }}>
          04 · Model Spectrum
        </p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight" style={{ letterSpacing: "var(--tracking-heading-lg)" }}>
          Choose your engine. Local speed or frontier intelligence.
        </h2>
        <p className="text-sm sm:text-base mt-4 leading-relaxed" style={{ color: "var(--color-mist)" }}>
          Run ultra-fast open weights entirely offline, or connect your own API keys for state-of-the-art cloud LLMs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Local Engine Card */}
        <div
          className="rounded-3xl border p-8 sm:p-10 flex flex-col justify-between"
          style={{ backgroundColor: "var(--color-obsidian)", borderColor: "rgba(255, 255, 255, 0.12)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--color-charcoal)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">On-Device Local AI</h3>
                <p className="text-xs font-mono" style={{ color: "var(--color-ash)" }}>Zero latency • 100% Offline • Apple Silicon / CUDA</p>
              </div>
            </div>

            <div className="space-y-3">
              {LOCAL_MODELS.map((model) => (
                <div
                  key={model.name}
                  className="p-4 rounded-2xl border flex items-center justify-between transition-colors hover:border-white/20"
                  style={{ backgroundColor: "var(--color-charcoal)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div>
                    <strong className="text-sm font-semibold text-white block">{model.name}</strong>
                    <span className="text-xs font-mono" style={{ color: "var(--color-ash)" }}>{model.size} • {model.vram}</span>
                  </div>
                  <div className="text-right font-mono text-xs">
                    <span className="text-white block font-medium">{model.speed}</span>
                    <span style={{ color: "var(--color-mist)" }}>Acc: {model.accuracy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cloud LLM Engine Card */}
        <div
          className="rounded-3xl border p-8 sm:p-10 flex flex-col justify-between"
          style={{ backgroundColor: "var(--color-obsidian)", borderColor: "rgba(255, 255, 255, 0.12)" }}
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "var(--color-charcoal)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">Frontier Cloud LLMs</h3>
                <p className="text-xs font-mono" style={{ color: "var(--color-ash)" }}>BYOK (Bring Your Own Key) or Mello Pro</p>
              </div>
            </div>

            <div className="space-y-3">
              {CLOUD_PROVIDERS.map((provider) => (
                <div
                  key={provider.name}
                  className="p-4 rounded-2xl border flex items-center justify-between transition-colors hover:border-white/20"
                  style={{ backgroundColor: "var(--color-charcoal)", borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <div>
                    <strong className="text-sm font-semibold text-white block">{provider.name}</strong>
                    <span className="text-xs" style={{ color: "var(--color-mist)" }}>{provider.type}</span>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full border bg-white/5" style={{ borderColor: "rgba(255,255,255,0.1)", color: "var(--color-pearl)" }}>
                    {provider.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
