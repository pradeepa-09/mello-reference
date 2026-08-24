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
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      {/* Floating Pill Container - Slim, Thinner & Sleek */}
      <div className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 lg:gap-8 pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full bg-[#0E0E0E]/95 border border-neutral-800/90 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all w-auto max-w-5xl">
        {/* Left: Mello Brand Mark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center justify-center shrink-0 hover:scale-105 transition-transform py-0.5 select-none pr-1"
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

        {/* Center: Spacious Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 px-1" aria-label="Main Navigation">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs sm:text-[12px] font-medium text-neutral-400 hover:text-white transition-colors select-none whitespace-nowrap py-0.5"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Request Access Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={primaryCta?.href || "#waitlist"}
            onClick={(e) => handleNavClick(e, primaryCta?.href || "#waitlist")}
            className="inline-flex items-center justify-center text-xs sm:text-[12px] font-semibold px-4 sm:px-5 py-1.5 sm:py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-xs cursor-pointer whitespace-nowrap leading-none"
          >
            {primaryCta?.label || "Request access"}
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="md:hidden p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors ml-1"
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
