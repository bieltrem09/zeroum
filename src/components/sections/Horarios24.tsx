"use client";
import { Moon, Sunrise, Sunset } from "lucide-react";
import { useNow } from "@/lib/useNow";
import { SectionLabel } from "@/components/ui/SectionHead";

const momentos = [
  { icon: Moon, t: "Madrugada", d: "Saiu tarde do trabalho ou acorda muito cedo? Às 3h da manhã a porta também está aberta." },
  { icon: Sunrise, t: "Antes do trabalho", d: "Treine às 5h ou às 6h e chegue no horário, sem esperar a academia abrir." },
  { icon: Sunset, t: "Depois do expediente", d: "Saiu da faculdade às 23h? Ainda dá tempo. Você escolhe a hora." },
];

const marcas = ["00h", "06h", "12h", "18h", "24h"];
const turnos = ["Madrugada", "Manhã", "Tarde", "Noite"];

/**
 * 04 · HORÁRIO — uma linha do tempo de 24h toda preenchida (= sempre aberta),
 * com o marcador "agora" no horário de Americana.
 * Motion: barra preenche 1x ao entrar (data-fx="fill"), marcador aparece depois (data-fx="pop");
 * o marcador anda 1x por minuto com transform (sem loop por frame).
 */
export function Horarios24({ label = "04" }: { label?: string }) {
  const now = useNow();
  const pct = now ? ((now.hour * 60 + now.minute) / 1440) * 100 : null;

  return (
    <section id="horarios" aria-labelledby="horarios-title" className="relative z-10 scroll-mt-24 bg-black py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel n={label}>Horário</SectionLabel>
            <h2 id="horarios-title" className="display mt-4 text-section">
              Aberta
              <br />
              <span className="text-red">24 horas.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <p className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3" aria-live="off">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="text-base">
                {now ? (
                  <>
                    Agora são <strong className="font-mono font-medium tnum">{now.hhmm}</strong> em Americana · <strong className="font-semibold">aberta</strong>
                  </>
                ) : (
                  <>Aberta agora, a qualquer hora</>
                )}
              </span>
            </p>
          </div>
        </div>

        {/* Linha do tempo 00h → 24h */}
        <div className="mt-16 md:mt-20">
          <p className="sr-only">A academia funciona 24 horas, sem intervalo, da madrugada à noite.</p>
          <div className="relative" aria-hidden="true">
            {/* marcador "agora" */}
            {pct !== null && (
              <div className="pointer-events-none absolute inset-x-0 -top-12 h-10 overflow-hidden">
                <div className="h-full transition-transform duration-700 ease-[var(--ease-in-out)] motion-reduce:transition-none" style={{ transform: `translateX(${pct}%)` }}>
                  <div data-fx="pop" data-fx-delay="1.1" className={`absolute left-0 flex flex-col ${pct > 92 ? "-translate-x-full items-end" : pct < 8 ? "items-start" : "-translate-x-1/2 items-center"}`}>
                    <span className="label rounded-full bg-white px-2.5 py-1 text-black">Agora</span>
                    <span className="mt-1 h-3 w-px bg-white" />
                  </div>
                </div>
              </div>
            )}

            {/* trilho + preenchimento */}
            <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
              <div data-fx="fill" className="absolute inset-0 origin-left rounded-full bg-[linear-gradient(90deg,var(--color-red-deep),var(--color-red)_35%,var(--color-red)_65%,var(--color-red-deep))]" />
            </div>

            {/* marcas de hora */}
            <div className="relative mt-3 h-5">
              {marcas.map((m, i) => (
                <span
                  key={m}
                  className="label absolute top-0 text-gray-300"
                  style={{ left: `${i * 25}%`, transform: i === 0 ? "none" : i === marcas.length - 1 ? "translateX(-100%)" : "translateX(-50%)" }}
                >
                  {m}
                </span>
              ))}
            </div>

            {/* turnos */}
            <div className="mt-6 hidden grid-cols-4 border-t border-white/10 md:grid">
              {turnos.map((t) => (
                <span key={t} className="border-r border-white/10 pt-3 text-center text-sm text-gray-300 last:border-r-0">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Momentos */}
        <ul data-fx="rise" className="mt-16 grid gap-3 md:grid-cols-3">
          {momentos.map(({ icon: Icon, t, d }) => (
            <li key={t} data-fx-item className="rounded-[var(--radius-card)] bg-carbon p-6 md:p-8">
              <span className="grid size-11 place-items-center rounded-full bg-red/15 text-red-bright">
                <Icon size={20} aria-hidden="true" />
              </span>
              <p className="title mt-6 text-xl">{t}</p>
              <p className="mt-2 text-gray-300">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
