"use client";

export function SocialProofLogos() {
  const logos = [
    { name: "Vercel", label: "▲ Vercel" },
    { name: "OpenAI", label: "OpenAI" },
    { name: "Spotify", label: "Spotify" },
    { name: "Shopify", label: "Shopify" },
    { name: "Meta", label: "Meta" },
    { name: "Apple", label: " Apple" },
  ];

  return (
    <section className="py-12 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p
          className="text-xs font-mono tracking-widest uppercase mb-8"
          style={{ color: "var(--color-ash)" }}
        >
          Trusted by builders, writers & developers at
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75">
          {logos.map((logo) => (
            <span
              key={logo.name}
              className="text-lg sm:text-xl font-semibold tracking-tight font-sans transition-opacity hover:opacity-100"
              style={{ color: "var(--color-pearl)" }}
            >
              {logo.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
