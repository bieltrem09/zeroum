/**
 * ZERO UM CT AMERICANA — fonte única de verdade do site.
 *
 * Tudo o que aparece no site sai daqui. Para editar um texto, preço, horário
 * ou professor, mude este arquivo; não é preciso mexer nos componentes.
 *
 * Regra: nada aqui é inventado. O que ainda não foi confirmado pelo dono
 * está marcado com `todo` ou fica vazio, e o site mostra um aviso
 * "A CONFIRMAR" no lugar (ou esconde o bloco, quando indicado).
 */

export type Todo = { todo: string };
export const isTodo = (v: unknown): v is Todo =>
  typeof v === "object" && v !== null && "todo" in v;

/* ------------------------------------------------------------------ */
/* Dados oficiais (Instagram, Google e WhatsApp Business)              */
/* ------------------------------------------------------------------ */

export const zeroum = {
  nome: "Zero Um CT Americana",
  nomeCurto: "Zero Um CT",
  tipo: "Academia especializada em musculação",
  pilares: ["Estrutura", "Performance", "Experiência"] as const, // bio do Instagram
  area: "2.500 m²", // post oficial "Estrutura 2.500 m²"
  areaNumero: 2500,
  funcionamento: "24 horas", // Google e Instagram
  whatsapp: "+55 19 99620-9541",
  whatsappLink: "https://wa.me/5519996209541",
  telefone: "+5519996209541",
  instagram: "@zeroumct.americana",
  instagramLink: "https://instagram.com/zeroumct.americana",
  comunidade: "10,7 mil seguidores", // atualizar quando publicar
  agregadores: [
    { nome: "Wellhub", plano: "Silver", obs: "antigo Gympass" },
    { nome: "TotalPass", plano: "TP2", obs: "" },
  ],
  maquinas: 230, // post oficial: "230 máquinas de 10 marcas diferentes"
  marcas: 10,
  diaria: 39.9, // post oficial do Instagram (diária avulsa) — campanhas podem ter valor promocional
  diferenciais: ["Sala Recovery", "Máquina de gelo", "Funcionamento 24h", "2.500 m² de estrutura", "230 máquinas de 10 marcas"],

  endereco: {
    // Confirmado: perfil do Google + post oficial ("Rua Orlando de Santi, 220 - Campo Limpo").
    confirmado: true,
    texto: "Rua Orlando de Santi, 220 · Campo Limpo · Americana/SP · CEP 13477-000" as Todo | string,
    rua: "Rua Orlando de Santi, 220",
    bairro: "Campo Limpo",
    cidade: "Americana",
    uf: "SP",
    cep: "13477-000",
  },
  mapa: "https://maps.app.goo.gl/Kqcj3cBea41V7nj17",
  referenciaLocal: "Perto da Rodoviária de Americana", // confirmar
  descricao:
    "Academia especializada em musculação, com estrutura completa, equipamentos de qualidade e acompanhamento profissional. Para ganhar massa muscular, emagrecer ou melhorar a qualidade de vida, com segurança e dedicação.",
  slogan: "A maior academia de Americana", // usado pela própria academia no post oficial de estrutura
  sloganConfirmado: true,
  site: "https://zeroum-academia.vercel.app", // trocar pelo domínio próprio quando houver

  // ---- PREENCHER (não inventar) ----
  estacionamento: { todo: "Confirmar se há estacionamento e se é gratuito" } as Todo | string,
  avaliacaoFisica: { todo: "Dias e horários da avaliação física" } as Todo | string,
  domingosFeriados: { todo: "Confirmar se abre 24h também aos domingos e feriados" } as Todo | string,
  seguranca: { todo: "Fatos sobre segurança de madrugada: câmeras, controle de acesso, equipe" } as Todo | string,
};

/* ------------------------------------------------------------------ */
/* Navegação                                                           */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { href: "/sobre", label: "Sobre nós" },
  { href: "/estrutura", label: "Estrutura" },
  { href: "/planos", label: "Planos" },
  { href: "/contato", label: "Contato" },
] as const;

/* ------------------------------------------------------------------ */
/* Manifesto / pilares                                                 */
/* ------------------------------------------------------------------ */

