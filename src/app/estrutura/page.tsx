import { ambientes, zeroum } from "@/content/zeroum";
import { media } from "@/content/media";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Media } from "@/components/ui/Media";
import { CtaFinal } from "@/components/sections/CtaFinal";

export const metadata = pageMeta(
  "Estrutura de 2.500 m²",
  "Conheça a Zero Um CT em Americana: 2.500 m², 230 máquinas de 10 marcas, peso livre, Glúteo Zone, Sala Recovery e máquina de gelo. Aberta 24 horas.",
  "/estrutura",
);

/** Texto do ambiente sem as anotações internas ("TODO: …"). */
const limpo = (t: string) => t.replace(/\s*TODO:.*$/, "").trim();

export default function EstruturaPage() {
  const confirmados = ambientes.filter((a) => a.confirmado);
  const comFoto = confirmados.filter((a) => media[a.foto]?.src);
  const semFoto = confirmados.filter((a) => !media[a.foto]?.src);

  return (
    <>
      <PageHero
        n="01"
        kicker="Estrutura"
        title="2.500 m²."
        accent="230 máquinas."
        intro={`Tudo o que você encontra na ${zeroum.nomeCurto}: máquinas de ${zeroum.marcas} marcas, peso livre e área de recuperação, abertos 24 horas.`}
      />
      <section className="bg-black pb-24">
        <div className="container-site">
          <Media slot="estrutura-drone" priority sizes="(min-width:1440px) 1392px, 100vw" />

          <ol className="mt-20 space-y-20 md:space-y-28">
            {comFoto.map((a, i) => (
              <li key={a.id} id={a.id} className="grid scroll-mt-28 gap-8 md:grid-cols-12 md:items-center">
                <div className={`min-w-0 md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
                  <Media slot={a.foto} sizes="(min-width:768px) 58vw, 100vw" />
                </div>
                <div className={`min-w-0 md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                  <p className="label text-red-bright">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="display mt-3 text-[clamp(2.25rem,4vw,4rem)] [overflow-wrap:anywhere]">{a.nome}</h2>
                  <p className="mt-4 text-lg">{a.resumo}</p>
                  {limpo(a.detalhe) && limpo(a.detalhe) !== a.resumo && <p className="mt-4 text-gray-300">{limpo(a.detalhe)}</p>}
                </div>
              </li>
            ))}
          </ol>

          {semFoto.length > 0 && (
            <div className="hairline mt-24 grid gap-8 border-t pt-12 md:grid-cols-12">
              <h2 className="display text-[clamp(2.25rem,4vw,3.5rem)] md:col-span-4">Também tem</h2>
              <ul className="grid gap-3 sm:grid-cols-2 md:col-span-8">
                {semFoto.map((a) => (
                  <li key={a.id} id={a.id} className="scroll-mt-28 rounded-[var(--radius-card)] bg-carbon p-6">
                    <p className="title text-xl">{a.nome}</p>
                    <p className="mt-2 text-gray-300">{a.resumo}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <CtaFinal />
    </>
  );
}
