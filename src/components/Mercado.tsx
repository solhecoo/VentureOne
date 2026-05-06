"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ParallaxImage } from "./animations/Parallax";
import { Reveal, Stagger, StaggerItem } from "./animations/Reveal";
import { Counter } from "./animations/Counter";
import { SplitText } from "./animations/SplitText";

type Stat = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  note: string;
};

const STATS: Stat[] = [
  {
    to: 6.2,
    decimals: 1,
    suffix: " %",
    label: "Valorización promedio anual",
    note: "PENDIENTE: confirmar fuente oficial",
  },
  {
    to: 38,
    prefix: "+",
    suffix: " %",
    label: "Crecimiento de rentas cortas 2019–2024",
    note: "PENDIENTE: confirmar con cliente",
  },
  {
    to: 4,
    suffix: " · 5",
    label: "Estratos con mayor margen de arbitraje",
    note: "Observación interna",
  },
];

function StatRow({ s }: { s: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="grid grid-cols-[140px_1fr] items-baseline gap-5 border-t border-ink/10 pt-6"
    >
      <dt className="heading-display text-4xl text-accent">
        <Counter
          to={s.to}
          decimals={s.decimals}
          prefix={s.prefix}
          suffix={s.suffix}
        />
      </dt>
      <dd className="text-sm text-ink">
        <span className="block font-semibold">{s.label}</span>
        <span className="mt-1 block text-xs text-muted">{s.note}</span>
      </dd>
    </motion.div>
  );
}

export function Mercado() {
  return (
    <section
      id="mercado"
      className="scroll-mt-24 py-24 md:py-32 overflow-hidden"
    >
      <div className="container-v1">
        <div className="grid gap-16 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <Reveal>
              <p className="eyebrow">Mercado</p>
            </Reveal>
            <h2 className="heading-display mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.9]">
              <SplitText text="Medellín," inView className="block text-ink" />
              <span className="block">
                <SplitText
                  text="epicentro"
                  inView
                  className="serif-italic block text-accent"
                  delay={0.1}
                />
              </span>
              <SplitText text="de demanda." inView className="block text-ink" delay={0.18} />
            </h2>
            <Reveal delay={0.18}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted">
                La combinación de crecimiento turístico, llegada de nómadas
                digitales y un inventario secundario desactualizado crea una
                ventana única para estrategias de arbitraje controlado.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-3 max-w-md text-[13px] italic text-muted/70">
                {/* PENDIENTE: reemplazar por texto definitivo del cliente */}
                Texto de mercado — pendiente de contenido final del cliente.
              </p>
            </Reveal>

            <Stagger className="mt-12 space-y-6" staggerChildren={0.12}>
              {STATS.map((s) => (
                <StaggerItem key={s.label}>
                  <StatRow s={s} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="relative min-h-[480px] md:min-h-[640px]">
            <div className="absolute inset-0 overflow-hidden rounded-[6px] shadow-[var(--shadow-card)]">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80"
                alt="Vista urbana de Medellín"
                sizes="(max-width: 768px) 100vw, 55vw"
                intensity={90}
                scale={1.22}
                className="h-full w-full"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
              className="absolute -right-4 -top-4 h-28 w-28 rounded-[6px] bg-cream/70 -z-10 md:-right-8 md:-top-8 md:h-44 md:w-44"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -bottom-6 right-6 max-w-[260px] rounded-[6px] bg-surface p-5 shadow-[var(--shadow-card)] md:right-10"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                Tesis
              </p>
              <p className="serif-italic mt-2 text-[20px] leading-[1.1] text-ink">
                «El alpha está en transformar producto, no en esperar valor.»
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
