"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { useCursorHover } from "./providers/CursorProvider";

const NAV = [
  { href: "#estrategia", label: "Estrategia" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#mercado", label: "Mercado" },
  { href: "#nosotros", label: "Nosotros" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"ES" | "EN">("ES");
  const ctaHover = useCursorHover();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-surface/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(10,22,40,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-v1 flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV.map((item) => (
            <a
              key={item.href}
              {...ctaHover}
              href={item.href}
              className="group relative px-4 py-2 text-sm font-medium text-ink/80 transition hover:text-ink"
            >
              {item.label}
              <span className="absolute bottom-0 left-4 right-4 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-1 text-xs font-semibold tracking-wider">
            <button
              {...ctaHover}
              onClick={() => setLang("ES")}
              className={`px-1 transition ${
                lang === "ES" ? "text-ink" : "text-muted hover:text-ink"
              }`}
              aria-pressed={lang === "ES"}
            >
              ES
            </button>
            <span className="text-muted">/</span>
            <button
              {...ctaHover}
              onClick={() => setLang("EN")}
              className={`px-1 transition ${
                lang === "EN" ? "text-ink" : "text-muted hover:text-ink"
              }`}
              aria-pressed={lang === "EN"}
              title="English coming soon"
            >
              EN
            </button>
          </div>

          <Link
            {...ctaHover}
            href="#acceso-inversionistas"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream"
          >
            <span className="relative z-10">Acceso inversionistas</span>
            <span className="relative z-10 block size-1.5 rounded-full bg-accent transition group-hover:scale-150" />
            <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          </Link>
        </div>

        <button
          {...ctaHover}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex size-10 items-center justify-center rounded-md text-ink"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <path d="M5 5L17 17" />
                <path d="M17 5L5 17" />
              </>
            ) : (
              <>
                <path d="M3 7H19" />
                <path d="M3 15H19" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="md:hidden fixed inset-x-0 top-20 z-40 border-t border-ink/5 bg-surface/95 backdrop-blur-md"
          >
            <nav
              className="container-v1 flex flex-col gap-1 py-6"
              aria-label="Móvil"
            >
              {NAV.map((item, i) => (
                <motion.a
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-3 text-2xl font-medium uppercase tracking-tight text-ink/90 hover:bg-surface-alt"
                >
                  {item.label}
                </motion.a>
              ))}
              <Link
                href="#acceso-inversionistas"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-ink px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream"
              >
                Acceso inversionistas
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
