"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export function CartIcon() {
  const { toggleCart, getTotalItems } = useCart()
  const itemCount = getTotalItems()

  return (
    <Button variant="ghost" size="sm" className="relative p-2" onClick={toggleCart}>
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Button>
  )
}
