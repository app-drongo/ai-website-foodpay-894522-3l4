import type { Metadata } from 'next'

import Hero from '@/components/sections/home/Hero'
import Features from '@/components/sections/home/Features'
import Pricing from '@/components/sections/home/Pricing'
import About from '@/components/sections/home/About'
import Reviews from '@/components/sections/home/Reviews'
import Contact from '@/components/sections/home/Contact'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Home',
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <Pricing />
      <About />
      <Reviews />
      <Contact />
    </main>
  )
}
