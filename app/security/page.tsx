import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";

export const metadata: Metadata = {title: "Security | Mello"};

export default function SecurityPage() {
  return <LegalPage
    eyebrow="Designed around deliberate control"
    title="Security at Mello"
    intro="Mello is designed to keep actions visible, permissions limited, and sensitive access under your control."
    updated="August 22, 2026"
    showDoesNot
    sections={[
      {
        title: "Current security scope",
        paragraphs: ["This page describes Mello’s current product-level security approach and available controls. Mello does not currently claim a specific certification, an independent security audit, or compliance with a named framework. Any future certification or audit will be identified here only after it is completed and can be verified."],
      },
      {
        title: "Approval before action",
        paragraphs: ["For supported Actions, Mello shows the action plan before sending an email, creating an event, or opening a GitHub issue. Approve, edit, and cancel controls help users catch incorrect destinations or details before execution. You should still verify the connected service after an important Action."],
      },
      {
        title: "Limited permissions",
        paragraphs: ["Mello requests permissions relevant to the connected-service feature being enabled. The Gmail, Google Calendar, GitHub, or other provider authorization screen is the authoritative record of the access granted. You can revoke a connection through the provider, which prevents later use of that authorization by Mello."],
      },
      {
        title: "How Mello protects your information",
        items: [
          "Encryption in transit — Production communication uses HTTPS or equivalent encrypted transport supported by the client and service provider.",
          "Limited internal access — Production access is restricted to authorized people and systems that need it for an operational purpose.",
          "Secrets outside source code — Service credentials and secrets must not be committed to public application source code.",
          "Careful diagnostics — Diagnostics should avoid unnecessary user content and be used for reliability, support, abuse prevention, and investigation.",
        ],
      },
      {
        title: "Account and access security",
        paragraphs: ["Mello uses the authentication controls available in the current product and limits internal access according to role and operational need. Authentication and session controls may evolve during beta. You are responsible for protecting your device, account credentials, and connected-service sessions, and for notifying us if you suspect unauthorized access."],
      },
      {
        title: "Voice and meeting controls",
        items: [
          "Microphone access begins only after you deliberately start Dictation, an Action, or Meeting Mode.",
          "The public landing page does not request microphone or connected-account access.",
          "Meeting participants are labeled “You” and “Other”; Mello does not currently promise contact-level speaker identification.",
          "Users remain responsible for recording consent and for stopping a session when capture is no longer needed.",
        ],
      },
      {
        title: "Product controls",
        items: [
          "Voice capture starts only when you activate it.",
          "Saved Memory can be reviewed and removed through available controls.",
          "Dictionary entries and Snippets can be reviewed and removed.",
          "Connected services can be disconnected.",
        ],
      },
      {
        title: "Security monitoring",
        paragraphs: ["As production capabilities are introduced, Mello’s operational process includes service-health monitoring, investigation of suspicious activity, software updates, and review of security controls where those capabilities are available. No system can be guaranteed completely secure, so controls will continue to evolve with the product."],
      },
      {
        title: "Vendors and development practices",
        paragraphs: ["Providers that process Mello data are evaluated according to the sensitivity of their role where they are introduced. Development practices include change review, dependency maintenance, separation of secrets from public source code, and risk-based handling of security issues where those processes are available. These practices continue to mature and are not presented as an external audit."],
      },
      {
        title: "Incident response",
        paragraphs: ["If Mello identifies a security incident, the response is to contain it, understand its impact, restore normal operation, preserve relevant evidence, and reduce the chance of recurrence. When legally required, affected users and authorities will be notified with available information and practical next steps."],
      },
      {
        title: "Your role",
        items: [
          "Keep your operating system and Mello installation up to date.",
          "Protect your device login, email account, GitHub account, and any recovery methods.",
          "Review recipients, dates, repositories, issue details, and other fields before approval.",
          "Revoke connected-service access and contact Mello if a device or account may be compromised.",
        ],
      },
      {
        title: "Report a vulnerability",
        paragraphs: ["If you believe you have found a security issue, email contact@mello.com with a clear description, reproduction steps, affected component, and potential impact. Do not access another person’s data, disrupt the service, use destructive testing, or publicly disclose an unresolved issue. Mello does not currently advertise a bug-bounty payment program; responsible reports will be assessed as quickly as practical."],
      },
      {
        title: "Security questions",
        paragraphs: ["For security reviews, vulnerability reports, or questions about Mello’s controls, contact contact@mello.com."],
      },
    ]}
  />;
}
