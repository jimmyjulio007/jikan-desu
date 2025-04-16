/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Link2, Star, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MagicCard } from "@/components/magicui/magic-card";
import { Badge } from "@/components/ui/badge";
import { HyperText } from "@/components/magicui/hyper-text";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Loader } from "./_components/loader";


const ITEMS_PER_PAGE = 9;

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/top/anime', {cache: 'no-store'})
      const json = await data.json();
      setPosts(json.data || []);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentItems = posts.slice(start, end);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const changePage = (page: number) => setCurrentPage(page);

  return (
    <>
      <h2 className="flex items-center gap-2 font-sans font-semibold text-3xl pl-10 pt-5 uppercase">
        <HyperText>Top Anime</HyperText> <StarIcon />
      </h2>

      <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 md:items-center justify-center w-full px-10 py-14 gap-10">
      <Suspense fallback={<Loader />}>
        {currentItems.map((post: any) => (
          <MagicCard className="rounded-lg" key={post.mal_id}>
            <div className="flex shrink flex-col gap-8 p-4 font-semibold font-sans max-h-[400px] md:max-h-[310px]">
              <p className="max-sm:text-sm uppercase">{post.title}</p>
              <div className="flex flex-auto gap-2">
                <Image
                  src={post.images.jpg.image_url}
                  className="rounded-md"
                  alt={post.title}
                  width={100}
                  height={100}
                  loading="lazy"
                />
                <p className="max-w-[400px] max-sm:text-xs line-clamp-1">{post.synopsis}</p>
                <div className="flex flex-wrap gap-1">
                  {post.themes.map((theme: any) => (
                    <Button variant={"ghost"} key={theme.mal_id} className="text-sm flex-auto">
                      {theme.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between ">
                <div className="flex items-center gap-2">
                  <Star />
                  <span>{post.score}</span>
                  {post.broadcast.string && <Badge className="max-sm:text-xs" variant={"secondary"}>{post.broadcast.string}</Badge>}
                </div>
                <div className="flex items-center gap-2 max-sm:pb-5">
                  <p>{post.type}</p>
                  <Badge variant={"outline"}>{post.episodes}</Badge>
                  <Badge>{post.status}</Badge>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                      <Link href={`/anime/${post.mal_id}`}>
                        <Button size={'sm'} variant="outline">
                          <Eye />
                        </Button></Link>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={5} align="end">
                        <Badge variant={'secondary'}>Read more</Badge>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant={"ghost"}>
                          <a href={post.trailer.url} target="_blank"><Link2 /></a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={5} align="end">
                        <Badge variant={'destructive'}>let&apos;s see the trailer</Badge>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </MagicCard>
        ))}
        </Suspense>
      </div>

      <div className="flex justify-center items-center gap-4 pb-10">
        <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer" aria-disabled={currentPage === 1}>
          <PaginationPrevious onClick={prevPage} aria-disabled={currentPage === 1} />
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationLink key={i} onClick={() => changePage(i + 1)} isActive={currentPage === i + 1}>{i + 1}</PaginationLink>
        ))}
        </PaginationItem>
        <PaginationItem className="cursor-pointer">
          <PaginationNext onClick={nextPage} aria-disabled={currentPage === totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
      </div>
    </>
  );
}
