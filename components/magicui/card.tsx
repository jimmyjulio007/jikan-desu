"use client"

import { useTheme } from 'next-themes'
import { MagicCard } from './magic-card'


export const Card = ({post, children}: {post: string, children: React.ReactNode}) => {

    const { theme } = useTheme()

  return (
        <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="rounded-lg flex-1" key={post}>
            {children}
        </MagicCard>
  )
}
