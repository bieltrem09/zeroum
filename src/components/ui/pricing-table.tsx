"use client";

import * as React from "react";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---

/**
 * Defines the structure for a single feature in a pricing plan.
 */
export interface Feature {
  id: string;
  name: string;
  included: boolean;
}

/**
 * Defines the structure for a single pricing plan.
 */
export interface PricingPlan {
  id: string;
  name: string;
  /** Monthly price. `null` = price on request (shows `priceFallback`). */
  price: number | null;
  description: string;
  features: Feature[];
  isRecommended?: boolean;
  buttonText: string;
  disabled?: boolean;
  /** Overrides the period label for this plan (e.g. "/dia"). */
  period?: string;
  /** Text shown instead of the price when `price` is null (e.g. "Consultar"). */
  priceFallback?: string;
  /** Small note under the price (e.g. "a partir do plano Silver"). */
  priceNote?: string;
}

/**
 * Defines the valid billing cycles.
 */
export type BillingCycle = "monthly" | "annually";

export interface PricingLabels {
  monthly: string;
  annually: string;
  monthlyPeriod: string;
  annualPeriod: string;
  recommended: string;
  billedAnnually: (total: string) => string;
  selectPlan: (name: string) => string;
}

const DEFAULT_LABELS: PricingLabels = {
  monthly: "Monthly",
  annually: "Annually (Save 20%)",
  monthlyPeriod: "/mo",
  annualPeriod: "/yr",
  recommended: "Recommended",
  billedAnnually: (total) => `${total} billed annually`,
  selectPlan: (name) => `Select ${name} plan`,
};

/**
 * Props for the PricingTable component.
 */
export interface PricingTableProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onSelect"> {
  /** Array of pricing plans to display. */
  plans: PricingPlan[];
  /** The currently selected billing cycle. */
  billingCycle: BillingCycle;
  /** Callback function when a plan's button is clicked. */
  onSelect: (planId: string) => void;
  /** Optional custom label for the billing cycle toggle. */
  cycleToggleLabel?: string;
  /** Callback when the billing cycle changes. Omit it to hide the toggle. */
  onCycleChange?: (cycle: BillingCycle) => void;
  /** ID of the currently active/selected plan (optional for highlighting). */
  activePlanId?: string;
  /** Discount applied on the annual cycle (0.2 = 20%). */
  annualDiscount?: number;
  /** Price formatter. Default: `$19`. */
  formatPrice?: (value: number) => string;
  /** UI strings (for translation). */
  labels?: Partial<PricingLabels>;
}

// --- Component: BillingCycleToggle (Internal) ---

interface BillingCycleToggleProps {
  billingCycle: BillingCycle;
  onCycleChange: (cycle: BillingCycle) => void;
  label?: string;
  labels: PricingLabels;
}

const BillingCycleToggle: React.FC<BillingCycleToggleProps> = ({ billingCycle, onCycleChange, label = "Billing Cycle", labels }) => {
  const isMonthly = billingCycle === "monthly";

  return (
    <div className="flex items-center justify-center space-x-3 p-4">
      <span className={cn("text-sm font-medium transition-colors", isMonthly ? "text-foreground" : "text-muted-foreground")}>{labels.monthly}</span>
      <button
        type="button"
        onClick={() => onCycleChange(isMonthly ? "annually" : "monthly")}
        aria-label={label}
        aria-checked={!isMonthly}
        role="switch"
        className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
        data-state={!isMonthly ? "checked" : "unchecked"}
      >
        <span className="sr-only">{label}</span>
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-foreground shadow-lg ring-0 transition duration-200 ease-in-out motion-reduce:transition-none",
            !isMonthly ? "translate-x-5" : "translate-x-0",
          )}
        />
      </button>
      <span className={cn("text-sm font-medium transition-colors", !isMonthly ? "text-foreground" : "text-muted-foreground")}>{labels.annually}</span>
    </div>
  );
};

