"use client"

import { useState } from "react"
import { Minus, Plus, Share2, ChevronDown, ChevronUp, ArrowLeft, Star, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { Product } from "@/types"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductDetailsProps {
  product: Product
}

// Size guide data
const sizeGuideData = [
  { size: "XS", bodyLength: "26", chest: "18", sleeveLength: "8" },
  { size: "S", bodyLength: "27", chest: "19", sleeveLength: "8.5" },
  { size: "M", bodyLength: "28", chest: "20", sleeveLength: "9" },
  { size: "L", bodyLength: "29", chest: "22", sleeveLength: "9.5" },
  { size: "XL", bodyLength: "30", chest: "24", sleeveLength: "10" },
  { size: "XXL", bodyLength: "31", chest: "26", sleeveLength: "10.5" },
]

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem, openCart } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.", { duration: 2000 })
      return
    }
    if (!selectedColor) {
      toast.error("Please select a color before adding to cart.", { duration: 2000 })
      return
    }

    for (let i = 0; i < quantity; i++) {
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
    }

    toast.success("Added to Cart")
    openCart()
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-red-400 hover:text-white hover:bg-red-900/20 text-lg font-bold"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Shop
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <ProductImageGallery images={product.productImages} productName={product.name} />

          {/* Product Information - Enhanced */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <Badge 
                variant="secondary" 
                className="mb-4 bg-red-600 text-white text-lg px-4 py-2 font-black tracking-wider"
              >
                {product.category.toUpperCase()}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-red-500 font-black text-4xl">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-2xl">
                    ₦{product.originalPrice.toLocaleString()}
                  </span>
                )}
                <div className="flex items-center space-x-1 ml-auto">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <Star className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-400 ml-2">(4.2)</span>
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>✓ Premium Quality</span>
                <span>✓ Fast Shipping</span>
                <span>✓ 30-Day Returns</span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-xl font-black mb-4 tracking-wider uppercase">
                Choose Color
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    className={`h-14 font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                      selectedColor === color 
                        ? "bg-red-600 text-white border-red-600 shadow-lg" 
                        : "border-gray-600 text-gray-300 hover:border-red-400 hover:text-white"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black tracking-wider uppercase">Size</h3>
                <Button
                  variant="link"
                  className="text-red-400 hover:text-white font-bold flex items-center gap-2 text-lg"
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                >
                  Size Guide
                  {showSizeGuide ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>

              {/* Size Guide Table */}
              {showSizeGuide && (
                <div className="mb-6 border border-red-900/30 rounded-lg overflow-hidden bg-black/50">
                  <div className="bg-red-600 p-4 font-black text-white text-lg text-center">
                    SIZE GUIDE (INCHES)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-red-900/30 bg-gray-800">
                          <th className="text-left p-4 font-black text-red-400">SIZE</th>
                          {sizeGuideData.map((data) => (
                            <th key={data.size} className="text-center p-4 font-black text-white">
                              {data.size}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-red-900/30">
                          <td className="p-4 font-bold text-red-400">BODY LENGTH</td>
                          {sizeGuideData.map((data) => (
                            <td key={`body-${data.size}`} className="text-center p-4">
                              {data.bodyLength}"
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b border-red-900/30">
                          <td className="p-4 font-bold text-red-400">CHEST</td>
                          {sizeGuideData.map((data) => (
                            <td key={`chest-${data.size}`} className="text-center p-4">
                              {data.chest}"
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="p-4 font-bold text-red-400">SLEEVE LENGTH</td>
                          {sizeGuideData.map((data) => (
                            <td key={`sleeve-${data.size}`} className="text-center p-4">
                              {data.sleeveLength}"
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-6 gap-3">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={`aspect-square text-lg font-bold transition-all duration-300 transform hover:scale-110 ${
                      selectedSize === size 
                        ? "bg-red-600 text-white border-red-600 shadow-lg" 
                        : "border-gray-600 text-gray-300 hover:border-red-400 hover:text-white"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-xl font-black mb-4 tracking-wider uppercase">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-white w-12 h-12"
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
                  className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-white w-12 h-12"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white hover:bg-red-700 text-xl font-black py-6 tracking-wider uppercase transform hover:scale-105 transition-all duration-300 shadow-2xl"
                size="lg"
                disabled={product.stock === 0}
              >
                {product.stock !== 0 ? "Add to Cart" : "Out of Stock"}
              </Button>

              {/* <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 border-gray-600 text-gray-300 hover:border-red-400 hover:text-white py-4 font-bold ${
                    isFavorite ? "border-red-400 text-red-400" : ""
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </Button>
                
                <Button
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-300 hover:border-red-400 hover:text-white py-4 font-bold"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}