import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BrandPhilosophy() {
  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: `repeating-linear-gradient(
                 45deg,
                 transparent,
                 transparent 2px,
                 rgba(255, 0, 0, 0.1) 2px,
                 rgba(255, 0, 0, 0.1) 4px
               )`
             }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Bold Statement */}
          <div className="space-y-8">
            <div className="relative">
              {/* Layered Text Effect */}
              <h2 className="text-6xl md:text-8xl font-black leading-none mb-8">
                <span className="text-white block">NOT JUST</span>
                <span className="text-red-500 block">CLOTHES.</span>
                <span className="text-white block text-5xl md:text-6xl">A STATEMENT.</span>
                <span className="text-red-500 block text-4xl md:text-5xl">A MOVEMENT.</span>
                <span className="text-white block text-6xl md:text-7xl">A VOICE.</span>
              </h2>
            </div>
            
            {/* Zine-Style Content Blocks */}
            <div className="space-y-6">
              <div className="bg-red-600 text-white p-6 transform -rotate-1 shadow-2xl">
                <p className="text-lg font-bold">
                  "WHERE STREETWEAR MEETS SPIRITUALITY. WHERE FASHION BECOMES FAITH."
                </p>
              </div>
              
              <div className="bg-white text-black p-6 transform rotate-1 shadow-2xl">
                <p className="text-lg font-bold">
                  Every piece tells a story. Every design carries meaning. This is Saint Paul.
                </p>
              </div>
              
              <div className="bg-gray-900 border-2 border-red-500 p-6 transform -rotate-1">
                <p className="text-xl font-black text-red-500 uppercase tracking-wider">
                  This is your voice.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-black tracking-wider transition-all duration-300 transform hover:scale-110 shadow-2xl"
              >
                <Link href="/about">OUR STORY</Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Collage Style Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Main large image */}
              <div className="col-span-2 relative">
                <img 
                  src="/saint-collage.png"
                  alt="Street Style"
                  className="w-full h-64 object-cover rounded-lg shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 font-black text-sm rotate-12">
                  FAITH IN FASHION
                </div>
              </div>
              
              {/* Smaller images */}
              <div className="relative">
                <img 
                  src="/saint-model1.jpeg"
                  alt="Urban Style"
                  className="w-full h-48 object-cover rounded-lg shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
                />
              </div>
              
              <div className="relative">
                <img 
                  src="/saint-model4.jpeg"
                  alt="Street Culture"
                  className="w-full h-48 object-cover rounded-lg shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4 bg-black text-red-500 px-3 py-1 font-bold text-xs">
                  ✞ SAINT PAUL
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white p-8 rounded-full shadow-2xl z-10 animate-pulse">
              <div className="text-center">
                <div className="text-3xl font-black">✞</div>
                <div className="text-sm font-bold mt-1">SAINT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}