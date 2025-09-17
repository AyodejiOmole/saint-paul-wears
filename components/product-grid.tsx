"use client"

import { useState } from "react"
import { Eye, ShoppingBag, Heart } from "lucide-react"
import Link from "next/link"

import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { ProductQuickView } from "@/components/product-quick-view"
import { ScrollAnimation } from "@/components/scroll-animation"
import { concatenateArray } from "@/lib/utils"

interface ProductGridProps {
  isLoading: boolean
  products: Product[]
}

const productTags = ["HOT", "NEW", "FIRE", "LIMITED", "EXCLUSIVE", "TRENDING"];

export function ProductGrid({ isLoading, products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 stagger-fade-in">
        {(isLoading && products.length === 0)
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-black rounded-lg p-6 animate-pulse">
                <div className="h-80 bg-gray-800 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            ))
          : products.map((product: Product, index) => (
              <ScrollAnimation key={product.id} delay={index * 100}>
                <div className="group cursor-pointer bg-black rounded-lg overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-2 border border-gray-800 hover:border-red-500/50">
                  
                  {/* Product Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 text-xs font-black rounded-sm ${
                      index % 6 === 0 ? 'bg-red-500 text-white' :
                      index % 6 === 1 ? 'bg-green-500 text-black' :
                      index % 6 === 2 ? 'bg-yellow-500 text-black' :
                      index % 6 === 3 ? 'bg-purple-500 text-white' :
                      index % 6 === 4 ? 'bg-blue-500 text-white' :
                      'bg-orange-500 text-black'
                    }`}>
                      {productTags[index % 6]}
                    </span>
                  </div>

                  {/* Sale Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-red-600 text-white px-3 py-1 text-xs font-black rounded-sm animate-pulse">
                        SALE
                      </span>
                    </div>
                  )}

                  <Link href={`/product/${product.id}`}>
                    <div
                      className="relative"
                      onMouseEnter={() => setHoveredProduct(product.id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      {/* Product Image with Hover Effect (KEEPING THIS!) */}
                      <div className="relative overflow-hidden">
                        <img
                          src={hoveredProduct === product.id && product.productImages[1] ? product.productImages[1] : product.productImages[0]}
                          alt={product.name}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Overlay with Actions */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-3 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
                            <Button
                              size="icon"
                              className="bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 shadow-lg transform hover:scale-110 transition-all duration-300"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setSelectedProduct(product)
                              }}
                            >
                              <Eye className="h-5 w-5" />
                            </Button>
                            
                            {/* <Button
                              size="icon"
                              className="bg-white hover:bg-gray-100 text-black rounded-full w-12 h-12 shadow-lg transform hover:scale-110 transition-all duration-300"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                // Add to favorites logic here
                              }}
                            >
                              <Heart className="h-5 w-5" />
                            </Button> */}

                            {/* <Button
                              size="icon"
                              className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 shadow-lg transform hover:scale-110 transition-all duration-300"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                // Quick add to cart logic here
                              }}
                            >
                              <ShoppingBag className="h-5 w-5" />
                            </Button> */}
                          </div>
                        </div>

                        {/* Image Counter */}
                        {product.productImages.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-sm text-xs font-bold">
                            +{product.productImages.length - 1}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>

                  {/* Product Info - Redesigned */}
                  <div className="p-6 text-white">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-black text-lg mb-2 uppercase tracking-wide group-hover:text-red-400 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-red-500">
                            ₦{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through text-lg">
                              ₦{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400 font-bold">IN STOCK</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-3">
                        Available in {concatenateArray(product.colors)} colors
                      </p>
                      
                      {/* Size Options Preview */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.sizes.slice(0, 4).map((size) => (
                          <span key={size} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                            {size.toUpperCase()}
                          </span>
                        ))}
                        {product.sizes.length > 4 && (
                          <span className="text-xs text-red-400 font-bold">
                            +{product.sizes.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                          {product.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[1,2,3,4,5].map((star) => (
                              <div key={star} className={`w-3 h-3 ${star <= 4 ? 'text-yellow-500' : 'text-gray-600'}`}>
                                ★
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">(4.2)</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
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