"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartDrawer() {
  const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart()

  const convertToNaira = (usdPrice: number) => {
    return Math.round(usdPrice * 800)
  }

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg bg-background px-6 py-6">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2 font-serif text-2xl">
            <ShoppingBag className="h-6 w-6" />
            Shopping Cart ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full py-4">
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add some items to get started</p>
              <Button asChild onClick={closeCart}>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 -mx-2">
                <div className="space-y-4 px-2">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4 p-4 border rounded-lg">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                        <p className="text-sm font-medium">₦{item.price.toLocaleString()}</p>

                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 bg-transparent"
                            onClick={() => updateQuantity(`${item.id}-${item.size}`, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => removeItem(`${item.id}-${item.size}`)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>₦{getTotalPrice().toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/checkout" onClick={closeCart}>
                      Proceed to Checkout
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full bg-transparent" onClick={closeCart}>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
