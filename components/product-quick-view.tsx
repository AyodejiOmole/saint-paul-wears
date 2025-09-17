"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { Minus, Plus, X, ShoppingBag, Heart, Share2 } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { Product } from "@/types"

interface ProductQuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductQuickView({ product, isOpen, onClose }: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem, openCart } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", { duration: 2000 });
      return
    }

    if(!selectedColor) {
      toast.error("Please select a color", { duration: 2000 });
      return;
    }

    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.productImages[0],
      size: selectedSize,
      category: product.category,
      itemQuantity: product.stock,
      color: selectedColor,
    })
    
    toast.success("Added to cart!", { duration: 2000 });
    openCart()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto bg-gray-900 text-white border-2 border-red-900/30">
        <DialogHeader className="relative pb-0">
          <DialogTitle className="sr-only">{product.name}</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-0 z-10 text-gray-400 hover:text-white hover:bg-red-900/20 rounded-full" 
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
          {/* Product Images - Enhanced */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-black border border-gray-800">
              <img
                src={product.productImages[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              
              {/* Image Navigation */}
              {product.productImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.productImages.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev + 1) % product.productImages.length)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all"
                  >
                    →
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded-sm text-sm font-bold">
                    {currentImageIndex + 1} / {product.productImages.length}
                  </div>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                      currentImageIndex === index ? "border-red-500 shadow-lg shadow-red-500/20" : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details - Enhanced */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-red-600 text-white text-lg px-4 py-2 font-black tracking-wider hover:bg-red-700">
                {product.category.toUpperCase()}
              </Badge>
              
              <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-red-500 font-black text-3xl">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-xl">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-green-600 text-white px-2 py-1 text-sm font-bold rounded">
                    SAVE ₦{(product.originalPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-bold">IN STOCK</span>
                </span>
                <span>✓ Free Shipping</span>
                <span>✓ 30-Day Returns</span>
              </div>
            </div>

            {/* Color Selection - Enhanced */}
            <div>
              <h3 className="text-xl font-black mb-4 tracking-wider uppercase">Color</h3>
              <div className="grid grid-cols-3 gap-3">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    className={`h-14 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      selectedColor === color 
                        ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30" 
                        : "border-gray-600 text-gray-300 hover:border-red-400 hover:text-white bg-gray-800"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection - Enhanced */}
            <div>
              <h3 className="text-xl font-black mb-4 tracking-wider uppercase">Size</h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`aspect-square text-lg font-bold transition-all duration-300 transform hover:scale-110 ${
                      selectedSize === size 
                        ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/30" 
                        : "border-gray-600 text-gray-300 hover:border-red-400 hover:text-white bg-gray-800"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity - Enhanced */}
            <div>
              <h3 className="text-xl font-black mb-4 tracking-wider uppercase">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-white w-12 h-12 bg-gray-800"
                >
                  <Minus className="h-5 w-5" />
                </Button>
                <span className="w-16 text-center font-black text-2xl text-red-400">
                  {quantity}
                </span>
                <Button 
                  variant="outline" 
                  disabled={product.stock <= quantity} 
                  size="icon" 
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-white w-12 h-12 bg-gray-800"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                
                <div className="ml-4 text-sm text-gray-400">
                  <span className="font-bold">Stock:</span> {product.stock}
                </div>
              </div>
            </div>

            {/* Actions - Enhanced */}
            <div className="space-y-4">
              {product.stock ? (
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 text-white hover:bg-red-700 text-xl font-black py-6 tracking-wider uppercase transform hover:scale-105 transition-all duration-300 shadow-2xl"
                  size="lg"
                >
                  <ShoppingBag className="h-6 w-6 mr-3" />
                  Add to Cart 
                </Button>
              ) : (
                <Button
                  disabled={true}
                  className="w-full bg-gray-600 text-gray-400 text-xl font-black py-6 tracking-wider uppercase"
                  size="lg"
                >
                  Out of Stock
                </Button>
              )}
              
              {/* Secondary Actions */}
              {/* <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`border-gray-600 text-gray-300 hover:border-red-400 hover:text-white py-4 font-bold bg-gray-800 ${
                    isFavorite ? "border-red-400 text-red-400 bg-red-900/20" : ""
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Favorited" : "Favorite"}
                </Button>
                
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-white py-4 font-bold bg-gray-800"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}