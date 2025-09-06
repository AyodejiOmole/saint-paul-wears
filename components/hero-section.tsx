"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
// import { ChevronLeft, ChevronRight } from "lucide-react"

import { Banner } from "@/types"
import { Button } from "@/components/ui/button"

// const heroImages = [
//   {
//     src: "/images/hero-fashion.png",
//     alt: "Saint Paul Fashion Collection",
//   },
//   {
//     src: "/luxury-fashion-model-wearing-black-streetwear.png",
//     alt: "Luxury Streetwear",
//   },
//   {
//     src: "/premium-black-clothing-collection-display.png",
//     alt: "Premium Collection",
//   },
//   {
//     src: "/fashion-model-in-urban-setting-wearing-designer-cl.png",
//     alt: "Urban Fashion",
//   },
// ]

export function HeroSection({ banners }: { banners: Banner[] }) {
  const heroImages = banners ?? [];
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={image.image || "/placeholder.svg"} alt={image.header} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button> */}

      {/* <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button> */}

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight drop-shadow-2xl saint-paul-glow">
          SAINT PAUL
        </h1>
        <p className="text-2xl md:text-3xl mb-8 font-light tracking-widest uppercase drop-shadow-lg">
          Wear the Message
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          {/* <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-4 text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105"
          >
            <Link href="/shop">Shop Now</Link>
          </Button> */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 text-lg font-medium bg-transparent tracking-wide transition-all duration-300 hover:scale-105"
          >
            <Link href="/shop">Explore Collections</Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
