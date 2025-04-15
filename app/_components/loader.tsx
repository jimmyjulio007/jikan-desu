import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const Loader = () => {
  return (
    <>
            {Array.from({ length: 9 }).map((_, i) => (
            <div className='flex flex-col gap-4' key={i}>
                <Skeleton className="h-8 w-[200px]" />
                <div className='flex items-center gap-2'>
                <Skeleton className="h-60 w-[200px]" />
                <Skeleton className="h-60 w-[400px]" />
                </div>
                <div className='flex justify-between items-center'>
                <Skeleton className="h-8 w-[100px]" />
                <Skeleton className="h-8 w-[80px]" />
                </div>
            </div>
        ))}
    </>
  )
}
