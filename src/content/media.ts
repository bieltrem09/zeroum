/**
 * Slots de imagem do site.
 *
 * Para trocar um placeholder por uma foto real:
 * 1. coloque o arquivo em public/photos/ (ex.: public/photos/hero-bg.jpg — de preferência ≥ 2048px de largura);
 * 2. preencha `src` do slot abaixo com "/photos/hero-bg.jpg".
 * O next/image gera AVIF/WebP e os tamanhos responsivos sozinho.
 *
 * Os prompts para gerar/fotografar cada slot estão em IMAGE_PROMPTS.md.
 */
export type Slot = {
  src?: string;
  alt: string;
  /** largura / altura */
  ratio: number;
  label: string;
  /** object-position do recorte (ex.: "50% 30%"): o que não pode ser cortado. */
  position?: string;
};

const r = (w: number, h: number) => w / h;

export const media: Record<string, Slot> = {
  "hero-bg": { src: "/photos/hero-bg.jpg", position: "50% 55%", ratio: r(16, 9), label: "hero-bg · 16:9", alt: "Salão da Zero Um CT com máquinas vermelhas de peso livre e linhas de LED branco no teto" },
  "hero-athlete-f": { ratio: r(4, 5), label: "hero-athlete-f · recorte 4:5", alt: "Aluna no fundo de um agachamento livre com barra" },
  "hero-athlete-m": { ratio: r(4, 5), label: "hero-athlete-m · recorte 4:5", alt: "Aluno executando levantamento terra" },
  "estrutura-drone": { src: "/photos/estrutura-drone.jpg", position: "50% 62%", ratio: r(21, 9), label: "estrutura-drone · 21:9", alt: "Vista aérea da fachada da Zero Um CT em Americana ao entardecer, com o estacionamento em frente" },
  "estrutura-peso-livre": { src: "/photos/estrutura-peso-livre.jpg", position: "50% 50%", ratio: r(3, 4), label: "peso-livre · 3:4", alt: "Halteres sextavados com a marca Zero Um CT em fileira na área de peso livre" },
  "estrutura-maquinas": { src: "/photos/estrutura-maquinas.jpg", position: "50% 60%", ratio: r(4, 5), label: "maquinas · 4:5", alt: "Leg press inclinado vermelho e preto na área de máquinas" },
  "estrutura-cardio": { ratio: r(1, 1), label: "cardio · 1:1", alt: "Esteiras da área de cardio" },
  "estrutura-recovery": { ratio: r(4, 5), label: "recovery · 4:5", alt: "Sala Recovery da Zero Um CT" },
  "estrutura-gelo": { ratio: r(1, 1), label: "gelo · 1:1", alt: "Máquina de gelo da academia" },
  "estrutura-vestiario": { ratio: r(3, 4), label: "vestiario · 3:4", alt: "Vestiário da academia" },
  "estrutura-gluteo-zone": { src: "/photos/estrutura-gluteo-zone.jpg", position: "50% 55%", ratio: r(4, 5), label: "gluteo-zone · 4:5", alt: "Área Glúteo Zone com máquinas cinza e racks vermelhos" },
  fachada: { src: "/photos/fachada.jpg", position: "50% 45%", ratio: r(4, 5), label: "fachada · 4:5", alt: "Fachada da Zero Um CT com o letreiro 01 Centro de Treinamento e o estacionamento" },
  "fachada-dia": { src: "/photos/fachada-dia.jpg", position: "50% 60%", ratio: r(3, 4), label: "fachada · 3:4", alt: "Fachada da Zero Um CT 24 horas vista do estacionamento" },
  "estrutura-recepcao": { src: "/photos/estrutura-recepcao.jpg", position: "50% 55%", ratio: r(4, 5), label: "recepcao · 4:5", alt: "Recepção da Zero Um CT com balcão preto e vermelho e logo na parede" },
  "estrutura-estacionamento": { ratio: r(1, 1), label: "estacionamento · 1:1", alt: "Estacionamento da academia" },
  "prof-01": { ratio: r(3, 4), label: "prof-01 · 3:4", alt: "Retrato de professor(a) da Zero Um CT" },
  "prof-02": { ratio: r(3, 4), label: "prof-02 · 3:4", alt: "Retrato de professor(a) da Zero Um CT" },
  "prof-03": { ratio: r(3, 4), label: "prof-03 · 3:4", alt: "Retrato de professor(a) da Zero Um CT" },
  "prof-04": { ratio: r(3, 4), label: "prof-04 · 3:4", alt: "Retrato de professor(a) da Zero Um CT" },
  resultados: { src: "/photos/resultados.jpg", position: "50% 55%", ratio: r(16, 9), label: "resultados · 16:9", alt: "Racks de halteres e máquinas vermelhas no salão da academia" },
  madrugada: { src: "/photos/madrugada.jpg", position: "50% 60%", ratio: r(16, 9), label: "madrugada · 16:9", alt: "Salão amplo da academia com máquinas de glúteo vermelhas e teto iluminado" },
  cta: { src: "/photos/cta.jpg", position: "50% 60%", ratio: r(16, 9), label: "cta · 16:9", alt: "Letreiro Zero Um CT na parede do salão, com máquinas e teto de LED" },
  footer: { src: "/photos/footer.jpg", position: "50% 20%", ratio: r(21, 9), label: "footer · 21:9", alt: "Teto com linhas de LED vermelho sobre fileiras de máquinas" },
  "evento-halloween": { ratio: r(4, 5), label: "evento · halloween", alt: "Arte do evento Nightmare Halloween da Zero Um CT" },
  "evento-sorteio": { ratio: r(4, 5), label: "evento · sorteio", alt: "Arte do sorteio da Zero Um CT" },
  "evento-inauguracao": { ratio: r(4, 5), label: "evento · inauguração", alt: "Inauguração da Zero Um CT" },
  antes: { ratio: r(4, 5), label: "antes · 4:5", alt: "Foto de antes de aluno(a) — com autorização" },
  depois: { ratio: r(4, 5), label: "depois · 4:5", alt: "Foto de depois de aluno(a) — com autorização" },
};
