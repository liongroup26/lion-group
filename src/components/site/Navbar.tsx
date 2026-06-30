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

  // SCROLL LOCK quando menu è aperto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  // SMOOTH SCROLL HANDLER
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
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(id);
                      if (el) {
                        const offset = 80;
                        const top = el.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                    className={`relative text-[11px] font-medium uppercase tracking-[0.25em] transition-colors duration-300 ${
                      isActive
                        ? isLight ? "text-white" : "text-black"
                        : isLight ? "text-white/70 hover:text-white" : "text-black/60 hover:text-black"
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
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("contatti");
                  if (el) {
                    const offset = 80;
                    const top = el.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top, behavior: "smooth" });
                  }
                }}
                className={`inline-flex items-center gap-2 border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] transition-all duration-300 ${
                  isLight
                    ? "border-white/50 text-white hover:border-white hover:bg-white hover:text-black"
                    : "border-black/30 text-black hover:border-black hover:bg-black hover:text-white"
                }`}
              >
                <span>Prenota un incontro</span>
                <span className="transition-transform duration-300">→</span>
              </a>
            </div>

            {/* MOBILE HAMBURGER - 3 LINEE */}
            <button
              ref={menuButtonRef}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              className="lg:hidden relative flex h-10 w-10 items-center justify-center z-50"
            >
              <span className="relative flex h-5 w-6 flex-col justify-between">
                <span
                  className={`block h-px w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "translate-y-[9px] rotate-45 bg-black" : ""
                  } ${!open && isLight ? "bg-white" : !open ? "bg-black" : ""}`}
                />
                <span
                  className={`block h-px w-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                  } ${!open && isLight ? "bg-white" : "bg-black"}`}
                />
                <span
                  className={`block h-px w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "-translate-y-[9px] -rotate-45 bg-black" : ""
                  } ${!open && isLight ? "bg-white" : !open ? "bg-black" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU - SEMPRE BIANCO */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-white/98 backdrop-blur-md shadow-lg`}
        >
          <nav className="flex flex-col px-6 py-6 gap-2">
            {NAV.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-3 text-[11px] font-medium uppercase tracking-[0.25em] transition-all duration-300 ${
                    isActive
                      ? "text-black"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-2 left-4 w-8 h-px bg-amber-600" />
                  )}
                </a>
              );
            })}
            
            <div className="pt-4 mt-4 border-t border-black/10">
              <a
                href="#contatti"
                onClick={(e) => handleNavClick(e, "#contatti")}
                className="block px-4 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-center bg-black text-white hover:bg-black/90 transition-all duration-300"
              >
                Prenota un incontro
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
