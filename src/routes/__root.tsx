import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold text-gradient-gold">404</h1>
        <h2 className="mt-4 font-display text-xl text-foreground">Pagina non trovata</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La pagina che cerchi non esiste o è stata spostata.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-medium uppercase tracking-luxury text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0a0a0a" },
      { name: "format-detection", content: "telephone=no" },
      { httpEquiv: "x-ua-compatible", content: "IE=edge" },

      // Primary SEO
      { title: "Lion Group | Automotive di Lusso, Investimenti e Real Estate Premium" },
      {
        name: "description",
        content:
          "Lion Group è il gruppo imprenditoriale italiano dedicato all'eccellenza: automotive di lusso, investment fund, e-commerce premium e real estate strategico. Consulenza esclusiva e visione internazionale.",
      },
      {
        name: "keywords",
        content:
          "Lion Group, automotive di lusso, supercar, noleggio auto premium, investment fund Italia, private equity, real estate luxury, e-commerce premium, gruppo imprenditoriale italiano, consulenza patrimoniale",
      },
      { name: "author", content: "Lion Group" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow" },
      { name: "language", content: "Italian" },
      { name: "geo.region", content: "IT" },
      { name: "geo.placename", content: "Italia" },

      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Lion Group" },
      { property: "og:locale", content: "it_IT" },
      { property: "og:url", content: "https://aurum-apex.lovable.app/" },
      { property: "og:title", content: "Lion Group | Eccellenza Italiana — Automotive, Investimenti, Real Estate" },
      {
        property: "og:description",
        content:
          "Quattro divisioni, un'unica visione: automotive di lusso, investment fund, e-commerce premium e real estate. Scopri il gruppo Lion.",
      },
      { property: "og:image", content: "https://aurum-apex.lovable.app/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Lion Group — Eccellenza imprenditoriale italiana" },

      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@liongroup" },
      { name: "twitter:title", content: "Lion Group | Eccellenza Italiana" },
      {
        name: "twitter:description",
        content:
          "Automotive di lusso, Investment Fund, E-Commerce premium e Real Estate. Quattro divisioni, un'unica visione.",
      },
      { name: "twitter:image", content: "https://aurum-apex.lovable.app/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://aurum-apex.lovable.app/" },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Lion Group",
          url: "https://aurum-apex.lovable.app/",
          logo: "https://aurum-apex.lovable.app/logo.png",
          description:
            "Gruppo imprenditoriale italiano operante in automotive di lusso, investment fund, e-commerce premium e real estate.",
          address: { "@type": "PostalAddress", addressCountry: "IT" },
          sameAs: [],
          knowsAbout: [
            "Automotive di lusso",
            "Investment Fund",
            "Private Equity",
            "Real Estate Premium",
            "E-Commerce Premium",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Lion Group",
          url: "https://aurum-apex.lovable.app/",
          inLanguage: "it-IT",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
