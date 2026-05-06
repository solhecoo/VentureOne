"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { buildWhatsAppUrl, siteConfig } from "@/lib/config";
import { Reveal } from "./animations/Reveal";
import { Magnetic } from "./animations/Magnetic";
import { SplitText } from "./animations/SplitText";
import { useCursorHover } from "./providers/CursorProvider";

export function ContactoCTA() {
  const ctaHover = useCursorHover();

  return (
    <section
      id="acceso-inversionistas"
      className="scroll-mt-24 py-24 md:py-32"
    >
      <div className="container-v1">
        <Reveal direction="fade">
          <motion.div
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.97, opacity: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            className="grain relative overflow-hidden rounded-[8px] bg-cream-soft"
          >
            <div className="grid items-center gap-12 p-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:p-16">
              <div>
                <Reveal>
                  <p className="eyebrow text-ink/70">Acceso inversionistas</p>
                </Reveal>
                <h2 className="heading-display mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.92]">
                  <SplitText text="Listos para la" inView className="block text-ink" />
                  <span className="block">
                    <SplitText
                      text="próxima operación."
                      inView
                      className="serif-italic block text-accent"
                      delay={0.12}
                    />
                  </span>
                </h2>
                <Reveal delay={0.22}>
                  <p className="mt-7 max-w-lg text-[16px] leading-relaxed text-ink/75">
                    Si buscas exposición al mercado inmobiliario de Medellín
                    con ciclos cortos y rentabilidad medible, conversemos.
                    Recibirás el deck de tesis y el pipeline activo al hacer
                    contacto.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.3} className="flex flex-col gap-3">
                <Magnetic>
                  <Link
                    {...ctaHover}
                    href={buildWhatsAppUrl(
                      "Hola Venture One, soy inversionista y quiero recibir el deck y el pipeline.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex w-full items-center justify-between gap-4 overflow-hidden rounded-full bg-ink px-7 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-cream"
                  >
                    <span className="relative z-10">Escribir por WhatsApp</span>
                    <motion.span
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.25 }}
                      className="relative z-10 inline-block"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M4 9H14M14 9L10 5M14 9L10 13" />
                      </svg>
                    </motion.span>
                    <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                  </Link>
                </Magnetic>
                <a
                  {...ctaHover}
                  href={`mailto:${siteConfig.email}?subject=Solicitud%20deck%20inversionistas`}
                  className="group inline-flex items-center justify-between gap-4 rounded-full border border-ink/15 bg-surface px-7 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:border-ink"
                >
                  <span>Enviar correo</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition group-hover:translate-x-1">
                    <rect x="2.5" y="4" width="13" height="10" rx="1" />
                    <path d="M3 5L9 10L15 5" />
                  </svg>
                </a>
                <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-ink/45">
                  Respuesta en menos de 24 horas hábiles.
                </p>
              </Reveal>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
