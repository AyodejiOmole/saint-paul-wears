import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ShopFilters } from "@/components/shop-filters"

export default function ShopPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        {/* Shop Header */}
        <section className="py-12 px-4 bg-muted">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Shop All</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our complete collection of premium pieces that embody the Saint Paul message
            </p>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-8 px-4 max-w-7xl mx-auto">
          <ShopFilters />
          <ProductGrid />
        </section>
      </div>
      <Footer />
    </main>
  )
}
