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
      <div
        className={`relative mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12 transition-all duration-500 ${
          isFloating ? "py-5" : "py-4"
        }`}
      >
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
            className="h-11 w-auto transition group-hover:opacity-80"
            style={
              isFloating
                ? { filter: "brightness(0) invert(1) drop-shadow(0 2px 14px rgba(0,0,0,0.6))" }
                : undefined
            }
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
       {NAV.map((item) => (
  <a
    key={item.href}
    href={item.href}
    className={`relative text-[12px] font-medium uppercase tracking-luxury transition-colors after:absolute after:left-1/2 after:-bottom-2 after:h-px after:w-0 after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-full ${
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
            aria-hidden
            className={`h-4 w-px ${scrolled ? "bg-foreground/15" : "bg-white/20"}`}
          />
          
            href="#contatti"
            className={`group inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-luxury transition-all duration-300 ${
              scrolled
                ? "border border-foreground/15 text-foreground hover:border-foreground/40 hover:text-primary"
                : "border border-white/25 text-white hover:border-white/60"
            }`}
            style={
              isFloating
                ? { textShadow: "0 1px 10px rgba(0,0,0,0.6)" }
                : undefined
            }
          >
            <span className="relative">Prenota un incontro</span>
            <span
              aria-hidden
              className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-0.5 ${
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

        {/* Mobile hamburger — upgraded version */}
        <button
          aria-label="Apri menu"
          onClick={() => setOpen(!open)}
          className={`lg:hidden relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${
            isFloating
              ? "bg-black/25 backdrop-blur-md ring-1 ring-white/20 hover:ring-white/40 hover:bg-black/35"
              : "bg-transparent ring-1 ring-foreground/15 hover:ring-foreground/30 hover:bg-foreground/5"
          }`}
        >
          <span className="relative flex h-4 w-5 flex-col items-center justify-center">
            <span
              className={`absolute block h-px w-5 rounded-full transition-all duration-300 ease-out ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${open ? "rotate-45" : "-translate-y-[6px]"}`}
            />
            <span
              className={`absolute block h-px w-5 rounded-full transition-all duration-200 ease-out ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"}`}
            />
            <span
              className={`absolute block h-px w-5 rounded-full transition-all duration-300 ease-out ${
                scrolled ? "bg-foreground" : "bg-white"
              } ${open ? "-rotate-45" : "translate-y-[6px]"}`}
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
