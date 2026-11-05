import Link from "next/link";
import { ambientes, avaliacaoGoogle, falamDaEquipe, frases, pilares, zeroum } from "@/content/zeroum";
import { pageMeta } from "@/lib/seo";
import { WA_GERAL } from "@/lib/whatsapp";
import { PageHero } from "@/components/sections/PageHero";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Media } from "@/components/ui/Media";
import { SectionLabel } from "@/components/ui/SectionHead";

export const metadata = pageMeta(
  "Sobre nós",
  "Conheça a Zero Um CT: academia de musculação 24 horas em Americana/SP, com 2.500 m², 230 máquinas de 10 marcas e nota 4,9 no Google.",
  "/sobre",
);

export default function SobrePage() {
  const nota = avaliacaoGoogle ? avaliacaoGoogle.nota.toLocaleString("pt-BR") : null;
  const numeros = [
    { v: "2.500", l: "m² de estrutura" },
    { v: String(zeroum.maquinas), l: `máquinas de ${zeroum.marcas} marcas` },
    { v: "24h", l: "aberta, todos os dias" },
    ...(avaliacaoGoogle ? [{ v: nota!, l: `no Google · ${avaliacaoGoogle.total} avaliações` }] : []),
  ];
  const lugares = ambientes.filter((a) => a.confirmado);

  return (
    <>
      <PageHero n="01" kicker="Sobre nós" title="Zero Um CT." accent="Centro de Treinamento." intro={zeroum.descricao} />

      {/* Quem somos */}
      <section aria-labelledby="quem-title" className="bg-black pb-24">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="min-w-0 lg:col-span-6">
            <SectionLabel n="02">Quem somos</SectionLabel>
            <h2 id="quem-title" className="title mt-4 text-[clamp(1.75rem,3vw,2.5rem)]">
              {frases.destaque}, feita para quem leva o treino a sério.
            </h2>
            <div className="mt-6 space-y-4 text-lg text-gray-300">
              <p>
                A {zeroum.nomeCurto} é uma academia especializada em musculação no bairro Campo Limpo, em Americana/SP. São {zeroum.area} com{" "}
                {zeroum.maquinas} máquinas de {zeroum.marcas} marcas diferentes, área de peso livre, Glúteo Zone, Sala Recovery e máquina de gelo.
              </p>
              <p>
                A porta fica aberta 24 horas. Você treina quando cabe na sua rotina, de madrugada ou no fim do dia, e aceita Wellhub (a partir do Silver) e TotalPass (a partir do TP2).
              </p>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Pilares da Zero Um">
              {pilares.map((p) => (
                <li key={p.nome} className="pill border border-white/20 text-white">
                  {p.nome}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Media slot="fachada-dia" sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/5]! lg:aspect-[3/4]!" />
          </div>
        </div>
      </section>

      {/* Lema da parede */}
      <section aria-label="Lema da academia" className="bg-red py-20 text-white md:py-28">
        <div className="container-site">
          <p className="label text-white">Escrito na parede do salão</p>
          <p className="display mt-8 text-[clamp(3rem,9vw,8.5rem)] leading-[1.05]">
            Você pode tudo,
            <br />
            menos desistir.
          </p>
        </div>
      </section>

      {/* Números */}
      <section aria-labelledby="numeros-title" className="bg-black py-24">
        <div className="container-site">
          <SectionLabel n="03">Em números</SectionLabel>
          <h2 id="numeros-title" className="sr-only">
            A Zero Um em números
          </h2>
          <ul className="hairline mt-8 grid border-t sm:grid-cols-2 lg:grid-cols-4">
            {numeros.map((n) => (
              <li key={n.l} className="hairline border-b py-8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0">
                <p className="display text-[clamp(3.5rem,6vw,5.5rem)]">{n.v}</p>
                <p className="label mt-2 text-gray-300">{n.l}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* O que você encontra */}
      <section aria-labelledby="encontra-title" className="surface-paper py-24 md:py-32">
        <div className="container-site grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel n="04">Lá dentro</SectionLabel>
            <h2 id="encontra-title" className="display mt-4 text-section">
              O que você encontra
            </h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 md:col-span-8">
            {lugares.map((a) => (
              <li key={a.id}>
                <Link href={`/estrutura#${a.id}`} className="group flex h-full flex-col justify-between gap-6 rounded-[var(--radius-card)] bg-white p-6 transition-colors duration-200 hover:bg-black hover:text-white">
                  <span className="title text-xl">{a.nome}</span>
                  <span className="text-sm text-gray-600 transition-colors duration-200 group-hover:text-gray-300">{a.resumo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipe */}
      <section id="equipe" aria-labelledby="equipe-title" className="scroll-mt-24 bg-black py-24 md:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="05">Equipe</SectionLabel>
            <h2 id="equipe-title" className="display mt-4 text-section">
              Quem te
              <br />
              acompanha
            </h2>
            <p className="mt-6 max-w-md text-gray-300">
              Professores no salão para ajudar com a execução e a carga, e uma recepção que os alunos fazem questão de elogiar. É o que mais aparece nas avaliações do Google.
            </p>
          </div>
          <ul className="grid gap-3 lg:col-span-6 lg:col-start-7" aria-label="O que os alunos dizem da equipe">
            {falamDaEquipe.map((f, i) => (
              <li key={f.id} className={`rounded-[var(--radius-card)] p-6 md:p-8 ${i === 0 ? "bg-red text-white" : "bg-carbon"}`}>
                <figure>
                  <blockquote className="title text-[clamp(1.35rem,2.4vw,2rem)] font-semibold leading-tight">“{f.trecho}”</blockquote>
                  <figcaption className={`label mt-5 ${i === 0 ? "text-white" : "text-gray-300"}`}>{f.nome} · Avaliação no Google</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Avaliações */}
      <div id="avaliacoes" className="scroll-mt-24">
        <Depoimentos label="06" />
      </div>

      {/* Onde fica */}
      <section aria-labelledby="onde-title" className="bg-black pb-24">
        <div className="container-site">
          <div className="flex flex-col gap-6 rounded-[var(--radius-card)] bg-carbon p-6 md:flex-row md:items-center md:justify-between md:p-10">
            <div>
              <p className="label text-gray-300">Onde fica</p>
              <h2 id="onde-title" className="title mt-2 text-2xl md:text-3xl">
                {zeroum.endereco.rua} · {zeroum.endereco.bairro}
              </h2>
              <p className="mt-1 text-gray-300">
                {zeroum.endereco.cidade}/{zeroum.endereco.uf} · CEP {zeroum.endereco.cep}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={zeroum.mapa} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                Traçar rota <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
