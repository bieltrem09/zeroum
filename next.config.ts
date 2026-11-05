import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1280, 1600, 2048, 2560],
    // 85 só para a foto do hero (qualidade máxima onde mais aparece); o resto usa 75.
    qualities: [75, 85],
  },
  poweredByHeader: false,
  // Páginas removidas (sem conteúdo útil ainda) → destino que responde a mesma dúvida.
  async redirects() {
    return [
      { source: "/professores", destination: "/sobre#equipe", permanent: false },
      { source: "/resultados", destination: "/sobre#avaliacoes", permanent: false },
      { source: "/horarios", destination: "/#horarios", permanent: false },
    ];
  },
};

export default nextConfig;
