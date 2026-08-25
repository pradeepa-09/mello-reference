"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { LandingCta, LandingNavigationItem } from "../types";

interface NavbarProps {
  navigation?: LandingNavigationItem[];
  primaryCta?: LandingCta;
}

const DEFAULT_NAV_LINKS: LandingNavigationItem[] = [
  { label: "Actions", href: "#trust-flow" },
  { label: "Meetings", href: "#meeting" },
  { label: "Memory", href: "#memory" },
  { label: "Personalize", href: "#personalize" },
  { label: "Download", href: "#download" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar({ navigation, primaryCta }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const links = navigation && navigation.length > 0 ? navigation : DEFAULT_NAV_LINKS;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }
      setOpen(false);
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      {/* Floating Pill Container - Exact Replicated Aesthetic */}
      <div className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 lg:gap-8 p-1 sm:p-1.5 rounded-full bg-[#121214]/95 border border-white/[0.12] shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-[920px]">
        {/* Left: Circular White Logo Button with Wave */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform select-none"
          aria-label="Mello Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm p-1.5">
            <Image
              src="/brand/mello-inline-logo-dark.png"
              alt="Mello"
              width={24}
              height={10}
              className="w-[18px] h-auto object-contain brightness-0"
              priority
            />
          </div>
        </a>

        {/* Center: Spacious Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10 px-2 justify-center flex-1" aria-label="Main Navigation">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-[13px] sm:text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors select-none whitespace-nowrap py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Solid White Pill Request Access Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={primaryCta?.href || "#waitlist"}
            onClick={(e) => handleNavClick(e, primaryCta?.href || "#waitlist")}
            className="inline-flex items-center justify-center text-[13px] sm:text-[13.5px] font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-black hover:bg-neutral-100 active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap leading-none"
          >
            {primaryCta?.label || "Request access"}
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors ml-0.5"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {open && (
        <div className="pointer-events-auto absolute top-16 inset-x-4 max-w-sm mx-auto p-4 rounded-3xl bg-[#0E0E0E] border border-neutral-800 backdrop-blur-2xl shadow-2xl flex flex-col gap-2 md:hidden">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
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
