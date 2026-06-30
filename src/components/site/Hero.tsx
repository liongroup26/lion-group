import heroYacht from "@/assets/hero-yacht-4k.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* Hero image */}
      <img
        src={heroYacht}
        alt="Yacht di lusso in navigazione al tramonto in mare aperto"
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover scale-105 animate-hero-pan"
      />

      {/* Cinematic vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Gold light leak */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background:
            "radial-gradient(45% 55% at 85% 30%, rgba(240,215,140,0.35), transparent 70%)",
        }}
      />

      {/* Top fade per navbar */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0 0 / 0.6) 0%, transparent 100%)",
        }}
      />

      {/* Bottom vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[55vh]"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 100%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 45%, transparent 85%)",
        }}
      />

      {/* Gold glow dietro CTAs */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-28 left-1/2 z-[2] h-32 w-[28rem] -translate-x-1/2 opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,170,95,0.35), transparent 70%)",
        }}
      />

      {/* ============================================ */}
      {/* CONTENUTO CENTRALE - Headline + Sottotitolo */}
      {/* ============================================ */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 lg:px-12 text-center">
        {/* Headline */}
        <h1
          className="animate-fade-up-blur text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.15em] mb-6"
          style={{ animationDelay: "0.3s" }}
        >
          LION GROUP
        </h1>

        {/* Linea dorata decorativa */}
        <div
          className="animate-fade-up-blur w-16 h-px bg-amber-600/60 mb-8"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Sottotitolo */}
        <p
          className="animate-fade-up-blur text-base md:text-lg text-white/80 font-light tracking-[0.12em] max-w-2xl leading-relaxed"
          style={{ animationDelay: "0.7s" }}
        >
          Eccellenza e innovazione nei settori automotive, real estate e investimenti.
          <br className="hidden md:block" />
          Un approccio visionario al valore.
        </p>
      </div>

      {/* ============================================ */}
      {/* CTAs - Stile coerente con la navbar */}
      {/* ============================================ */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end px-6 lg:px-12 pb-32 sm:pb-36">
        <div
          className="animate-fade-up-blur flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "1s" }}
        >
          {/* Primary CTA - stile navbar (squadrato) */}
          <a
            href="#divisioni"
            className="group inline-flex items-center gap-3 border border-white/50 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.28em] text-white transition-all duration-500 hover:bg-white hover:text-black hover:border-white"
          >
            Esplora le Divisioni
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>

          {/* Secondary CTA - solo testo */}
          <a
            href="#contatti"
            className="group inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-white/80 transition-colors duration-500 hover:text-white border-b border-white/30 pb-1"
          >
            Consulenza Esclusiva
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden
        className="animate-fade-up-blur absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ animationDelay: "1.3s" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/70">
          Scopri
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-white/15">
          <span
            className="absolute left-0 top-0 h-1/2 w-full bg-gradient-to-b from-transparent via-white/80 to-white"
            style={{
              animation: "scroll-line 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
            }}
          />
        </span>
      </div>

      <style>{`
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes hero-pan {
          0%   { transform: scale(1.08) translate3d(0, 0, 0); }
          50%  { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
          100% { transform: scale(1.08) translate3d(0, 0, 0); }
        }
        .animate-hero-pan { animation: hero-pan 24s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-hero-pan { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
