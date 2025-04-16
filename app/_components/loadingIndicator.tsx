'use client'
 
import { Spinner } from '@/components/ui/spinner'
import { useLinkStatus } from 'next/link'
 
export default function LoadingIndicator() {
  const { pending } = useLinkStatus()
  return pending ? (
    <Spinner size={'sm'} className='bg-fuchsia-600 animate-spin' />
  ) : null
}