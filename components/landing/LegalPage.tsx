"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Check, Mail } from "lucide-react";
import { BrandLogo } from "@/src/shared/components";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

const MELLO_DOES_NOT = [
  "Mello does not require continuous listening.",
  "The public landing page does not request microphone access.",
  "Supported Actions are not executed before review and Approval.",
  "Mello does not present personal information as a product for sale.",
  "Mello does not currently claim contact-level speaker identification in Meeting Mode.",
];

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  showDoesNot = false,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  showDoesNot?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const sectionIds = useMemo(() => sections.map(section => slug(section.title)), [sections]);
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const nodes = sectionIds
      .map(id => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {rootMargin: "-12% 0px -68% 0px", threshold: [0, .2, .6]},
    );

    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [sectionIds]);

  const focusSection = (id: string) => {
    setActiveId(id);
    window.requestAnimationFrame(() => document.getElementById(id)?.focus({preventScroll: true}));
  };

  const legalLinks = [
    ["Privacy", "/privacy", "Privacy Policy"],
    ["Terms", "/terms", "Terms of Service"],
    ["Security", "/security", "Security at Mello"],
    ["Contact", "/contact", "Contact Mello"],
  ];

  const tocLinks = (mobile = false) => sections.map(section => {
    const id = slug(section.title);
    return (
      <a
        key={section.title}
        href={`#${id}`}
        className={activeId === id ? "is-active" : ""}
        aria-current={activeId === id ? "location" : undefined}
        onClick={() => focusSection(id)}
        tabIndex={0}
      >
        {!mobile && <i aria-hidden="true"/>}
        {section.title}
      </a>
    );
  });

  return (
    <main className="legal-page">
      <nav className="legal-nav">
        <a className="brand" href="/"><BrandLogo /></a>
        <div className="legal-nav-links" aria-label="Legal pages">
          {legalLinks.map(([label, href, pageTitle]) => (
            <a key={href} href={href} aria-current={title === pageTitle ? "page" : undefined}>{label}</a>
          ))}
        </div>
        <a className="legal-back" href="/"><ArrowLeft size={15} /> Back to Mello</a>
      </nav>

      <motion.header
        className="legal-hero"
        initial={reduceMotion ? false : {opacity: 0, y: 18}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: .55, ease: [.22, 1, .36, 1]}}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
        <small>Last updated {updated}</small>
      </motion.header>

      {showDoesNot && (
        <section className="legal-does-not" aria-labelledby="mello-does-not-title">
          <div><small>PLAIN-LANGUAGE COMMITMENTS</small><h2 id="mello-does-not-title">What Mello does not do</h2></div>
          <ul>{MELLO_DOES_NOT.map(item => <li key={item}><Check size={14}/><span>{item}</span></li>)}</ul>
        </section>
      )}

      <details className="legal-mobile-toc">
        <summary>On this page <span>{sections.length} sections</span></summary>
        <nav aria-label="Page sections">{tocLinks(true)}</nav>
      </details>

      <div className="legal-layout">
        <aside>
          <strong>On this page</strong>
          <nav aria-label="Page sections">{tocLinks()}</nav>
          <a className="legal-contact" href="mailto:contact@mello.com"><Mail size={15} /> contact@mello.com</a>
        </aside>

        <article className="legal-content">
          {sections.map(section => (
            <section id={slug(section.title)} key={section.title} tabIndex={-1}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              {section.items && <ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
        </article>
      </div>

      <motion.section
        className="legal-help"
        initial={reduceMotion ? false : {opacity: 0, y: 12}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: .35}}
        transition={{duration: .45, ease: [.22, 1, .36, 1]}}
      >
        <div>
          <p className="eyebrow">Need help?</p>
          <h2>Questions about privacy, security, or these terms?</h2>
          <p>Contact the Mello team.</p>
        </div>
        <a href="mailto:contact@mello.com"><Mail size={16} /> contact@mello.com</a>
      </motion.section>

      <footer className="legal-footer">
        <a className="brand inverse" href="/"><BrandLogo inverse /></a>
        <span>© {new Date().getFullYear()} Mello</span>
        <div><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a><a href="/security">Security</a><a href="/contact">Contact</a></div>
      </footer>
    </main>
  );
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
