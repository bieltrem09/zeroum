import { faqPagamento, zeroum } from "@/content/zeroum";
import { SectionLabel } from "@/components/ui/SectionHead";
import { PlanosTable } from "./PlanosTable";

/** 05 · PLANOS — as formas reais de treinar na Zero Um (sem cards fictícios). */
export function Planos({ full = false, label = "05" }: { full?: boolean; label?: string }) {
  const faqRespondido = faqPagamento.filter((f) => typeof f.a === "string");
  return (
    <section aria-labelledby="planos-title" className="relative z-10 bg-black py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel n={label}>Planos e valores</SectionLabel>
            <h2 id="planos-title" className="display mt-4 text-section">
              Escolha como
              <br />
              <span className="text-red">quer treinar.</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-300 md:col-span-5 md:justify-self-end">
            Plano Zero Um no mensal ou no anual, diária para conhecer ou o app de benefício da sua empresa. Em todos você treina na mesma estrutura de {zeroum.area}.
          </p>
        </div>

        <div className="mt-12">
          <PlanosTable />
        </div>

        {full && faqRespondido.length > 0 && (
          <div className="mt-20 grid gap-10 md:grid-cols-12">
            <h3 className="display text-[clamp(2.25rem,4vw,3.5rem)] md:col-span-4">Dúvidas sobre pagamento</h3>
            <div className="md:col-span-8">
              {faqRespondido.map((f) => (
                <details key={f.q} className="hairline border-b first:border-t">
                  <summary className="flex min-h-14 items-center justify-between gap-4 py-4 text-lg font-semibold">
                    {f.q}
                    <span className="faq-icon text-2xl leading-none text-red-bright" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="pb-5 text-gray-300">{f.a as string}</div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
