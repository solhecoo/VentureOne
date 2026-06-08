"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "./animations/Reveal";
import { SplitText } from "./animations/SplitText";

const PILLARS = [
  {
    key: "sourcing",
    number: "01",
    title: "Sourcing",
    text:
      "El mercado residencial presenta activos subvalorados por diseño, uso y distribución ineficiente que no captura el valor real.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20L15.2 15.2" />
      </svg>
    ),
  },
  {
    key: "transformacion",
    number: "02",
    title: "Transformación",
    text:
      "Transformamos unidades obsoletas en productos de alta gama alineados con la demanda actual de rentas cortas y nómadas.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M6 20V7L12 4L18 7V20" />
        <path d="M10 20V13H14V20" />
        <path d="M4 20H20" />
      </svg>
    ),
  },
  {
    key: "liquidez",
    number: "03",
    title: "Liquidez",
    text:
      "Ciclos cortos de 4–6 meses maximizan rentabilidades anualizadas, permitiendo una reinversión estratégica y constante.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7V17" />
        <path d="M15 9.5C14.5 8.3 13.3 7.5 12 7.5C10.3 7.5 9 8.5 9 9.8C9 12.8 15 11.8 15 14.2C15 15.5 13.7 16.5 12 16.5C10.5 16.5 9.3 15.7 8.8 14.5" />
      </svg>
    ),
  },
];

export function Estrategia() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="estrategia" className="scroll-mt-24 py-24 md:py-36 overflow-hidden">
      <div className="container-v1">
        <Reveal direction="fade">
          <div className="bordered-card grain px-7 py-12 md:px-14 md:py-16">
            <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div>
                <Reveal delay={0.05}>
                  <p className="eyebrow">Estrategia</p>
                </Reveal>
                <h2 className="heading-display mt-5 text-[clamp(2.5rem,7vw,6rem)] leading-[0.92] text-ink">
                  <SplitText
                    text="Captura de valor"
                    inView
                    className="block"
                    staggerChildren={0.05}
                  />
                  <SplitText
                    text="urbano:"
                    inView
                    className="block"
                    delay={0.1}
                  />
                  <span className="block">
                    <SplitText
                      text="estrategia, ejecución, retorno."
                      inView
                      className="serif-italic block text-accent text-[0.92em]"
                      delay={0.22}
                      staggerChildren={0.045}
                    />
                  </span>
                </h2>
              </div>
              <Reveal delay={0.4} direction="left">
                <p className="text-sm font-medium uppercase tracking-[0.16em] leading-relaxed text-muted md:text-right">
                  Maximizamos el rendimiento del capital mediante la
                  identificación y optimización de activos inmobiliarios en los
                  sectores de mayor plusvalía.
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <p className="heading-display text-center text-[11px] tracking-[0.36em] text-muted">
              CÓMO GENERAMOS RENTABILIDAD
            </p>
          </Reveal>

          <Stagger
            className="mt-12 grid gap-5 md:grid-cols-3"
            staggerChildren={0.14}
            delayChildren={0.1}
          >
            {PILLARS.map((p, i) => (
              <StaggerItem key={p.key}>
                <motion.article
                  whileHover={
                    prefersReduced
                      ? undefined
                      : { y: -10, transition: { duration: 0.35, ease: "easeOut" } }
                  }
                  className="group relative flex h-full flex-col overflow-hidden rounded-[6px] border border-ink/10 bg-surface-card p-8 transition-colors duration-500 hover:border-ink/40 hover:bg-ink hover:text-cream"
                >
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + i * 0.1,
                        ease: [0.2, 0.7, 0.2, 1],
                      }}
                      className="grid size-12 place-items-center rounded-full bg-white text-accent shadow-[var(--shadow-soft)] transition-colors duration-500 group-hover:bg-accent group-hover:text-ink"
                    >
                      {p.icon}
                    </motion.div>
                    <span className="serif-italic text-3xl text-muted/50 transition-colors duration-500 group-hover:text-cream/60">
                      {p.number}
                    </span>
                  </div>

                  <h3 className="heading-display mt-20 text-3xl font-extrabold tracking-[0.01em]">
                    {p.title.toUpperCase()}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-cream/80">
                    {p.text}
                  </p>

                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.4 + i * 0.1,
                      ease: [0.2, 0.7, 0.2, 1],
                    }}
                    className="mt-8 block h-px w-full origin-left bg-accent"
                  />
                </motion.article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
