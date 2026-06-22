import { HomeHero } from '@/components/home/HomeHero'
import { HomePresentation } from '@/components/home/HomePresentation'
import { HomeAxes } from '@/components/home/HomeAxes'
import { HomePresence } from '@/components/home/HomePresence'
import { HomeCta } from '@/components/home/HomeCta'

export default function Home() {
  return (
    <main className='min-h-screen'>
      <HomeHero />
      <HomePresentation />
      <HomeAxes />
      <HomePresence />
      <HomeCta />
    </main>
  )
}
