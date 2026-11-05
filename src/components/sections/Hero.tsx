import Link from "next/link";
import { Wordmark } from "@/components/brand/Logo";
import { Media } from "@/components/ui/Media";
import { media } from "@/content/media";
import { zeroum } from "@/content/zeroum";

/**
 * 01 · HERO
 * Camadas: [foto] → [ZEROUM discreto no topo] → [recorte do atleta, se houver] → [gradientes] → [conteúdo embaixo].
 * Sem chips no topo: a foto respira e a mensagem fica toda embaixo à esquerda (título + texto + CTAs).
 * Intro em CSS puro (globals.css → "Hero intro"); parallax/pin via data-fx="hero-parallax".
 */
export function Hero() {
  const athlete = media["hero-athlete-f"];

  return (
    // O wrapper é do React: o GSAP (pin) envolve a <section> num "pin-spacer"; sem este div,
    // ao trocar de página o React tentaria remover a section do <main> e quebraria (removeChild).
    <div className="relative">
    <section aria-labelledby="hero-title" className="relative p-3" data-fx="hero-parallax">
      <div className="hero-frame relative isolate flex h-[92svh] max-h-[1080px] min-h-[600px] flex-col overflow-hidden rounded-[var(--radius-photo)] bg-carbon">
        {/* Camada 1 · foto (super-resolução 2x, qualidade 85) */}
        <div className="absolute inset-0 -z-30" data-fx-bg>
          <div className="hero-bg h-full w-full">
            <Media slot="hero-bg" priority quality={85} keepRatio={false} rounded={false} hideLabel className="h-full w-full" sizes="100vw" />
          </div>
        </div>

        {/* Camada 2 · ZEROUM gigante "gravado" no piso, saindo pela borda de baixo:
            assina a marca sem brigar com o teto iluminado nem com o título */}
        <div
          className="hero-wordmark pointer-events-none absolute inset-x-[2%] -bottom-[3.2vw] -z-[4] opacity-[0.09]"
          data-fx-mark
        >
          <Wordmark className="w-full text-white" />
        </div>

        {/* Camada 3 · recorte do atleta (só quando houver o PNG real) */}
        {athlete.src && (
          <div className="hero-athlete absolute bottom-0 right-[4%] -z-10 aspect-[4/5] h-[62%] md:right-[10%] md:h-[80%]">
            <Media slot="hero-athlete-f" keepRatio={false} rounded={false} className="h-full w-full" imgClassName="!object-contain object-bottom" sizes="(min-width:768px) 40vw, 60vw" priority />
          </div>
        )}

        {/* Camada 4 · leitura: escurece só onde há texto, a foto continua viva */}
        <div className="absolute inset-0 -z-25 bg-black/25" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-[5] bg-[linear-gradient(to_top,rgb(11_11_11/0.92)_0%,rgb(11_11_11/0.6)_32%,transparent_62%),linear-gradient(to_right,rgb(11_11_11/0.55)_0%,transparent_55%),linear-gradient(to_bottom,rgb(11_11_11/0.5)_0%,transparent_22%)]"
          aria-hidden="true"
        />

        {/* Conteúdo — tudo embaixo, alinhado à esquerda */}
        <div className="mt-auto grid gap-6 p-5 md:grid-cols-12 md:items-end md:p-10">
          <div className="md:col-span-8 lg:col-span-7">
            <h1 id="hero-title" className="hero-title display text-[clamp(2.6rem,5.4vw,5.25rem)] leading-[1.06]">
              <span className="hero-line">
                <span>A academia</span>
              </span>
              <span className="hero-line">
                <span>que não fecha.</span>
              </span>
            </h1>
            <p className="hero-sub mt-4 max-w-[32rem] text-base text-white/85 md:text-lg">
              Musculação 24 horas em {zeroum.area}, com {zeroum.maquinas} máquinas, em Americana. Estrutura de verdade, acompanhamento de verdade.
            </p>
            <div className="hero-ctas mt-7 flex flex-wrap gap-3">
              <Link href="/aula-experimental" className="btn btn-red">
                Agendar aula experimental <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="/planos" className="btn btn-outline">
                Ver planos
              </Link>
            </div>
          </div>

          {/* Agregadores (ref. Velocity) */}
          <div className="hidden items-center md:col-span-4 md:flex md:justify-end lg:col-span-5">
            <span className="hero-connector h-px w-16 bg-white/50" aria-hidden="true" />
            <span className="hero-connector size-2 rounded-full bg-red-bright" aria-hidden="true" />
            <p className="hero-chip glass ml-3 max-w-[15rem] rounded-[var(--radius-chip)] p-4">
              <span className="label block text-gray-300">Agregadores</span>
              <span className="mt-1 block font-semibold leading-snug">Aceita Wellhub Silver · TotalPass TP2</span>
            </p>
          </div>
          <p className="label text-white/80 md:hidden">Aceita Wellhub Silver · TotalPass TP2</p>
        </div>
      </div>
    </section>
    </div>
  );
}
