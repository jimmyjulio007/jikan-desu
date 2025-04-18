import { notFound } from "next/navigation";

export async function getAnime() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime?status=upcoming`, {
      cache: "force-cache",
    });
    const json = await res.json();
    return json.data || [];
  }


  export async function getUpcomingAnime() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seasons/upcoming`, {
      cache: "force-cache",
    });
    const json = await res.json();
    return json.data || [];
  }

  export async function getGenreAnime() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/genres/anime`, {
      cache: "force-cache",
    });
    const json = await res.json();
    return json.data || [];
  }

  

  export async function getSeasonNowAnime() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seasons/now`, {
      cache: "force-cache",
    });
    const json = await res.json();
    return json.data || [];
  }

  export async function getSchedule() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/schedules`, {
      cache: "force-cache",
    });
    const json = await res.json();
    return json.data || [];
  }

  export async function getTopAnime() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/top/anime`, {
      cache: "force-cache",
    });
    const json = await res.json();
    return json.data || [];
  }

export async function getTopAnimeById(params: Promise<{ slug: number }>) {
  const { slug } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${slug}`, {
    cache: "force-cache",
  });
  const json = await res.json();
  if (!json) {
    notFound();
  }
  return json.data || [];
}
