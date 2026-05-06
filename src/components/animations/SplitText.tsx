"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerChildren?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  inView?: boolean;
};

export function SplitText({
  text,
  className,
  wordClassName = "",
  delay = 0,
  staggerChildren = 0.06,
  duration = 0.85,
  as = "span",
  inView = false,
}: Props) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren },
    },
  };

  const word: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration, ease: [0.2, 0.7, 0.2, 1] },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(inView
        ? { whileInView: "visible", viewport: { once: true, amount: 0.3 } }
        : { animate: "visible" })}
      variants={container}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: i === words.length - 1 ? 0 : "0.25em" }}
        >
          <motion.span
            variants={word}
            className={`inline-block ${wordClassName}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
