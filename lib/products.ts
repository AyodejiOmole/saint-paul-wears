import { ref, query, orderByKey, startAfter, limitToFirst, get, orderByChild, equalTo } from "firebase/database"

import { db } from "./firebase"
import { Product } from "@/types"

export const fetchProducts = async (
  pageSize: number,
  lastKey?: string | null,
  searchTerm?: string,
  category?: string | null
): Promise<Product[]> => {
  const prodRef = ref(db, "products")

  let prodQuery = lastKey
    ? query(prodRef, orderByKey(), startAfter(lastKey), limitToFirst(pageSize))
    : query(prodRef, orderByKey(), limitToFirst(pageSize))

  // If filtering by category:
  if (category) prodQuery = query(prodRef, orderByChild("category"), equalTo(category), limitToFirst(pageSize))

  const snapshot = await get(prodQuery)
  if (!snapshot.exists()) return []

  let data = snapshot.val()

  let list = Object.entries(data).map(([id, val]) => ({ ...(val as any), id }))

  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(term))
  }

  return list
}

export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const productRef = ref(db, `products/${productId}`);
    const snapshot = await get(productRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: productId,
      ...snapshot.val(),
    } as Product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchLimitedProducts(limitCount: number): Promise<Product[]> {
  try {
      const productsRef = ref(db, "products"); // assumes your DB path is /products
      const limitedQuery = query(productsRef, limitToFirst(limitCount));

      const snapshot = await get(limitedQuery);

      if (!snapshot.exists()) return [];

      const data = snapshot.val();

      // Convert the object { id1: {name, price}, id2: {...} } into an array
      return Object.entries(data).map(([id, product]) => ({
        id,
        ...(product as Omit<Product, "id">),
      }));

  } catch(error) {
    console.log(error);
    return [];
  }
}

