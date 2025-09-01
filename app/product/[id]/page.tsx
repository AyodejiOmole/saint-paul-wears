import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { notFound } from "next/navigation"

// Mock product data - in a real app this would come from a database
const products = [
  {
    id: 1,
    name: "Essential Black Tee",
    price: 89,
    images: [
      "/black-premium-t-shirt-on-model.png",
      "/black-premium-t-shirt-back.png",
      "/black-premium-t-shirt-detail.png",
      "/black-premium-t-shirt-flat.png",
    ],
    category: "tops",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "The foundation of any meaningful wardrobe. Our Essential Black Tee is crafted from premium 100% organic cotton with a perfect weight that drapes beautifully while maintaining its shape. Features subtle Saint Paul branding and reinforced seams for lasting quality.",
    details: [
      "100% Organic Cotton",
      "Pre-shrunk for perfect fit",
      "Reinforced shoulder seams",
      "Subtle embroidered logo",
      "Machine washable",
      "Made in Portugal",
    ],
    care: "Machine wash cold with like colors. Tumble dry low. Do not bleach. Iron on low heat if needed.",
    sku: "SP-TEE-001",
    inStock: true,
  },
  {
    id: 2,
    name: "Signature Hoodie",
    price: 159,
    images: [
      "/black-premium-hoodie-streetwear.png",
      "/black-premium-hoodie-back.png",
      "/black-premium-hoodie-detail.png",
      "/black-premium-hoodie-flat.png",
    ],
    category: "tops",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "More than just comfort wear. Our Signature Hoodie represents the perfect balance of luxury and streetwear. Heavyweight cotton blend construction with a brushed interior for ultimate comfort. Features embroidered Saint Paul logo and kangaroo pocket.",
    details: [
      "80% Cotton, 20% Polyester blend",
      "Heavyweight 350gsm fabric",
      "Brushed fleece interior",
      "Embroidered logo detail",
      "Adjustable drawstring hood",
      "Kangaroo pocket",
      "Made in Portugal",
    ],
    care: "Machine wash cold. Tumble dry low. Do not bleach or iron directly on logo.",
    sku: "SP-HOOD-001",
    inStock: true,
  },
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ProductDetails product={product} />
        <RelatedProducts currentProductId={product.id} />
      </div>
      <Footer />
    </main>
  )
}
