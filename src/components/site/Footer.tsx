import logo from "@/assets/lion-logo.png";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <img src={logo} alt="Lion Group" className="h-14 w-auto mb-6" />
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              Eccellenza senza confini. L'apice dell'Automotive, investimenti ad alto
              potenziale e servizi premium su misura.
            </p>
          </div>

          <FooterCol
            title="Divisioni"
            items={["Automotive", "E-Commerce", "Investment Fund", "Real Estate"]}
          />
          <FooterCol title="Gruppo" items={["Chi Siamo", "Investimenti", "Contatti", "Press"]} />
          <FooterCol
            title="Contatti"
            items={["Via Merulana 247", "Roma — Italia", "info@liongroupsrl.it"]}
          />
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] uppercase tracking-luxury text-muted-foreground">
          <span>© MMXXV Lion Group ® · Tutti i diritti riservati</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie</a>
            <a href="#" className="hover:text-foreground transition-colors">Note legali</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="lg:col-span-2">
      <div className="text-[10px] uppercase tracking-luxury text-foreground mb-5 font-semibold">
        {title}
      </div>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
