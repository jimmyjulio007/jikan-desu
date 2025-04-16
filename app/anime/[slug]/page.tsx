import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
    params: {
      slug: string
    }
}


export async function generateMetadata({ params: { slug } }: Props) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${slug}`, {cache: 'force-cache'});

    if(!res.ok) {notFound()}


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
    params: { slug: string }; 
  }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/anime/${params.slug}`, {cache: 'force-cache'});
  
    if (!res.ok) notFound();
  
    const article = await res.json();
  
    if (!article) notFound();
  
    return (
      <div className="w-full flex flex-col gap-4 items-center py-10">
        <h2 className="font-sans text-4xl font-semibold text-center">{article.data.title}</h2>
        <p className="max-w-[800px] text-lg font-semibold font-sans">{article.data.synopsis}</p>
        <Image
          src={article.data.images.jpg.large_image_url}
          alt={article.data.title}
          width={800}
          height={600}
        />
        <span>{article.data.title}</span>
      </div>
    );
  }
  