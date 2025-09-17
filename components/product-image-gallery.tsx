"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-black border border-gray-800 group shadow-2xl">
        <img
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
          onClick={() => setIsZoomOpen(true)}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-gray-700 w-12 h-12"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-gray-700 w-12 h-12"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Zoom Icon */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white border-0 w-12 h-12"
          onClick={() => setIsZoomOpen(true)}
        >
          <Expand className="h-5 w-5" />
        </Button>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                currentImageIndex === index 
                  ? "border-red-500 shadow-lg shadow-red-500/20" 
                  : "border-gray-700 hover:border-red-400"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <Dialog open={isZoomOpen} onOpenChange={setIsZoomOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-0 bg-black border-2 border-red-900/30">
          <div className="relative">
            <img
              src={images[currentImageIndex] || "/placeholder.svg"}
              alt={`${productName} - Zoomed`}
              className="w-full h-auto max-h-[95vh] object-contain"
            />
            {images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white border-0 w-12 h-12"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white border-0 w-12 h-12"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                
                <div className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded text-lg font-bold">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}