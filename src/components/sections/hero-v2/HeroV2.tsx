import Link from "next/link";
import { zeroum } from "@/content/zeroum";
import { HeroGallery } from "./HeroGallery";

const fatos = ["Aberta 24h", "2.500 m²", `${zeroum.maquinas} máquinas de ${zeroum.marcas} marcas`, "Wellhub Silver", "TotalPass TP2", "Sala Recovery", "Americana/SP"];

/**
 * HERO V2 — composição dividida.
 * Esquerda: texto sobre preto puro (contraste máximo, nada disputando com o título).
 * Direita: galeria "stories" com as fotos reais (prova da estrutura).
 * Base: faixa vermelha com os números passando (marquee linear; parado em reduced-motion).
 * Intro em CSS (globals.css → "Hero V2"): a foto abre de baixo para cima, o título sobe por linhas.
 */
export function HeroV2() {
  return (
    <section aria-labelledby="hero-title" className="hero2 relative flex min-h-[100svh] flex-col bg-black pt-[calc(var(--nav-h)+0.75rem)]">
      <div className="container-site grid flex-1 gap-5 pb-5 lg:grid-cols-12 lg:gap-10 lg:pb-8">
        {/* Galeria: primeiro no mobile, à direita no desktop */}
        <div className="hero2-photo h-[34svh] min-h-[220px] md:h-[44svh] lg:order-2 lg:col-span-7 lg:h-auto">
          <HeroGallery />
        </div>

        {/* Texto */}
        <div className="flex flex-col justify-end lg:order-1 lg:col-span-5 lg:pb-4">
          <p className="hero2-in label flex items-center gap-2 text-gray-300" style={{ animationDelay: "0.35s" }}>
            <span className="pulse-dot" aria-hidden="true" />
            Aberta agora · Americana/SP
          </p>

          <h1 id="hero-title" className="hero-title display mt-4 text-[clamp(2.6rem,7.2vw,7.5rem)] leading-[1.02] lg:mt-5">
            <span className="hero-line">
              <span>A academia</span>
            </span>
            <span className="hero-line">
              <span>que não</span>
            </span>
            <span className="hero-line">
              <span className="text-red">fecha.</span>
            </span>
          </h1>

          <p className="hero2-in mt-4 max-w-md text-base text-white/80 md:mt-6 md:text-lg" style={{ animationDelay: "0.85s" }}>
            Musculação 24 horas, com {zeroum.area} e {zeroum.maquinas} máquinas. A maior academia de Americana.
          </p>

          <div className="hero2-in mt-6 flex flex-wrap md:mt-8 items-center gap-x-6 gap-y-3" style={{ animationDelay: "0.95s" }}>
            <Link href="/aula-experimental" className="btn btn-red">
              Agendar aula experimental <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/planos" className="group inline-flex min-h-12 items-center gap-2 font-semibold text-white/90 hover:text-white">
              Ver planos
              <span className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Faixa de números */}
      <div className="hero2-in relative overflow-hidden border-y border-red-deep bg-red py-3.5 text-white md:py-4" style={{ animationDelay: "1.1s" }}>
        <p className="sr-only">{fatos.join(", ")}.</p>
        <div className="hero2-marquee flex w-max" aria-hidden="true">
          {[0, 1].map((dup) => (
            <ul key={dup} className="flex shrink-0 items-center">
              {fatos.map((f) => (
                <li key={f} className="display flex items-center whitespace-nowrap text-[clamp(1.25rem,2.2vw,1.9rem)] leading-none">
                  <span className="px-6 md:px-8">{f}</span>
                  <span className="text-black/45">✱</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
