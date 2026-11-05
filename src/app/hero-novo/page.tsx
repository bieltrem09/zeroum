import type { Metadata } from "next";
import { HeroV2 } from "@/components/sections/hero-v2/HeroV2";
import { Manifesto } from "@/components/sections/Manifesto";
import { EstruturaScroller } from "@/components/sections/EstruturaScroller";
import { Horarios24 } from "@/components/sections/Horarios24";
import { Planos } from "@/components/sections/Planos";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { ComoComecar } from "@/components/sections/ComoComecar";
import { NumerosImpacto } from "@/components/sections/NumerosImpacto";
import { Localizacao } from "@/components/sections/Localizacao";
import { Faq } from "@/components/sections/Faq";

/** PRÉVIA: home com o Hero V2, para comparar com a atual. Fora do Google. */
export const metadata: Metadata = { title: "Prévia: novo hero", robots: { index: false, follow: false } };

export default function HeroNovo() {
  return (
    <>
      <HeroV2 />
      <Manifesto />
      <EstruturaScroller />
      <Horarios24 />
      <Planos label="05" />
      <Depoimentos label="06" />
      <ComoComecar />
      <NumerosImpacto />
      <Localizacao label="09" />
      <Faq label="10" />
    </>
  );
}
