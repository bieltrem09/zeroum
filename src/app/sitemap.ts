import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const rotas = ["", "/sobre", "/estrutura", "/planos", "/contato", "/aula-experimental", "/politica-de-privacidade"];

export default function sitemap(): MetadataRoute.Sitemap {
  return rotas.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: new Date(),
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : r === "/planos" || r === "/aula-experimental" || r === "/sobre" ? 0.9 : 0.7,
  }));
}
