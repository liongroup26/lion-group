import { useEffect, useState, useRef, useCallback } from "react";
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
  const [activeSection, setActiveSection] = useState<string>("");

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // SCROLL DETECTION
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ACTIVE SECTION TRACKING
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, number>();

    NAV.forEach((item) => {
      const id = item.href.replace("#", "");
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry.intersectionRatio);
            } else {
              visibleSections.delete(id);
            }
          });

          let maxRatio = 0;
          let maxId = "";
          visibleSections.forEach((ratio, sectionId) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxId = sectionId;
            }
          });
          if (maxId) setActiveSection(maxId);
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // KEYBOARD & FOCUS
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // SCROLL LOCK
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  // SMOOTH SCROLL
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setOpen(false);
      }
    },
    []
  );

  const isLight = !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3 bg-white/95 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link
              to="/"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center"
            >
              <img
                src={logo}
                alt="Lion Group"
                className={`w-auto transition-all duration-500 ${
                  scrolled ? "h-8" : "h-10"
                }`}
                style={
                  isLight
                    ? {
                        filter: "brightness(0) invert(1) drop-shadow(0 2px 10px rgba(0,0,0,0.3))",
                      }
                    : undefined
                }
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
                      isActive
                        ? isLight ? "text-white" : "text-black"
                        : isLight ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-px bg-amber-600" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* CTA DESKTOP */}
            <div className="hidden lg:block">
              <a
                href="#contatti"
                onClick={(e) => handleNavClick(e, "#contatti")}
                className={`inline-flex items-center gap-2 border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] transition-all duration-300 ${
                  isLight
                    ? "border-white/50 text-white hover:border-white hover:bg-white hover:text-black"
                    : "border-black/30 text-black hover:border-black hover:bg-black hover:text-white"
                }`}
              >
                <span>Prenota un incontro</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>

{/* MOBILE HAMBURGER */}
<button
  ref={menuButtonRef}
  onClick={() => setOpen(!open)}
  aria-expanded={open}
  aria-label={open ? "Chiudi menu" : "Apri menu"}
  className="lg:hidden relative flex h-10 w-10 items-center justify-center"
>
  <span className="relative flex h-5 w-6 flex-col justify-between">
    {/* Top line */}
    <span
      className={`block h-px w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "translate-y-[9px] rotate-45" : ""
      } ${isLight ? "bg-white" : "bg-black"}`}
    />
    {/* Middle line */}
    <span
      className={`block h-px w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
      } ${isLight ? "bg-white" : "bg-black"}`}
    />
    {/* Bottom line */}
    <span
      className={`block h-px w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        open ? "-translate-y-[9px] -rotate-45" : ""
      } ${isLight ? "bg-white" : "bg-black"}`}
    />
  </span>
</button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/95" onClick={() => setOpen(false)} />
        <div
          ref={menuRef}
          role="navigation"
          aria-label="Menu di navigazione"
          className="relative flex h-full flex-col justify-center px-8 py-12"
        >
          <nav className="flex flex-col gap-6">
            {NAV.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-3xl font-light uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="absolute bottom-12 left-8 right-8">
            <a
              href="#contatti"
              onClick={(e) => handleNavClick(e, "#contatti")}
              className="block border-t border-white/20 pt-8 text-[10px] uppercase tracking-[0.25em] text-white/60"
            >
              Contattaci
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
