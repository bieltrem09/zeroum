"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowLeft, CheckCheck, MapPin, Mic, Phone, Video } from "lucide-react";
import { zeroum } from "@/content/zeroum";
import { WA_AULA } from "@/lib/whatsapp";
import { useNow } from "@/lib/useNow";
import { SectionLabel } from "@/components/ui/SectionHead";

type Msg = { from: "me" | "zu"; text?: string; card?: boolean; time: string };

/** Conversa ilustrativa: só informações reais da academia (24h, diária, endereço). */
const conversa: Msg[] = [
  { from: "me", text: "Oi! Vi o site. Vocês abrem de madrugada mesmo?", time: "22:41" },
  { from: "zu", text: "Abrimos sim! A Zero Um funciona 24 horas.", time: "22:41" },
  { from: "me", text: "Quanto é pra conhecer?", time: "22:42" },
  { from: "zu", text: "A diária sai R$ 39,90. Quer agendar uma aula experimental?", time: "22:42" },
  { from: "me", text: "Bora! Amanhã às 6h.", time: "22:43" },
  { from: "zu", card: true, text: "Fechado! Te esperamos às 6h.", time: "22:43" },
];

const passos = [
  { n: "01", t: "Chama no WhatsApp", d: "Sem app e sem cadastro. A resposta é rápida." },
  { n: "02", t: "Conheça a estrutura", d: "2.500 m², 230 máquinas e a equipe para tirar dúvidas." },
  { n: "03", t: "Escolha como treinar", d: "Plano Zero Um, diária de R$ 39,90, Wellhub ou TotalPass." },
];

/* ------------------------------------------------------------------ */

