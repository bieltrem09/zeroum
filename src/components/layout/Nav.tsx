"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { navLinks, zeroum } from "@/content/zeroum";
import { WA_GERAL } from "@/lib/whatsapp";

/**
 * Nav: some ao rolar para baixo, volta ao rolar para cima com fundo preto 85% + blur.
 * Motion (emil/animate): feedback de direção · transform translateY · 250ms ease-out.
 * Mobile: <dialog> nativo em tela cheia (focus trap e Esc de graça).
 */
export function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - last;
        if (Math.abs(delta) > 6) {
          setHidden(delta > 0 && y > 240);
          last = y;
        }
        setSolid(y > 40);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const openMenu = () => {
    dlg.current?.showModal();
    window.__lenis?.stop();
  };
  const closeMenu = () => {
    dlg.current?.close();
  };
  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const onClose = () => window.__lenis?.start();
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);
  useEffect(() => closeMenu(), [pathname]);

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] btn btn-white">
        Pular para o conteúdo
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 pt-3 transition-transform duration-[250ms] ease-[var(--ease-out)] motion-reduce:transition-none ${
          hidden ? "-translate-y-[130%] motion-reduce:translate-y-0" : "translate-y-0"
        }`}
      >
        <nav aria-label="Principal" className="container-site">
          <div
            className={`flex h-16 items-center justify-between gap-4 rounded-full border pl-5 pr-2 transition-[background-color,border-color] duration-300 md:pl-6 ${
              solid ? "border-white/10 bg-black/85 backdrop-blur-md" : "border-white/10 bg-black/30 backdrop-blur-md"
            }`}
          >
            <Link href="/" aria-label={`${zeroum.nome} — início`} className="shrink-0 py-2">
              <Logo className="h-6 w-auto md:h-7" />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => {
                const active = pathname.startsWith(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative block rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                        active ? "text-white" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {l.label}
                      {active && <span className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-red-bright" aria-hidden="true" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href={WA_GERAL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline hidden !min-h-11 !px-4 md:inline-flex"
                aria-label="Falar no WhatsApp"
              >
                <MessageCircle size={18} strokeWidth={2} aria-hidden="true" />
                <span className="hidden xl:inline">WhatsApp</span>
              </a>
              <Link href="/aula-experimental" className="btn btn-red hidden !min-h-11 md:inline-flex">
                Aula experimental
              </Link>
              <button
                type="button"
                onClick={openMenu}
                className="grid size-11 place-items-center rounded-full bg-white text-black transition-transform duration-150 active:scale-95 lg:hidden"
                aria-label="Abrir menu"
                aria-haspopup="dialog"
              >
                <Menu size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <dialog ref={dlg} className="menu" aria-label="Menu" onClick={(e) => e.target === dlg.current && closeMenu()}>
        <div className="container-site flex h-full flex-col">
          <div className="flex h-[var(--nav-h)] items-center justify-between">
            <Logo className="h-6 w-auto" />
            <button type="button" onClick={closeMenu} className="grid size-11 place-items-center rounded-full bg-white text-black" aria-label="Fechar menu">
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-6 flex flex-col">
            <li className="hairline border-b">
              <Link href="/" className="display block py-3 text-[clamp(2.75rem,13vw,4.5rem)]" onClick={closeMenu}>
                Início
              </Link>
            </li>
            {navLinks.map((l, i) => (
              <li key={l.href} className="hairline border-b">
                <Link
                  href={l.href}
                  onClick={closeMenu}
                  aria-current={pathname.startsWith(l.href) ? "page" : undefined}
                  className="display flex items-baseline justify-between py-3 text-[clamp(2.75rem,13vw,4.5rem)] aria-[current=page]:text-red"
                >
                  {l.label}
                  <span className="label text-gray-300">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8">
            <Link href="/aula-experimental" className="btn btn-red justify-center" onClick={closeMenu}>
              Agendar aula experimental
            </Link>
            <a href={WA_GERAL} className="btn btn-outline justify-center" target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
