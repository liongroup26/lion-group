import heroYacht from "@/assets/hero-yacht.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* Hero image: luxury yacht at sea */}
      <img
        src={heroYacht}
        alt="Yacht di lusso in navigazione al tramonto in mare aperto"
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover scale-105 animate-hero-pan"
      />

      {/* Cinematic vignette / contrast lift */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Subtle gold light leak */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background:
            "radial-gradient(45% 55% at 85% 30%, rgba(240,215,140,0.35), transparent 70%)",
        }}
      />

      {/* Tiny top fade so the navbar stays readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0 0 / 0.6) 0%, transparent 100%)",
        }}
      />


      {/* CTAs anchored toward the bottom */}
      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-end px-6 lg:px-12 pb-32 sm:pb-36">
        <div
          className="animate-fade-up-blur flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.2s" }}
        >
          <a
            href="#divisioni"
            className="cta-luxury cta-luxury-dark group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[12px] font-medium uppercase tracking-luxury text-ink hover:bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
          >
            Esplora l'Eccellenza
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contatti"
            className="cta-luxury group inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/5 px-8 py-4 text-[12px] font-medium uppercase tracking-luxury text-white hover:bg-white/10 hover:border-white/60"
          >
            Consulenza Esclusiva
          </a>
        </div>
      </div>

      {/* Cinematic scroll indicator */}
      <div
        aria-hidden
        className="animate-fade-up-blur absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ animationDelay: "0.6s" }}
      >
        <span className="text-[10px] uppercase tracking-luxury text-white/70">
          Scorri
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
