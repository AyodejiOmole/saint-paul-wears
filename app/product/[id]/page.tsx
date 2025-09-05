import { notFound } from "next/navigation"

import { getProductById } from "@/lib/products"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
// import { RelatedProducts } from "@/components/related-products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProductDetails product={product} />
        {/* <RelatedProducts currentProductId={product.id} /> */}
      </div>
      <Footer />
    </main>
  )
}
