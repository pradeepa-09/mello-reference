import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";

export const metadata: Metadata = {title: "Terms of Service | Mello"};

export default function TermsPage() {
  return <LegalPage
    eyebrow="Clear terms for using Mello"
    title="Terms of Service"
    intro="These terms govern access to and use of Mello. By using the service, you agree to them."
    updated="August 22, 2026"
    sections={[
      {
        title: "Product status",
        paragraphs: ["Mello may be offered as a private beta, preview, or evolving desktop product. Features, supported platforms, integrations, limits, and availability can change as the product is tested and improved. Preview features may be incomplete or unavailable at times and should not be relied on for emergency, safety-critical, medical, legal, or financial decisions."],
      },
      {
        title: "Using Mello",
        paragraphs: ["You must be legally able to enter into these terms and provide accurate account information. You are responsible for activity under your account and for protecting your credentials."],
      },
      {
        title: "Dictation, Actions, and approval",
        paragraphs: ["Dictation converts speech into text in the active field.", "Actions may interpret a request, resolve relevant details, and prepare an action plan for a connected service. Mello shows supported Actions for review before they are sent or created.", "You remain responsible for checking recipients, dates, times, accounts, calendars, repositories, wording, and every other material detail before Approval. Do not assume a transcript, generated draft, contact match, date interpretation, or proposed Action is correct. If a result matters, verify it in Mello and in the connected service."],
      },
      {
        title: "Meeting Mode and consent",
        paragraphs: ["Meeting Mode may record or process audio to produce transcripts, notes, and summaries. You are responsible for obtaining any notice or consent required from participants and for using the feature in compliance with applicable workplace rules and recording laws. Mello’s generic “You” and “Other” labels are not a promise of speaker identification."],
      },
      {
        title: "Your content and instructions",
        paragraphs: ["You retain ownership of content you provide. You grant Mello the limited rights needed to process that content and carry out features you request. You are responsible for reviewing generated text and every action plan before Approval."],
      },
      {
        title: "Connected services",
        paragraphs: ["When you connect a third-party service, your use of that service remains subject to its own terms and policies. You authorize Mello to use the connection within the permissions you grant and in response to your instructions. You are responsible for maintaining permission to access any account, repository, calendar, message, or other connected content."],
      },
      {
        title: "Acceptable use",
        items: [
          "Do not use Mello for unlawful, fraudulent, abusive, or harmful activity.",
          "Do not attempt to bypass safeguards, interfere with the service, or gain unauthorized access.",
          "Do not upload content you lack permission to use.",
          "Do not use automated means to overload, scrape, or disrupt the service.",
        ],
      },
      {
        title: "Subscriptions and payment",
        paragraphs: ["The landing page may describe planned or illustrative pricing. A paid obligation begins only if Mello presents checkout terms and you complete a purchase. Before charging, the applicable price, billing interval, renewal behavior, taxes, and cancellation terms should be shown. Where no checkout is available, displayed pricing does not itself create a subscription."],
      },
      {
        title: "Service changes",
        paragraphs: ["Mello may change, add, or remove features as the product evolves. We may suspend access when necessary for security, maintenance, legal compliance, or a material breach of these terms."],
      },
      {
        title: "Disclaimers",
        paragraphs: ["Mello is provided on an “as available” and, where permitted, “as is” basis. Generated text, transcriptions, summaries, contact matches, date interpretations, and suggested actions may contain errors. Connected services may change or become unavailable. To the extent permitted by law, Mello disclaims warranties that are not expressly stated in these terms. Mandatory consumer rights remain unaffected."],
      },
      {
        title: "Liability",
        paragraphs: ["To the extent permitted by law, Mello will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, data, goodwill, or business opportunities arising from use of the service. Nothing in these terms excludes liability that cannot lawfully be excluded. Mandatory consumer rights remain unaffected."],
      },
      {
        title: "Feedback",
        paragraphs: ["If you send ideas, suggestions, or product feedback, you allow Mello to use them without restriction or payment to improve the product. This does not transfer ownership of your separate content or confidential information."],
      },
      {
        title: "Intellectual property",
        paragraphs: ["Mello, including its software, visual design, branding, and documentation, is owned by Mello or its licensors and is protected by applicable intellectual property laws. These terms give you a limited, personal, nonexclusive, nontransferable right to use the service while your account remains in good standing."],
      },
      {
        title: "Termination",
        paragraphs: ["You may stop using Mello at any time. We may restrict or terminate access if you materially breach these terms, create risk for other users or the service, or if required by law. Provisions that by their nature should survive termination, including ownership, disclaimers, and liability limitations, will continue to apply."],
      },
      {
        title: "Disputes and governing terms",
        paragraphs: ["Applicable law and any required dispute process may depend on the Mello entity serving you and your place of residence. Any mandatory consumer protections available to you remain unaffected. If a specific governing-law term is presented during signup or checkout, that term controls."],
      },
      {
        title: "Changes to these terms",
        paragraphs: ["We may update these terms to reflect product, legal, or operational changes. We will revise the date shown above and provide reasonable notice when a material change affects your rights. Continuing to use Mello after the updated terms take effect means you accept them."],
      },
      {
        title: "Contact",
        paragraphs: ["Questions about these terms can be sent to contact@mello.com."],
      },
    ]}
  />;
}
