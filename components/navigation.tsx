"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, ChevronDown, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CartIcon } from "@/components/cart-icon"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isShopHovered, setIsShopHovered] = useState(false)
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Spinning Effect */}
          <Link href="/" className="flex items-center group">
            <div className="spinning-logo-slow">
              <Image
                src="/images/saint-paul-cross.png"
                alt="Saint Paul"
                width={100}
                height={80}
                // className="brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <Link 
              href="/" 
              className="text-white hover:text-red-400 transition-colors font-bold text-lg tracking-wider uppercase transform hover:scale-105 duration-200"
            >
              Home
            </Link>

            <Link 
              href="/shop" 
              className="text-white hover:text-red-400 transition-colors font-bold text-lg tracking-wider uppercase transform hover:scale-105 duration-200"
            >
              Shop
            </Link>

            <Link 
              href="/about" 
              className="text-white hover:text-red-400 transition-colors font-bold text-lg tracking-wider uppercase transform hover:scale-105 duration-200"
            >
              About
            </Link>
            
            <Link 
              href="/contact" 
              className="text-white hover:text-red-400 transition-colors font-bold text-lg tracking-wider uppercase transform hover:scale-105 duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:text-white-400 hover:bg-white-900/20 border-2 border-green-600 rounded-full w-10 h-10"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black border-red-900/30 text-white">
                  <DropdownMenuItem asChild className="text-white hover:bg-red-900/20">
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-red-900/20">
                    <Link href="/dashboard">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-red-900/30" />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-white hover:bg-red-900/20"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div>
                <Link 
                  href="/login" 
                  className="text-white hover:text-red-400 transition-colors font-bold text-lg tracking-wider uppercase border border-red-600 px-6 py-2 hover:bg-red-600 hover:text-white duration-300"
                >
                  Login
                </Link>
              </div>
            )}

            <div className="relative">
              <CartIcon />
            </div>
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white hover:text-red-400 hover:bg-red-900/20" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay with Style */}
      {isMenuOpen && (
        <div className="fixed bg-black w-full h-screen z-50 md:hidden">
          <div className="relative w-full h-full bg-gradient-to-br from-black via-gray-900 to-black">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 text-red-500 text-9xl font-black transform -rotate-12 select-none">
                SAINT
              </div>
              <div className="absolute bottom-40 right-10 text-white text-9xl font-black transform rotate-12 select-none">
                PAUL
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="relative z-10 h-full pt-24 px-8">
              <div className="space-y-8">
              <Link
                href="/"
                className="block text-base font-black text-white hover:text-red-400 transition-colors py-2 border-b border-red-900/30 hover:border-red-400 uppercase tracking-wider transform hover:translate-x-2 duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>

              <Link 
                href="/shop" 
                className="block text-base font-black text-white hover:text-red-400 transition-colors py-2 border-b border-red-900/30 hover:border-red-400 uppercase tracking-wider transform hover:translate-x-2 duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>

              <Link
                href="/about"
                className="block text-base font-black text-white hover:text-red-400 transition-colors py-2 border-b border-red-900/30 hover:border-red-400 uppercase tracking-wider transform hover:translate-x-2 duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="block text-base font-black text-white hover:text-red-400 transition-colors py-2 border-b border-red-900/30 hover:border-red-400 uppercase tracking-wider transform hover:translate-x-2 duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* <Link
                href="/faq"
                className="block text-base font-black text-white hover:text-red-400 transition-colors py-2 border-b border-red-900/30 hover:border-red-400 uppercase tracking-wider transform hover:translate-x-2 duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link> */}
              </div>

              {/* Mobile Footer Actions */}
              <div className="absolute bottom-45 left-8 right-8">
                {user ? (
                  <div className="space-y-6">
                    <Link
                      href="/dashboard"
                    className="block text-base font-bold text-red-500 hover:text-red-400 transition-colors border-b border-red-900/30 pb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                    className="block text-base font-bold text-red-500 hover:text-red-400 transition-colors border-b border-red-900/30 pb-2"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block text-base font-bold text-red-500 hover:text-red-400 transition-colors border-b border-red-900/30 pb-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-6 w-6 mr-3" />
                    Login
                  </Link>
                )}

                <div className="mt-8 flex justify-center">
                  <CartIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .spinning-logo-slow {
          animation: spin 10s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </nav>
  )
}