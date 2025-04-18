import { LoaderContent } from "@/app/_components/loaderContent";
import { getTopAnimeById } from "@/lib/action";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const Article = dynamic(() => import("@/app/_components/article"), {
  loading: () => <LoaderContent />,
});


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: number }>
}) {
    const slugs = await getTopAnimeById((params))
  
    return {
      title: slugs.title,
    };
  }
  

  // export async function generateStaticParams() {
    
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/top/anime`, { cache: 'force-cache' });

  //   if(res.status === 404) {notFound()}

  //   const anime = await res.json();

  //   if (!anime) {
  //       notFound();
  //     }
   
  //   return anime.data.map((data: { title: string; }) => ({
  //     slug: data.title,
  //   }))
  // }


export default async function Page({
    params,
  }: {
    params: Promise<{ slug: number }>
  }) {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${(await params).slug}`, {cache: 'force-cache'});

    if(!res.ok) {notFound()}

    const animeContent = await res.json();


    if(!animeContent) {notFound()}

    return(
        <div className="w-full flex flex-col gap-4 items-center py-10">
          <Suspense key={animeContent} fallback={<LoaderContent />}>
          <Article article={animeContent} />
          </Suspense>
        </div>
    ) 
  }