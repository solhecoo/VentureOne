"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { buildWhatsAppUrl } from "@/lib/config";
import { ParallaxImage } from "./animations/Parallax";
import { Reveal, Stagger, StaggerItem } from "./animations/Reveal";
import { Magnetic } from "./animations/Magnetic";
import { TiltCard } from "./animations/TiltCard";
import { useCursorHover } from "./providers/CursorProvider";
import { SplitText } from "./animations/SplitText";

type Project = {
  id: string;
  name: string;
  location: string;
  status: "En transformación" | "Completado" | "Disponible";
  metrics: { label: string; value: string }[];
  image: string;
  alt: string;
};

const PROJECTS: Project[] = [
  {
    id: "v1-poblado-01",
    name: "Residencia El Poblado 01",
    location: "El Poblado · Medellín",
    status: "Completado",
    metrics: [
      { label: "Ciclo", value: "5 meses" },
      { label: "Área", value: "94 m²" },
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Apartamento remodelado de alta gama en El Poblado",
  },
  {
    id: "v1-laureles-02",
    name: "Residencia Laureles 02",
    location: "Laureles · Medellín",
    status: "En transformación",
    metrics: [
      { label: "Ciclo estimado", value: "4 meses" },
      { label: "Área", value: "78 m²" },
    ],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    alt: "Sala de apartamento en Laureles tras remodelación",
  },
  {
    id: "v1-envigado-03",
    name: "Residencia Envigado 03",
    location: "Envigado · Medellín",
    status: "Disponible",
    metrics: [
      { label: "Ciclo proyectado", value: "6 meses" },
      { label: "Área", value: "112 m²" },
    ],
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    alt: "Propiedad en Envigado con potencial de valorización",
  },
];

const STATUS_STYLES: Record<Project["status"], string> = {
  "En transformación": "bg-cream text-ink",
  Completado: "bg-accent text-white",
  Disponible: "bg-ink text-cream",
};

function ProjectCard({ p }: { p: Project }) {
  const cardHover = useCursorHover("VER");
  const prefersReduced = useReducedMotion();

  return (
    <TiltCard className="group h-full" intensity={6} scale={1.02}>
      <motion.article
        {...cardHover}
        whileHover={prefersReduced ? undefined : { y: -8 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative h-full overflow-hidden rounded-[6px] bg-surface shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-card)]"
      >
        <ParallaxImage
          src={p.image}
          alt={p.alt}
          sizes="(max-width: 768px) 100vw, 33vw"
          intensity={28}
          scale={1.2}
          className="aspect-[4/3]"
        />
        <span
          className={`absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] ${STATUS_STYLES[p.status]}`}
        >
          <span className="block size-1.5 rounded-full bg-current" />
          {p.status}
        </span>
        <div className="relative p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
            {p.location}
          </p>
          <h3 className="heading-display mt-3 text-[clamp(1.5rem,2vw,2rem)] text-ink">
            {p.name}
          </h3>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-6">
            {p.metrics.map((m) => (
              <div key={m.label}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
                  {m.label}
                </dt>
                <dd className="heading-display mt-1 text-2xl text-ink">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.article>
    </TiltCard>
  );
}

export function Portafolio() {
  const ctaHover = useCursorHover();

  return (
    <section
      id="portafolio"
      className="scroll-mt-24 bg-surface-alt py-24 md:py-32 overflow-hidden"
    >
      <div className="container-v1">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow">Portafolio</p>
            </Reveal>
            <h2 className="heading-display mt-5 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.9]">
              <SplitText text="Activos transformados," inView className="block text-ink" />
              <span className="block">
                <SplitText
                  text="liquidez demostrable."
                  inView
                  className="serif-italic block text-accent"
                  delay={0.1}
                />
              </span>
            </h2>
          </div>
          <Reveal delay={0.15} direction="left">
            <p className="max-w-md text-[15px] leading-relaxed text-muted">
              Una muestra representativa del pipeline: adquisición, rediseño y
              reposicionamiento en los corredores con mayor demanda.
            </p>
          </Reveal>
        </div>

        <Stagger
          className="mt-14 grid gap-6 md:grid-cols-3"
          staggerChildren={0.14}
        >
          {PROJECTS.map((p) => (
            <StaggerItem key={p.id}>
              <ProjectCard p={p} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.3} className="mt-14 flex justify-center">
          <Magnetic>
            <Link
              {...ctaHover}
              href={buildWhatsAppUrl("Hola, me gustaría ver el portafolio completo de Venture One.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ink/20 bg-surface px-7 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-ink transition"
            >
              <span className="relative z-10">Ver portafolio completo</span>
              <span className="relative z-10 block size-1.5 rounded-full bg-accent transition group-hover:scale-150" />
              <span className="absolute inset-0 -translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:text-cream" />
            </Link>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
