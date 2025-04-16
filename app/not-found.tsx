"use client"

import Link from 'next/link'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@/components/ui/button';
import LoadingIndicator from './_components/loadingIndicator';
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <DotLottieReact
      className='md:h-[800px]'
      src="/animations/404.lottie"
      loop
      autoplay
    />
    <Button variant={"outline"} className='mt-4'>
      <Link href="/" className='inline-flex items-center font-semibold font-sans uppercase gapt-4'>Accueil <LoadingIndicator /></Link>
    </Button>
    </div>
  )
}