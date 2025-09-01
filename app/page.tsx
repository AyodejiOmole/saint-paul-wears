import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { BrandPhilosophy } from "@/components/brand-philosophy"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ScrollAnimation delay={200}>
        <FeaturedProducts />
      </ScrollAnimation>
      <ScrollAnimation delay={300}>
        <BrandPhilosophy />
      </ScrollAnimation>
      <ScrollAnimation delay={400}>
        <Footer />
      </ScrollAnimation>
    </main>
  )
}
