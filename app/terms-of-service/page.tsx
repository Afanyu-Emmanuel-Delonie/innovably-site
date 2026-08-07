import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Innovably",
  description:
    "The terms and conditions governing your use of Innovably’s website and services — including payment, IP ownership, confidentiality, and governing law.",
  alternates: { canonical: "https://innovably.digital/terms-of-service" },
  robots: { index: true, follow: false },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing our website or engaging Innovably's services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.

These terms apply to all visitors, clients, and others who access or use our services. We reserve the right to update these terms at any time, and continued use of our services constitutes acceptance of any changes.`,
  },
  {
    title: "2. Services",
    content: `Innovably provides digital product and technology services including, but not limited to:

• UI/UX design and prototyping
• Web and mobile application development
• AI and machine learning solutions
• Cloud infrastructure and migration
• Digital marketing and SEO
• Cyber security services
• Microsoft 365 solutions
• Technology consulting

The specific scope, deliverables, timeline, and pricing for any engagement are defined in a separate Statement of Work (SOW) or Service Agreement signed between Innovably and the client.`,
  },
  {
    title: "3. Client Responsibilities",
    content: `To enable us to deliver our services effectively, you agree to:

• Provide accurate, complete, and timely information, materials, and feedback as reasonably required.
• Designate a primary point of contact with authority to make decisions on your behalf.
• Review and approve deliverables within agreed timeframes. Delays caused by late feedback may affect project timelines and costs.
• Ensure you have the rights to any materials, content, or intellectual property you provide to us for use in the project.`,
  },
  {
    title: "4. Payment Terms",
    content: `Unless otherwise agreed in writing:

• Projects are invoiced according to the payment schedule outlined in the relevant SOW or proposal.
• Invoices are due within 14 days of the invoice date.
• Late payments may incur interest at 1.5% per month on the outstanding balance.
• We reserve the right to pause or suspend work on any project where payment is overdue by more than 14 days.
• All fees are exclusive of applicable taxes (GST, VAT, etc.) unless stated otherwise.

Refunds are not provided for work already completed and approved.`,
  },
  {
    title: "5. Intellectual Property",
    content: `Upon receipt of full payment for a project:

• All custom work product created specifically for you (designs, code, content) is assigned to you.
• Innovably retains ownership of any pre-existing tools, frameworks, libraries, methodologies, or general know-how used in delivering the project.
• We reserve the right to display completed work in our portfolio unless you request otherwise in writing.

Any third-party components (open-source libraries, stock assets, licensed fonts) remain subject to their respective licences, which we will disclose to you.`,
  },
  {
    title: "6. Confidentiality",
    content: `Both parties agree to keep confidential any non-public information disclosed during the engagement that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information.

This obligation does not apply to information that:
• Is or becomes publicly available through no fault of the receiving party.
• Was already known to the receiving party prior to disclosure.
• Is independently developed without use of the confidential information.
• Is required to be disclosed by law or court order.`,
  },
  {
    title: "7. Warranties and Representations",
    content: `Innovably warrants that:

• Services will be performed in a professional and workmanlike manner.
• We have the right to enter into agreements and perform the services described.
• Deliverables will not knowingly infringe the intellectual property rights of any third party.

We do not warrant that our services will be error-free or that any software will operate without interruption. Our website and any content on it are provided "as is" without warranties of any kind.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law:

• Innovably's total liability to you for any claim arising out of or relating to these terms or our services shall not exceed the total fees paid by you in the three months preceding the claim.
• We shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, even if advised of the possibility of such damages.

Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above may not apply to you.`,
  },
  {
    title: "9. Termination",
    content: `Either party may terminate a project engagement with 14 days' written notice. Upon termination:

• You will be invoiced for all work completed up to the termination date, calculated on a pro-rata or time-and-materials basis as applicable.
• Innovably will deliver all completed work product for which payment has been received.
• Each party will return or destroy the other's confidential information upon request.

We may terminate immediately if you breach these terms and fail to remedy the breach within 7 days of written notice.`,
  },
  {
    title: "10. Website Use",
    content: `When using our website, you agree not to:

• Use the site for any unlawful purpose or in violation of any applicable regulations.
• Attempt to gain unauthorised access to any part of the site or its related systems.
• Transmit any harmful, offensive, or disruptive content.
• Scrape, crawl, or systematically extract data from the site without our written permission.
• Impersonate Innovably or any of its employees or representatives.

We reserve the right to restrict or terminate access to our website for any user who violates these terms.`,
  },
  {
    title: "11. Third-Party Links",
    content: `Our website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content or practices of those sites and accept no responsibility for them. Accessing third-party sites is at your own risk.`,
  },
  {
    title: "12. Governing Law",
    content: `These terms are governed by and construed in accordance with the laws of the Province of Ontario, Canada, without regard to its conflict of law provisions.

Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Ontario, Canada, unless otherwise agreed in writing between the parties.`,
  },
  {
    title: "13. Entire Agreement",
    content: `These Terms of Service, together with our Privacy Policy and any signed SOW or Service Agreement, constitute the entire agreement between you and Innovably regarding your use of our services and supersede all prior agreements, representations, and understandings.

If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    title: "14. Contact Us",
    content: `For questions about these Terms of Service, please contact:

Innovably Digital
Email: legal@innovably.digital
Canada: +1 (613) 850-8278
Rwanda: +250 786 653 794`,
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl px-6 py-20 sm:px-10">
        {/* Header */}
        <div className="mb-14 border-b border-border pb-10">
          <span className="label mb-3 block">Legal</span>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-base leading-7 text-foreground-muted">
            Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <p className="mt-4 text-base leading-7 text-foreground-muted">
            Please read these terms carefully before using our website or engaging our services.
            By proceeding, you agree to be bound by the following terms and conditions.
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