function Bubble({ msg }: { msg: Msg }) {
  const me = msg.from === "me";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[84%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug shadow-sm ${
          me ? "rounded-br-md bg-[#9e0f1f] text-white" : "rounded-bl-md bg-[#1f1f1f] text-white/95"
        }`}
      >
        {msg.card && (
          <div className="mb-2 overflow-hidden rounded-xl bg-black/40">
            {/* mini mapa da marca */}
            <div className="relative h-20 bg-[#1a0d0f]">
              <svg viewBox="0 0 200 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <g stroke="rgb(227 24 45 / 0.35)" strokeWidth="5">
                  <path d="M-10 52 L210 38" />
                  <path d="M60 -10 L90 90" />
                  <path d="M150 -10 L130 90" />
                </g>
                <g stroke="rgb(255 255 255 / 0.08)" strokeWidth="2">
                  <path d="M-10 20 L210 12" />
                  <path d="M-10 74 L210 64" />
                  <path d="M20 -10 L40 90" />
                </g>
              </svg>
              <span className="absolute left-1/2 top-1/2 grid size-7 -translate-x-1/2 -translate-y-full place-items-center rounded-full bg-[#e3182d] shadow-[0_0_0_6px_rgb(227_24_45/0.25)]">
                <MapPin size={14} className="text-white" />
              </span>
            </div>
            <div className="px-2.5 py-2">
              <p className="text-[12px] font-semibold">Zero Um CT Americana</p>
              <p className="text-[11px] text-white/60">{zeroum.endereco.rua} · {zeroum.endereco.bairro}</p>
            </div>
          </div>
        )}
        {msg.text}
        <span className={`ml-2 inline-flex translate-y-0.5 items-center gap-0.5 text-[9.5px] ${me ? "text-white/70" : "text-white/45"}`}>
          {msg.time}
          {me && <CheckCheck size={12} className="text-[#ff8a95]" aria-hidden="true" />}
        </span>
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1 rounded-2xl rounded-bl-md bg-[#1f1f1f] px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="typing-dot size-1.5 rounded-full bg-white/60" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

/** Tela do celular: conversa no tema da Zero Um. */
function PhoneScreen({ shown, typing }: { shown: number; typing: boolean }) {
  const now = useNow();
  return (
    <div className="flex h-full flex-col bg-[#0b0b0b] text-white">
      {/* status bar */}
      <div className="flex h-11 items-end justify-between px-7 pb-1.5 text-[12px] font-semibold">
        <span className="tnum">{now?.hhmm ?? "06:00"}</span>
        <span className="flex items-center gap-1" aria-hidden="true">
          <span className="h-2.5 w-4 rounded-[3px] border border-white/80 p-[1px]">
            <span className="block h-full w-3/4 rounded-[1px] bg-white" />
          </span>
        </span>
      </div>
      {/* header da conversa */}
      <div className="flex items-center gap-2.5 border-b border-white/10 bg-[#141414] px-3 py-2.5">
        <ArrowLeft size={18} className="text-white/80" aria-hidden="true" />
        <Image src="/brand/zeroum-avatar-2048.png" alt="" width={34} height={34} className="rounded-full" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold">Zero Um CT Americana</p>
          <p className="text-[10.5px] text-[#ff8a95]">{typing ? "digitando…" : "Responde rapidamente"}</p>
        </div>
        <Video size={17} className="text-white/80" aria-hidden="true" />
        <Phone size={16} className="text-white/80" aria-hidden="true" />
      </div>
      {/* mensagens */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #e3182d 1px, transparent 0)", backgroundSize: "14px 14px" }}
          aria-hidden="true"
        />
        <div className="relative flex h-full flex-col justify-end gap-2 p-3">
          <p className="mx-auto mb-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/60">Hoje</p>
          {conversa.slice(0, shown).map((msg, i) => (
            <m.div key={i} initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}>
              <Bubble msg={msg} />
            </m.div>
          ))}
          {typing && <Typing />}
        </div>
      </div>
      {/* barra de digitação */}
      <div className="flex items-center gap-2 px-2.5 pb-5 pt-2">
        <div className="flex-1 rounded-full bg-[#1f1f1f] px-4 py-2 text-[12px] text-white/40">Mensagem</div>
        <span className="grid size-9 place-items-center rounded-full bg-[#e3182d]">
          <Mic size={16} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

/**
 * 07 · COMO COMEÇAR — celular 3D (inspirado no hero do app da Smart Fit), mas com o que é real
 * na Zero Um: o começo é pelo WhatsApp. O celular endireita conforme o scroll (spring) e a
 * conversa acontece quando ele entra na tela. Reduced motion: pose final e conversa completa.
 */
export function ComoComecar() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(stage, { once: true, amount: 0.45 });
  const [shown, setShown] = useState(reduce ? conversa.length : 0);
  const [typing, setTyping] = useState(false);

  // Conversa em sequência: "digitando…" antes das respostas da Zero Um.
  useEffect(() => {
    if (reduce) {
      setShown(conversa.length);
      return;
    }
    if (!inView) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 500;
    conversa.forEach((msg, i) => {
      if (msg.from === "zu") {
        timers.push(setTimeout(() => !cancelled && setTyping(true), t));
        t += 1100;
      }
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setShown(i + 1);
        }, t),
      );
      t += msg.from === "me" ? 900 : 1300;
    });
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, reduce]);

  // Inclinação ligada ao scroll (mola para suavizar).
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.6 });
  const rotateX = useTransform(p, [0, 1], [38, 8]);
  const rotateY = useTransform(p, [0, 1], [-28, -12]);
  const rotateZ = useTransform(p, [0, 1], [16, -6]);
  const y = useTransform(p, [0, 1], [140, 0]);
  const scale = useTransform(p, [0, 1], [0.86, 1]);

  return (
    <LazyMotion features={domAnimation} strict>
      <section id="como-comecar" aria-labelledby="comecar-title" className="relative z-10 overflow-hidden bg-black py-24 md:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Texto */}
          <div className="lg:col-span-5">
            <SectionLabel n="07">Como começar</SectionLabel>
            <h2 id="comecar-title" className="display mt-4 text-section">
              Do zero
              <br />
              <span className="text-red">ao um.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-gray-300">Sem app e sem burocracia. Seu primeiro treino começa numa mensagem.</p>

            <ol className="mt-10 space-y-6">
              {passos.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 font-mono text-sm tnum">{s.n}</span>
                  <div>
                    <p className="title text-lg">{s.t}</p>
                    <p className="mt-1 text-gray-300">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href={WA_AULA} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                Chamar no WhatsApp <span className="btn-arrow" aria-hidden="true">→</span>
              </a>
              <Link href="/aula-experimental" className="btn btn-outline">
                Agendar pelo site
              </Link>
            </div>
          </div>

          {/* Palco do celular */}
          <div className="lg:col-span-7">
            <div
              ref={stage}
              className="relative grid min-h-[640px] place-items-center overflow-hidden rounded-[var(--radius-photo)] bg-[radial-gradient(120%_90%_at_50%_10%,#e3182d_0%,#9e0f1f_38%,#2a0a0e_70%,#0b0b0b_100%)] py-16 [perspective:1600px] md:min-h-[760px]"
            >
              {/* "01" gigante ao fundo */}
              <span className="display pointer-events-none absolute -bottom-[0.12em] left-1/2 -translate-x-1/2 select-none text-[clamp(14rem,40vw,30rem)] leading-none text-black/25" aria-hidden="true">
                01
              </span>

              {/* selos flutuando */}
              {[
                { t: "Aberto 24h", c: "left-[6%] top-[14%]", d: 0 },
                { t: "Diária R$ 39,90", c: "right-[6%] top-[30%]", d: 0.8 },
                { t: "Resposta rápida", c: "left-[8%] bottom-[18%]", d: 1.6 },
              ].map((chip) => (
                <span
                  key={chip.t}
                  className={`float-chip pill absolute z-20 hidden bg-black/70 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm sm:inline-flex ${chip.c}`}
                  style={{ animationDelay: `${chip.d}s` }}
                  aria-hidden="true"
                >
                  <span className="size-1.5 rounded-full bg-red-bright" />
                  {chip.t}
                </span>
              ))}

              {/* Celular */}
              <m.div
                style={reduce ? { rotateX: 8, rotateY: -12, rotateZ: -6 } : { rotateX, rotateY, rotateZ, y, scale }}
                className="relative z-10 [transform-style:preserve-3d]"
              >
                <div
                  className="relative h-[540px] w-[264px] rounded-[46px] bg-[linear-gradient(145deg,#3a3a3a,#111_45%,#2b2b2b)] p-[9px] shadow-[0_60px_120px_-30px_rgb(0_0_0/0.85),inset_0_0_0_1px_rgb(255_255_255/0.12)] md:h-[600px] md:w-[292px]"
                  role="img"
                  aria-label="Celular mostrando uma conversa ilustrativa no WhatsApp com a Zero Um: pergunta sobre horário, valor da diária e agendamento da aula experimental."
                >
                  {/* botões laterais */}
                  <span className="absolute -left-[3px] top-28 h-8 w-[3px] rounded-l bg-[#2b2b2b]" aria-hidden="true" />
                  <span className="absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-[#2b2b2b]" aria-hidden="true" />
                  <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-[#2b2b2b]" aria-hidden="true" />
                  {/* tela */}
                  <div className="relative h-full w-full overflow-hidden rounded-[38px]" aria-hidden="true">
                    <span className="absolute left-1/2 top-2.5 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
                    <PhoneScreen shown={shown} typing={typing} />
                    {/* reflexo do vidro */}
                    <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.10)_0%,transparent_28%)]" />
                  </div>
                </div>
              </m.div>
            </div>
            <p className="label mt-3 text-gray-300">Conversa ilustrativa · atendimento real pelo WhatsApp {zeroum.whatsapp}</p>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
