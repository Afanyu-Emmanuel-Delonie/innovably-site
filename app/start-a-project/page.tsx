import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import StartProjectFlow from "@/components/start-project/StartProjectFlow";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Start a Project — Book a Free Discovery Call",
  description:
    "Tell us about your project in a few quick steps, then book a free discovery call with the Innovably team. No commitment, just a conversation.",
  alternates: { canonical: "https://innovably.digital/start-a-project" },
  openGraph: {
    title: "Start a Project — Book a Free Discovery Call — Innovably",
    description:
      "Tell us about your project in a few quick steps, then book a free discovery call with the Innovably team.",
    url: "https://innovably.digital/start-a-project",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Start a Project — Book a Free Discovery Call — Innovably",
    description:
      "Tell us about your project in a few quick steps, then book a free discovery call with the Innovably team.",
    images: ["/og-default.png"],
  },
  robots: { index: false, follow: false },
};

export default function StartAProjectPage() {
  return (
    <>
      <Nav />
      <div className="relative w-full bg-background pt-8 pb-8 sm:pt-12">
        <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]" />
        <div className="relative z-10 mx-auto w-full max-w-2xl px-6 sm:px-10">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Start a project
          </h1>
          <p className="mt-2 text-base text-foreground-muted">
            A few quick questions, then pick a time to talk it through.
          </p>
        </div>
        <StartProjectFlow />
      </div>
      <Footer />
    </>
  );
}
