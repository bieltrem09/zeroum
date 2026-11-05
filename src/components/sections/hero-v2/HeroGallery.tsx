"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Media } from "@/components/ui/Media";

const slides = [
  { slot: "hero-bg", label: "Máquinas articuladas" },
  { slot: "estrutura-peso-livre", label: "Peso livre" },
  { slot: "estrutura-gluteo-zone", label: "Glúteo Zone" },
  { slot: "estrutura-maquinas", label: "230 máquinas de 10 marcas" },
] as const;

const DUR = 5000;

/**
 * Galeria do hero (fotos reais) no formato "stories":
 * troca a cada 5 s com crossfade + leve zoom; barras de progresso no topo;
 * pausa no hover/foco e pelo botão (WCAG 2.2.2); reduced-motion: fica na primeira foto, sem troca.
 */
export function HeroGallery() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduce, setReduce] = useState(false);
  const started = useRef(0);
  const elapsed = useRef(0);
  const bar = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const running = !paused && !hover && !reduce;

  // Relógio do slide: avança e anima a barra atual por scaleX (transform, sem layout).
  useEffect(() => {
    if (!running) return;
    started.current = performance.now() - elapsed.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - started.current) / DUR);
      elapsed.current = k * DUR;
      const el = bar.current[i];
      if (el) el.style.transform = `scaleX(${k})`;
      if (k >= 1) {
        elapsed.current = 0;
        setI((v) => (v + 1) % slides.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, i]);

  // Barras anteriores cheias, seguintes vazias.
  useEffect(() => {
    bar.current.forEach((el, k) => {
      if (el && k !== i) el.style.transform = `scaleX(${k < i ? 1 : 0})`;
    });
  }, [i]);

  const go = (k: number) => {
    elapsed.current = 0;
    setI(k);
  };

  return (
    <div
      className="hero2-gallery relative h-full w-full overflow-hidden rounded-[var(--radius-photo)] bg-carbon"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      aria-roledescription="carrossel"
      aria-label="Fotos da estrutura da Zero Um"
    >
      {slides.map((s, k) => (
        <div
          key={s.slot}
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-[var(--ease-in-out)] motion-reduce:transition-none ${k === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={k !== i}
        >
          <div className={`h-full w-full ${k === i && !reduce ? "hero2-kenburns" : ""}`}>
            <Media slot={s.slot} priority={k === 0} quality={k === 0 ? 85 : 75} keepRatio={false} rounded={false} hideLabel className="h-full w-full" sizes="(min-width:1024px) 58vw, 100vw" />
          </div>
        </div>
      ))}

      {/* leitura das legendas */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(11_11_11/0.75)_0%,transparent_35%),linear-gradient(to_bottom,rgb(11_11_11/0.45)_0%,transparent_22%)]" aria-hidden="true" />

      {/* barras de progresso (clicáveis) */}
      <div className="absolute inset-x-4 top-4 z-10 flex gap-1.5 md:inset-x-6 md:top-6">
        {slides.map((s, k) => (
          <button
            key={s.slot}
            type="button"
            onClick={() => go(k)}
            className="group relative h-6 flex-1"
            aria-label={`Foto ${k + 1} de ${slides.length}: ${s.label}`}
            aria-current={k === i}
          >
            <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/30 transition-colors group-hover:bg-white/45">
              <span ref={(el) => void (el && (bar.current[k] = el))} className="block h-full origin-left scale-x-0 rounded-full bg-white" />
            </span>
          </button>
        ))}
      </div>

      {/* legenda + pausa */}
      <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3 md:inset-x-6 md:bottom-6">
        <p className="pill min-h-10 whitespace-nowrap bg-black/70 px-4 text-sm text-white backdrop-blur-sm" aria-live="polite">
          <span className="label text-red-bright">0{i + 1}</span>
          {slides[i].label}
        </p>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-transform duration-150 active:scale-95"
            aria-label={paused ? "Retomar fotos" : "Pausar fotos"}
          >
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
