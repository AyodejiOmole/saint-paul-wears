"use client"

import Link from "next/link"

import { useProducts } from "@/hooks/use-products"
import { ScrollAnimation } from "./scroll-animation";
import { Product } from "@/types";
import { concatenateArray } from "@/lib/utils";

export function FeaturedProducts() {
  const { data: products, isLoading, error } = useProducts(10);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-[13px] font-bold mb-4">Featured Collection</h2>
        <p className="text-muted-foreground text-[11px] max-w-2xl mx-auto">
          Discover our carefully curated selection of premium pieces that embody the Saint Paul aesthetic
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {(isLoading && (products ?? []).length === 0) // Show skeletons only if initial loading and no products yet
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="border p-4 rounded animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))
          : products?.map((product: Product, index) => (
              <ScrollAnimation key={product.id} delay={index * 100}>
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group cursor-pointer bg-white p-2 md:p-3">
                    <div className="relative overflow-hidden mb-3">
                      <img
                        src={product.productImages[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-center space-y-1">
                      <h3 className="font-bold text-[13px] text-black uppercase tracking-wide">{product.name}</h3>
                      <p className="text-[11px] font-normal text-black">₦{(product.price).toLocaleString('en-NG')}</p>
                      <p className="text-[10px] text-gray-500">Available in {product.colors ? concatenateArray(product.colors) : "many"} colors</p>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
      </div>
    </section>
  )
}
