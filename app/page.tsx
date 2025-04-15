/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Eye, Link2, Star, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Loader } from "./_components/loader";
import { MagicCard } from "@/components/magicui/magic-card";

export default async function Home() {

  const data = await fetch(process.env.BASE_URL + '/top/anime', {cache: 'no-store'})
  const posts = await data.json()
  console.log(posts.data)

  if (!posts) {
    return <div>no posts</div>
  }

  return (
    <>
    <h2 className="flex items-center gap-2 font-sans font-semibold text-3xl pl-10 pt-5 uppercase">Top Anime <StarIcon/></h2>
    <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 md:items-center justify-center w-full px-10 py-14 gap-10">
      <Suspense fallback={<Loader />}>
      {posts.data.map((post: any) => (
        <MagicCard className="rounded-md" key={post.mal_id}>
          <div className="flex flex-col gap-8 p-4 font-semibold font-sans" key={post.mal_id}>
        <p className="uppercase">{post.title}</p>
        <div className="flex flex-auto gap-2">
          <Image src={post.images.jpg.image_url} className="rounded-md" alt={post.title} width={100} height={100} />
          <p className="max-w-[450px] line-clamp-1">{post.synopsis}</p>
          <div className="flex flex-wrap gap-1">
          {post.themes.map((theme: any) => (
              <Button variant={'ghost'} key={theme.mal_id} className="text-sm flex-auto">{theme.name}</Button>
          ))}
          </div>
        </div>
        <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
        <Star />
        <span>{post.score}</span>
        <span>{post.broadcast.string}</span>
        </div>
        <div className="flex items-center gap-2">
        <p>{post.type}</p>
        <p>{post.episodes}</p>
        <p>{post.status}</p>
        <Button variant="ghost">
          <Link href={`/anime/${post.mal_id}`}><Eye /></Link>
        </Button>
        <Button variant={"ghost"}>
          <a href={post.trailer.url}><Link2 /></a>
        </Button>
        </div>
        </div>
        </div>
        </MagicCard>
      ))}
      </Suspense>
    </div>
    </>
  );
}
