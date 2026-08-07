import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/home/CTASection";
import JsonLd from "@/components/layout/JsonLd";
import SolutionsHero from "@/components/solutions/SolutionsHero";
import SolutionSection from "@/components/solutions/SolutionSection";
import { SOLUTIONS } from "@/lib/solutions";

const SITE_URL = "https://innovably.digital";

// No public pricing and no real customer reviews exist for these products —
// `offers`/`aggregateRating` are intentionally omitted rather than fabricated.
const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SOLUTIONS.map((solution, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: `${solution.name}${solution.accent}`,
      description: solution.desc,
      applicationCategory: "BusinessApplication",
      url: `${SITE_URL}/solutions#${solution.slug}`,
      image: `${SITE_URL}${solution.image}`,
      operatingSystem: "Web",
      publisher: { "@type": "Organization", name: "Innovably" },
    },
  })),
};

export const metadata: Metadata = {
  title: "Solutions — The EAZZ Suite",
  description:
    "Ready-built products from Innovably: EAZZ Quote, Books, Track, Meetings, Docs, and Edu — CRM, finance, fleet, meetings, documents, and education management.",
  alternates: { canonical: "https://innovably.digital/solutions" },
  openGraph: {
    title: "Solutions — The EAZZ Suite — Innovably",
    description:
      "Ready-built products from Innovably: EAZZ Quote, Books, Track, Meetings, Docs, and Edu.",
    url: "https://innovably.digital/solutions",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Solutions — The EAZZ Suite — Innovably",
    description:
      "Ready-built products from Innovably: EAZZ Quote, Books, Track, Meetings, Docs, and Edu.",
    images: ["/og-default.png"],
  },
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={productListSchema} />
      <Nav />
      <main>
        <SolutionsHero />

        <section id="products" className="mx-auto w-full max-w-6xl px-6 pt-4 sm:px-10">
          <div className="flex flex-wrap justify-center gap-2.5 border-b border-border pb-14">
            {SOLUTIONS.map((solution) => (
              <a
                key={solution.slug}
                href={`#${solution.slug}`}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:text-foreground"
              >
                {solution.name}
                {solution.accent}
              </a>
            ))}
          </div>
        </section>

        <div>
          {SOLUTIONS.map((solution, i) => (
            <SolutionSection key={solution.slug} solution={solution} reverse={i % 2 === 1} />
          ))}
        </div>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
