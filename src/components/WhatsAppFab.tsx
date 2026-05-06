"use client";

import { useEffect, useState } from "react";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/config";

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!hasWhatsApp()) return null;

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#1EBE57] md:bottom-8 md:right-8 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.52 3.48A11.93 11.93 0 0 0 12.03 0C5.47 0 .13 5.33.13 11.89c0 2.1.55 4.14 1.6 5.94L0 24l6.35-1.66a11.9 11.9 0 0 0 5.68 1.44h.01c6.56 0 11.9-5.33 11.9-11.89 0-3.18-1.24-6.17-3.42-8.41ZM12.04 21.3h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.77.98 1.01-3.67-.24-.38a9.87 9.87 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.91-9.9a9.84 9.84 0 0 1 7 2.9 9.84 9.84 0 0 1 2.9 7c0 5.47-4.45 9.92-9.88 9.92Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.76.97-.94 1.16-.17.2-.34.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5l-.56-.01c-.2 0-.52.07-.8.38-.27.3-1.05 1.02-1.05 2.48s1.08 2.88 1.23 3.08c.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.58-.35Z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
