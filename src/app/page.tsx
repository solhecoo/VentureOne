import { ContactoCTA } from "@/components/ContactoCTA";
import { Estrategia } from "@/components/Estrategia";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MarqueeBand } from "@/components/MarqueeBand";
import { Mercado } from "@/components/Mercado";
import { Nosotros } from "@/components/Nosotros";
import { Portafolio } from "@/components/Portafolio";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        <Hero />
        <MarqueeBand
          variant="light"
          items={[
            "Sourcing",
            "Transformación",
            "Rentabilidad",
            "Medellín",
            "Estratos 4 · 5",
            "Ciclos 4–6 meses",
          ]}
        />
        <Estrategia />
        <Portafolio />
        <MarqueeBand
          variant="dark"
          reverse
          speed={60}
          items={[
            "Buy",
            "Transform",
            "Sell",
            "Repeat",
            "Compra",
            "Transforma",
            "Vende",
          ]}
        />
        <Mercado />
        <Nosotros />
        <ContactoCTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
