import Image from "next/image";
import Link from "next/link";

type Props = {
  variant?: "full" | "compact";
  className?: string;
};

const SIZES: Record<NonNullable<Props["variant"]>, number> = {
  full: 38,
  compact: 32,
};

export function Logo({ variant = "full", className = "" }: Props) {
  const size = SIZES[variant];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="Venture One — Inicio"
    >
      <span
        className="relative inline-flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.png"
          alt=""
          fill
          priority
          sizes={`${size}px`}
          className="object-contain"
        />
      </span>
      {variant === "full" && (
        <span className="heading-display text-[22px] font-extrabold leading-none tracking-[0.04em] text-ink">
          VENTURE ONE
        </span>
      )}
    </Link>
  );
}
