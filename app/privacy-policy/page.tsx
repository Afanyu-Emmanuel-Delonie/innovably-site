import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — How We Handle Your Data",
  description:
    "Read Innovably’s privacy policy — how we collect, use, and protect your personal information when you use our website or engage our services.",
  alternates: { canonical: "https://innovably.digital/privacy-policy" },
  robots: { index: true, follow: false },
};

const sections = [
  {
    title: "1. Who We Are",
    content: `Innovably ("we", "our", "us") is a digital product studio operating under Innovably Digital. We build software products and provide technology services to businesses worldwide. Our registered offices operate in Canada and Rwanda.

If you have any questions about this policy, contact us at privacy@innovably.digital.`,
  },
  {
    title: "2. Information We Collect",
    content: `We collect information you provide directly to us, including:

• Contact information (name, email address, phone number) when you fill out our contact form or start a project inquiry.
• Business information (company name, project details, budget range) when engaging our services.
• Communication data — emails, messages, and meeting notes exchanged during a project.
• Payment information processed securely through our payment providers. We do not store card details directly.

We also collect information automatically when you visit our website:

• Usage data (pages visited, time spent, referring URLs) via analytics tools.
• Device and browser information (IP address, browser type, operating system).
• Cookies and similar tracking technologies as described in Section 7.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We use the information we collect to:

• Respond to your inquiries and deliver the services you've requested.
• Send project updates, invoices, and service-related communications.
• Improve our website, services, and internal processes.
• Comply with legal obligations and enforce our agreements.
• Send occasional marketing communications where you have given consent (you may opt out at any time).

We do not sell, rent, or trade your personal information to third parties.`,
  },
  {
    title: "4. Legal Basis for Processing",
    content: `Where applicable under GDPR or similar legislation, we process your data on the following legal bases:

• Contractual necessity — to fulfil a service agreement with you.
• Legitimate interests — to operate and improve our business, provided these interests are not overridden by your rights.
• Consent — for marketing communications and non-essential cookies.
• Legal obligation — where we are required to process data by law.`,
  },
  {
    title: "5. Data Sharing",
    content: `We may share your information with:

• Service providers who assist us in operating our business (hosting, analytics, payment processing, project management tools). These parties are contractually bound to protect your data.
• Professional advisors (lawyers, accountants) under confidentiality obligations.
• Law enforcement or regulatory authorities where required by law.

We require all third parties to respect the security of your data and treat it in accordance with applicable law.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain personal data only as long as necessary for the purposes it was collected, or as required by law. Specifically:

• Client project data is retained for 7 years after project completion for legal and accounting purposes.
• Contact form submissions are retained for 2 years.
• Website analytics data is retained for 26 months.

After these periods, data is securely deleted or anonymised.`,
  },
  {
    title: "7. Cookies",
    content: `Our website uses cookies to enhance your experience. These include:

• Essential cookies — required for the website to function correctly.
• Analytics cookies — help us understand how visitors interact with our site (e.g. Google Analytics).
• Preference cookies — remember your settings and choices.

You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.`,
  },
  {
    title: "8. Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal data:

• Access — request a copy of the data we hold about you.
• Rectification — request correction of inaccurate data.
• Erasure — request deletion of your data where there is no legitimate reason for us to continue processing it.
• Restriction — request that we limit how we use your data.
• Portability — receive your data in a structured, machine-readable format.
• Objection — object to processing based on legitimate interests or for direct marketing.

To exercise any of these rights, contact us at privacy@innovably.digital. We will respond within 30 days.`,
  },
  {
    title: "9. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include encrypted data transmission (HTTPS), access controls, and regular security reviews.

However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.`,
  },
  {
    title: "10. International Transfers",
    content: `Your data may be transferred to and processed in countries outside your own, including Canada and Rwanda. Where we transfer data outside the EEA, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.`,
  },
  {
    title: "11. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us immediately and we will delete it.`,
  },
  {
    title: "12. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated effective date. We encourage you to review this policy periodically.`,
  },
  {
    title: "13. Contact Us",
    content: `For any privacy-related questions, requests, or complaints, please contact:

Innovably Digital
Email: privacy@innovably.digital
Canada: +1 (613) 850-8278
Rwanda: +250 786 653 794`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl px-6 py-20 sm:px-10">
        {/* Header */}
        <div className="mb-14 border-b border-border pb-10">
          <span className="label mb-3 block">Legal</span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base leading-7 text-foreground-muted">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <p className="mt-4 text-base leading-7 text-foreground-muted">
            This policy explains how Innovably collects, uses, and protects your personal
            information when you use our website or engage our services.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map(({ title, content }) => (
            <div key={title} className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <div className="flex flex-col gap-3">
                {content.split("\n\n").map((para, i) => (
                  <p key={i} className="whitespace-pre-line text-sm leading-7 text-foreground-muted">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
