import { WORDMARK_LETTERS, WORDMARK_VIEWBOX } from "./logo-paths";

type Variant = "white-red" | "black-red" | "mono-white" | "mono-black";

/** Proporção do kit (viewBox 976 × 209.5). */
const W = 976;
const H = 209.5;

/**
 * Logo oficial = arquivo SVG do kit em public/brand (nunca recriar com fonte).
 * Como <img>: o navegador baixa uma vez e reaproveita em todas as páginas, sem
 * repetir ~13 KB de path no HTML e no payload do React (code-performance).
 * Largura mínima 120px; área de proteção = altura do "CT.".
 */
export function Logo({ variant = "white-red", className, title = "Zero Um CT" }: { variant?: Variant; className?: string; title?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/brand/zeroum-logo-${variant}.svg`} width={W} height={H} alt={title} className={className} decoding="async" />
  );
}

/** Só a palavra ZEROUM (branca), como imagem: para usos estáticos (footer). */
export function WordmarkImage({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/zeroum-wordmark-white.svg" width={976} height={128} alt="" aria-hidden="true" className={className} loading="lazy" decoding="async" />;
}

/**
 * Só a palavra ZEROUM, uma <path> por letra (para o stagger da intro do hero).
 * Inline de propósito: as letras são animadas uma a uma. Decorativa: aria-hidden.
 */
export function Wordmark({ className, fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      {WORDMARK_LETTERS.map((d, i) => (
        <path key={i} data-letter fill={fill} fillRule="evenodd" d={d} />
      ))}
    </svg>
  );
}
