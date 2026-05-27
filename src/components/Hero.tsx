"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { buildWhatsAppUrl } from "@/lib/config";
import { ParallaxImage } from "./animations/Parallax";
import { Magnetic } from "./animations/Magnetic";
import { SplitText } from "./animations/SplitText";
import { useCursorHover } from "./providers/CursorProvider";

const STATS = [
  { label: "Rentabilidad inversionista", value: "27–32%", unit: "EA*" },
  { label: "Meses ciclo", value: "4–6", unit: "" },
  { label: "COP ejecutados", value: "$891MM", unit: "" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const viewHover = useCursorHover("VER");
  const ctaHover = useCursorHover();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, -120],
  );
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [0, 80],
  );

  return (
    <section
      ref={ref}
      className="relative pt-6 pb-24 md:pt-10 md:pb-32 overflow-hidden"
    >
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="container-v1 relative z-10"
      >
        <div className="grid items-end gap-10 md:gap-16 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="pt-6 md:pt-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="block h-px w-10 bg-accent" />
              Real estate · Medellín
            </motion.p>

            <h1 className="heading-display mt-6 text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.86]">
              <SplitText
                text="Activos"
                as="span"
                className="block text-ink"
                delay={0.1}
                staggerChildren={0.05}
              />
              <SplitText
                text="urbanos."
                as="span"
                className="block text-ink"
                delay={0.18}
              />
              <span className="block">
                <SplitText
                  text="rentabilidad"
                  as="span"
                  className="serif-italic block text-accent text-[0.92em]"
                  delay={0.34}
                  staggerChildren={0.04}
                />
              </span>
              <SplitText
                text="medible."
                as="span"
                className="block text-ink"
                delay={0.5}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="mt-10 max-w-md text-[17px] leading-relaxed text-muted text-balance"
            >
              Identificamos, adquirimos y transformamos activos subvalorados en
              productos inmobiliarios de alta rotación. Ciclos cortos,
              decisiones disciplinadas, retornos medibles.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Magnetic>
                <Link
                  {...ctaHover}
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-cream transition"
                >
                  <span className="relative z-10">Acceder a oportunidades</span>
                  <span className="relative z-10 inline-block transition group-hover:translate-x-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 -translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                </Link>
              </Magnetic>
              <Link
                {...ctaHover}
                href="#estrategia"
                className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition hover:border-ink"
              >
                <span className="block size-1.5 rounded-full bg-accent transition group-hover:scale-150" />
                Conocer tesis
              </Link>
            </motion.div>
          </div>

          <motion.div
            style={{ y: imageY, scale: imageScale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative min-h-[480px] md:min-h-[680px]"
          >
            <div
              {...viewHover}
              className="absolute inset-0 overflow-hidden rounded-[6px] shadow-[var(--shadow-card)]"
            >
              <ParallaxImage
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
                alt="Interior residencial de alta gama en Medellín"
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                intensity={70}
                scale={1.18}
                className="h-full w-full"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-cream"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              className="absolute -bottom-8 left-6 max-w-[260px] rounded-[6px] bg-ink p-5 text-cream shadow-[var(--shadow-card)] md:left-10"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cream/60">
                Caso reciente
              </p>
              <p className="serif-italic mt-2 text-[22px] leading-[1.05]">
                «Un apartamento en El Poblado, transformado y vendido en 5
                meses.»
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.dl
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 1.3 } },
          }}
          className="mx-auto mt-24 grid max-w-4xl grid-cols-3 gap-6 border-t border-ink/10 pt-10 text-center md:gap-12"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
                },
              }}
              className="flex flex-col items-center gap-3"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                {s.label}
              </dt>
              <dd className="heading-display text-4xl text-ink md:text-5xl">
                {s.value}
                {s.unit && <span className="ml-2 serif-italic text-2xl text-accent md:text-3xl">{s.unit}</span>}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted md:flex"
        aria-hidden
      >
        <span>Scroll</span>
        <motion.span
          className="block h-10 w-px bg-muted/40"
          animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
