import { AboutHero } from '@/components/about/AboutHero'
import { AboutIntro } from '@/components/about/AboutIntro'
import { AboutMissionVision } from '@/components/about/AboutMissionVision'
import { AboutWhatWeDo } from '@/components/about/AboutWhatWeDo'
import { AboutValues } from '@/components/about/AboutValues'
import { AboutCta } from '@/components/about/AboutCta'

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutIntro />
      <AboutMissionVision />
      <AboutWhatWeDo />
      <AboutValues />
      <AboutCta />
    </main>
  )
}
