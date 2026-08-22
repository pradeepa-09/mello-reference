"use client";

export function KeyboardAppMatrix() {
  const ROW_1 = [
    { name: "Sublime", letter: "S", bg: "#f58231", color: "#ffffff" },
    { name: "Excel", letter: "X", bg: "#107c41", color: "#ffffff" },
    { name: "Slack", letter: "Sl", bg: "#4a154b", color: "#ffffff" },
    { name: "Evernote", letter: "Ev", bg: "#00a82d", color: "#ffffff" },
    { name: "Notion", letter: "N", bg: "#ffffff", color: "#000000" },
    { name: "VS Code", letter: "VS", bg: "#007acc", color: "#ffffff" },
    { name: "Ulysses", letter: "Ul", bg: "#ff9500", color: "#ffffff" },
    { name: "Notes", letter: "No", bg: "#ffd60a", color: "#000000" },
    { name: "Obsidian", letter: "Ob", bg: "#7b68ee", color: "#ffffff" },
    { name: "WhatsApp", letter: "WA", bg: "#25d366", color: "#ffffff" },
    { name: "Word", letter: "W", bg: "#185abd", color: "#ffffff" },
    { name: "Butterfly", letter: "🦋", bg: "#ffcc00", color: "#000000" },
  ];

  const ROW_2 = [
    { name: "Discord", letter: "Di", bg: "#5865f2", color: "#ffffff" },
    { name: "Meet", letter: "Me", bg: "#00ac47", color: "#ffffff" },
    { name: "Linear", letter: "Li", bg: "#5e6ad2", color: "#ffffff" },
    { name: "Gmail", letter: "Gm", bg: "#ea4335", color: "#ffffff" },
    { name: "Raycast", letter: "Rc", bg: "#ff6363", color: "#ffffff" },
    { name: "Zoom", letter: "Zm", bg: "#2d8cff", color: "#ffffff" },
    { name: "Figma", letter: "Fg", bg: "#ff7262", color: "#ffffff" },
    { name: "Zotero", letter: "Z", bg: "#cc292b", color: "#ffffff" },
    { name: "Maccy", letter: "Mc", bg: "#34c759", color: "#ffffff" },
    { name: "Books", letter: "Bk", bg: "#ff9f0a", color: "#ffffff" },
    { name: "Airmail", letter: "Am", bg: "#ff3b30", color: "#ffffff" },
    { name: "Spark", letter: "Sp", bg: "#007aff", color: "#ffffff" },
  ];

  const ROW_3 = [
    { name: "TeX", letter: "T", bg: "#ffffff", color: "#000000" },
    { name: "Sparkle", letter: "✦", bg: "#af52de", color: "#ffffff" },
    { name: "Claude", letter: "⚛", bg: "#30d158", color: "#000000" },
    { name: "Messages", letter: "💬", bg: "#34c759", color: "#ffffff" },
    { name: "Mail", letter: "✉", bg: "#007aff", color: "#ffffff" },
    { name: "Outlook", letter: "Ot", bg: "#0078d4", color: "#ffffff" },
    { name: "Bear", letter: "🐻", bg: "#ff3b30", color: "#ffffff" },
    { name: "Safari", letter: "Sf", bg: "#ffffff", color: "#000000" },
    { name: "InDesign", letter: "Id", bg: "#ff3366", color: "#ffffff" },
    { name: "TextEdit", letter: "📝", bg: "#e5e5ea", color: "#000000" },
    { name: "Anthropic", letter: "✳", bg: "#d97706", color: "#ffffff" },
  ];

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Works <span className="text-white">anywhere</span>
          <br />
          <span className="text-white/60">you can type</span>
        </h2>
        <p className="text-sm sm:text-base mt-4 font-normal text-white/70">
          Slack, Cursor, Notion... You say it, Mello handles it.
        </p>
      </div>

      {/* 3D Mechanical Keyboard Body */}
      <div className="max-w-4xl mx-auto flex items-center justify-center p-2 sm:p-6 select-none" style={{ perspective: "1000px" }}>
        <div
          className="w-full rounded-[36px] p-5 sm:p-7 border shadow-2xl transition-transform duration-500 hover:rotate-x-0"
          style={{
            backgroundColor: "#161719",
            borderColor: "rgba(255, 255, 255, 0.14)",
            transform: "rotateX(22deg) rotateY(-2deg)",
            transformStyle: "preserve-3d",
            boxShadow: "0 30px 60px rgba(0,0,0,0.9), inset 0 2px 2px rgba(255,255,255,0.2)",
          }}
        >
          {/* Top Function Blank Keys */}
          <div className="flex gap-2 sm:gap-2.5 mb-2.5 overflow-hidden">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-8 sm:h-9 rounded-xl border transition-all"
                style={{
                  backgroundColor: "#202125",
                  borderColor: "rgba(255,255,255,0.06)",
                  boxShadow: "0 4px 0 #0f1012",
                }}
              />
            ))}
          </div>

          {/* Row 1 App Keycaps */}
          <div className="flex gap-2 sm:gap-2.5 mb-2.5 justify-center">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
            {ROW_1.map((app) => (
              <div
                key={app.name}
                className="flex-1 h-10 sm:h-12 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-1 active:translate-y-1 cursor-pointer"
                style={{
                  backgroundColor: app.bg,
                  color: app.color,
                  boxShadow: "0 5px 0 rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
                title={app.name}
              >
                {app.letter}
              </div>
            ))}
            <div className="w-12 sm:w-16 h-10 sm:h-12 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
          </div>

          {/* Row 2 App Keycaps */}
          <div className="flex gap-2 sm:gap-2.5 mb-2.5 justify-center">
            <div className="w-14 sm:w-16 h-10 sm:h-12 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
            {ROW_2.map((app) => (
              <div
                key={app.name}
                className="flex-1 h-10 sm:h-12 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-1 active:translate-y-1 cursor-pointer"
                style={{
                  backgroundColor: app.bg,
                  color: app.color,
                  boxShadow: "0 5px 0 rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
                title={app.name}
              >
                {app.letter}
              </div>
            ))}
            <div className="w-14 sm:w-18 h-10 sm:h-12 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
          </div>

          {/* Row 3 App Keycaps */}
          <div className="flex gap-2 sm:gap-2.5 mb-2.5 justify-center">
            <div className="w-16 sm:w-20 h-10 sm:h-12 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
            {ROW_3.map((app) => (
              <div
                key={app.name}
                className="flex-1 h-10 sm:h-12 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shadow-md transition-transform hover:-translate-y-1 active:translate-y-1 cursor-pointer"
                style={{
                  backgroundColor: app.bg,
                  color: app.color,
                  boxShadow: "0 5px 0 rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.3)",
                }}
                title={app.name}
              >
                {app.letter}
              </div>
            ))}
            <div className="w-16 sm:w-20 h-10 sm:h-12 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
          </div>

          {/* Bottom Spacebar Row */}
          <div className="flex gap-2 sm:gap-2.5 justify-center">
            <div className="w-12 h-10 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
            <div className="w-12 h-10 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
            <div className="w-14 h-10 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
            <div className="flex-1 max-w-sm h-10 rounded-xl bg-[#24252a] border border-white/10 shadow-[0_4px_0_#0f1012]" />
            <div className="w-14 h-10 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
            <div className="w-12 h-10 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
            <div className="w-12 h-10 rounded-xl bg-[#202125] border border-white/5 shadow-[0_4px_0_#0f1012]" />
          </div>
        </div>
      </div>
    </section>
  );
}
