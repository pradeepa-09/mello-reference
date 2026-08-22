import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFFFF",
        beige: "#F5F5F5",
        "beige-dark": "#E5E5E5",
        charcoal: "#222222",
        "charcoal-soft": "#555555",
        ink: "#000000",
        grey: "#E5E5E5",
        "grey-line": "#D4D4D4",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 20px 60px -25px rgba(20, 18, 14, 0.25)",
        card: "0 12px 30px -18px rgba(20, 18, 14, 0.35)",
        key: "0 2px 0 0 rgba(20,18,14,0.9), 0 6px 14px -6px rgba(20,18,14,0.4)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wave: {
          "0%, 100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
