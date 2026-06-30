import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import logoDark from "@/assets/lion-logo.png";
import logoLight from "@/assets/lion-logo-light.png"; // Crea una versione bianca del logo

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

  const isFloating = !scrolled;

  // ============================================
  // 1. SCROLL DETECTION (ottimizzato con rAF)
  // ============================================
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 24);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ============================================
  // 2. ACTIVE SECTION TRACKING (IntersectionObserver)
  // ============================================
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

          // Trova la sezione più visibile
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
          rootMargin: "-20% 0px -60% 0px", // Trigger quando la sezione è nel 20-40% superiore
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // ============================================
  // 3. ESCAPE KEY & FOCUS TRAP
  // ============================================
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }

      // Focus trap semplice
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Focus iniziale sul primo elemento del menu
    const firstLink = menuRef.current?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // ============================================
  // 4. SCROLL LOCK quando il menu è aperto
  // ============================================
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

  // ============================================
  // 5. SMOOTH SCROLL HANDLER
  // ============================================
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const offset = 100; // Offset per compensare la navbar
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setOpen(false);
      }
    },
    []
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center pointer-events-none">
        {/* FLOATING CAPSULE */}
        <div
          className={`pointer-events-auto mt-4 w-full max-w-[1400px] mx-6 lg:mx-12 rounded-full transition-all duration-500 ease-out
          ${
            scrolled
              ? "bg-background/70 backdrop-blur-xl border border-border/40 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
              : "bg-white/5 backdrop-blur-md border border-white/10"
          }`}
        >
          <div className="flex items-center justify-between px-6 lg:px-10 py-3">
            {/* LOGO */}
            <Link to="/" className="flex items-center group">
              <img
                src={scrolled ? logoDark : logoLight}
                alt="Lion Group"
                className="h-9 w-auto transition-all duration-500 group-hover:opacity-80"
                style={
                  !scrolled
                    ? {
                        filter:
                          "drop-shadow(0 2px 14px rgba(0,0,0,0.5))",
                      }
                    : undefined
                }
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center gap-2">
              {NAV.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-5 py-2 rounded-full text-[12px] font-medium uppercase tracking-[0.18em]
                    transition-all duration-300 border
                    hover:scale-[1.03]
                    ${
                      isActive
                        ? scrolled
                          ? "text-foreground bg-foreground/5 border-foreground/10"
                          : "text-white bg-white/15 border-white/20"
                        : scrolled
                        ? "text-foreground/70 border-transparent hover:text-foreground hover:bg-foreground/5 hover:border-foreground/10"
                        : "text-white/90 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* CTA DESKTOP */}
            <div className="hidden lg:flex items-center">
              <a
                href="#contatti"
                onClick={(e) => handleNavClick(e, "#contatti")}
                className="group flex items-center gap-2 px-6 py-2.5 rounded-full
                bg-white text-black text-[11px] font-medium uppercase tracking-[0.18em]
                hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]
                transition-all duration-300"
              >
                Prenota un incontro
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              ref={menuButtonRef}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
              aria-controls="mobile-menu"
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full
              ring-1 ring-white/20 backdrop-blur-md transition-all duration-300
              hover:ring-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <span className="relative flex h-4 w-5 flex-col justify-center">
                <span
                  className={`absolute h-px w-5 transition-all duration-500 ease-out ${
                    open ? "rotate-45" : "-translate-y-[6px]"
                  } ${scrolled ? "bg-foreground" : "bg-white"}`}
                />
                <span
                  className={`absolute h-px w-5 transition-all duration-300 ease-out ${
                    open ? "opacity-0 scale-x-0" : "opacity-100"
                  } ${scrolled ? "bg-foreground" : "bg-white"}`}
                />
                <span
                  className={`absolute h-px w-5 transition-all duration-500 ease-out ${
                    open ? "-rotate-45" : "translate-y-[6px]"
                  } ${scrolled ? "bg-foreground" : "bg-white"}`}
                />
              </span>
            </button>
          </div>

          {/* MOBILE MENU (con animazione CSS Grid pixel-perfect) */}
          <div
            id="mobile-menu"
            ref={menuRef}
            role="navigation"
            aria-label="Menu di navigazione mobile"
            className={`lg:hidden grid transition-all duration-500 ease-out rounded-b-full overflow-hidden
            ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <nav
                className={`flex flex-col gap-3 px-6 py-6 backdrop-blur-xl
                ${scrolled ? "bg-background/90" : "bg-black/60"}`}
              >
                {NAV.map((item) => {
                  const id = item.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`px-5 py-3.5 rounded-full border text-sm uppercase tracking-[0.18em]
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-white/15 border-white/25 text-white"
                          : "border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}

                <a
                  href="#contatti"
                  onClick={(e) => handleNavClick(e, "#contatti")}
                  className="mt-2 rounded-full bg-white px-5 py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-black
                  hover:scale-[1.02] transition-transform duration-300"
                >
                  Prenota un incontro →
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY per chiusura click-outside (solo mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
