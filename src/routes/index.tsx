import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Divisions } from "@/components/site/Divisions";
import { Investments } from "@/components/site/Investments";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import favicon from "@/assets/favicon.png"; // ← AGGIUNGI QUESTO

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // ← AGGIUNGI QUESTO useEffect
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = favicon;

    let appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
    if (!appleLink) {
      appleLink = document.createElement("link");
      appleLink.rel = "apple-touch-icon";
      document.head.appendChild(appleLink);
    }
    appleLink.href = favicon;
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Divisions />
      <Investments />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
