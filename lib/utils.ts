import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { rtdb } from "./firebaseAdmin";
import { Order } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple concatenation with capitalization
export const concatenateArray = (arr: string[]): string => {
  return arr
    .map(str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
    .join(', ');
};

export async function validateInventory(order: Order): Promise<{ ok: boolean, failures: string[] }> {
  // aggregate qty per product+variant (to catch duplicates in same order)
  const sums = new Map<string, number>();
  for (const it of order.items) {
    const key = `${it.id}`;
    sums.set(key, (sums.get(key) || 0) + it.quantity);
  }

  const failures: string[] = [];
  for (const [key, qty] of sums) {
    // const [productId, variantId] = key.split('::');
    const snap = await rtdb.ref(`products/${key}/stock`).get();
    const stock = snap.exists() ? Number(snap.val()) : 0;
    if (stock < qty) {
      const productSnap = await rtdb.ref(`products/${key}`).get();
      const product = productSnap.val();
      failures.push(`${product.name} only ${stock} left`);
    }
  }
  return { ok: failures.length === 0, failures };
}