import Link from "next/link";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/config";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-surface-alt pt-16 pb-10">
      <div className="container-v1">
        <div className="grid gap-10 border-b border-ink/10 pb-12 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="heading-display text-[11px] tracking-[0.22em] text-ink">
              NAVEGACIÓN
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/80">
              <li><a href="#estrategia" className="hover:text-ink">Estrategia</a></li>
              <li><a href="#portafolio" className="hover:text-ink">Portafolio</a></li>
              <li><a href="#mercado" className="hover:text-ink">Mercado</a></li>
              <li><a href="#nosotros" className="hover:text-ink">Nosotros</a></li>
            </ul>
          </div>

          <div>
            <p className="heading-display text-[11px] tracking-[0.22em] text-ink">
              CONTACTO
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/80">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
                  {siteConfig.email}
                </a>
              </li>
              <li>Medellín · Colombia</li>
              <li>
                <Link href="#acceso-inversionistas" className="hover:text-ink">
                  Acceso inversionistas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="heading-display text-[11px] tracking-[0.22em] text-ink">
              SÍGUENOS
            </p>
            <ul className="mt-5 space-y-3 text-sm text-ink/80">
              {siteConfig.social.instagram && (
                <li>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                    Instagram
                  </a>
                </li>
              )}
              {siteConfig.social.linkedin && (
                <li>
                  <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                    LinkedIn
                  </a>
                </li>
              )}
              {!siteConfig.social.instagram && !siteConfig.social.linkedin && (
                <li className="text-muted italic">Próximamente</li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 pt-8 text-xs text-muted md:flex-row md:items-center">
          <p>© {YEAR} {siteConfig.name}. Todos los derechos reservados.</p>
          <p className="uppercase tracking-[0.18em]">Medellín · Colombia</p>
        </div>
      </div>
    </footer>
  );
}
