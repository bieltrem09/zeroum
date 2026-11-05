import { isTodo, type Todo as TodoT } from "@/content/zeroum";

/**
 * Pendências de conteúdo NÃO aparecem para o visitante: um aviso "a confirmar"
 * não informa nada a quem quer treinar. Para revisar o que falta, rode com
 * NEXT_PUBLIC_SHOW_TODOS=1 (ou veja a lista no BUILD_LOG.md).
 */
const SHOW = process.env.NEXT_PUBLIC_SHOW_TODOS === "1";

export function Todo({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  if (!SHOW) return null;
  return (
    <span className={`todo ${className}`} role="note">
      <span aria-hidden="true">●</span>
      <span>
        A CONFIRMAR · <span className="normal-case">{children}</span>
      </span>
    </span>
  );
}

/** Mostra o texto real; pendência só aparece no modo de revisão. */
export function Value({ v, className }: { v: string | TodoT; className?: string }) {
  if (isTodo(v)) return <Todo className={className}>{v.todo}</Todo>;
  return <span className={className}>{v}</span>;
}
