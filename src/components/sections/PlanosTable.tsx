"use client";
import { Pricing, type PricingPlanItem } from "@/components/ui/pricing";
import { formasDeTreinar } from "@/content/zeroum";
import { waLink } from "@/lib/whatsapp";

const plans: PricingPlanItem[] = formasDeTreinar.map((f) => ({
  id: f.id,
  name: f.nome,
  price: f.preco,
  yearlyPrice: f.precoAnual ?? f.preco,
  period: f.periodo,
  priceFallback: f.precoTexto,
  note: f.notaAnual ? { monthly: f.nota ?? "", annually: f.notaAnual } : f.nota,
  features: f.inclui,
  description: f.descricao,
  buttonText: f.botao,
  isPopular: f.destaque,
}));

/** Planos no estilo Pricing (@Codehagen · 21st), com as formas de treinar da Zero Um. */
export function PlanosTable() {
  const onSelect = (id: string, cycle: "monthly" | "annually") => {
    const f = formasDeTreinar.find((x) => x.id === id);
    if (!f) return;
    let url = f.link.startsWith("whatsapp:") ? f.link.slice("whatsapp:".length) : f.link;
    if (f.link.startsWith("whatsapp:")) {
      if (f.precoAnual) url = cycle === "annually" ? "Olá, Zero Um! Quero o Plano Zero Um anual (R$ 149/mês)." : "Olá, Zero Um! Quero o Plano Zero Um mensal (R$ 170/mês).";
      url = waLink(url);
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Pricing
      plans={plans}
      onSelect={onSelect}
      labels={{
        popular: "Mais procurado",
        toggle: (
          <>
            Anual <span className="text-red-bright">(economize R$ 252)</span>
          </>
        ),
        toggleAria: "Ver o valor do Plano Zero Um no anual",
      }}
    />
  );
}
