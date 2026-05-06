"use client";

import { motion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "./animations/Reveal";
import { ParallaxLayer } from "./animations/Parallax";
import { Spotlight } from "./animations/Spotlight";
import { SplitText } from "./animations/SplitText";

const PILLARS = [
  {
    title: "Disciplina financiera",
    text:
      "Cada operación se ejecuta sobre escenarios modelados y umbrales de riesgo definidos antes de la compra.",
  },
  {
    title: "Red local",
    text:
      "Sourcing a través de relaciones directas con agentes, administraciones y propietarios en Medellín.",
  },
  {
    title: "Transparencia operativa",
    text:
      "Reportes trimestrales con KPIs, avances de obra y flujo de caja para inversionistas.",
  },
];

export function Nosotros() {
  return (
    <Spotlight
      className="scroll-mt-24 grain bg-ink py-28 text-cream md:py-36 overflow-hidden"
      color="rgba(127, 165, 152, 0.22)"
      size={620}
    >
      <section id="nosotros" className="relative">
        <ParallaxLayer
          intensity={60}
          className="pointer-events-none absolute -right-24 -top-32 h-[460px] w-[460px] rounded-full bg-accent/10 blur-3xl"
        >
          <span />
        </ParallaxLayer>
        <ParallaxLayer
          intensity={-50}
          className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-cream/10 blur-3xl"
        >
          <span />
        </ParallaxLayer>

        <div className="container-v1 relative">
          <div className="grid gap-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <Reveal>
                <p className="eyebrow text-accent-soft">Nosotros</p>
              </Reveal>
              <h2 className="heading-display mt-5 text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9]">
                <SplitText text="Una tesis clara," inView className="block" />
                <span className="block">
                  <SplitText
                    text="ejecutada"
                    inView
                    className="serif-italic block text-accent-soft"
                    delay={0.12}
                  />
                </span>
                <SplitText text="con precisión." inView className="block" delay={0.22} />
              </h2>
            </div>
            <div className="md:pt-6">
              <Reveal delay={0.15}>
                <p className="text-[18px] leading-relaxed text-cream/85">
                  Venture One es una plataforma de inversión inmobiliaria
                  enfocada en arbitraje residencial en Medellín. Combinamos
                  criterio financiero, diseño y operación para convertir activos
                  desactualizados en productos de alta liquidez.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="serif-italic mt-6 text-[28px] leading-tight text-cream/95">
                  «Compramos diferencia, vendemos producto.»
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="mt-4 text-sm italic text-cream/40">
                  {/* PENDIENTE: reemplazar con historia/equipo/credenciales reales */}
                  Historia, equipo y credenciales — pendientes de contenido
                  final.
                </p>
              </Reveal>
            </div>
          </div>

          <Stagger className="mt-20 grid gap-5 md:grid-cols-3" staggerChildren={0.14}>
            {PILLARS.map((p, i) => (
              <StaggerItem key={p.title}>
                <motion.div
                  whileHover={{ y: -8, borderColor: "rgba(127, 165, 152, 0.6)" }}
                  transition={{ duration: 0.35 }}
                  className="group relative h-full overflow-hidden rounded-[6px] border border-cream/15 p-8 backdrop-blur-sm"
                >
                  <div className="mb-10 flex items-center gap-3">
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2 + i * 0.1,
                        ease: [0.2, 0.7, 0.2, 1],
                      }}
                      className="block h-px w-8 origin-left bg-accent"
                    />
                    <span className="serif-italic text-2xl text-cream/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="heading-display text-2xl">{p.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/70">
                    {p.text}
                  </p>
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </Spotlight>
  );
}
