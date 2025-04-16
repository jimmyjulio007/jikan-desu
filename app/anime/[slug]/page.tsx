import { LoaderContent } from "@/app/_components/loaderContent";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${(await params).slug}`, {cache: 'force-cache'});

    if(res.status === 404) {notFound()}


    const slugs = await res.json();

    console.log(slugs)
  
    if (!slugs) {
        notFound();
      }
  
    return {
      title: slugs.data.title,
    };
  }
  


export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${(await params).slug}`, {cache: 'force-cache'});

    if(!res.ok) {notFound()}

    const article = await res.json();


    if(!article) {notFound()}

    return(
        <div className="w-full flex flex-col gap-4 items-center py-10">
        <Suspense key={article.data.title} fallback={<LoaderContent />}>
        <h2 className="font-sans text-4xl font-semibold text-center">{article.data.title}</h2>
        <p className="max-w-[800px] text-lg font-semibold font-sans">{article.data.synopsis}</p>
        <Image
          src={article.data.images.jpg.large_image_url}
          alt={article.data.title}
          width={800}
          height={600}
        />
        <span>{article.data.title}</span>
        </Suspense>
        </div>
    ) 
  }