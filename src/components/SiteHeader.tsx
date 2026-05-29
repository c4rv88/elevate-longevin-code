import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/longevin-logo.png";

const links = [
  { label: "Home", href: "/#home", to: "/" },
  { label: "A Longevin", href: "/a-longevin", to: "/a-longevin", internal: true },
  { label: "Especialidades", href: "/#especialidades", to: "/" },
  { label: "Equipe", href: "/#equipe", to: "/" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-black/15 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10 py-4">
        <a href="#home" className="flex items-center" aria-label="Longevin">
          <img
            src={logo}
            alt="Longevin"
            className={`h-9 md:h-10 w-auto transition-[filter] duration-500 ${
              onDark ? "brightness-0 invert opacity-95" : ""
            }`}
            loading="eager"
            decoding="async"
          />
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`link-underline text-[12px] tracking-[0.22em] uppercase transition-colors ${
                onDark ? "text-white/80 hover:text-white" : "text-foreground/75 hover:text-primary"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="https://agende.longevin.com.br/"
            className="btn-premium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar
            <span className="arrow" aria-hidden>→</span>
          </a>
        </div>

        <button
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
            onDark ? "border-white/40" : "border-border"
          }`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[5px]">
            <span className={`block h-px w-5 transition-transform ${onDark ? "bg-white" : "bg-foreground"} ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 transition-opacity ${onDark ? "bg-white" : "bg-foreground"} ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 transition-transform ${onDark ? "bg-white" : "bg-foreground"} ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-96" : "max-h-0"}`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-t border-border/60 px-6 py-8 flex flex-col gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[13px] tracking-[0.22em] uppercase text-foreground/80"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://agende.longevin.com.br/"
            className="btn-premium self-start"
            target="_blank"
            rel="noopener noreferrer"
          >
            Agendar consulta <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export function LongevinMark({ className = "" }: { className?: string }) {
  return <img src={logo} alt="Longevin" className={className} />;
}
