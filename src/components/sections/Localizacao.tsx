import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { zeroum } from "@/content/zeroum";
import { WA_GERAL } from "@/lib/whatsapp";
import { SectionLabel } from "@/components/ui/SectionHead";
import { Media } from "@/components/ui/Media";
import { Logo } from "@/components/brand/Logo";

/** Mapa real do Google (sem chave de API): o próprio Google localiza a academia pelo nome. */
const BUSCA = "Zero Um CT Americana, Rua Orlando de Santi 220, Campo Limpo, Americana - SP";
const EMBED = `https://www.google.com/maps?q=${encodeURIComponent(BUSCA)}&z=16&hl=pt-BR&output=embed`;

/**
 * LOCALIZAÇÃO — mapa real com a cara da Zero Um:
 * Google Maps embutido (carrega só perto da tela: loading="lazy"), tingido de preto e vermelho
 * por filtro CSS, com vinheta, pulso vermelho no ponto da academia e um card da unidade.
 */
export function Localizacao({ label = "12" }: { label?: string }) {
  const e = zeroum.endereco;
  return (
    <section aria-labelledby="loc-title" className="relative z-10 bg-black py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel n={label}>Localização</SectionLabel>
            <h2 id="loc-title" className="display mt-4 text-section">
              Americana,
              <br />
              <span className="text-red">SP.</span>
            </h2>
          </div>
          <p className="max-w-md text-gray-300 md:col-span-5 md:justify-self-end">
            No Campo Limpo, perto da Rodoviária de Americana. Procure o “01” vermelho na fachada preta: tem estacionamento em frente ao prédio.
          </p>
        </div>

        <div className="mt-12 lg:relative">
          {/* Mapa */}
          <div className="map-zeroum relative h-[420px] overflow-hidden rounded-[var(--radius-photo)] border border-white/10 bg-carbon md:h-[600px]">
            <iframe
              src={EMBED}
              title={`Mapa: ${zeroum.nome}, ${e.rua}, ${e.bairro}, ${e.cidade}/${e.uf}`}
              className="map-zeroum-frame absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* tinta da marca + vinheta (não bloqueiam o mapa) */}
            <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_140px_40px_rgb(11_11_11/0.85)]" aria-hidden="true" />

            {/* pulso no ponto da academia (o Google centraliza o mapa no local) */}
            <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
              <span className="map-pulse absolute left-0 top-0 size-28 rounded-full border-2 border-red-bright bg-red/10" />
              <span className="map-pulse map-pulse-2 absolute left-0 top-0 size-28 rounded-full border-2 border-red-bright bg-red/10" />
            </div>

            <a
              href={zeroum.mapa}
              target="_blank"
              rel="noopener noreferrer"
              className="pill absolute right-4 top-4 min-h-10 bg-black/80 px-4 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black"
            >
              Abrir no Google Maps <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Card da unidade: abaixo do mapa no celular, flutuando sobre ele no desktop */}
          <article
            aria-label="Unidade Zero Um CT Americana"
            className="relative mt-3 overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-black/90 backdrop-blur-md lg:absolute lg:bottom-6 lg:left-6 lg:mt-0 lg:w-[380px]"
          >
            <Media slot="fachada" keepRatio={false} rounded={false} className="h-40 w-full" sizes="380px" />
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <Logo className="h-6 w-auto" />
                <span className="label inline-flex items-center gap-2 text-white">
                  <span className="pulse-dot" aria-hidden="true" />
                  Aberta 24h
                </span>
              </div>
              <address className="mt-5 not-italic">
                <p className="flex gap-2 font-semibold">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-red-bright" aria-hidden="true" />
                  {e.rua}
                </p>
                <p className="ml-[26px] text-sm text-gray-300">
                  {e.bairro} · {e.cidade}/{e.uf} · CEP {e.cep}
                </p>
              </address>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Destaques da unidade">
                {["2.500 m²", "230 máquinas", "Wellhub · TotalPass"].map((t) => (
                  <li key={t} className="pill min-h-7 border border-white/15 px-3 text-xs text-white/90">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <a href={zeroum.mapa} target="_blank" rel="noopener noreferrer" className="btn btn-red justify-center !px-3">
                  <Navigation size={16} aria-hidden="true" /> Traçar rota
                </a>
                <a href={WA_GERAL} target="_blank" rel="noopener noreferrer" className="btn btn-outline justify-center !px-3">
                  WhatsApp
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
