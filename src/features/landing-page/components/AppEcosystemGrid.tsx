"use client";

interface AppItem {
  name: string;
  category: string;
  icon: (props: { className?: string }) => JSX.Element;
}

const APPS: AppItem[] = [
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
    name: "Google Calendar",
    category: "Schedule",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"/>
      </svg>
    ),
  },
  {
    name: "GitHub",
    category: "Code & Issues",
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
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
