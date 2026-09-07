import { Hero } from '../components/Hero/Hero'
import { CategorySection } from '../components/CategorySection/CategorySection'
import { FeaturedVehicles } from '../components/FeaturedVehicles/FeaturedVehicles'
import { StorySection } from '../components/StorySection/StorySection'
import { AboutSection } from '../components/AboutSection/AboutSection'
import { FAQ } from '../components/FAQ/FAQ'

export function Home() {
  return (
    <main>
      <Hero />
      <CategorySection />
      <FeaturedVehicles />
      <StorySection />
      <AboutSection />
      <FAQ />
    </main>
  )
}
