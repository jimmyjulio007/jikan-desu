/* eslint-disable @typescript-eslint/no-explicit-any */
// app/sitemap.xml/route.ts
import type { MetadataRoute } from "next";

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jikan-desu.vercel.app";

  // Exemple : récupération d'une liste dynamique
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${id}`, { cache: "force-cache" });

  if (!res.ok) {
    // Erreur => retourne un sitemap vide
    return [];
  }

  const animes = await res.json();

  return [
    {
      url: `${baseUrl}/anime`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...animes,
  ];
}
