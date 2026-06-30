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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // ============================================
  // MOUNT ANIMATION
  // ============================================
  useEffect(() => {
    setMounted(true);
  }, []);

  // ============================================
  // SCROLL DETECTION
  // ============================================
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
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
  // ACTIVE SECTION TRACKING
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
          rootMargin: "-30% 0px -50% 0px",
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // ============================================
  // ACTIVE INDICATOR POSITION
  // ============================================
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;

    const activeIndex = NAV.findIndex(
      (item) => item.href.replace("#", "") === activeSection
    );
    const hoverIndex = hoveredIndex;
    const targetIndex = hoverIndex !== null ? hoverIndex : activeIndex;

    if (targetIndex === -1) {
      indicatorRef.current.style.opacity = "0";
      return;
    }

    const links = navRef.current.querySelectorAll<HTMLAnchorElement>("a[data-nav-link]");
    const targetLink = links[targetIndex];
    if (!targetLink) return;

    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();

    indicatorRef.current.style.opacity = "1";
    indicatorRef.current.style.width = `${linkRect.width}px`;
    indicatorRef.current.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
  }, [activeSection, hoveredIndex]);

  // ============================================
  // KEYBOARD & FOCUS
  // ============================================
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

  // ============================================
  // SCROLL LOCK
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
  // SMOOTH SCROLL
  // ============================================
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        {/* Sfondo trasparente sempre - solo backdrop-blur leggero quando scrollato */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled
              ? "backdrop-blur-md bg-white/5"
              : "bg-transparent"
          }`}
          aria-hidden="true"
        />

        {/* Linea dorata sottile in basso */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1600px] px-8 lg:px-16">
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
              className={`group relative flex items-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <img
                src={logo}
                alt="Lion Group"
                className={`w-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  scrolled ? "h-8" : "h-10"
                }`}
                style={
                  isLight
                    ? {
                        filter:
                          "brightness(0) invert(1) drop-shadow(0 2px 20px rgba(0,0,0,0.4))",
                      }
                    : undefined
                }
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav
              ref={navRef}
              className="hidden lg:flex items-center relative"
            >
              {/* Indicatore attivo/hover - linea dorata */}
              <div
                ref={indicatorRef}
                className="absolute -bottom-2 h-px bg-amber-600 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ opacity: 0 }}
                aria-hidden="true"
              />

              {NAV.map((item, index) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    data-nav-link
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative px-6 py-2 text-[11px] font-medium uppercase tracking-[0.28em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    } ${
                      isLight
                        ? isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                        : isActive
                        ? "text-black"
                        : "text-black/50 hover:text-black"
                    }`}
                    style={{ transitionDelay: mounted ? `${300 + index * 100}ms` : "0ms" }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* CTA DESKTOP */}
            <div className="hidden lg:block">
              <a
                href="#contatti"
                onClick={(e) => handleNavClick(e, "#contatti")}
                className={`group relative inline-flex items-center gap-3 overflow-hidden border px-7 py-3 text-[10px] font-medium uppercase tracking-[0.3em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                } ${
                  isLight
                    ? "border-white/40 text-white hover:border-white hover:bg-white hover:text-black"
                    : "border-black/20 text-black hover:border-black hover:bg-black hover:text-white"
                }`}
                style={{ transitionDelay: mounted ? `${300 + NAV.length * 100 + 100}ms` : "0ms" }}
              >
                <span className="relative z-10">Prenota un incontro</span>
                <span
                  className={`relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1`}
                >
                  →
                </span>
              </a>
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              ref={menuButtonRef}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              className={`lg:hidden relative flex h-12 w-12 items-center justify-center transition-all duration-700 ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: mounted ? "600ms" : "0ms" }}
            >
              <span className="relative flex h-4 w-6 flex-col justify-between">
                <span
                  className={`block h-px w-full origin-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  } ${isLight ? "bg-white" : "bg-black"}`}
                />
                <span
                  className={`block h-px w-full origin-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  } ${isLight ? "bg-white" : "bg-black"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================ */}
      {/* MOBILE MENU FULL-SCREEN */}
      {/* ============================================ */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-700 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />

        {/* Contenuto */}
        <div
          ref={menuRef}
          role="navigation"
          aria-label="Menu di navigazione"
          className="relative flex h-full flex-col justify-between px-8 py-32"
        >
          {/* Links */}
          <nav className="flex flex-col">
            {NAV.map((item, index) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`group relative overflow-hidden py-4 border-b border-white/10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: open ? `${150 + index * 80}ms` : "0ms",
                  }}
                >
                  <span
                    className={`block text-4xl font-light tracking-[0.15em] uppercase transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/50 group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Hover line dorata */}
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-amber-600 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
                </a>
              );
            })}
          </nav>

          {/* Footer CTA */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: open ? `${150 + NAV.length * 80 + 100}ms` : "0ms" }}
          >
            <a
              href="#contatti"
              onClick={(e) => handleNavClick(e, "#contatti")}
              className="group flex items-center justify-between border-t border-white/20 pt-8"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                Contattaci
              </span>
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:border-white">
                <span className="transition-transform duration-500 group-hover:rotate-45">
                  →
                </span>
              </span>
            </a>

            <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
              <span>© 2026 Lion Group</span>
              <span>Milano · Londra</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
