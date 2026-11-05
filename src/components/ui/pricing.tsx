"use client";

/**
 * Pricing — estilo do componente "Pricing" de @Codehagen (21st.dev):
 * cards com Framer Motion (laterais inclinados em 3D, popular em destaque),
 * toggle mensal/anual com confete e preço que se transforma (NumberFlow).
 * Recriado e adaptado (PT-BR, R$, tokens shadcn da marca, reduced-motion).
 */

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import NumberFlow from "@number-flow/react";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingPlanItem {
  id: string;
  name: string;
  /** Preço no ciclo mensal. `null` = sem preço (mostra `priceFallback`). */
  price: number | null;
  /** Preço no ciclo anual (por mês). Se ausente, usa `price`. */
  yearlyPrice?: number | null;
  period?: string;
  priceFallback?: string;
  /** Linha pequena sob o preço; pode variar pelo ciclo. */
  note?: string | { monthly: string; annually: string };
  features: string[];
  description: string;
  buttonText: string;
  isPopular?: boolean;
}

export interface PricingProps {
  plans: PricingPlanItem[];
  title?: string;
  description?: string;
  onSelect: (planId: string, cycle: "monthly" | "annually") => void;
  labels?: { toggle?: React.ReactNode; popular?: string; toggleAria?: string };
  currency?: string;
  className?: string;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return matches;
}

export function Pricing({ plans, title, description, onSelect, labels, currency = "BRL", className }: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduce = useReducedMotion();
  const switchRef = useRef<HTMLButtonElement>(null);
  const hasYearly = plans.some((p) => p.yearlyPrice != null && p.yearlyPrice !== p.price);

  const toggle = async () => {
    const next = !isMonthly;
    setIsMonthly(next);
    // Confete só ao ligar o anual (momento de "economia"), nunca em reduced-motion.
    if (!next && !reduce && switchRef.current) {
      const { default: confetti } = await import("canvas-confetti");
      const r = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
        colors: ["#e3182d", "#ff3b4e", "#ffffff", "#9e0f1f"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
        disableForReducedMotion: true,
      });
    }
  };

  const fmt = { style: "currency", currency, maximumFractionDigits: 2 } as const;

  return (
    <LazyMotion features={domAnimation} strict>
      <div className={cn("w-full", className)}>
        {(title || description) && (
          <div className="mb-12 space-y-4 text-center">
            {title && <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>}
            {description && <p className="whitespace-pre-line text-lg text-muted-foreground">{description}</p>}
          </div>
        )}

        {hasYearly && (
          <div className="mb-14 flex items-center justify-center gap-3">
            <span className={cn("text-sm font-semibold transition-colors", isMonthly ? "text-foreground" : "text-muted-foreground")}>Mensal</span>
            <button
              ref={switchRef}
              type="button"
              role="switch"
              aria-checked={!isMonthly}
              aria-label={labels?.toggleAria ?? "Ver preço no plano anual"}
              onClick={toggle}
              className={cn(
                "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-white/15 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isMonthly ? "bg-input" : "bg-primary",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-block size-5 rounded-full bg-white shadow transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                  isMonthly ? "translate-x-1" : "translate-x-6",
                )}
              />
            </button>
            <span className={cn("text-sm font-semibold transition-colors", !isMonthly ? "text-foreground" : "text-muted-foreground")}>
              {labels?.toggle ?? "Anual"}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 [perspective:1400px] md:grid-cols-3">
          {plans.map((plan, index) => {
            const value = isMonthly ? plan.price : (plan.yearlyPrice ?? plan.price);
            const note = typeof plan.note === "string" ? plan.note : plan.note ? (isMonthly ? plan.note.monthly : plan.note.annually) : null;
            const side = index === 0 || index === 2;
            return (
              <m.div
                key={plan.id}
                initial={reduce ? false : { y: 50, opacity: 1 }}
                whileInView={
                  isDesktop && !reduce
                    ? {
                        y: plan.isPopular ? -20 : 0,
                        opacity: 1,
                        x: index === 2 ? -30 : index === 0 ? 30 : 0,
                        scale: side ? 0.94 : 1.0,
                        rotateY: index === 0 ? 10 : index === 2 ? -10 : 0,
                      }
                    : { y: 0, opacity: 1 }
                }
                viewport={{ once: true }}
                transition={{ duration: 1.6, type: "spring", stiffness: 100, damping: 30, delay: 0.4, opacity: { duration: 0.5 } }}
                className={cn(
                  "relative flex flex-col rounded-[var(--radius-card,1rem)] border bg-card p-6 text-center md:p-8",
                  plan.isPopular ? "order-first z-10 border-2 border-primary shadow-[0_30px_80px_-30px_rgb(227_24_45/0.55)] md:order-none" : "border-border md:mt-5",
                  side && "z-0",
                  index === 0 && "md:origin-right",
                  index === 2 && "md:origin-left",
                )}
              >
                {plan.isPopular && (
                  <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-[calc(var(--radius-card,1rem)-2px)] bg-primary px-3 py-1">
                    <Star className="size-4 fill-current text-primary-foreground" aria-hidden="true" />
                    <span className="ml-1 text-sm font-semibold text-primary-foreground">{labels?.popular ?? "Popular"}</span>
                  </div>
                )}

                <div className="flex flex-1 flex-col">
                  <p className="text-base font-semibold text-muted-foreground">{plan.name}</p>

                  <div className="mt-6 flex min-h-[3.5rem] items-center justify-center gap-x-2">
                    {value != null ? (
                      <>
                        <span className="text-5xl font-bold tracking-tight text-foreground">
                          <NumberFlow
                            value={value}
                            format={{ ...fmt, minimumFractionDigits: Number.isInteger(value) ? 0 : 2 }}
                            locales="pt-BR"
                            transformTiming={{ duration: 500, easing: "ease-out" }}
                            willChange
                            className="tabular-nums"
                          />
                        </span>
                        {plan.period && <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">{plan.period}</span>}
                      </>
                    ) : (
                      <span className="text-4xl font-bold tracking-tight text-foreground">{plan.priceFallback ?? "—"}</span>
                    )}
                  </div>

                  <p className="mt-1 min-h-5 text-xs leading-5 text-muted-foreground" aria-live="polite">
                    {note}
                  </p>

                  <ul className="mt-6 flex flex-col gap-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={3} aria-hidden="true" />
                        <span className="text-left text-foreground/90">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <hr className="my-6 w-full border-border" />

                  <button
                    type="button"
                    onClick={() => onSelect(plan.id, isMonthly ? "monthly" : "annually")}
                    className={cn(
                      "group relative mt-auto inline-flex min-h-12 w-full transform-gpu items-center justify-center gap-2 overflow-hidden rounded-full border px-4 text-base font-semibold tracking-tight",
                      "ring-offset-background transition-[background-color,color,box-shadow,transform] duration-300 ease-out hover:bg-primary hover:text-primary-foreground hover:ring-2 hover:ring-primary hover:ring-offset-1 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                      plan.isPopular ? "border-primary bg-primary text-primary-foreground" : "border-white/15 bg-transparent text-foreground",
                    )}
                  >
                    {plan.buttonText}
                    <span className="transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </button>
                  <p className="mt-6 text-xs leading-5 text-muted-foreground">{plan.description}</p>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </LazyMotion>
  );
}
