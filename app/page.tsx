/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx (ou une autre route Server Component)
import { Button } from "@/components/ui/button";
import { Eye, Link2, Star, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { HyperText } from "@/components/magicui/hyper-text";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Suspense } from "react";
import { Loader } from "./_components/loader";
import { getAnime, getGenreAnime } from "@/lib/action";
import { Card } from "@/components/magicui/card";

const ITEMS_PER_PAGE = 9;

type Genre = {
  mal_id: number;
  name: string;
};


export default async function Home({ searchParams }: { searchParams:  Promise<{ page: string, genre: string }> }) {

  
  const posts = await getAnime();
  const pageParam = (await searchParams)?.page || "1";

  const genre = await getGenreAnime();

  console.log(genre);

  const genreParam = (await searchParams)?.genre || "";
  const currentPage = Number(pageParam);


  const filteredPosts = posts.filter((post: any) => {
    const matchesGenre = genreParam 
      ? post.genres.some((g: any) => g.name.toLowerCase() === genreParam.toLowerCase())
      : true;

    return matchesGenre;
  });




  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const currentItems = filteredPosts.slice(start, end);


  
  return (
    <>
      
      <p className="text-center text-3xl font-sans font-semibold pt-10">Category</p>
      <div className="flex flex-wrap items-center justify-center w-full px-10 py-5">
        {genre.slice(0, 10).map((genre: Genre) => (
          <Badge variant={"secondary"} key={genre.mal_id} className="m-2  text-sm font-sans">
            <Link  href={`/?genre=${genre.name}`} prefetch>{genre.name}</Link>
          </Badge>
        ))}
        <Button variant={"outline"} size={"sm"}>Voir plus</Button>
      </div>
      <h2 className="flex items-center gap-2 font-sans font-semibold text-3xl pl-10 pt-5 uppercase">
        <HyperText>Your Anime</HyperText> <StarIcon />
      </h2>
      <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 md:items-center justify-center w-full px-10 py-14 gap-10"> 
        <Suspense fallback={<Loader />}>
        {currentItems.map((post: any) => (
          <Card post={post.mal_id} key={post.mal_id}>
            <div className="flex shrink flex-col gap-8 p-4 font-semibold font-sans max-h-[400px] md:max-h-[310px]">
              <p className="max-sm:text-sm uppercase">{post.title}</p>
              <div className="flex flex-auto gap-2">
                <Image
                  src={post.images.jpg.image_url}
                  className="rounded-md"
                  alt={post.title}
                  width={100}
                  height={100}
                />
                {post.synopsis && <p className="max-w-[400px] max-sm:text-xs">{post.synopsis.slice(0,100)}</p>}
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
                  {post.broadcast.string && (
                    <Badge className="max-sm:text-xs" variant={"secondary"}>
                      {post.broadcast.string}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 max-sm:pb-5">
                  <p>{post.type}</p>
                  <Badge variant={"outline"}>{post.episodes}</Badge>
                  <Badge variant={"destructive"}>{post.status}</Badge>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/anime/${post.mal_id}`}>
                          <Button size={"sm"} variant="outline">
                            <Eye />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={5} align="end">
                        <Badge variant={"secondary"}>Read more</Badge>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {post.trailer.url &&

                  <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`${post.trailer.url}`}>
                        <Button size={"sm"} variant="outline">
                          <Link2 />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={5} align="end">
                      <Badge variant={"secondary"}>more</Badge>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                }
                </div>
              </div>
            </div>
            </Card>
        ))}
        </Suspense>
      </div>

      <div className="flex justify-center items-center gap-4 pb-10">
        {totalPages > 1 && (
          <Pagination>
          <PaginationContent className="space-x-4">
            {currentPage > 1 && (
              <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                href={`/?page=${Math.max(currentPage - 1, 1)}${genreParam ? `&genre=${genreParam}` : ''}`}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            )}
            <PaginationItem className="cursor-pointer space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationLink
                  key={i}
                  href={`/?page=${i + 1}${genreParam ? `&genre=${genreParam}` : ''}`}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              ))}
            </PaginationItem>
            {currentPage < totalPages && (
              <PaginationItem className="cursor-pointer">
              <PaginationNext
                href={`/?page=${Math.min(currentPage + 1, totalPages)}${genreParam ? `&genre=${genreParam}` : ''}`}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
        )}
        
      </div>
    </>
  );
}
