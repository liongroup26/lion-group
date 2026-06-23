import automotive from "@/assets/division-automotive.jpg";
import investment from "@/assets/division-investment.jpg";
import ecommerce from "@/assets/division-ecommerce.jpg";
import realestate from "@/assets/division-realestate.jpg";
import { ResponsiveImage } from "./ResponsiveImage";
import { useReveal } from "@/hooks/useReveal";

const DIVISIONS = [
  {
    n: "01",
    label: "Automotive",
    title: "Automotive",
    description:
      "Servizi automotive premium a 360°: vendita, noleggio e assistenza meccanica specialistica di alto livello. Dalla supercar al SUV premium, la nostra officina certificata garantisce cura tecnica d'eccellenza su ogni veicolo.",
    services: ["Vendita", "Noleggio", "Officina certificata", "Consulenza"],
    image: automotive,
    imageName: "division-automotive",
  },
  {
    n: "02",
    label: "E-Commerce",
    title: "E-Commerce",
    description:
      "Marketplace premium di nuova generazione. Una piattaforma esclusiva che seleziona e distribuisce prodotti d'eccellenza in ogni categoria, con standard qualitativi senza compromessi.",
    services: ["Marketplace premium", "Selezione curata", "Logistica impeccabile", "Customer care"],
    image: ecommerce,
    imageName: "division-ecommerce",
  },
  {
    n: "03",
    label: "Investment Fund",
    title: "Investment Fund",
    description:
      "Fondo di investimento strategico dedicato a startup ad alto potenziale e private equity. Un approccio visionario per far crescere il capitale con rigore analitico e reti internazionali.",
    services: ["Startup", "Private Equity", "Due diligence", "Network globale"],
    image: investment,
    imageName: "division-investment",
  },
  {
    n: "04",
    label: "Real Estate",
    title: "Real Estate",
    description:
      "Portfolio immobiliare d'elite in location strategiche nazionali e internazionali. Selezione rigorosa di asset residenziali e commerciali ad alto rendimento e valore intrinseco.",
    services: ["Residenziale", "Commerciale", "Asset selection", "Rendimento"],
    image: realestate,
    imageName: "division-realestate",
  },
];

export function Divisions() {
  const header = useReveal<HTMLDivElement>();

  return (
    <section id="divisioni" className="relative bg-background py-32 lg:py-44">
      <div
        ref={header.ref}
        className={`reveal ${header.visible ? "is-visible" : ""} mx-auto max-w-[1400px] px-6 lg:px-12 mb-20`}
      >
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-luxury text-muted-foreground mb-6">
          <span className="h-px w-10 bg-foreground/30" />
          <span>Le Nostre Divisioni</span>
        </div>
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <h2 className="lg:col-span-8 font-display font-semibold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
            Quattro Divisioni, <br />
            <span className="text-gradient-gold">Un'Unica Visione.</span>
          </h2>
          <p className="lg:col-span-4 text-base text-muted-foreground leading-relaxed">
            Lion Group unisce passione automobilistica, visione finanziaria e un approccio
            senza compromessi alla qualità.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DIVISIONS.map((d, i) => (
          <DivisionCard key={d.n} division={d} index={i} />
        ))}
      </div>
    </section>
  );
}

function DivisionCard({
  division,
  index,
}: {
  division: (typeof DIVISIONS)[number];
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group reveal card-lift ${visible ? "is-visible" : ""} relative bg-card rounded-3xl shadow-soft hover:shadow-elevated overflow-hidden`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-onyx">
        <ResponsiveImage
          src={division.image}
          name={division.imageName}
          alt={division.title}
          loading="lazy"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover object-center transition-transform duration-[1.5s] group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-luxury text-foreground">
          {division.n} · {division.label}
        </div>
      </div>

      <div className="p-8">
        <h3 className="font-display font-semibold text-2xl mb-3 tracking-tight">
          {division.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {division.description}
        </p>

        <ul className="space-y-2.5 mb-8">
          {division.services.map((s) => (
            <li key={s} className="flex items-center gap-3 text-sm text-foreground/80">
              <span className="h-1 w-1 rounded-full bg-gold" />
              {s}
            </li>
          ))}
        </ul>

        <a
          href="#contatti"
          className="group/link inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-luxury text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
        >
          Scopri
          <span className="transition-transform duration-500 group-hover/link:translate-x-1">→</span>
        </a>
      </div>
    </div>
  );
}
