export const siteConfig = {
  name: "Venture One",
  shortName: "V1",
  tagline: "Activos urbanos. Rentabilidad medible.",
  description:
    "Identificamos, adquirimos y transformamos activos subvalorados en productos inmobiliarios de alta rotación en Medellín.",
  url: "https://ventureone.co",
  locale: "es-CO",
  whatsapp: {
    url: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "",
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    defaultMessage:
      "Hola Venture One, me interesa conocer más sobre las oportunidades de inversión.",
  },
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contacto@ventureone.co",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  },
} as const;

export function hasWhatsApp(): boolean {
  return Boolean(siteConfig.whatsapp.url || siteConfig.whatsapp.number);
}

export function buildWhatsAppUrl(message?: string): string {
  if (siteConfig.whatsapp.url) {
    return siteConfig.whatsapp.url;
  }
  const number = siteConfig.whatsapp.number.replace(/[^0-9]/g, "");
  if (!number) return "#contacto";
  const text = encodeURIComponent(message ?? siteConfig.whatsapp.defaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}
