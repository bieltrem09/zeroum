import Link from "next/link";
import { pilares } from "@/content/zeroum";
import { SectionLabel } from "@/components/ui/SectionHead";

/** "2.500 m²" → { n: 2500, unit: " m²" } para o número poder contar. */
function splitDado(dado: string) {
  const m = dado.match(/^([\d.]+)(.*)$/);
  if (!m) return null;
  return { n: Number(m[1].replace(/\./g, "")), shown: m[1], unit: m[2] };
}

const frases = ["Estrutura pra treinar pesado.", "Gente pra te acompanhar.", "E a porta aberta a qualquer hora."];

/**
 * 02 · SOBRE — seção clara que entra como folha por cima do hero.
 * Motion (ScrollFx, emil/animate: entrada 1x · propósito: ritmo de leitura):
 * - frases sobem de uma máscara, linha a linha (data-fx="lines", expo.out 1.1s, stagger 90ms);
 * - em cada pilar, um traço vermelho se desenha (data-fx="fill") e o número conta até o valor (data-fx="count").
 * Sem JS ou com reduced-motion: tudo já aparece no estado final.
 */
export function Manifesto() {
  return (
    <section
      aria-labelledby="sobre-title"
      className="surface-paper relative z-10 rounded-t-[36px] pb-24 pt-16 shadow-[0_-30px_60px_rgb(0_0_0/0.35)] md:rounded-t-[48px] md:pb-32 md:pt-24"
    >
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n="02">Sobre</SectionLabel>
            <h2 id="sobre-title" className="sr-only">
              Sobre a Zero Um
            </h2>
            <Link href="/sobre" className="group mt-6 hidden items-center gap-2 text-sm font-semibold md:inline-flex">
              Conheça a Zero Um
              <span className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <p className="display text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.04] md:col-span-9">
            {frases.map((f, i) => (
              <span key={f} data-fx="lines" className={`block ${i === 2 ? "text-red" : ""}`}>
                {f}
              </span>
            ))}
          </p>
        </div>

        <ul data-fx="rise" className="mt-16 grid md:mt-24 md:grid-cols-3 md:gap-10">
          {pilares.map((p, i) => {
            const d = splitDado(p.dado);
            return (
              <li key={p.nome} data-fx-item className="relative pb-10 pt-8 md:pb-0">
                {/* trilho cinza + traço vermelho que se desenha */}
                <span className="absolute inset-x-0 top-0 h-px bg-black/10" aria-hidden="true" />
                <span data-fx="fill" className="absolute left-0 top-0 h-[2px] w-16 origin-left bg-red" aria-hidden="true" />
                <p className="label text-gray-600">
                  0{i + 1} · {p.nome}
                </p>
                <p className="mt-6 font-mono text-[clamp(2.75rem,4.5vw,4rem)] font-medium leading-none tracking-tight tnum">
                  {d ? (
                    <>
                      <span data-fx="count" data-count-to={d.n}>
                        {d.shown}
                      </span>
                      <span className="text-[0.55em] text-gray-600">{d.unit}</span>
                    </>
                  ) : (
                    p.dado
                  )}
                </p>
                <p className="mt-4 max-w-xs text-gray-600">{p.frase}</p>
              </li>
            );
          })}
        </ul>

        <Link href="/sobre" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold md:hidden">
          Conheça a Zero Um <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
