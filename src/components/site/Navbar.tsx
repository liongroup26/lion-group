import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/lion-logo.png";

const NAV = [
  { label: "Divisioni", href: "#divisioni" },
  { label: "Investimenti", href: "#investimenti" },
  { label: "Filosofia", href: "#filosofia" },
  { label: "Contatti", href: "#contatti" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isFloating = !scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      {/* FLOATING CAPSULE */}
      <div
        className={`mt-4 w-full max-w-[1400px] mx-6 lg:mx-12 rounded-full transition-all duration-500
        ${
          scrolled
            ? "bg-background/70 backdrop-blur-xl border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
            : "bg-white/5 backdrop-blur-md border border-white/10"
        }`}
      >
        <div className="flex items-center justify-between px-6 lg:px-10 py-3">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Lion Group"
              className="h-9 w-auto transition duration-500 hover:opacity-80"
              style={
                isFloating
                  ? {
                      filter:
                        "brightness(0) invert(1) drop-shadow(0 2px 14px rgba(0,0,0,0.5))",
                    }
                  : undefined
              }
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-5 py-2 rounded-full text-[12px] font-medium uppercase tracking-[0.18em]
                transition-all duration-300 border
                hover:scale-[1.03] hover:bg-white/10 hover:border-white/30
                ${
                  scrolled
                    ? "text-foreground/70 border-transparent hover:text-foreground"
                    : "text-white/90 border-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA DESKTOP */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contatti"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full
              bg-white text-black text-[11px] uppercase tracking-[0.18em]
              hover:scale-[1.03] transition-all duration-300"
            >
              Prenota un incontro
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full
            ring-1 ring-white/20 backdrop-blur-md"
          >
            <span className="relative flex h-4 w-5 flex-col justify-center">
              <span
                className={`absolute h-px w-5 transition-all duration-500 ${
                  open ? "rotate-45" : "-translate-y-[6px]"
                } ${scrolled ? "bg-foreground" : "bg-white"}`}
              />
              <span
                className={`absolute h-px w-5 transition-all duration-300 ${
                  open ? "opacity-0 scale-x-0" : "opacity-100"
                } ${scrolled ? "bg-foreground" : "bg-white"}`}
              />
              <span
                className={`absolute h-px w-5 transition-all duration-500 ${
                  open ? "-rotate-45" : "translate-y-[6px]"
                } ${scrolled ? "bg-foreground" : "bg-white"}`}
              />
            </span>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            open ? "max-h-96" : "max-h-0"
          } ${
            scrolled
              ? "bg-background/90 backdrop-blur-xl"
              : "bg-black/60 backdrop-blur-xl"
          }`}
        >
          <nav className="flex flex-col gap-3 px-6 py-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-full border border-white/10 text-sm uppercase tracking-[0.18em] text-white/90"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contatti"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-white px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-black"
            >
              Prenota un incontro
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
