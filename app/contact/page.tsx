import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";

export const metadata: Metadata = { title: "Contact | Mello" };

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Get in touch"
      title="Contact Mello"
      intro="Have questions about Mello, our desktop voice experience, security architecture, or enterprise deployments? Reach out directly to our team."
      updated="August 22, 2026"
      sections={[
        {
          title: "General inquiries & product support",
          paragraphs: [
            "For questions about Mello, feature inquiries, bug reports, or assistance getting started with the desktop application, please email our support team directly.",
            "We aim to respond to all inquiries within 24 hours during standard business days.",
          ],
          items: [
            "General & Product Inquiries: contact@mello.com",
            "Response Time: Typically within 1 business day",
            "Supported Operating Systems: macOS (Apple Silicon & Intel) and Windows 10/11",
          ],
        },
        {
          title: "Security & responsible disclosure",
          paragraphs: [
            "Mello is built around deliberate control, local-first processing, and explicit user approvals. If you believe you have discovered a potential security vulnerability or safety issue, please review our responsible disclosure process and notify us immediately.",
            "Please include detailed reproduction steps, the affected platform or component, and any relevant logs or screen captures to assist our security investigation.",
          ],
          items: [
            "Security Reporting: contact@mello.com",
            "Subject Line: [Security] Vulnerability Report",
            "Encryption / PGP: Available upon request for sensitive reports",
          ],
        },
        {
          title: "Enterprise & custom integrations",
          paragraphs: [
            "For organizations seeking on-premise model isolation, custom internal connectors, team-wide policy controls, or volume licensing, contact our solutions team.",
          ],
          items: [
            "Enterprise Pilots & Licensing: contact@mello.com",
            "Custom Workspace Integrations: Available for enterprise teams",
            "Dedicated Support & SLA: Included with enterprise agreements",
          ],
        },
        {
          title: "Press, media & brand assets",
          paragraphs: [
            "For press inquiries, interview requests, or official Mello brand assets (logos, screenshots, and guidelines), contact our media team.",
          ],
          items: [
            "Press & Media Inquiries: contact@mello.com",
            "Brand Kit: Vector logos, app icons, and press kit available upon request",
          ],
        },
        {
          title: "Office & operations",
          paragraphs: [
            "Mello is created and maintained by a distributed, remote-first team based in San Francisco, California.",
          ],
        },
      ]}
    />
  );
}