// --- Component: PlanCard (Internal) ---

interface PlanCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  onSelect: (planId: string) => void;
  isActive: boolean;
  annualDiscount: number;
  formatPrice: (value: number) => string;
  labels: PricingLabels;
}

/** Conta o preço de 0 até o valor quando o card entra na tela (1x). Sem JS: valor final. */
function useCountUp(target: number | null, ref: React.RefObject<HTMLElement | null>) {
  const [value, setValue] = useState<number | null>(target);
  React.useEffect(() => {
    if (target === null || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    setValue(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 900;
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 4); // ease-out quart
          setValue(target * eased);
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, ref]);
  return value;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, billingCycle, onSelect, isActive, annualDiscount, formatPrice, labels }) => {
  const annual = billingCycle === "annually";
  const price = plan.price === null ? null : annual ? Math.round(plan.price * 12 * (1 - annualDiscount)) : plan.price;
  const cycleLabel = plan.period ?? (annual ? labels.annualPeriod : labels.monthlyPeriod);
  const highlighted = isActive || plan.isRecommended;
  const cardRef = React.useRef<HTMLDivElement>(null);
  const shown = useCountUp(price, cardRef);

  // Spotlight: brilho que segue o ponteiro (só ponteiro fino; transform/opacity-free: só background).
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const body = (
    <div
      ref={cardRef}
      onPointerMove={onPointerMove}
      className={cn(
        "plan-spotlight relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-card,0.75rem)-1.5px)] p-6 md:p-8",
        highlighted ? "bg-[#120a0b]" : "bg-card",
      )}
    >
      {/* Linha do selo com altura fixa em todos os cards → títulos e preços alinhados */}
      <div className="mb-4 h-6">
        {plan.isRecommended && (
          <span className="inline-flex h-6 items-center rounded-full bg-primary px-3 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
            {labels.recommended}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold tracking-tight text-card-foreground">{plan.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground xl:min-h-[3.75rem]">{plan.description}</p>

      <div className="my-7">
        {price !== null ? (
          <p className="flex items-baseline gap-1">
            <span className="sr-only">{formatPrice(price)}</span>
            <span className="text-[2.75rem] font-extrabold leading-none tracking-tight tabular-nums text-card-foreground" aria-hidden="true">
              {formatPrice(shown ?? price)}
            </span>
            <span className="text-lg font-medium text-muted-foreground">{cycleLabel}</span>
          </p>
        ) : (
          <p className="text-[2.25rem] font-extrabold leading-none tracking-tight text-card-foreground">{plan.priceFallback ?? "—"}</p>
        )}
        {annual && plan.price !== null && annualDiscount > 0 && (
          <p className="mt-1 text-xs text-muted-foreground line-through">{labels.billedAnnually(formatPrice(plan.price * 12))}</p>
        )}
        {plan.priceNote && <p className="mt-3 text-xs text-muted-foreground">{plan.priceNote}</p>}
      </div>

      <ul className="mb-8 flex-grow space-y-3 border-t border-border pt-6">
        {plan.features.map((feature) => (
          <li key={feature.id} className="flex items-start">
            {feature.included ? (
              <span className="mr-3 mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary/15">
                <Check className="h-3 w-3 text-primary" strokeWidth={3} aria-hidden="true" />
              </span>
            ) : (
              <X className="mr-3 mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            )}
            <span className={cn("text-sm", feature.included ? "text-card-foreground" : "text-muted-foreground line-through")}>
              <span className="sr-only">{feature.included ? "Inclui: " : "Não inclui: "}</span>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => !plan.disabled && onSelect(plan.id)}
        disabled={plan.disabled}
        aria-label={labels.selectPlan(plan.name)}
        className={cn(
          "group/btn mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,transform] duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:active:scale-100",
          highlighted ? "bg-primary text-primary-foreground hover:bg-[var(--color-red-deep,#9e0f1f)]" : "bg-white/[0.06] text-secondary-foreground ring-1 ring-inset ring-white/15 hover:bg-white/[0.12]",
          plan.disabled && "cursor-not-allowed opacity-50",
        )}
      >
        {plan.buttonText}
        <span className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover/btn:translate-x-1" aria-hidden="true">
          →
        </span>
      </button>
    </div>
  );

  return (
    <div
      data-fx-item
      className={cn(
        "plan-card group relative h-full rounded-[var(--radius-card,0.75rem)] p-[1.5px] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1",
        highlighted ? "plan-glow bg-primary/60" : "bg-white/10",
        isActive && "ring-2 ring-primary",
      )}
    >
      {highlighted && <span className="plan-glow-ring" aria-hidden="true" />}
      {body}
    </div>
  );
};

// --- Component: PricingTable (Main) ---

const GRID_COLS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

/**
 * A responsive pricing comparison table (shadcn/ui tokens).
 */
export const PricingTable: React.FC<PricingTableProps> = ({
  plans,
  billingCycle,
  onSelect,
  onCycleChange,
  cycleToggleLabel,
  activePlanId,
  annualDiscount = 0.2,
  formatPrice = (v) => `$${v}`,
  labels: labelsProp,
  className,
  ...props
}) => {
  const labels = { ...DEFAULT_LABELS, ...labelsProp };
  return (
    <div className={cn("container mx-auto py-8 md:py-12", className)} {...props}>
      {onCycleChange && <BillingCycleToggle billingCycle={billingCycle} onCycleChange={onCycleChange} label={cycleToggleLabel} labels={labels} />}
      <div className={cn("mt-8 grid grid-cols-1 gap-4 md:gap-6", GRID_COLS[Math.min(plans.length, 4)] ?? GRID_COLS[3])}>
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            onSelect={onSelect}
            isActive={plan.id === activePlanId}
            annualDiscount={annualDiscount}
            formatPrice={formatPrice}
            labels={labels}
          />
        ))}
      </div>
    </div>
  );
};

// --- Example (used by demo.tsx) ---

const MOCK_PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 19,
    description: "Perfect for small teams and personal projects.",
    features: [
      { id: "f1", name: "5 Projects", included: true },
      { id: "f2", name: "10 GB Storage", included: true },
      { id: "f3", name: "Email Support", included: true },
      { id: "f4", name: "Dedicated Analyst", included: false },
      { id: "f5", name: "Priority Queue", included: false },
    ],
    buttonText: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    description: "Scale your business with advanced features and tools.",
    features: [
      { id: "f1", name: "Unlimited Projects", included: true },
      { id: "f2", name: "100 GB Storage", included: true },
      { id: "f3", name: "Priority Email Support", included: true },
      { id: "f4", name: "Dedicated Analyst", included: true },
      { id: "f5", name: "Priority Queue", included: false },
    ],
    isRecommended: true,
    buttonText: "Start 14-Day Trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 199,
    description: "Custom solutions and dedicated support for large organizations.",
    features: [
      { id: "f1", name: "Unlimited Projects", included: true },
      { id: "f2", name: "Unlimited Storage", included: true },
      { id: "f3", name: "24/7 Phone Support", included: true },
      { id: "f4", name: "Dedicated Analyst", included: true },
      { id: "f5", name: "Priority Queue", included: true },
    ],
    buttonText: "Contact Sales",
    disabled: false,
  },
];

const ExamplePricingTable = () => {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-4 text-foreground">
      <h1 className="mb-8 text-center text-3xl font-bold">Choose Your Plan</h1>
      <PricingTable
        plans={MOCK_PLANS}
        billingCycle={cycle}
        onSelect={setSelectedPlanId}
        onCycleChange={setCycle}
        activePlanId={selectedPlanId || MOCK_PLANS[1].id}
      />
    </div>
  );
};

export default ExamplePricingTable;
