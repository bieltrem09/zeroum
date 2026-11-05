import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionHead";
import { CircleLink } from "@/components/ui/Buttons";
import { WA_AULA } from "@/lib/whatsapp";

const passos = [
  { n: "01", t: "Chame a gente", d: "Pelo WhatsApp (19) 99620-9541 ou pelo formulário de aula experimental. A resposta é rápida." },
  { n: "02", t: "Conheça a estrutura", d: "Venha ver os 2.500 m², as 230 máquinas e tirar dúvidas com a equipe. Os alunos destacam os professores atenciosos." },
  { n: "03", t: "Escolha como treinar", d: "Plano direto com a academia, diária de R$ 39,90 ou o seu Wellhub (Silver+) ou TotalPass (TP2+)." },
];

/** 07 · SEU PRIMEIRO TREINO — do zero ao um. A linha entre os passos se desenha no scroll (data-fx="line"). */
export function PrimeiroTreino() {
  return (
    <section aria-labelledby="primeiro-title" className="relative z-10 bg-black pb-24 md:pb-32">
      <div className="container-site">
        <div className="hairline grid gap-8 border-t pt-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel n="07">Como começar</SectionLabel>
            <h2 id="primeiro-title" className="display mt-4 text-section">
              Do zero
              <br />
              <span className="text-red">ao um.</span>
            </h2>
          </div>
          <p className="max-w-md self-end text-gray-300 md:col-span-5 md:col-start-8">
            Nunca treinou, está voltando ou vai trocar de academia? O começo é simples: três passos.
          </p>
        </div>

        <div className="passos relative mt-14">
          <div className="absolute inset-x-0 top-6 hidden h-0.5 bg-white/12 md:block" aria-hidden="true">
            <div data-fx="line" className="passo-linha h-full origin-left bg-red" />
          </div>
          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {passos.map((p) => (
              <li key={p.n} className="md:pr-6">
                <span className="grid size-12 place-items-center rounded-full border border-white/20 bg-black font-mono text-sm tnum">{p.n}</span>
                <h3 className="title mt-6 text-2xl">{p.t}</h3>
                <p className="mt-3 max-w-sm text-gray-300">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Card escuro de comunidade (ref. Velocity) */}
        <div className="mt-16 flex flex-col gap-6 rounded-[var(--radius-card)] bg-carbon p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
          <p className="title text-lg sm:text-xl">
            Quer conhecer antes de decidir?
            <span className="block text-base font-medium tracking-normal text-gray-300">Agende uma aula experimental pelo site ou chame no WhatsApp.</span>
          </p>
          <div className="flex items-center gap-3">
            <Link href="/aula-experimental" className="btn btn-white">
              Agendar
            </Link>
            <CircleLink href={WA_AULA} label="Agendar pelo WhatsApp" />
          </div>
        </div>
      </div>
    </section>
  );
}
