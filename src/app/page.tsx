import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { EstruturaScroller } from "@/components/sections/EstruturaScroller";
import { Horarios24 } from "@/components/sections/Horarios24";
import { Planos } from "@/components/sections/Planos";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { ComoComecar } from "@/components/sections/ComoComecar";
import { NumerosImpacto } from "@/components/sections/NumerosImpacto";
import { Localizacao } from "@/components/sections/Localizacao";
import { Faq } from "@/components/sections/Faq";

/**
 * Ordem pensada nas perguntas de quem visita:
 * o que é → como é por dentro → que horas abre → quanto custa → é bom? → como começo → onde fica → dúvidas.
 */
export default function Home() {
  return (
    <>
      <Hero />
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
