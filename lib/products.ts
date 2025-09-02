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
