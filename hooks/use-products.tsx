// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { fetchLimitedProducts } from "@/lib/products";
import { Product } from "@/types";

export function useProducts(limitCount: number) {
  return useQuery<Product[]>({
    queryKey: ["products", limitCount],
    queryFn: () => fetchLimitedProducts(limitCount),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
