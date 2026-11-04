import { eventos, zeroum } from "@/content/zeroum";
import { Media } from "@/components/ui/Media";
import { media } from "@/content/media";
import { SectionLabel } from "@/components/ui/SectionHead";
import { PillLink } from "@/components/ui/Buttons";

/** 10 · COMUNIDADE / EVENTOS — grade editorial com os eventos reais do Instagram. */
export function Comunidade() {
  return (
    <section aria-labelledby="com-title" className="relative z-10 bg-black py-24 md:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel n="10">Comunidade</SectionLabel>
            <h2 id="com-title" className="display mt-4 text-section">
              Fora da série
              <br />
              também tem treino.
            </h2>
          </div>
          <PillLink href={zeroum.instagramLink} tone="white" external>
            Seguir {zeroum.instagram}
          </PillLink>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-12">
          {eventos.map((e, i) => (
            <li key={e.id} className={`min-w-0 ${i === 0 ? "md:col-span-12 lg:col-span-6 lg:row-span-2" : i === 1 ? "md:col-span-12 lg:col-span-6" : "md:col-span-6 lg:col-span-3"}`}>
              <a href={e.link} target="_blank" rel="noopener noreferrer" className="group block h-full">
                {media[e.foto]?.src ? (
                  <div className="relative overflow-hidden rounded-[var(--radius-photo)]">
                    <Media
                      slot={e.foto}
                      rounded={false}
                      keepRatio={i !== 0}
                      className={`transition-transform duration-500 ease-[var(--ease-out)] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.03] ${i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[560px]" : ""}`}
                      sizes="(min-width:768px) 50vw, 100vw"
                    />
                    <span className="label pill absolute left-3 top-3 bg-black/80 text-white">{e.data.startsWith("TODO") ? "Data a confirmar" : e.data}</span>
                  </div>
                ) : (
                  /* Sem foto: card tipográfico (nada de quadro vazio) */
                  <div
                    className={`flex flex-col justify-between rounded-[var(--radius-photo)] p-6 transition-colors duration-200 md:p-8 ${
                      i === 0 ? "min-h-[320px] bg-red text-white lg:min-h-[560px]" : "min-h-[220px] bg-carbon group-hover:bg-steel"
                    }`}
                  >
                    <span className={`label ${i === 0 ? "text-white" : "text-gray-300"}`}>{e.data.startsWith("TODO") ? "No Instagram" : e.data}</span>
                    <span className={`display [overflow-wrap:anywhere] ${i === 0 ? "text-[clamp(3rem,7vw,6.5rem)]" : "text-[clamp(2rem,3vw,2.75rem)]"}`}>{e.titulo}</span>
                  </div>
                )}
                <h3 className="title mt-4 text-xl group-hover:text-red-bright">{e.titulo}</h3>
                <p className="mt-1 text-sm text-gray-300">{e.resumo}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
