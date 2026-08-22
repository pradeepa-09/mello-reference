"use client";

interface AppItem {
  name: string;
  category: string;
  icon: (props: { className?: string }) => JSX.Element;
}

const APPS: AppItem[] = [
  {
    name: "Slack",
    category: "Messaging",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
      </svg>
    ),
  },
  {
    name: "Gmail",
    category: "Email",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
  },
  {
    name: "Notion",
    category: "Docs",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.11c-.42-.326-.981-.7-2.055-.607L3.01 2.53c-.466.047-.56.28-.373.466zm.84 3.733v12.457c0 .7.374.933 1.167.886l14.428-.84c.793-.046.98-.466.98-1.12V6.774c0-.653-.28-.933-.887-.887l-14.71.84c-.7.047-.978.42-.978 1.214zm13.727 1.026l.093 9.472c.047.653-.186.886-.746.933l-2.008.093c-.466.047-.653-.186-.653-.653v-5.18l-3.546 4.947c-.28.373-.56.466-.98.466l-1.913.093c-.466.047-.653-.186-.653-.653V9.52c0-.466.186-.7.653-.746l1.913-.093c.466-.047.653.186.653.653v4.993l3.407-4.854c.28-.373.606-.466 1.026-.466l2.147-.093c.466-.047.606.186.653.653z"/>
      </svg>
    ),
  },
  {
    name: "Linear",
    category: "Issues",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M3.568 2.05L2.05 3.568l18.382 18.382 1.518-1.518L3.568 2.05zM2.05 10.45l7.982-7.982 1.518 1.518-7.982 7.982L2.05 10.45zm11.968 11.5l7.982-7.982-1.518-1.518-7.982 7.982 1.518 1.518z"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    category: "Code",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
  {
    name: "Calendar",
    category: "Schedule",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/>
      </svg>
    ),
  },
  {
    name: "VS Code",
    category: "Editor",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.583 2.002L9.043 9.948 4.298 6.332 2 7.498l4.499 4.5-4.499 4.505 2.298 1.163 4.745-3.616 8.54 7.948L22 20.354V3.646l-4.417-1.644zm.417 4.704v10.588l-6.16-5.294 6.16-5.294z"/>
      </svg>
    ),
  },
  {
    name: "Cursor",
    category: "AI IDE",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 2l16 8-8 3-3 8-5-19z"/>
      </svg>
    ),
  },
  {
    name: "Telegram",
    category: "Chat",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    category: "Chat",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.48 3.52 1.38 5.04L2 22.56l5.77-1.47c1.47.8 3.12 1.22 4.82 1.22 5.46 0 9.91-4.45 9.91-9.91A9.91 9.91 0 0 0 12.04 2zm5.82 14.07c-.24.68-1.22 1.25-1.74 1.31-.49.06-1.12.08-3.62-.94-2.88-1.18-4.73-4.14-4.87-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.24-.28.53-.35.7-.35.18 0 .35 0 .5.01.16.01.38-.06.59.45.22.53.75 1.83.82 1.97.07.14.12.31.02.5-.09.19-.14.31-.29.47-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.16.28.73 1.2 1.57 1.94 1.08.96 1.99 1.26 2.27 1.4.28.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.28.38-.24.64-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.7-.17 1.38z"/>
      </svg>
    ),
  },
];

export function AppEcosystemGrid() {
  return (
    <section
      id="ecosystem"
      className="section py-20 text-white border-b border-neutral-900"
    >
      <div className="wrap max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p
            className="text-xs font-mono font-bold tracking-widest uppercase mb-2"
            style={{ color: "var(--color-ash)" }}
          >
            01 · Integrations
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight"
            style={{ letterSpacing: "var(--tracking-heading-lg)" }}
          >
            Actions that reach into the apps you use
          </h2>
          <p
            className="text-sm sm:text-base mt-3 leading-relaxed font-normal"
            style={{ color: "var(--color-mist)" }}
          >
            Dictate and trigger instant workflows directly across your entire stack.
          </p>
        </div>

        {/* Grid of Grayscale App Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
        {APPS.map((app) => {
          const Icon = app.icon;
          return (
            <div
              key={app.name}
              className="group relative flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--color-obsidian)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                borderRadius: "var(--radius-lg)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.22)";
                e.currentTarget.style.backgroundColor = "var(--color-charcoal)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.backgroundColor = "var(--color-obsidian)";
              }}
            >
              {/* Monochrome Icon Container */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors text-white"
                style={{
                  backgroundColor: "var(--color-charcoal)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Icon className="w-6 h-6 text-white group-hover:text-white" />
              </div>

              {/* App Name */}
              <strong
                className="text-sm font-semibold tracking-tight text-white"
                style={{ color: "var(--color-pearl)" }}
              >
                {app.name}
              </strong>

              {/* Category Label */}
              <span
                className="text-[11px] font-mono mt-0.5"
                style={{ color: "var(--color-fog)" }}
              >
                {app.category}
              </span>
            </div>
          );
        })}
      </div>

      <p
        className="text-[11px] text-center font-mono mt-10 tracking-tight"
        style={{ color: "var(--color-fog)" }}
      >
        * All product names, logos, and brands are property of their respective owners. Mentioning them does not imply affiliation or endorsement.
      </p>
      </div>
    </section>
  );
}
