"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  repeat?: number;
};

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className = "",
  itemClassName = "",
  repeat = 4,
}: Props) {
  const prefersReduced = useReducedMotion();
  const items = Array.from({ length: repeat });

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden>
      <motion.div
        className="flex w-max items-center gap-12 will-change-transform"
        animate={
          prefersReduced
            ? undefined
            : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {items.concat(items).map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 items-center gap-12 ${itemClassName}`}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
