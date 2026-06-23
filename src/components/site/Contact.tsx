import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contatti"
      className="relative bg-surface-alt border-t border-border py-32 lg:py-44 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: header & info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-luxury text-muted-foreground mb-6">
              <span className="h-px w-10 bg-foreground/30" />
              <span>Contatti</span>
            </div>
            <h2 className="font-display font-semibold text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em] mb-10">
              Inizia la Tua <br />
              <span className="text-gradient-gold">Esperienza Lion.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base mb-12">
              Che tu voglia acquistare, noleggiare, investire o semplicemente conoscerci,
              siamo qui per te.
            </p>

            <div className="space-y-5">
              <ContactRow label="Sede Legale" value="Via Merulana 247, Roma — Italia" />
              <ContactRow label="Email" value="info@liongroupsrl.it" />
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="bg-card rounded-3xl shadow-soft p-8 lg:p-12"
            >
              {sent ? (
                <div className="py-20 text-center animate-fade-up-blur">
                  <div className="font-display font-semibold text-5xl text-gradient-gold mb-4">
                    Grazie.
                  </div>
                  <p className="text-muted-foreground">
                    Messaggio inviato! Ti risponderemo a breve.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <Field label="Nome" name="firstName" required />
                    <Field label="Cognome" name="lastName" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Telefono" name="phone" type="tel" />
                  </div>
                  <div className="mb-5">
                    <Label>Servizio di Interesse</Label>
                    <select
                      name="division"
                      defaultValue=""
                      aria-label="Servizio di Interesse"
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
                    >
                      <option value="">Seleziona un servizio</option>
                      <option value="automotive">Automotive</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="investment">Investment Fund</option>
                      <option value="realestate">Real Estate</option>
                      <option value="other">Altro</option>
                    </select>
                  </div>
                  <div className="mb-8">
                    <Label>Messaggio</Label>
                    <textarea
                      name="message"
                      aria-label="Messaggio"
                      rows={4}
                      required
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="cta-luxury group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-primary px-8 py-3.5 text-[12px] font-medium uppercase tracking-luxury text-primary-foreground hover:bg-primary/90"
                  >
                    Invia Messaggio
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-4">
      <div className="text-[10px] uppercase tracking-luxury text-muted-foreground mb-1.5">
        {label}
      </div>
      <div className="text-base text-foreground">{value}</div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] uppercase tracking-luxury text-muted-foreground mb-2">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label>
        {label}
        {required && " *"}
      </Label>
      <input
        name={name}
        type={type}
        required={required}
        aria-label={label}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-foreground focus:outline-none transition-colors"
      />
    </div>
  );
}
