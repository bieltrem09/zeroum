"use client";
import { useEffect, useState } from "react";
import { WA_GERAL } from "@/lib/whatsapp";

/**
 * Mobile: pílula preta com borda vermelha (não o ícone verde gigante).
 * Só aparece depois que a pessoa passa do hero, para não cobrir o botão principal.
 * Entrada: transform + opacity, 250ms ease-out (emil/animate: feedback espacial, sem layout shift).
 */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShow(window.scrollY > window.innerHeight * 0.75));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a
      href={WA_GERAL}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`btn btn-black fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 w-[13.5rem] justify-center border border-red shadow-[0_8px_30px_rgb(0_0_0/0.5)] transition-[transform,opacity] duration-[250ms] ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:transition-opacity md:hidden ${
        show ? "-translate-x-1/2 translate-y-0 opacity-100" : "pointer-events-none -translate-x-1/2 translate-y-[150%] opacity-0"
      }`}
    >
      <span className="pulse-dot" aria-hidden="true" />
      Falar no WhatsApp
    </a>
  );
}
