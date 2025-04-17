export async function getData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/top/anime`, {
      cache: "force-cache",
    });
    const json = await res.json();
    return json.data || [];
  }