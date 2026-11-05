"use client";

import Link from "next/link";
import { useRef } from "react";
import { LazyMotion, domAnimation, m, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Media } from "@/components/ui/Media";
import { zeroum } from "@/content/zeroum";
import { WA_AULA } from "@/lib/whatsapp";

type Stat = { n: number; unit: string; label: string; sub: string };
const stats: Stat[] = [
  { n: 24, unit: "h", label: "Aberta", sub: "Todos os dias. Madrugada, manhã, tarde e noite." },
  { n: 2500, unit: "m²", label: "De estrutura", sub: "A maior academia de Americana, debaixo de um teto só." },
  { n: zeroum.maquinas, unit: "", label: "Máquinas", sub: `De ${zeroum.marcas} marcas diferentes, para treinar cada músculo do jeito certo.` },
];

/* Janelas de scroll (0–1) de cada número dentro da cena */
const W: [number, number][] = [
  [0.16, 0.4],
  [0.4, 0.62],
  [0.62, 0.84],
];

function StatSlide({ stat, i, p }: { stat: Stat; i: number; p: MotionValue<number> }) {
  const [a, b] = W[i];
  const fade = 0.05;
  const opacity = useTransform(p, [a, a + fade, b - fade, b], [0, 1, 1, i === 2 ? 0 : 0]);
  const y = useTransform(p, [a, a + fade * 2, b - fade, b], [90, 0, 0, -90]);
  const blur = useTransform(p, [a, a + fade, b - fade, b], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  const count = useTransform(p, [a, a + (b - a) * 0.4], [0, stat.n], { clamp: true });
  const text = useTransform(count, (v) => Math.round(v).toLocaleString("pt-BR"));

  return (
    <m.div style={{ opacity, y, filter: blur }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <p className="label text-white/80">
        <span className="text-red-bright">0{i + 1}</span> / 03 · {stat.label}
      </p>
      <p className="display mt-4 leading-[0.9] text-white">
        <m.span className="tnum text-[clamp(6.5rem,24vw,22rem)]">{text}</m.span>
        {stat.unit && <span className="ml-2 align-top font-sans text-[clamp(2rem,5vw,4.5rem)] font-bold normal-case text-red">{stat.unit}</span>}
      </p>
      <p className="mt-6 max-w-md text-lg text-white/85 md:text-xl">{stat.sub}</p>
    </m.div>
  );
}

function Progress({ p }: { p: MotionValue<number> }) {
  return (
    <div className="absolute bottom-8 left-1/2 z-20 flex w-[min(80vw,420px)] -translate-x-1/2 gap-2" aria-hidden="true">
      {W.map(([a, b], i) => (
        <Bar key={i} p={p} a={a} b={b} />
      ))}
    </div>
  );
}
function Bar({ p, a, b }: { p: MotionValue<number>; a: number; b: number }) {
  const scaleX = useTransform(p, [a, b], [0, 1], { clamp: true });
  return (
    <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
      <m.span style={{ scaleX }} className="block h-full origin-left rounded-full bg-red" />
    </span>
  );
}

/** Versão estática (reduced-motion): mesma informação, sem cena presa. */
function Estatico() {
  return (
    <section aria-labelledby="numeros-title-static" className="relative z-10 bg-black py-24">
      <div className="container-site">
        <h2 id="numeros-title-static" className="display text-section">
          Vem conhecer a <span className="text-red">maior academia de Americana.</span>
        </h2>
        <ul className="mt-12 grid gap-3 md:grid-cols-3">
          {stats.map((s) => (
            <li key={s.label} className="rounded-[var(--radius-card)] bg-carbon p-8">
              <p className="display text-7xl">
                {s.n.toLocaleString("pt-BR")}
                <span className="font-sans text-4xl font-bold normal-case text-red">{s.unit}</span>
              </p>
              <p className="title mt-3 text-xl">{s.label}</p>
              <p className="mt-2 text-gray-300">{s.sub}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/aula-experimental" className="btn btn-red">
            Agendar aula experimental
          </Link>
          <a href={WA_AULA} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * ZERO UM EM NÚMEROS — cena presa na tela (CSS sticky + motion useScroll):
 * a foto do letreiro abre de card para tela cheia, e 24h → 2.500 m² → 230 máquinas entram um a um,
 * contando, com blur e deslocamento; termina na chamada para a aula experimental.
 */
export function NumerosImpacto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.5 });

  const clip = useTransform(p, [0, 0.18], ["inset(16% 12% 16% 12% round 36px)", "inset(0% 0% 0% 0% round 0px)"]);
  const imgScale = useTransform(p, [0, 0.5], [1.25, 1]);
  const shade = useTransform(p, [0, 0.16, 0.84, 1], [0.15, 0.62, 0.62, 0.78]);
  const introOpacity = useTransform(p, [0, 0.08, 0.15], [1, 1, 0]);
  const introY = useTransform(p, [0, 0.15], [0, -60]);
  const endOpacity = useTransform(p, [0.84, 0.92], [0, 1]);
  const endY = useTransform(p, [0.84, 0.94], [60, 0]);

  // As duas versões existem no HTML; o CSS (motion-reduce) escolhe qual aparece.
  // Assim servidor e navegador renderizam igual (sem erro de hidratação).

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="hidden motion-reduce:block">
        <Estatico />
      </div>
      <section ref={ref} aria-labelledby="numeros-title" className="relative z-10 h-[360vh] bg-black motion-reduce:hidden">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* brilho vermelho que continua o palco do celular */}
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgb(227_24_45/0.35),transparent_70%)]" aria-hidden="true" />

          {/* Foto: card → tela cheia */}
          <m.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden">
            <m.div style={{ scale: imgScale }} className="absolute inset-0">
              <Media slot="cta" keepRatio={false} rounded={false} className="h-full w-full" sizes="100vw" />
            </m.div>
            <m.div style={{ opacity: shade }} className="absolute inset-0 bg-black" aria-hidden="true" />
          </m.div>

          {/* Abertura */}
          <m.div style={{ opacity: introOpacity, y: introY }} className="pointer-events-none absolute inset-x-0 top-[9%] z-10 text-center">
            <p className="label text-white/80">Zero Um em números</p>
          </m.div>

          {/* Números */}
          {stats.map((s, i) => (
            <StatSlide key={s.label} stat={s} i={i} p={p} />
          ))}

          {/* Fechamento */}
          <m.div style={{ opacity: endOpacity, y: endY }} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
            <h2 id="numeros-title" className="display max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[1.02]">
              Vem conhecer a <span className="text-red">maior academia</span> de Americana.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href="/aula-experimental" className="btn btn-red">
                Agendar aula experimental <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <a href={WA_AULA} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Chamar no WhatsApp
              </a>
            </div>
          </m.div>

          <Progress p={p} />
        </div>
      </section>
    </LazyMotion>
  );
}
