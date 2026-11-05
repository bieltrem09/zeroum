"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Um único "motor" de animações de scroll para o site inteiro.
 *
 * As seções são Server Components (zero hidratação) e só declaram a intenção
 * com data-fx="…". Este componente carrega o GSAP + ScrollTrigger sob demanda,
 * quando o navegador fica ocioso, e liga as animações. Assim o GSAP sai do JS
 * crítico (code-performance: TBT/LCP) e a página funciona 100% sem ele.
 *
 * data-fx:
 *  hero-parallax   foto desce / logo sobe (scrub) + pin para a "folha" subir por cima
 *  words           cor por palavra (cinza→preto) acompanhando a leitura (SplitText)
 *  lines           linhas sobem de uma máscara, uma a uma (SplitText)
 *  rise            entrada y:28→0 + opacity, stagger nos filhos [data-fx-item]
 *  count           número conta de 0 até data-count-to
 *  fill            barra preenche scaleX 0→1
 *  pop             aparece com leve escala (data-fx-delay em s)
 *  clip-in         clip-path inset → 0 (scrub)
 *  hscroll         pin + scroll horizontal do [data-fx-track] (≥1024px)
 *  line            scaleX 0→1 (scrub)
 *  drift           xPercent -10→10 (scrub)
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert = () => {};

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const needsSplit = document.querySelector('[data-fx="words"], [data-fx="lines"]');
      const SplitText = needsSplit ? (await import("gsap/SplitText")).SplitText : null;
      if (cancelled) return;
      if (SplitText) gsap.registerPlugin(SplitText);

      const splits: { revert: () => void }[] = [];
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Hero: profundidade + pin (a folha clara sobe por cima — momento #3)
        document.querySelectorAll<HTMLElement>('[data-fx="hero-parallax"]').forEach((hero) => {
          const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
          const bg = hero.querySelector("[data-fx-bg]");
          const mark = hero.querySelector("[data-fx-mark]");
          if (bg) gsap.to(bg, { yPercent: 12, ease: "none", scrollTrigger: st });
          if (mark) gsap.to(mark, { yPercent: -20, ease: "none", scrollTrigger: st });
          ScrollTrigger.create({ trigger: hero, start: "top top", end: "bottom top", pin: true, pinSpacing: false });
        });

        document.querySelectorAll<HTMLElement>('[data-fx="words"]').forEach((el) => {
          if (!SplitText) return;
          // aria:"none" → texto continua lido como frase normal. Cor (não opacidade) para manter
          // contraste ≥3:1 em texto grande mesmo antes do scroll (#807E7A sobre paper = 3.59:1).
          const split = SplitText.create(el, { type: "words", aria: "none" });
          splits.push(split);
          gsap.fromTo(split.words, { color: "#807e7a" }, { color: "#0b0b0b", ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true } });
        });

        // Linhas sobem de dentro de uma máscara, uma a uma (1x ao entrar). Elegante e legível:
        // o texto continua sendo uma frase (aria preservado pelo SplitText).
        document.querySelectorAll<HTMLElement>('[data-fx="lines"]').forEach((el) => {
          if (!SplitText) return;
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "fx-line", aria: "none" });
          splits.push(split);
          gsap.from(split.lines, { yPercent: 105, duration: 1.1, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: el, start: "top 82%", once: true } });
        });

        document.querySelectorAll<HTMLElement>('[data-fx="rise"]').forEach((el) => {
          const items = el.querySelectorAll("[data-fx-item]");
          gsap.from(items.length ? items : el, { y: 28, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        });

        // Números contam até o valor real (o HTML já traz o valor final: sem JS/SEO intactos).
        document.querySelectorAll<HTMLElement>('[data-fx="count"]').forEach((el) => {
          const to = Number(el.dataset.countTo);
          if (!Number.isFinite(to)) return;
          const fmt = (v: number) => Math.round(v).toLocaleString("pt-BR");
          // Só zera se ainda está abaixo da tela; se o trigger não disparar, o valor real fica visível.
          if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
          const obj = { v: 0 };
          el.textContent = fmt(0);
          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter: () =>
              gsap.to(obj, {
                v: to,
                duration: 1.6,
                ease: "expo.out",
                onUpdate: () => {
                  el.textContent = fmt(obj.v);
                },
              }),
          });
        });

        // Barra que se preenche da esquerda para a direita (1x ao entrar)
        document.querySelectorAll<HTMLElement>('[data-fx="fill"]').forEach((el) => {
          gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", transformOrigin: "left center", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
        });

        // Elementos que aparecem depois da barra (ex.: marcador "agora")
        document.querySelectorAll<HTMLElement>('[data-fx="pop"]').forEach((el) => {
          gsap.from(el, { opacity: 0, y: 8, scale: 0.92, duration: 0.6, delay: Number(el.dataset.fxDelay ?? 0), ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        });

        document.querySelectorAll<HTMLElement>('[data-fx="clip-in"]').forEach((el) => {
          gsap.fromTo(el, { clipPath: "inset(12% 6% 12% 6% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 30%", scrub: true } });
        });

        document.querySelectorAll<HTMLElement>('[data-fx="line"]').forEach((el) => {
          gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top 75%", end: "top 35%", scrub: true } });
        });

        document.querySelectorAll<HTMLElement>('[data-fx="drift"]').forEach((el) => {
          gsap.fromTo(el, { xPercent: -10 }, { xPercent: 10, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });

      // Pin horizontal só em desktop (no mobile vira carrossel com snap)
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        document.querySelectorAll<HTMLElement>('[data-fx="hscroll"]').forEach((wrap) => {
          const track = wrap.querySelector<HTMLElement>("[data-fx-track]");
          if (!track) return;
          const dist = () => track.scrollWidth - window.innerWidth + 48;
          gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: wrap, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
        });
      });

      // Lenis (se ativo) → ScrollTrigger no mesmo loop
      window.dispatchEvent(new CustomEvent("scrollfx:ready", { detail: { gsap, ScrollTrigger } }));
      ScrollTrigger.refresh();

      revert = () => {
        mm.revert();
        splits.forEach((s) => s.revert());
      };
    };

    const idle = (cb: () => void) =>
      "requestIdleCallback" in window ? window.requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 200);
    const id = idle(() => void run());

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(id as number);
      else clearTimeout(id as number);
      revert();
    };
  }, [pathname]);

  return null;
}
