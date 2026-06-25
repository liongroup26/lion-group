const ITEMS = [
  "Automotive",
  "E-Commerce",
  "Investment Fund",
  "Real Estate",
  "Eccellenza Senza Confini",
  "Startup & Private Equity",
  "Marketplace Premium",
];

export function Marquee() {
  return (
    <div className="relative border-y border-border bg-surface-alt py-6 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="mx-10 flex items-center gap-10 font-display text-2xl lg:text-3xl text-foreground/35 font-medium"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
