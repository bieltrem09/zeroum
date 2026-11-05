"use client";
import { PricingTable, type PricingPlan } from "@/components/ui/pricing-table";
import { formasDeTreinar } from "@/content/zeroum";
import { waLink } from "@/lib/whatsapp";

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const plans: PricingPlan[] = formasDeTreinar.map((f) => ({
  id: f.id,
  name: f.nome,
  description: f.descricao,
  price: f.preco,
  period: f.periodo,
  priceFallback: f.precoTexto,
  priceNote: f.nota,
  isRecommended: f.destaque,
  buttonText: f.botao,
  features: f.inclui.map((name, i) => ({ id: `${f.id}-${i}`, name, included: true })),
}));

/** Tabela de planos (componente shadcn `pricing-table`) com as formas reais de treinar. */
export function PlanosTable() {
  const onSelect = (id: string) => {
    const f = formasDeTreinar.find((x) => x.id === id);
    if (!f) return;
    const url = f.link.startsWith("whatsapp:") ? waLink(f.link.slice("whatsapp:".length)) : f.link;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <PricingTable
      plans={plans}
      billingCycle="monthly"
      onSelect={onSelect}
      formatPrice={brl}
      data-fx="rise"
      className="max-w-none px-0 py-0 md:py-0"
      labels={{
        recommended: "Mais procurado",
        monthlyPeriod: "/mês",
        selectPlan: (name) => `${name}: abrir contato`,
      }}
    />
  );
}
