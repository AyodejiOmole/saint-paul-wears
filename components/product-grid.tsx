"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductQuickView } from "@/components/product-quick-view"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Eye } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  gender: string
  sizes: string[]
  description: string
  colors: number
}

const products: Product[] = [
  {
    id: 1,
    name: "ESSENTIAL BLACK TEE",
    price: 45000,
    images: ["/black-premium-t-shirt-on-model-streetwear.png", "/black-premium-t-shirt-on-model-streetwear.png"],
    category: "tops",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Premium cotton tee with subtle Saint Paul branding. The foundation of any meaningful wardrobe.",
    colors: 3,
  },
  {
    id: 2,
    name: "SIGNATURE HOODIE",
    price: 85000,
    images: ["/black-premium-hoodie-streetwear-fashion.png", "/black-premium-hoodie-streetwear-fashion.png"],
    category: "tops",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Heavyweight hoodie crafted for comfort and style. Features embroidered Saint Paul logo.",
    colors: 2,
  },
  {
    id: 3,
    name: "CLASSIC JOGGERS",
    price: 65000,
    images: ["/black-premium-joggers-pants-streetwear.png", "/black-premium-joggers-pants-streetwear.png"],
    category: "pants",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Tailored joggers that blur the line between comfort and sophistication.",
    colors: 4,
  },
  {
    id: 4,
    name: "STATEMENT JACKET",
    price: 150000,
    originalPrice: 200000,
    images: ["/black-premium-jacket-outerwear-streetwear.png", "/black-premium-jacket-outerwear-streetwear.png"],
    category: "outerwear",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Bold outerwear piece that makes a statement without saying a word.",
    colors: 2,
  },
  {
    id: 5,
    name: "WOMEN'S FITTED TEE",
    price: 40000,
    images: ["/black-premium-t-shirt-on-model-streetwear.png", "/black-premium-t-shirt-on-model-streetwear.png"],
    category: "tops",
    gender: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Perfectly tailored tee designed specifically for the female form.",
    colors: 3,
  },
  {
    id: 6,
    name: "MEN'S CARGO PANTS",
    price: 95000,
    images: ["/black-premium-joggers-pants-streetwear.png", "/black-premium-joggers-pants-streetwear.png"],
    category: "pants",
    gender: "men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Functional meets fashionable in these premium cargo pants.",
    colors: 2,
  },
  {
    id: 7,
    name: "OVERSIZED SWEATSHIRT",
    price: 70000,
    images: ["/black-premium-hoodie-streetwear-fashion.png", "/black-premium-hoodie-streetwear-fashion.png"],
    category: "tops",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Relaxed fit sweatshirt with a contemporary edge.",
    colors: 3,
  },
  {
    id: 8,
    name: "WOMEN'S HIGH-WAIST LEGGINGS",
    price: 50000,
    images: ["/black-premium-joggers-pants-streetwear.png", "/black-premium-joggers-pants-streetwear.png"],
    category: "pants",
    gender: "women",
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "High-performance leggings that transition from gym to street.",
    colors: 2,
  },
]

interface ProductGridProps {
  category?: string
}

export function ProductGrid({ category }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const filteredProducts = products.filter((product) => {
    if (!category || category === "all") return true
    if (category === "men" || category === "women") return product.gender === category || product.gender === "unisex"
    return product.category === category
  })

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 stagger-fade-in">
        {filteredProducts.map((product, index) => (
          <ScrollAnimation key={product.id} delay={index * 100}>
            <Link href={`/product/${product.id}`}>
              <div
                className="group cursor-pointer bg-white p-2 md:p-3"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative overflow-hidden mb-3">
                  <img
                    src={hoveredProduct === product.id && product.images[1] ? product.images[1] : product.images[0]}
                    alt={product.name}
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white text-black hover:scale-110 transition-transform duration-200"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setSelectedProduct(product)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Sale badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-semibold">
                      SALE
                    </div>
                  )}
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-bold text-sm md:text-base text-black uppercase tracking-wide">{product.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm md:text-base font-normal text-black">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-xs md:text-sm">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-gray-500">Available in {product.colors} colors</p>
                </div>
              </div>
            </Link>
          </ScrollAnimation>
        ))}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
