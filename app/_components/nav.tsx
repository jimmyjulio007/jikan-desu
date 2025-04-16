"use client"

import { Toggle } from '@/components/toggle'
import { Button } from '@/components/ui/button'
import { MenuSquareIcon, X } from 'lucide-react'
import { AnimatePresence,motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import LoadingIndicator from './loadingIndicator'
import { Nav } from '@/lib/constant'


const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

export const NavBar = () => {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='flex justify-between m-auto px-10 py-4'>
        <p className='text-2xl font-sans font-semibold bg-gradient-to-r from-fuchsia-500 to-cyan-600 bg-clip-text text-transparent'>Jikan Desu</p>
        <ul className='max-md:hidden flex items-center gap-4 font-sans font-semibold text-lg uppercase'>
        {Nav.map((item, index) => (
  <Link
    key={index}
    href={item.link}
    prefetch={false}
    className={`flex items-center gap-2  ${
      path === item.link ? "text-fuchsia-500" : ""
    }`}
  >
    {item.name}
    <LoadingIndicator />
  </Link>
))}

        </ul>
        <Toggle class='max-sm:hidden' />
        <div className='flex flex-col items-end min-sm:hidden'>
        {isOpen ? <Button onClick={() => setIsOpen(!isOpen)} className='min-sm:hidden' variant={'ghost'}><X /></Button> : <Button onClick={() => setIsOpen(!isOpen)} className='min-sm:hidden' variant={'ghost'}><MenuSquareIcon /></Button> }
        <AnimatePresence initial={false}>
        {isOpen && (
            Nav.map((Item, id) => (
                <motion.div className='md:hidden w-full flex flex-col gap-2  px-6 py-4' animate="visible" initial="hidden" exit="exit" variants={menuVariants} key={id}>
                    <Link href={Item.link} className={path === Item.link ? "font-mono text-fuchsia-500 " : "font-sans font-semibold uppercase"}>
                    <motion.span
                     initial={{ opacity: 0, scale: 0 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0 }}>
                        {Item.name}
                        <LoadingIndicator />
                        </motion.span>
                    </Link>
                </motion.div>
                
            ))
        )}
        </AnimatePresence>
        </div>
        
        
    </nav>
  )
}
