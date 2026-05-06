"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useEffect, useSyncExternalStore } from "react";
import { useCursor } from "./providers/CursorProvider";

function subscribeFinePointer(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const { state } = useCursor();
  const prefersReduced = useReducedMotion();
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getServerSnapshot,
  );

  const enabled = isFinePointer && !prefersReduced;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 480, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 480, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isView = state.variant === "view";
  const isHover = state.variant === "hover";
  const isHidden = state.variant === "hidden";

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <motion.div
        animate={{
          width: isView ? 96 : isHover ? 56 : 12,
          height: isView ? 96 : isHover ? 56 : 12,
          backgroundColor: isView
            ? "rgba(10, 22, 40, 1)"
            : isHover
              ? "rgba(127, 165, 152, 0.18)"
              : "rgba(10, 22, 40, 1)",
          opacity: isHidden ? 0 : 1,
          mixBlendMode: isView ? "normal" : "difference",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 32, mass: 0.6 }}
        className="grid place-items-center rounded-full"
      >
        {isView && state.label && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="heading-display text-[11px] font-bold uppercase tracking-[0.2em] text-cream"
          >
            {state.label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
