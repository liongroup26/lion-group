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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          : "bg-transparent text-white"
      }`}
    >
      <div
        className={`relative mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12 transition-all duration-500 ${
          isFloating ? "py-6" : "py-3"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="Lion Group"
            className="h-10 w-auto transition duration-500 group-hover:opacity-80"
            style={
              isFloating
                ? {
                    filter:
                      "brightness(0) invert(1) drop-shadow(0 2px 14px rgba(0,0,0,0.55))",
                  }
                : undefined
            }
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative text-[12px] font-medium uppercase tracking-widest transition-all duration-300 after:absolute after:left-1/2 after:-bottom-2 after:h-px after:w-0 after:-translate-x-1/2 after:transition-all after:duration-500 hover:after:w-full ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground after:bg-foreground"
                  : "text-white/90 hover:text-white after:bg-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#contatti"
            className={`group inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-widest transition-all duration-300 ${
              scrolled
                ? "border border-foreground/15 text-foreground hover:border-foreground/40"
                : "border border-white/25 text-white hover:border-white/60"
            }`}
          >
            <span>Prenota un incontro</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* ===================== */}
        {/* MOBILE HAMBURGER PRO */}
        {/* ===================== */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className={`lg:hidden relative flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 ${
            isFloating
              ? "bg-black/20 ring-1 ring-white/20 hover:ring-white/40"
              : "bg-transparent ring-1 ring-foreground/15 hover:ring-foreground/30"
          }`}
        >
          <span className="relative flex h-4 w-5 flex-col justify-center">
            {/* top */}
            <span
              className={`absolute h-px w-5 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${
                open ? "rotate-45 translate-y-0" : "-translate-y-[6px]"
              }`}
            />

            {/* middle */}
            <span
              className={`absolute h-px w-5 transition-all duration-300 ease-out ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${
                open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              }`}
            />

            {/* bottom */}
            <span
              className={`absolute h-px w-5 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${
                open ? "-rotate-45 translate-y-0" : "translate-y-[6px]"
              }`}
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
            ? "bg-background/95 backdrop-blur-xl"
            : "bg-black/70 backdrop-blur-xl"
        }`}
      >
        <nav className="flex flex-col gap-4 px-6 py-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-2 text-sm uppercase tracking-widest text-white/90"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contatti"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-white px-5 py-3 text-center text-[11px] font-medium uppercase tracking-widest text-black"
          >
            Prenota un incontro
          </a>
        </nav>
      </div>
    </header>
  );
}