export const pilares = [
  {
    nome: "Estrutura",
    dado: "2.500 m²",
    frase: "A maior academia de Americana: peso livre, máquinas, Glúteo Zone e Sala Recovery debaixo do mesmo teto.",
  },
  {
    nome: "Performance",
    dado: "230",
    frase: "Máquinas de 10 marcas diferentes. Variedade para treinar cada músculo do jeito certo.",
  },
  {
    nome: "Experiência",
    dado: "24h",
    frase: "Porta aberta todos os dias. Madrugada, antes do trabalho ou depois da faculdade: você escolhe.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Estrutura — ambiente por ambiente                                   */
/* ------------------------------------------------------------------ */

export type Ambiente = {
  id: string;
  nome: string;
  resumo: string;
  detalhe: string;
  foto: string; // slot de imagem (ver src/content/media.ts)
  confirmado: boolean; // false = só aparece depois que o dono confirmar
};

export const ambientes: Ambiente[] = [
  {
    id: "peso-livre",
    nome: "Peso livre",
    resumo: "Halteres com a marca Zero Um, barras e anilhas para treino pesado.",
    detalhe: "Área dedicada a halteres, barras e racks. TODO: listar faixa de pesos e número de racks.",
    foto: "estrutura-peso-livre",
    confirmado: true,
  },
  {
    id: "maquinas",
    nome: "Máquinas de musculação",
    resumo: "230 máquinas de 10 marcas diferentes.",
    detalhe: "São 230 máquinas de 10 marcas diferentes, para treinar cada grupo muscular com variedade. TODO: listar as marcas.",
    foto: "estrutura-maquinas",
    confirmado: true,
  },
  {
    id: "gluteo-zone",
    nome: "Glúteo Zone",
    resumo: "Área dedicada a glúteos e posteriores.",
    detalhe: "Espaço sinalizado só para treino de glúteos, com máquinas específicas e racks. TODO: listar os equipamentos da área.",
    foto: "estrutura-gluteo-zone",
    confirmado: true,
  },
  {
    id: "cardio",
    nome: "Área de cardio",
    resumo: "Esteiras e bikes para aquecer ou fechar o treino.",
    detalhe: "TODO: confirmar equipamentos de cardio (esteiras, bikes, escada, remo).",
    foto: "estrutura-cardio",
    confirmado: false,
  },
  {
    id: "recovery",
    nome: "Sala Recovery",
    resumo: "Espaço para recuperar depois do treino.",
    detalhe: "Destaque oficial do Instagram. TODO: descrever o que tem na sala (banheira de gelo, rolos, pistolas de massagem…).",
    foto: "estrutura-recovery",
    confirmado: true,
  },
  {
    id: "gelo",
    nome: "Máquina de gelo",
    resumo: "Gelo à disposição para recuperação.",
    detalhe: "Destaque oficial do Instagram. TODO: como o aluno usa (banheira, compressa…).",
    foto: "estrutura-gelo",
    confirmado: true,
  },
  {
    id: "vestiarios",
    nome: "Vestiários",
    resumo: "Vestiários feminino e masculino.",
    detalhe: "TODO: confirmar chuveiros, armários e se há fechadura/cadeado.",
    foto: "estrutura-vestiario",
    confirmado: false,
  },
  {
    id: "recepcao",
    nome: "Recepção",
    resumo: "Atendimento para matrícula e dúvidas.",
    detalhe: "TODO: horário de atendimento da recepção (a academia é 24h, a recepção pode não ser).",
    foto: "estrutura-recepcao",
    confirmado: true,
  },
  {
    id: "estacionamento",
    nome: "Estacionamento",
    resumo: "Para chegar de carro.",
    detalhe: "TODO: confirmar se existe.",
    foto: "estrutura-estacionamento",
    confirmado: false,
  },
];

/* ------------------------------------------------------------------ */
/* Horários                                                            */
/* ------------------------------------------------------------------ */

export const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;
export const diasLongos = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"] as const;

export const turnos = [
  { id: "madrugada", nome: "Madrugada", inicio: 0, fim: 6 },
  { id: "manha", nome: "Manhã", inicio: 6, fim: 12 },
  { id: "tarde", nome: "Tarde", inicio: 12, fim: 18 },
  { id: "noite", nome: "Noite", inicio: 18, fim: 24 },
] as const;

export type TurnoId = (typeof turnos)[number]["id"];

/**
 * Professor no salão por dia e turno. Formato: grade[dia][turno] = "Nome".
 * Vazio = ainda não informado (aparece "A confirmar").
 */
export const gradeProfessores: Partial<Record<(typeof dias)[number], Partial<Record<TurnoId, string>>>> = {
  // Exemplo de preenchimento:
  // Seg: { manha: "Nome", tarde: "Nome", noite: "Nome" },
};

/**
 * Mapa de calor "melhor horário pra treinar vazio".
 * 0 (vazio) a 4 (cheio), por dia e por hora (0–23). Fica oculto enquanto vazio.
 */
export const movimento: Partial<Record<(typeof dias)[number], number[]>> = {};

/* ------------------------------------------------------------------ */
/* Planos                                                              */
/* ------------------------------------------------------------------ */

export type Periodo = "mensal" | "semestral" | "anual";

export type Plano = {
  id: string;
  nome: string;
  destaque?: boolean;
  /** Preço por mês em reais, por período. null = não informado. */
  precos: Record<Periodo, number | null>;
  inclui: string[];
};

/** TODO: copiar do destaque "Planos" do Instagram. Enquanto null, o site mostra "Consultar valor". */
export const planos: Plano[] = [
  {
    id: "plano-1",
    nome: "Plano A — a confirmar",
    precos: { mensal: null, semestral: null, anual: null },
    inclui: ["Acesso 24h à musculação", "TODO: o que mais inclui"],
  },
  {
    id: "plano-2",
    nome: "Plano B — a confirmar",
    destaque: true,
    precos: { mensal: null, semestral: null, anual: null },
    inclui: ["Acesso 24h à musculação", "Sala Recovery", "TODO: o que mais inclui"],
  },
  {
    id: "plano-3",
    nome: "Plano C — a confirmar",
    precos: { mensal: null, semestral: null, anual: null },
    inclui: ["Acesso 24h à musculação", "TODO: o que mais inclui"],
  },
];

/* ------------------------------------------------------------------ */
/* Formas de treinar (tabela de planos) — só dados confirmados          */
/* ------------------------------------------------------------------ */

export type FormaDeTreinar = {
  id: string;
  nome: string;
  descricao: string;
  preco: number | null;
  /** Preço por mês no plano anual (toggle Mensal/Anual). */
  precoAnual?: number;
  notaAnual?: string;
  periodo?: string;
  precoTexto?: string;
  nota?: string;
  inclui: string[];
  botao: string;
  destaque?: boolean;
  /** Para onde o botão leva. */
  link: string;
};

/**
 * ⚠️ VALORES FICTÍCIOS (R$ 170 e R$ 149): definidos para completar o site, NÃO confirmados
 * pela academia. Trocar pelos valores reais antes de divulgar. A diária (R$ 39,90) é real.
 */
export const PRECOS_FICTICIOS = true;

export const formasDeTreinar: FormaDeTreinar[] = [
  {
    id: "diaria",
    nome: "Diária avulsa",
    descricao: "Para treinar um dia, conhecer a estrutura ou quando está de passagem por Americana.",
    preco: 39.9,
    periodo: "/dia",
    nota: "Campanhas podem ter valor promocional",
    inclui: ["Um dia de treino", "Mesma estrutura de quem é aluno"],
    botao: "Quero fazer uma diária",
    link: "whatsapp:Olá, Zero Um! Quero fazer uma diária.",
  },
  {
    id: "plano",
    nome: "Plano Zero Um",
    descricao: "No anual, o valor cai para R$ 149 por mês: economia de R$ 252 no ano.",
    preco: 170,
    precoAnual: 149,
    periodo: "/mês",
    nota: "Mensal: paga mês a mês",
    notaAnual: "Por mês, no plano de 12 meses",
    inclui: ["Musculação 24 horas, todos os dias", "230 máquinas de 10 marcas", "Professores no salão", "Sala Recovery e máquina de gelo"],
    botao: "Quero o Plano Zero Um",
    destaque: true,
    link: "whatsapp:Olá, Zero Um! Quero assinar o Plano Zero Um.",
  },
  {
    id: "apps",
    nome: "Wellhub ou TotalPass",
    descricao: "Tem o benefício pela empresa? É só fazer o check-in no app e treinar.",
    preco: null,
    precoTexto: "Pelo app",
    nota: "Wellhub a partir do Silver · TotalPass a partir do TP2",
    inclui: ["Check-in pelo app Wellhub (antigo Gympass)", "Check-in pelo app TotalPass", "Treino de musculação na Zero Um"],
    botao: "Ver a Zero Um no Wellhub",
    link: "https://wellhub.com/pt-br/search/partners/zero-um-ct-americana-nossa-senhora-de-fatima/",
  },
];

export const faqPagamento = [
  { q: "Quais formas de pagamento vocês aceitam?", a: { todo: "Pix, cartão, boleto, recorrência?" } as Todo | string },
  { q: "Tem taxa de matrícula?", a: { todo: "Valor da matrícula, se houver" } as Todo | string },
  { q: "Posso cancelar quando quiser?", a: { todo: "Regras de cancelamento e fidelidade" } as Todo | string },
  {
    q: "Uso Wellhub ou TotalPass. Preciso pagar plano?",
    a: "Não. A Zero Um aceita Wellhub (plano Silver) e TotalPass (plano TP2). É só fazer o check-in pelo app.",
  },
];

/* ------------------------------------------------------------------ */
/* Professores                                                         */
/* ------------------------------------------------------------------ */

export type Professor = {
  id: string;
  nome: string;
  especialidade: string;
  cref: string;
  turno: string;
  foto: string;
  pendente?: boolean;
};

/** TODO: nome, foto, especialidade, CREF e turno reais. Enquanto pendente, o card mostra "A confirmar". */
export const professores: Professor[] = [1, 2, 3, 4].map((n) => ({
  id: `prof-0${n}`,
  nome: `Professor(a) ${n}`,
  especialidade: ["Hipertrofia", "Emagrecimento", "Iniciantes", "Mobilidade"][n - 1],
  cref: "CREF a confirmar",
  turno: "Turno a confirmar",
  foto: `prof-0${n}`,
  pendente: true,
}));

/* ------------------------------------------------------------------ */
/* Resultados, depoimentos, eventos                                    */
/* ------------------------------------------------------------------ */

/** Só com autorização por escrito do aluno. */
export type Transformacao = { id: string; nome: string; dado: string; antes: string; depois: string };
export const transformacoes: Transformacao[] = [];

export type Conquista = { id: string; titulo: string; detalhe: string; data: string };
export const conquistas: Conquista[] = [];

/** Só avaliações reais do Google (nome + texto + nota). */
export type Depoimento = {
  id: string;
  nome: string;
  desde?: string;
  texto: string;
  nota: 1 | 2 | 3 | 4 | 5;
  /** Linha do perfil no Google (como aparece na avaliação). */
  perfil?: string;
  /** Mês da avaliação. */
  quando?: string;
};
/**
 * Avaliações públicas reais do perfil da Zero Um CT no Google (nov/2026), nota 5.
 * Textos transcritos como estão; trechos cortados pelo Google terminam em "…"; emojis removidos.
 */
export const depoimentos: Depoimento[] = [
  {
    id: "nicolly",
    perfil: "2 avaliações · 5 fotos",
    quando: "out. 2026",
    nome: "Nicolly Đianna",
    texto: "Academia top. Atendimento, agilidade no balcão, professores atenciosos, e as máquinas maravilhosas. Venham que ela mostrará por si só…",
    nota: 5,
  },
  {
    id: "ricardo",
    perfil: "Local Guide · 82 avaliações",
    quando: "out. 2026",
    nome: "Ricardo Patrício Oliveira",
    texto: "Melhor academia do interior de SP, saiu de Limeira para aproveitar essa estrutura top, professores super técnicos.",
    nota: 5,
  },
  {
    id: "michael-parra",
    perfil: "4 avaliações",
    quando: "out. 2026",
    nome: "Michael Parra",
    texto: "Estou muito satisfeito com a academia! Os professores são extremamente dedicados, atenciosos e demonstram verdadeiro compromisso em ajudar os alunos. Os aparelhos são incríveis, de uma qualidade que eu nunca tinha visto antes…",
    nota: 5,
  },
  {
    id: "rafaela",
    perfil: "7 avaliações · 6 fotos",
    quando: "out. 2026",
    nome: "Rafaela Valensuela",
    texto: "Amo a academia. Super inovadora, tecnológica, me sinto super protegida lá dentro. Ambiente completamente acolhedor e pronto para os alunos!! Recomendo muito a academia! Tudo impecável!!",
    nota: 5,
  },
  {
    id: "erick",
    perfil: "1 avaliação",
    quando: "out. 2026",
    nome: "Erick Riesterer",
    texto: "Fui muito bem recebido, tratado com muita atenção e cordialidade, além de encontrar uma estrutura excelente. Recomendo muito!",
    nota: 5,
  },
  {
    id: "vanessa",
    perfil: "Local Guide · 38 avaliações",
    quando: "out. 2026",
    nome: "Vanessa Sato",
    texto: "Uma academia simplesmente maravilhosa! Um ambiente que une qualidade, conforto e motivação, perfeito para quem busca saúde, bem-estar e superação a cada treino!",
    nota: 5,
  },
  {
    id: "nicolas",
    perfil: "1 avaliação",
    quando: "out. 2026",
    nome: "Nicolas Nogueira",
    texto: "Melhor academia que já treinei, muito equipada, só equipamento de melhor qualidade, parabéns.",
    nota: 5,
  },
  {
    id: "michael-hadlei",
    perfil: "1 avaliação",
    quando: "out. 2026",
    nome: "Michael Hadlei",
    texto: "Excelente academia, recomendo muito. Excelente atendimento das meninas da recepção, muito atenciosas, educadas e prestativas. Nota 10, melhor academia que já frequentei…",
    nota: 5,
  },
];

/** Trechos reais das avaliações do Google sobre a equipe (usados enquanto os professores não são cadastrados). */
export const falamDaEquipe = [
  { id: "ricardo", trecho: "Professores super técnicos.", nome: "Ricardo Patrício Oliveira" },
  { id: "nicolly", trecho: "Professores atenciosos.", nome: "Nicolly Đianna" },
  {
    id: "michael-parra",
    trecho: "Os professores são extremamente dedicados, atenciosos e demonstram verdadeiro compromisso em ajudar os alunos.",
    nome: "Michael Parra",
  },
];

/** Nota agregada do Google — só preencher com o dado real. */
export const avaliacaoGoogle: { nota: number; total: number } | null = { nota: 4.9, total: 181 }; // perfil do Google, nov/2026

export type Evento = { id: string; titulo: string; data: string; resumo: string; link: string; foto: string };
export const eventos: Evento[] = [
  {
    id: "halloween-2026",
    titulo: "Nightmare Halloween",
    data: "31 OUT 2026",
    resumo: "Treino temático no sábado de Halloween.",
    link: "https://instagram.com/zeroumct.americana",
    foto: "evento-halloween",
  },
  {
    id: "estrutura",
    titulo: "Estrutura 2.500 m²",
    data: "TODO: data",
    resumo: "Imagens aéreas do prédio e do salão.",
    link: "https://instagram.com/zeroumct.americana",
    foto: "estrutura-drone",
  },
  {
    id: "sorteio",
    titulo: "Sorteio Zero Um",
    data: "TODO: data",
    resumo: "Sorteio para a comunidade da academia.",
    link: "https://instagram.com/zeroumct.americana",
    foto: "evento-sorteio",
  },
  {
    id: "inauguracao",
    titulo: "Inauguração",
    data: "TODO: data",
    resumo: "A abertura da Zero Um em Americana.",
    link: "https://instagram.com/zeroumct.americana",
    foto: "evento-inauguracao",
  },
];

/* ------------------------------------------------------------------ */
/* FAQ geral                                                           */
/* ------------------------------------------------------------------ */

export const faq: { q: string; a: string | Todo }[] = [
  {
    q: "Funciona mesmo 24 horas?",
    a: "Sim. A Zero Um funciona 24 horas: dá para treinar de madrugada, antes do trabalho ou depois da faculdade.",
  },
  {
    q: "Quanto custa?",
    a: "Plano Zero Um: R$ 170 por mês no mensal ou R$ 149 por mês no anual (12 meses). Diária avulsa: R$ 39,90. Também aceitamos Wellhub (Silver+) e TotalPass (TP2+).",
  },
  { q: "Tem professor de madrugada?", a: { todo: "Confirmar se há professor no salão na madrugada" } },
  {
    q: "Aceita Wellhub e TotalPass?",
    a: "Sim. Aceitamos Wellhub (Gympass) no plano Silver e TotalPass no plano TP2.",
  },
  {
    q: "Nunca treinei. Por onde começo?",
    a: "Agende uma aula experimental pelo site ou pelo WhatsApp. Você conhece a estrutura e tira as dúvidas com a equipe antes de decidir.",
  },
  {
    q: "Onde fica?",
    a: "Rua Orlando de Santi, 220, Campo Limpo, Americana/SP. Procure o “01” vermelho na fachada preta.",
  },
  { q: "Tem estacionamento?", a: { todo: "Confirmar estacionamento" } },
  { q: "É seguro treinar de madrugada?", a: { todo: "Responder só com fatos: câmeras, controle de acesso, equipe" } },
];

/* ------------------------------------------------------------------ */
/* Formulário de aula experimental                                     */
/* ------------------------------------------------------------------ */

export const objetivos = ["Hipertrofia", "Emagrecimento", "Saúde", "Começando agora"] as const;
export const turnosPreferidos = ["Manhã", "Tarde", "Noite", "Madrugada"] as const;
