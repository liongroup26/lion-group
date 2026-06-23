import aboutImg from "@/assets/about-team.jpg";
import { ResponsiveImage } from "./ResponsiveImage";
import { useReveal } from "@/hooks/useReveal";

const VALUES = [
  { n: "I.", title: "Eccellenza", desc: "Lo standard è ciò che facciamo ogni giorno, non un'eccezione." },
  { n: "II.", title: "Integrità", desc: "Trasparenza e fiducia come fondamento di ogni relazione." },
  { n: "III.", title: "Innovazione", desc: "Visione strategica e capacità di anticipare il futuro." },
  { n: "IV.", title: "Risultati", desc: "Generare valore concreto, misurabile, sostenibile." },
];

export function About() {
  const image = useReveal<HTMLDivElement>();
  const text = useReveal<HTMLDivElement>();

  return (
    <section id="filosofia" className="relative bg-background py-32 lg:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <div
            ref={image.ref}
            className={`reveal-left ${image.visible ? "is-visible" : ""} lg:col-span-6 relative`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated bg-onyx">
              <ResponsiveImage
                src={aboutImg}
                name="about-team"
                alt="Il team Lion Group"
                loading="lazy"
                sizes="(min-width: 1024px) 640px, 100vw"
                className="h-full w-full object-cover object-center"
              />
            </div>
            {/* Caption card */}
            <div className="hidden lg:block absolute -bottom-8 -right-8 bg-card rounded-2xl shadow-elevated p-7 max-w-xs">
              <div className="font-display font-semibold text-2xl text-gradient-gold mb-2 italic leading-snug">
                "Il vero lusso è avere qualcuno di fiducia al tuo fianco."
              </div>
              <div className="text-[10px] uppercase tracking-luxury text-muted-foreground">
                — Lion Group
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            ref={text.ref}
            className={`reveal-right ${text.visible ? "is-visible" : ""} lg:col-span-6`}
          >
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-luxury text-muted-foreground mb-6">
              <span className="h-px w-10 bg-foreground/30" />
              <span>Chi Siamo</span>
            </div>
            <h2 className="font-display font-semibold text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em] mb-10">
              Chi <span className="text-gradient-gold">Siamo.</span>
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
              <p>
                Lion Group è un gruppo imprenditoriale multisettoriale fondato da professionisti
                di alto profilo nel mondo del business, della finanza e dell'automotive di lusso.
              </p>
              <p>
                La nostra missione è affiancare persone e aziende in ogni fase del loro percorso:
                che si tratti di investire nel mercato immobiliare, entrare nel capitale di una
                startup innovativa, accedere a un marketplace premium o muoversi nel mondo
                dell'automotive d'elite.
              </p>
              <p>
                Dietro ogni divisione c'è un team di esperti selezionati — consulenti finanziari,
                analisti di mercato, professionisti dell'automotive e specialisti del digitale —
                che lavorano con un unico obiettivo: generare valore concreto, con trasparenza,
                competenza e visione strategica.
              </p>
            </div>

            <div className="mt-14 grid sm:grid-cols-2 gap-4">
              {VALUES.map((v, i) => (
                <ValueCard key={v.title} value={v} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  value,
  index,
}: {
  value: (typeof VALUES)[number];
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal card-lift ${visible ? "is-visible" : ""} bg-card rounded-2xl shadow-soft p-6 lg:p-7 hover:shadow-elevated`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="font-display text-gold text-sm font-semibold mb-3">{value.n}</div>
      <div className="font-display font-semibold text-lg mb-2">{value.title}</div>
      <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
    </div>
  );
}
