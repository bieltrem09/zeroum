import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Planos } from "@/components/sections/Planos";
import { CtaFinal } from "@/components/sections/CtaFinal";

export const metadata = pageMeta(
  "Planos e preços",
  "Como treinar na Zero Um CT em Americana: plano direto com a academia, diária avulsa de R$ 39,90, Wellhub (Silver+) ou TotalPass (TP2+).",
  "/planos",
);

export default function PlanosPage() {
  return (
    <>
      <PageHero n="01" kicker="Planos" title="Planos e" accent="valores." intro="Diária avulsa por R$ 39,90, plano direto com a academia ou o app de benefício da sua empresa. Valores dos planos pelo WhatsApp, com resposta rápida." />
      <Planos full label="02" />
      <CtaFinal />
    </>
  );
}
