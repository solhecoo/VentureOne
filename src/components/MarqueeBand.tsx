"use client";

import { Marquee } from "./animations/Marquee";

type Props = {
  items: string[];
  variant?: "light" | "dark" | "accent";
  speed?: number;
  reverse?: boolean;
};

const VARIANTS = {
  light: "bg-cream-soft text-ink",
  dark: "bg-ink text-cream",
  accent: "bg-accent text-white",
} as const;

export function MarqueeBand({ items, variant = "light", speed = 50, reverse = false }: Props) {
  return (
    <div className={`grain border-y border-ink/10 ${VARIANTS[variant]}`}>
      <Marquee speed={speed} reverse={reverse} className="py-7">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-12">
            <span className="heading-display text-[clamp(2rem,5vw,3.5rem)] leading-none">
              {item}
            </span>
            <span className="block size-2 rounded-full bg-current opacity-70" aria-hidden />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
