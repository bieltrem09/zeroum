"use client";
import { turnos } from "@/content/zeroum";
import { useNow } from "@/lib/useNow";
import { turnoDaHora } from "@/lib/time";
import { RollingNumber } from "@/components/ui/RollingNumber";
import { SectionLabel } from "@/components/ui/SectionHead";

/* ---------- Mostrador 24h ---------- */
function Dial({ hour, minute }: { hour: number; minute: number }) {
  const R = 150;
  const C = 170;
  const angle = ((hour + minute / 60) / 24) * 360;
  const arc = (from: number, to: number, r: number) => {
    const a0 = ((from / 24) * 360 - 90) * (Math.PI / 180);
    const a1 = ((to / 24) * 360 - 90) * (Math.PI / 180);
    const large = to - from > 12 ? 1 : 0;
    return `M ${C + r * Math.cos(a0)} ${C + r * Math.sin(a0)} A ${r} ${r} 0 ${large} 1 ${C + r * Math.cos(a1)} ${C + r * Math.sin(a1)}`;
  };
  const atual = turnoDaHora(hour);
  return (
    <svg viewBox="0 0 340 340" className="h-auto w-full max-w-[420px]" role="img" aria-label={`Agora são ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} em Americana e a academia está aberta.`}>
      {turnos.map((t) => (
        <path key={t.id} d={arc(t.inicio + 0.08, t.fim - 0.08, R)} fill="none" stroke={t.id === atual ? "var(--color-red)" : "rgb(255 255 255 / 0.16)"} strokeWidth={t.id === atual ? 10 : 6} strokeLinecap="round" />
      ))}
      {Array.from({ length: 24 }, (_, h) => {
        const a = ((h / 24) * 360 - 90) * (Math.PI / 180);
        const major = h % 6 === 0;
        const r1 = R - 18;
        const r2 = R - (major ? 34 : 24);
        return (
          <g key={h}>
            <line x1={C + r1 * Math.cos(a)} y1={C + r1 * Math.sin(a)} x2={C + r2 * Math.cos(a)} y2={C + r2 * Math.sin(a)} stroke="rgb(255 255 255 / 0.5)" strokeWidth={major ? 2 : 1} />
            {major && (
              <text x={C + (R - 52) * Math.cos(a)} y={C + (R - 52) * Math.sin(a) + 4} textAnchor="middle" fill="var(--color-gray-300)" fontFamily="var(--font-mono)" fontSize="11">
                {String(h).padStart(2, "0")}
              </text>
            )}
          </g>
        );
      })}
      <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${C}px ${C}px`, transition: "transform 600ms var(--ease-in-out)" }} className="motion-reduce:!transition-none">
        <line x1={C} y1={C + 14} x2={C} y2={C - R + 6} stroke="var(--color-white)" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={C} cy={C - R + 6} r="5" fill="var(--color-red)" />
      </g>
      <circle cx={C} cy={C} r="5" fill="var(--color-white)" />
    </svg>
  );
}

const fatos = [
  { t: "Madrugada", d: "Saiu tarde do trabalho ou acorda cedo? A porta está aberta às 3h da manhã também." },
  { t: "Sem correria", d: "Você escolhe a hora. Treina quando cabe na sua rotina, não quando a academia deixa." },
  { t: "Todos os dias", d: "Funcionamento 24 horas, como está no Google e no Instagram oficial." },
];

/** 04 · 24 HORAS — o que o visitante precisa saber: está aberta agora e a qualquer hora. */
export function Horarios24({ label = "04" }: { label?: string }) {
  const now = useNow();
  return (
    <section id="horarios" aria-labelledby="horarios-title" className="relative z-10 scroll-mt-24 bg-black py-24 md:py-32">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="min-w-0 lg:col-span-6">
          <SectionLabel n={label}>Horário</SectionLabel>
          <h2 id="horarios-title" className="display mt-4 text-section">
            Aberta
            <br />
            <span className="text-red">24 horas.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-gray-300">
            Agora são <strong className="font-mono text-white">{now ? <RollingNumber value={now.hhmm} /> : "--:--"}</strong> em Americana.{" "}
            <span className="text-white">A Zero Um está aberta.</span>
          </p>
          <ul className="hairline mt-10 grid gap-6 border-t pt-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {fatos.map((f) => (
              <li key={f.t}>
                <p className="title text-lg">{f.t}</p>
                <p className="mt-2 text-sm text-gray-300">{f.d}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center lg:col-span-5 lg:col-start-8">
          {now ? <Dial hour={now.hour} minute={now.minute} /> : <div className="aspect-square w-full max-w-[420px] rounded-full border border-white/10" />}
        </div>
      </div>
    </section>
  );
}
