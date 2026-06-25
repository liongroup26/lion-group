import { useReveal } from "@/hooks/useReveal";

const HIGHLIGHTS = [
  {
    title: "Startup Fund",
    desc: "Investiamo in startup tecnologiche e innovative nelle fasi seed e Series A.",
  },
  {
    title: "Real Estate Premium",
    desc: "Portfolio immobiliare selezionato in location strategiche ad alto rendimento.",
  },
  {
    title: "ROI Strategico",
    desc: "Rendimenti competitivi con gestione del rischio e trasparenza totale.",
  },
];

export function Investments() {
  const header = useReveal<HTMLDivElement>();

  return (
    <section
      id="investimenti"
      className="relative bg-surface-alt border-y border-border py-32 lg:py-44 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div
          ref={header.ref}
          className={`reveal ${header.visible ? "is-visible" : ""}`}
        >
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-luxury text-muted-foreground mb-6">
            <span className="h-px w-10 bg-foreground/30" />
            <span>Investimenti</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
            <h2 className="lg:col-span-8 font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
              Fai Crescere il <br />
              <span className="text-gradient-gold">Tuo Patrimonio.</span>
            </h2>
            <p className="lg:col-span-4 text-base text-muted-foreground leading-relaxed">
              Lion Group gestisce un fondo di investimento dedicato a startup ad alto potenziale
              e asset immobiliari premium. Rigore analitico, visione strategica, una rete di
              partner internazionali.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((h, i) => (
            <HighlightCard key={h.title} highlight={h} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightCard({
  highlight,
  index,
}: {
  highlight: (typeof HIGHLIGHTS)[number];
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal card-lift ${visible ? "is-visible" : ""} bg-card rounded-3xl shadow-soft hover:shadow-elevated p-10 group`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-8">
        Area
      </div>
      <h3 className="font-display font-semibold text-2xl mb-4 tracking-tight">{highlight.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{highlight.desc}</p>
    </div>
  );
}
