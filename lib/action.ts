import { notFound } from "next/navigation";

export async function getAnime() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime`, {
      cache: "force-cache",
    });
    const json = await res.json();
    return json.data || [];
  }


  export async function getAnimeByStatus({ params }: { params:  string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/?status=${params}`, {
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

export async function getAnimeById(params: Promise<{ slug: number }>) {
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





export async function getManga() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/manga`, {
    cache: "force-cache",
  });
  const json = await res.json();
  return json.data || [];
}


export async function getGenreManga() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/genres/manga`, {
    cache: "force-cache",
  });
  const json = await res.json();
  return json.data || [];
}


export async function getProducer() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/producers`, {
    cache: "force-cache",
  });
  const json = await res.json();
  return json.data || [];
}