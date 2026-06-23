import heroBg from "@/assets/hero-bg.mp4.asset.json";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink">
      {/* Dynamic video background */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroBg.url} type="video/mp4" />
      </video>

      {/* Bottom gradient: darkens video then fades into the next section's background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.08 0 0 / 0.45) 45%, oklch(0.14 0 0 / 0.7) 70%, var(--color-background) 100%)",
        }}
      />
      {/* Seamless blend strip into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-40 z-[2]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, color-mix(in oklab, var(--color-background) 55%, transparent) 60%, var(--color-background) 100%)",
        }}
      />
      {/* Tiny top fade so the navbar stays readable */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0 0 / 0.55) 0%, transparent 100%)",
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
      `}</style>
    </section>
  );
}
