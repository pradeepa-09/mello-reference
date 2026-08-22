"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { LandingCta, LandingNavigationItem } from "../types";

interface NavbarProps {
  navigation?: LandingNavigationItem[];
  primaryCta?: LandingCta;
}

const NAVBAR_LINKS = [
  { label: "Actions", href: "#how-it-works" },
  { label: "Meetings", href: "#meeting" },
  { label: "Memory", href: "#your-mello" },
  { label: "Personalize", href: "#your-mello" },
  { label: "Download", href: "#download" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar({ primaryCta }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Floating Pill Container (Matching Image 2) */}
      <div className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 pl-3 pr-2 py-2 rounded-full bg-[#0E0E0E] border border-neutral-800/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all">
        {/* Left: Mello Waveform Brand Mark (Pure Transparent) */}
        <a
          href="#top"
          className="flex items-center justify-center shrink-0 hover:scale-105 transition-transform px-1.5 py-1 select-none"
          aria-label="Mello Home"
        >
          <Image
            src="/brand/mello-inline-logo.png"
            alt="Mello"
            width={28}
            height={10}
            className="w-auto h-2.5 sm:h-3 object-contain opacity-95"
            priority
          />
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 px-1" aria-label="Main Navigation">
          {NAVBAR_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs sm:text-[13px] font-medium text-neutral-400 hover:text-white transition-colors select-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Request Access Button */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={primaryCta?.href || "#download"}
            className="inline-flex items-center justify-center text-xs sm:text-[13px] font-semibold px-4 sm:px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            Request access
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="lg:hidden p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {open && (
        <div className="pointer-events-auto absolute top-16 inset-x-4 max-w-sm mx-auto p-4 rounded-3xl bg-[#0E0E0E] border border-neutral-800 backdrop-blur-2xl shadow-2xl flex flex-col gap-2.5 lg:hidden">
          {NAVBAR_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
