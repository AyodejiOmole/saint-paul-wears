"use client"

import Link from "next/link"
import { useProducts } from "@/hooks/use-products"
import { ScrollAnimation } from "./scroll-animation";
import { Product } from "@/types";
import { concatenateArray } from "@/lib/utils";
import { ShoppingBag, Star } from "lucide-react";
import { Button } from "./ui/button";

export function FeaturedProducts() {
  const { data: products, isLoading, error } = useProducts(8); // Reduced for better visual impact

  const productTags = ["NEW DROP", "BESTSELLER", "LIMITED", "EXCLUSIVE"];

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="text-9xl font-black text-red-500 absolute top-10 left-10 transform -rotate-12 select-none">
          DROPS
        </div>
        <div className="text-9xl font-black text-white absolute bottom-10 right-10 transform rotate-12 select-none">
          FRESH
        </div>
      </div>

      <div className="relative z-10">
        {/* Section Header - More Aggressive */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-wider text-white">
            FEATURED <span className="text-red-500">DROPS</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            The latest fire from our collection. Limited pieces for those who understand the message.
          </p>
          <div className="mt-4 w-24 h-1 bg-red-500 mx-auto"></div>
        </div>

        {/* Products Grid - Poster Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(isLoading && (products ?? []).length === 0)
            ? Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-black rounded-lg p-6 animate-pulse">
                  <div className="h-80 bg-gray-800 rounded mb-4"></div>
                  <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                </div>
              ))
            : products?.slice(0, 8).map((product: Product, index) => (
                <ScrollAnimation key={product.id} delay={index * 100}>
                  <Link href={`/product/${product.id}`}>
                    <div className="group cursor-pointer bg-black rounded-lg overflow-hidden shadow-2xl hover:shadow-red-500/20 transition-all duration-500 transform hover:-translate-y-4 relative">
                      
                      {/* Product Tag */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3 py-1 text-xs font-black rounded ${
                          index % 4 === 0 ? 'bg-green-500 text-black' :
                          index % 4 === 1 ? 'bg-yellow-500 text-black' :
                          index % 4 === 2 ? 'bg-red-500 text-white' :
                          'bg-purple-500 text-white'
                        }`}>
                          {productTags[index % 4]}
                        </span>
                      </div>

                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={product.productImages[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                            <button className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transform hover:scale-110 transition-all">
                              <ShoppingBag className="w-5 h-5" />
                            </button>
                            {/* <button className="bg-white text-black p-3 rounded-full hover:bg-gray-200 transform hover:scale-110 transition-all">
                              <Star className="w-5 h-5" />
                            </button> */}
                          </div>
                        </div>
                      </div>

                      {/* Product Info - Poster Style */}
                      <div className="p-6 text-white">
                        <h3 className="font-black text-lg mb-2 uppercase tracking-wide group-hover:text-red-400 transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-2xl font-bold text-red-500">
                            ₦{(product.price).toLocaleString('en-NG')}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-400">4.8</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-400">
                          Available in {product.colors ? concatenateArray(product.colors) : "multiple"} colors
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            className="bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-12 py-4 text-lg font-bold tracking-wider transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/shop">VIEW ALL DROPS</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}