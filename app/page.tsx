import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { BrandPhilosophy } from "@/components/brand-philosophy"
import { Footer } from "@/components/footer"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Navigation } from "@/components/navigation"

import { fetchBanners } from "@/lib/banners"
import { Banner } from "@/types"

export default async function HomePage() {
  const result: Promise<Banner[]> = fetchBanners();
  const banners = await result;
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection banners={banners} />
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
