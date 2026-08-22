import type { Metadata } from "next";
import { LegalPage } from "@/components/landing/LegalPage";

export const metadata: Metadata = {title: "Privacy Policy | Mello"};

export default function PrivacyPage() {
  return <LegalPage
    eyebrow="Your information, your control"
    title="Privacy Policy"
    intro="This policy explains what information Mello may process, why it is used, and the choices available to you."
    updated="August 22, 2026"
    showDoesNot
    sections={[
      {
        title: "Scope",
        paragraphs: ["This policy applies to the Mello desktop experience, website, Dictation, Actions, Meeting Mode, Memory, Dictionary, Snippets, and support communications. It does not govern Gmail, Google Calendar, GitHub, or other connected services, which publish their own privacy terms."],
      },
      {
        title: "Information we collect",
        paragraphs: ["The information Mello processes depends on the features you use and the permissions you choose to grant."],
        items: [
          "Account information — your name, email address, authentication information, and plan status, when account features are available.",
          "Voice and transcription data — audio and resulting text processed after you deliberately start Dictation, an Action, or Meeting Mode.",
          "Action details — the request, resolved details, and action plan needed to prepare an email, calendar event, or GitHub issue for review.",
          "Personalization and Memory — preferences, Memory, Dictionary entries, and Snippets you choose to save.",
          "Meeting Mode content — meeting audio, transcripts, notes, and generated summaries when you deliberately use Meeting Mode.",
          "Device and diagnostic information — basic device, reliability, support, and abuse-prevention data when collected.",
        ],
      },
      {
        title: "Microphone and Meeting Mode",
        paragraphs: ["Microphone access begins only after you deliberately start Dictation, an Action, or Meeting Mode. Meeting Mode may process the conversation to create a live transcript, notes, and a summary. Mello currently labels transcript participants as “You” and “Other”; those labels are not contact-level speaker identification.", "You are responsible for following local recording and consent laws and for telling meeting participants when required. Do not record a conversation unless you have the necessary permission."],
      },
      {
        title: "How we use information",
        items: [
          "To provide Dictation, prepare supported Actions, and display an action plan for Approval.",
          "To use Memory, Dictionary entries, and Snippets you choose to keep when providing future results.",
          "To operate, secure, troubleshoot, and improve Mello.",
          "To communicate about your account, service changes, support requests, and security notices.",
        ],
      },
      {
        title: "Connected services",
        paragraphs: ["If you connect Gmail, Google Calendar, GitHub, or another connected service, Mello can process information made available by the permissions you grant so it can prepare or complete the feature you request. The provider’s permission screen is the authoritative description of the access granted. You can revoke access through the provider, which prevents later use of that authorization by Mello."],
      },
      {
        title: "Voice data and approvals",
        paragraphs: ["Voice capture begins only after you deliberately start Dictation, an Action, or Meeting Mode. For supported Actions, Mello prepares an action plan for review before content is sent or created in a connected service."],
      },
      {
        title: "Sharing and service providers",
        paragraphs: ["Mello may rely on providers for infrastructure, authentication, transcription or AI processing, diagnostics, support, and—if paid plans are offered—payment processing. Those providers may receive information needed to perform their service. Mello does not present personal information as a product for sale. Information may also be disclosed when required by law, to protect users or the service, or as part of a business transaction subject to appropriate safeguards."],
      },
      {
        title: "Legal reasons for processing",
        paragraphs: ["Depending on where you live, Mello may process information to provide the service you request, pursue legitimate interests such as security and product reliability, comply with legal obligations, or act with your consent. Where processing relies on consent, you may withdraw it, although that does not affect processing already completed."],
      },
      {
        title: "Cookies and analytics",
        paragraphs: ["The Mello website may use essential browser storage for navigation, preferences, and service protection. The current public landing page does not need microphone or connected-account access. If nonessential analytics or advertising cookies are introduced, this policy and any required consent controls should be updated before they are used."],
      },
      {
        title: "International processing",
        paragraphs: ["Mello and its service providers may process information in countries other than the one where you live. Where applicable, we use contractual and organizational safeguards intended to protect information when it is transferred across borders."],
      },
      {
        title: "Retention and deletion",
        paragraphs: ["Retention depends on the type of information, the feature used, and operational or legal needs. Mello has not formally adopted a single fixed retention period for every data type. Available product controls let you review or remove saved Memory, Dictionary entries, Snippets, meeting notes, and connected accounts. You may also request deletion by contacting us. Some limited records may be kept when required for security, fraud prevention, dispute resolution, or legal compliance."],
      },
      {
        title: "How we protect information",
        paragraphs: ["Mello is designed around deliberate activation, visible action review, limited connected-service permissions, and user controls for saved information. No online service can guarantee absolute security. The current security practices and responsible-disclosure channel are described on the Security page."],
      },
      {
        title: "Your choices",
        items: [
          "Review and remove saved Memory, Dictionary entries, Snippets, and meeting notes through available controls.",
          "Disconnect connected services.",
          "Request access, correction, export, or deletion where applicable.",
          "Opt out of nonessential product communications.",
        ],
      },
      {
        title: "Children",
        paragraphs: ["Mello is not directed to children under 13, or a higher minimum age where local law requires it. We do not knowingly collect personal information from children who are not permitted to use the service. Contact us if you believe a child has provided information to Mello."],
      },
      {
        title: "Changes to this policy",
        paragraphs: ["We may update this policy as Mello evolves or legal requirements change. We will update the date shown above and provide additional notice when a change materially affects how personal information is handled."],
      },
      {
        title: "Contact us",
        paragraphs: ["For privacy questions or requests, email contact@mello.com. We may need to verify your identity before completing a request."],
      },
    ]}
  />;
}
