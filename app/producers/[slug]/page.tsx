import { LoaderContent } from "@/app/_components/loaderContent";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/producers/${(await params).slug}`, {cache: 'force-cache'});

    if(res.status === 404) {notFound()}


    const slugs = await res.json();

    console.log(slugs)
  
    if (!slugs) {
        notFound();
      }
  
    return {
      title: slugs.data.titles.map((data: { title: string; }) => data.title).join(' - '),
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
    params: Promise<{ slug: string }>
  }) {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/producers/${(await params).slug}`, {cache: 'force-cache'});

    if(!res.ok) {notFound()}

    const article = await res.json();


    if(!article) {notFound()}

    return(
        <div className="w-full text-center flex flex-col justify-center gap-4 items-center py-10">
          <Suspense key={article} fallback={<LoaderContent />}>
          <div className="space-y-10">
            <h2 className="font-sans text-4xl font-semibold uppercase">{article.data.titles.map((data: { title: string; }) => data.title).join(' - ')}</h2>
            <p className="max-w-[800px] font-semibold font-sans text-3xl">{article.data.about}</p>
            <Image src={article.data.images.jpg.image_url} alt={`${article.data.titles.map((data: { title: string; }) => data.title).join(' - ')}`} width={800} height={400} loading='lazy' />
          </div>
          </Suspense>
        </div>
    ) 
  }