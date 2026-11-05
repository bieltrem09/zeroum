import { CT_PATH, LOGO_VIEWBOX, WORDMARK_LETTERS } from "@/components/brand/logo-paths";

/**
 * Animação de entrada a cada carregamento/atualização da página (CSS puro: começa no 1º paint,
 * sem esperar JS). Letras do ZEROUM sobem uma a uma, "CT." aparece em vermelho, uma linha
 * vermelha se desenha e a cortina preta sobe revelando o site (~1,9 s).
 * Navegação interna não repete (o layout não remonta). Reduced motion: não aparece.
 * Ao terminar, fica invisível e não bloqueia cliques (visibility: hidden no fim da animação).
 */
export function IntroSplash() {
  return (
    <div className="intro-splash" aria-hidden="true">
      <div className="intro-splash-inner">
        <svg viewBox={LOGO_VIEWBOX} className="intro-logo" focusable="false">
          {WORDMARK_LETTERS.map((d, i) => (
            <path key={i} className="intro-letter" style={{ animationDelay: `${0.1 + i * 0.06}s` }} fill="#fff" fillRule="evenodd" d={d} />
          ))}
          <path className="intro-ct" fill="var(--color-red)" fillRule="evenodd" d={CT_PATH} />
        </svg>
        <span className="intro-line" />
        <span className="intro-tag">Aberta 24h · Americana/SP</span>
      </div>
    </div>
  );
}
