"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Banner } from "@/types"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function HeroSection({ banners }: { banners: Banner[] }) {
  const heroImages = banners ?? [];
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  // Rotating taglines for more creativity
  const taglines = [
    "WEAR THE MESSAGE",
    "FAITH IN FASHION", 
    "SOUL ON FABRIC",
    "STREET MEETS SPIRIT",
    "NOT JUST CLOTHES"
  ];
  
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000) // Faster transitions for more energy
    return () => clearInterval(timer)
  }, [heroImages.length])

  useEffect(() => {
    const taglineTimer = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 2000) // Rotating taglines
    return () => clearInterval(taglineTimer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Images with Parallax */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${image.image || "/placeholder.svg"})`,
                transform: `translateY(${scrollY * 0.5}px)` // Parallax effect
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/70" /> {/* Darker overlay for better contrast */}
      </div>

      {/* WATERMARK LOGO - Gothic style in background */}
      <div className="absolute inset-0 z-5 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="text-[15rem] md:text-[20rem] font-black text-red-500/20 transform rotate-12 select-none">
          ✞
        </div>
      </div>

      {/* Main Content with Layered Text */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        {/* Large Impact Title with Split Styling */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-9xl lg:text-[12rem] font-black mb-4 tracking-tighter leading-none">
            <span className="text-white block">SAINT</span>
            <span className="text-red-500 block transform -mt-4">PAUL</span>
          </h1>
          
          {/* Animated Rotating Taglines */}
          <div className="h-16 flex items-center justify-center overflow-hidden">
            <p className="text-2xl md:text-4xl font-light tracking-[0.3em] uppercase transition-all duration-500 transform">
              {taglines[currentTagline]}
            </p>
          </div>
        </div>

        {/* Bold CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-black tracking-wider transition-all duration-300 transform hover:scale-110 shadow-2xl border-0"
          >
            <Link href="/shop">SHOP NOW</Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-3 border-white text-white hover:bg-white hover:text-black px-12 py-6 text-xl font-bold bg-transparent tracking-wider transition-all duration-300 transform hover:scale-105"
          >
            <Link href="/shop">EXPLORE COLLECTIONS</Link>
          </Button>
        </div>
      </div>

      {/* Slide Indicators - More Creative */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex space-x-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 border-2 border-white transition-all duration-300 transform hover:scale-125 ${
              index === currentSlide ? "bg-red-500 border-red-500 rotate-45" : "bg-transparent hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-20">
        <ChevronDown className="w-8 h-8 text-white/70" />
      </div>
    </section>
  )
}