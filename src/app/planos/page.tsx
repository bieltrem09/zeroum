import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Planos } from "@/components/sections/Planos";
import { CtaFinal } from "@/components/sections/CtaFinal";

export const metadata = pageMeta(
  "Planos e preços",
  "Planos da Zero Um CT em Americana: Plano Zero Um R$ 170/mês (R$ 149 no anual), diária R$ 39,90, Wellhub (Silver+) e TotalPass (TP2+). Musculação 24 horas.",
  "/planos",
);

export default function PlanosPage() {
  return (
    <>
      <PageHero n="01" kicker="Planos" title="Planos e" accent="valores." intro="Plano Zero Um por R$ 170 no mensal ou R$ 149 por mês no anual, diária de R$ 39,90 ou o app de benefício da sua empresa." />
      <Planos full label="02" />
      <CtaFinal />
    </>
  );
}
