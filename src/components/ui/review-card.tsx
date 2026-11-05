import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ReviewCard — layout de "tweet card" (ref. @tom_ui · 21st) adaptado para avaliação do Google:
 * avatar + nome + perfil, logo do Google no canto (no lugar do X), estrelas, data e texto.
 */

export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label={`${n} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("size-4", i <= n ? "fill-[#fbbc04]" : "fill-white/20")} aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.8L10 14.85 4.75 17.6l1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

const AVATAR = ["#e3182d", "#5e35b1", "#00897b", "#3949ab", "#f4511e", "#6d4c41", "#039be5", "#7cb342"];
const colorFor = (name: string) => AVATAR[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR.length];

export interface ReviewCardProps extends React.ComponentPropsWithoutRef<"article"> {
  name: string;
  profile?: string;
  date?: string;
  rating: number;
  text: string;
  href?: string;
}

export function ReviewCard({ name, profile, date, rating, text, href, className, ...props }: ReviewCardProps) {
  const localGuide = profile?.startsWith("Local Guide");
  return (
    <article
      className={cn(
        "group relative flex break-inside-avoid flex-col gap-4 rounded-[var(--radius-card,1rem)] border border-white/10 bg-card p-5 transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:p-6",
        "[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 [@media(hover:hover)_and_(pointer:fine)]:hover:border-white/25 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      <header className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full text-lg font-semibold text-white" style={{ backgroundColor: colorFor(name) }} aria-hidden="true">
          {name.trim()[0]}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate font-semibold leading-tight text-foreground">
            {name}
            {localGuide && (
              <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-label="Local Guide" role="img">
                <circle cx="12" cy="12" r="11" fill="#f4511e" />
                <path fill="#fff" d="M12 5.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L12 15.3l-3.8 2 .7-4.3-3.1-3 4.3-.6z" />
              </svg>
            )}
          </p>
          {profile && <p className="mt-0.5 truncate text-sm text-muted-foreground">{profile}</p>}
        </div>
        <GoogleG className="size-6 shrink-0" />
      </header>

      <div className="flex items-center gap-2">
        <Stars n={rating} />
        {date && <span className="text-xs text-muted-foreground">{date}</span>}
      </div>

      <p className="text-[0.95rem] leading-relaxed text-foreground/90">{text}</p>

      <footer className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <GoogleG className="size-3.5" /> Avaliação no Google
        </span>
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground/80 underline-offset-4 hover:text-foreground hover:underline">
            Ver no Google
          </a>
        )}
      </footer>
    </article>
  );
}
