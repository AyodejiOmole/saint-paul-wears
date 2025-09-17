"use client";

import { useState, useRef, useEffect } from "react";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ShopFilters } from "@/components/shop-filters"
import { fetchProducts } from "@/lib/products";
import { Product } from "@/types";

interface HomeProps {
  initial: Product[]
}

const PAGE_SIZE = 10

export default function ShopPage({ initial }: HomeProps) {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery<Product[], Error, InfiniteData<Product[]>, [string, string | null, string | null], string | null>({
    queryKey: ["products", searchTerm, categoryFilter],
    queryFn: async ({ pageParam = null }) => {
      return await fetchProducts(PAGE_SIZE, pageParam, searchTerm, categoryFilter)
    },
    getNextPageParam: (lastPage) => lastPage.length < PAGE_SIZE ? undefined : lastPage[lastPage.length - 1].id,
    initialPageParam: null,
  })
  
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) fetchNextPage()
    })

    observer.observe(observerRef.current)

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])

  const handleCategoryChange = (newCategoryFilter: string) => {
    setCategoryFilter((prev) => prev = newCategoryFilter);
  }

  return (
    <main className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="pt-20">
        {/* Shop Header - Bold & Creative */}
        <section className="relative py-20 px-4 bg-black overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 text-red-500 text-9xl font-black transform -rotate-12 select-none">
              SHOP
            </div>
            <div className="absolute bottom-0 right-0 text-white text-9xl font-black transform rotate-12 select-none">
              ALL
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h1 className="text-6xl md:text-8xl font-black mb-8 text-white leading-none">
              <span className="block">SHOP</span>
              <span className="text-red-500 block">EVERYTHING</span>
            </h1>
            <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
              Discover our complete collection of premium pieces that embody the Saint Paul message
            </p>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <ShopFilters handleCategoryChange={handleCategoryChange}/>
          <ProductGrid isLoading={isLoading} products={data?.pages.flat() ?? []}/>

          {hasNextPage && !isLoading && (
            <div ref={observerRef} className="text-center col-span-full py-8">
              <div className="text-white text-lg font-bold">
                {isFetchingNextPage ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading more fire pieces...</span>
                  </div>
                ) : (
                  "Scroll to load more"
                )}
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  )
}