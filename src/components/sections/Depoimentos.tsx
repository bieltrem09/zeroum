import { avaliacaoGoogle, depoimentos, zeroum } from "@/content/zeroum";
import { SectionLabel } from "@/components/ui/SectionHead";
import { GoogleG, ReviewCard } from "@/components/ui/review-card";

/**
 * Avaliações — cards no estilo "tweet" com a cara do Google (logo G, estrelas, perfil),
 * em mosaico. Só avaliações reais do perfil da Zero Um. Entrada em cascata (data-fx="rise").
 */
export function Depoimentos({ label = "09" }: { label?: string }) {
  if (depoimentos.length === 0) return null;
  return (
    <section aria-labelledby="dep-title" className="relative z-10 bg-black py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel n={label}>Avaliações</SectionLabel>
            <h2 id="dep-title" className="display mt-4 text-section">
              Quem treina
              <br />
              <span className="text-red">recomenda.</span>
            </h2>
          </div>

          {avaliacaoGoogle && (
            <a
              href={zeroum.mapa}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-[var(--radius-card)] border border-white/10 bg-card p-5 transition-colors duration-200 hover:border-white/25 md:col-span-5 md:justify-self-end"
            >
              <GoogleG className="size-10 shrink-0" />
              <div>
                <p className="flex items-baseline gap-2">
                  <span className="display text-5xl leading-none">{avaliacaoGoogle.nota.toLocaleString("pt-BR")}</span>
                  <span className="text-[#fbbc04]" aria-hidden="true">
                    ★★★★★
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  {avaliacaoGoogle.total} avaliações no Google <span className="text-white transition-transform duration-200 group-hover:translate-x-1">→</span>
                </p>
              </div>
            </a>
          )}
        </div>

        <div data-fx="rise" className="mt-14 columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {depoimentos.map((d) => (
            <div key={d.id} data-fx-item className="mb-4 break-inside-avoid">
              <ReviewCard name={d.nome} profile={d.perfil} date={d.quando} rating={d.nota} text={d.texto} href={zeroum.mapa} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
