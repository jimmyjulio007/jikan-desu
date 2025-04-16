import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const LoaderContent = () => {
  return (
    <div className='flex flex-col gap-4 items-center'>
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-70 w-[800px] rounded-md" />
        <Skeleton className="h-[600px] w-[800px]" />
    </div>
  )
}
