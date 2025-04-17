import { AnimeType } from '@/lib/type'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Article = ({ article }: { article: AnimeType }) => {
  const data = article?.data
  if (!data) return redirect('/')

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-sans text-4xl font-semibold text-center">{data.title}</h2>
      <p className="max-w-[800px] text-lg font-semibold font-sans">{data.synopsis}</p>
      {data.images?.jpg?.large_image_url && (
        <Image
          src={data.images.jpg.large_image_url}
          alt={`${data.title}`}
          width={800}
          height={600}
          loading='lazy'
        />
      )}
      <span className="text-center">{data.score}</span>
    </div>
  )
}

export default Article
