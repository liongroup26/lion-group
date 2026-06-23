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

  // When over the hero video (not scrolled), we render NO full-width bar at all.
  // Only floating elements with their own local "halo" — this removes any seam line.
  const isFloating = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl text-foreground shadow-[0_1px_0_0_hsl(var(--border)/0.6)]"
          : "bg-transparent text-white"
      }`}
    >
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12 py-4">
        <Link
          to="/"
          className="flex items-center gap-3 group relative"
          style={
            isFloating
              ? {
                  // Local soft halo behind the logo only — no full-width band
                  filter: "drop-shadow(0 2px 14px rgba(0,0,0,0.55))",
                }
              : undefined
          }
        >
          <img
            src={logo}
            alt="Lion Group"
            width={204}
            height={70}
            fetchPriority="high"
            decoding="async"
            className="h-10 w-auto transition group-hover:opacity-80"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative text-[12px] font-medium uppercase tracking-luxury transition-colors after:absolute after:left-0 after:-bottom-2 after:h-px after:w-0 after:transition-all hover:after:w-full ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground after:bg-foreground"
                  : "text-white/95 hover:text-white after:bg-white"
              }`}
              style={
                isFloating
                  ? { textShadow: "0 1px 12px rgba(0,0,0,0.65)" }
                  : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <span
            className={`text-[11px] uppercase tracking-luxury ${
              scrolled ? "text-muted-foreground" : "text-white/80"
            }`}
            style={
              isFloating
                ? { textShadow: "0 1px 10px rgba(0,0,0,0.6)" }
                : undefined
            }
          >
            IT
          </span>
          <a
            href="#contatti"
            className={`group inline-flex items-center gap-3 px-5 py-2.5 text-[11px] font-medium uppercase tracking-luxury transition-all duration-300 ${
              scrolled
                ? "text-foreground hover:text-primary"
                : "text-white hover:text-white"
            }`}
            style={
              isFloating
                ? { textShadow: "0 1px 10px rgba(0,0,0,0.6)" }
                : undefined
            }
          >
            <span className="relative">
              Prenota un incontro
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${
                  scrolled ? "bg-foreground" : "bg-white"
                }`}
              />
            </span>
            <span
              aria-hidden
              className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-0.5 ${
                scrolled
                  ? "border-foreground/30 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
                  : "border-white/40 group-hover:border-white group-hover:bg-white group-hover:text-ink"
              }`}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="transition-transform duration-300"
              >
                <path
                  d="M1 5h8m0 0L5 1m4 4L5 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </a>
        </div>

        {/* Mobile hamburger — floating button with its own pill background, no full-width bar */}
        <button
          aria-label="Apri menu"
          onClick={() => setOpen(!open)}
          className={`lg:hidden relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
            isFloating
              ? "bg-black/25 backdrop-blur-md ring-1 ring-white/15"
              : "bg-transparent"
          }`}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-px w-5 transition-transform ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 transition-opacity ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-5 transition-transform ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile menu panel — only renders when open, so no seam exists when closed */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-96" : "max-h-0"
        } ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl"
            : "bg-black/55 backdrop-blur-2xl"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-sm uppercase tracking-luxury py-2 border-b ${
                scrolled
                  ? "text-foreground/80 hover:text-foreground border-border"
                  : "text-white/90 hover:text-white border-white/10"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contatti"
            onClick={() => setOpen(false)}
            className={`mt-2 rounded-full px-5 py-3 text-center text-[11px] font-medium uppercase tracking-luxury ${
              scrolled
                ? "bg-primary text-primary-foreground"
                : "bg-white text-ink"
            }`}
          >
            Prenota un incontro
          </a>
        </nav>
      </div>
    </header>
  );
}
