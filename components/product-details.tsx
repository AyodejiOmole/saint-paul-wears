"use client"

import { useState } from "react"
import { Minus, Plus, Share2, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
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

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const { addItem, openCart } = useCart()
  const router = useRouter()

  const availableColors = ["Black", "White", "Gray", "Navy"]

  const sizeGuideData = [
    { size: "XS", bodyLength: "27", chest: "21", sleeveLength: "32" },
    { size: "S", bodyLength: "28", chest: "22", sleeveLength: "33" },
    { size: "M", bodyLength: "29", chest: "23", sleeveLength: "34" },
    { size: "L", bodyLength: "30", chest: "24", sleeveLength: "35" },
    { size: "XL", bodyLength: "31¾", chest: "25¾", sleeveLength: "36" },
    { size: "XXL", bodyLength: "32¾", chest: "27½", sleeveLength: "37" },
  ]

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <ProductImageGallery images={product.productImages} productName={product.name} />

        {/* Product Information */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-[13px] font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent font-bold text-2xl">₦{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-lg">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-[13px] font-bold mb-3">Color</h3>
            <div className="grid grid-cols-4 gap-2">
              {product.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  className="h-10"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold">Size</h3>
              {/* <Button
                variant="link"
                className="text-sm p-0 h-auto flex items-center gap-1"
                onClick={() => setShowSizeGuide(!showSizeGuide)}
              >
                Size Guide
                {showSizeGuide ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </Button> */}
            </div>

            {/* Collapsible Size Guide Table */}
            {/* {showSizeGuide && (
              <div className="mb-4 border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 font-semibold text-sm border-b">SIZE GUIDE</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left p-3 font-semibold">SIZE</th>
                        <th className="text-center p-3 font-semibold">XS</th>
                        <th className="text-center p-3 font-semibold">S</th>
                        <th className="text-center p-3 font-semibold">M</th>
                        <th className="text-center p-3 font-semibold">L</th>
                        <th className="text-center p-3 font-semibold">XL</th>
                        <th className="text-center p-3 font-semibold">XXL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">BODY LENGTH</td>
                        {sizeGuideData.map((data) => (
                          <td key={`body-${data.size}`} className="text-center p-3">
                            {data.bodyLength}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-semibold">CHEST</td>
                        {sizeGuideData.map((data) => (
                          <td key={`chest-${data.size}`} className="text-center p-3">
                            {data.chest}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">SLEEVE LENGTH</td>
                        {sizeGuideData.map((data) => (
                          <td key={`sleeve-${data.size}`} className="text-center p-3">
                            {data.sleeveLength}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )} */}

            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="aspect-square"
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-[13px] font-bold mb-3">Quantity</h3>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button variant="outline" disabled={product.stock <= quantity} size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              size="lg"
              disabled={product.stock !== 0 ? false : true}
            >
              {product.stock !== 0 ? "Add to Cart" : "Out of Stock"}
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="bg-transparent">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product Details Tabs */}
          {/* <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">SKU: {product.sku}</p>
                <ul className="space-y-1">
                  {product?.details?.map((detail, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="care" className="space-y-4">
              <p className="text-sm leading-relaxed">{product.care}</p>
            </TabsContent>
          </Tabs> */}
        </div>
      </div>
    </div>
  )
}
