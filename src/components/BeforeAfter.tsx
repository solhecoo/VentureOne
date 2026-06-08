"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "motion/react";
import { useCallback, useRef, useState, type KeyboardEvent } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  initial?: number;
  priority?: boolean;
  sizes?: string;
};

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Antes",
  afterLabel = "Después",
  className = "",
  initial = 50,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 55vw",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const position = useMotionValue(initial);
  const smooth = useSpring(position, {
    stiffness: 320,
    damping: 38,
    mass: 0.5,
  });
  const clip = useTransform(smooth, (v) => `inset(0 ${100 - v}% 0 0)`);
  const handleX = useTransform(smooth, (v) => `${v}%`);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      position.set(Math.max(0, Math.min(100, pct)));
    },
    [position],
  );

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      position.set(Math.max(0, position.get() - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      position.set(Math.min(100, position.get() + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      position.set(0);
    } else if (e.key === "End") {
      e.preventDefault();
      position.set(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        setDragging(false);
      }}
      onPointerCancel={() => setDragging(false)}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        draggable={false}
      />

      <motion.div
        className="absolute inset-0"
        style={{ clipPath: clip, WebkitClipPath: clip }}
        aria-hidden
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          draggable={false}
        />
      </motion.div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-accent/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      <motion.div
        className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/95 shadow-[0_0_24px_rgba(0,0,0,0.35)]"
        style={{ left: handleX, x: "-50%" }}
        aria-hidden
      />

      <motion.div
        role="slider"
        tabIndex={0}
        aria-label="Comparador antes y después"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position.get())}
        onKeyDown={onKey}
        className="absolute top-1/2 grid size-12 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_rgba(10,22,40,0.35)] outline-none ring-0 transition focus-visible:ring-2 focus-visible:ring-accent"
        style={{ left: handleX, x: "-50%" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 5L3 10L7 15" />
          <path d="M13 5L17 10L13 15" />
        </svg>
      </motion.div>
    </div>
  );
}
