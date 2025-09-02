"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import Link from "next/link"

import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { ProductQuickView } from "@/components/product-quick-view"
import { ScrollAnimation } from "@/components/scroll-animation"

interface ProductGridProps {
  isLoading: boolean
  // initial?: Product[]
  products: Product[]
}

export function ProductGrid({ isLoading, products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 stagger-fade-in">
        {(isLoading && products.length === 0) // Show skeletons only if initial loading and no products yet
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="border p-4 rounded animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          : products.map((product: Product, index) => (
              <ScrollAnimation key={product.id} delay={index * 100}>
                <Link href={`/product/${product.id}`}>
                  <div
                    className="group cursor-pointer bg-white p-2 md:p-3"
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <div className="relative overflow-hidden mb-3">
                      <img
                        src={hoveredProduct === product.id && product.productImages[1] ? product.productImages[1] : product.productImages[0]}
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

          {/* {products.map((product, index) => (
            <ScrollAnimation key={product.id} delay={index * 100}>
              <Link href={`/product/${product.id}`}>
                <div
                  className="group cursor-pointer bg-white p-2 md:p-3"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative overflow-hidden mb-3">
                    <img
                      src={hoveredProduct === product.id && product.productImages[1] ? product.productImages[1] : product.productImages[0]}
                      alt={product.name}
                      className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    Overlay with actions
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

                    Sale badge
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
          ))} */}
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
