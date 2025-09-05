"use client";

// import { GetServerSideProps } from "next";
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

// export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
//   const initial = await fetchProducts(10)
//   return { props: { initial } }
// }

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
    // initialData: {
    //   pages: [initial],
    //   pageParams: [null],
    // },
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
  console.log(data);

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
          <ShopFilters handleCategoryChange={handleCategoryChange}/>
          <ProductGrid isLoading={isLoading} products={data?.pages.flat() ?? []}/>

          {hasNextPage && !isLoading && (
            <div ref={observerRef} className="text-center col-span-full py-4">
              {isFetchingNextPage ? "Loading more..." : "Scroll to load more"}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </main>
  )
}
