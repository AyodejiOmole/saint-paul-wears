// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { Menu, X, User, ChevronDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { CartIcon } from "@/components/cart-icon"
// import { useAuth } from "@/contexts/auth-context"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function Navigation() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isShopHovered, setIsShopHovered] = useState(false)
//   const [isMobileShopOpen, setIsMobileShopOpen] = useState(false)
//   const { user, logout } = useAuth()

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <Image
//               // src="/images/saint-paul-logo-new.png"
//               src="/images/saint_paul_logo-latest.png"
//               alt="Saint Paul"
//               width={90}
//               height={70}
//               // className="w-10 h-10"
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link href="/" className="text-foreground hover:text-accent transition-colors font-medium">
//               Home
//             </Link>

//             <Link href="/shop" className="text-foreground hover:text-accent transition-colors font-medium">
//               Shop
//             </Link>

//             {/* <div
//               className="relative"
//               onMouseEnter={() => setIsShopHovered(true)}
//               onMouseLeave={() => setIsShopHovered(false)}
//             >
//               <button className="flex items-center text-foreground hover:text-accent transition-colors font-medium">
//                 Shop
//                 <ChevronDown className="ml-1 h-4 w-4" />
//               </button>

//               {isShopHovered && (
//                 <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-md shadow-lg py-2 z-50">
//                   <Link
//                     href="/shop"
//                     className="block px-4 py-2 text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
//                   >
//                     All Products
//                   </Link>
//                   <Link
//                     href="/shop/men"
//                     className="block px-4 py-2 text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
//                   >
//                     Men
//                   </Link>
//                   <Link
//                     href="/shop/women"
//                     className="block px-4 py-2 text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
//                   >
//                     Women
//                   </Link>
//                 </div>
//               )}
//             </div> */}

//             <Link href="/about" className="text-foreground hover:text-accent transition-colors font-medium">
//               About
//             </Link>
//             <Link href="/contact" className="text-foreground hover:text-accent transition-colors font-medium">
//               Contact
//             </Link>
//           </div>

//           {/* Desktop Actions */}
//           <div className="hidden md:flex items-center space-x-4">
//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon">
//                     <User className="h-5 w-5" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem asChild>
//                     <Link href="/dashboard">Dashboard</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem asChild>
//                     <Link href="/dashboard">Orders</Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <Button variant="ghost" size="icon" asChild>
//                 <Link href="/login">
//                   <User className="h-5 w-5" />
//                 </Link>
//               </Button>
//             )}

//             <CartIcon />
//           </div>

//           {/* Mobile menu button */}
//           <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </Button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-black">
//             <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
//               <Link
//                 href="/"
//                 className="block px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Home
//               </Link>

//               <div>
//                 <button
//                   onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
//                   className="flex items-center justify-between w-full px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                 >
//                   Shop
//                   <ChevronDown className={`h-4 w-4 transition-transform ${isMobileShopOpen ? "rotate-180" : ""}`} />
//                 </button>

//                 {isMobileShopOpen && (
//                   <div className="pl-6 space-y-1">
//                     <Link
//                       href="/shop"
//                       className="block px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       All Products
//                     </Link>
//                     <Link
//                       href="/shop/men"
//                       className="block px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Men
//                     </Link>
//                     <Link
//                       href="/shop/women"
//                       className="block px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Women
//                     </Link>
//                   </div>
//                 )}
//               </div>

//               <Link
//                 href="/about"
//                 className="block px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/contact"
//                 className="block px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Contact
//               </Link>

//               {user ? (
//                 <>
//                   <Link
//                     href="/dashboard"
//                     className="block px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     onClick={() => {
//                       logout()
//                       setIsMenuOpen(false)
//                     }}
//                     className="block w-full text-left px-3 py-2 text-foreground hover:text-accent transition-colors font-medium"
//                   >
//                     Sign Out
//                   </button>
//                 </>
//               ) : (
//                 <Link
//                   href="/login"
//                   className="flex items-center px-3 py-2 text-foreground hover:text-accent transition-colors font-medium bg-accent/10 rounded-md mx-3 my-2"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <User className="h-4 w-4 mr-2" />
//                   Sign In
//                 </Link>
//               )}

//               <div className="flex items-center space-x-4 px-3 py-2">
//                 <CartIcon />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }


// /The code above is the current code but this one below is what i want now.
// /But i can't figure out how to add a background color to it, it's just transparent.

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User, ChevronDown } from "lucide-react"

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              // src="/images/saint-paul-logo-new.png"
              src="/images/saint_paul_logo-latest.png"
              alt="Saint Paul"
              width={90}
              height={70}
              // className="w-10 h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors font-medium">
              Home
            </Link>

            <Link href="/shop" className="text-foreground hover:text-accent transition-colors font-medium">
              Shop
            </Link>

            {/* <div
              className="relative"
              onMouseEnter={() => setIsShopHovered(true)}
              onMouseLeave={() => setIsShopHovered(false)}
            >
              <button className="flex items-center text-foreground hover:text-accent transition-colors font-medium">
                Shop
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {isShopHovered && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/shop"
                    className="block px-4 py-2 text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                  >
                    All Products
                  </Link>
                  <Link
                    href="/shop/men"
                    className="block px-4 py-2 text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                  >
                    Men
                  </Link>
                  <Link
                    href="/shop/women"
                    className="block px-4 py-2 text-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                  >
                    Women
                  </Link>
                </div>
              )}
            </div> */}

            <Link href="/about" className="text-foreground hover:text-accent transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-accent transition-colors font-medium">
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            <CartIcon />
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isMenuOpen && (
        <div className="fixed bg-white z-1 md:hidden w-full">
          {/* <div className="bg-black/50" onClick={() => setIsMenuOpen(false)} /> */}
          <div className="w-full h-full bg-white dark:bg-black">
            {/* Mobile Header */}
            {/* <div className="flex items-center justify-between px-4 h-16">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src="/images/saint-paul-logo-new.png"
                  alt="Saint Paul"
                  width={90}
                  height={70}
                  className="w-10 h-10"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div> */}

            {/* Mobile Menu Items */}
            <div className="bg-white z-1 h-full pt-8">
              <div className="px-4 space-y-4 w-full">
                <Link
                  href="/"
                  className="block text-lg font-medium text-foreground hover:text-accent transition-colors py-2 border-b border-transparent hover:border-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>

                <Link href="/shop" className="block text-lg text-foreground hover:text-accent font-medium hover:text-accent transition-colors py-2 border-b border-transparent hover:border-accent">
                  SHOP
                </Link>

                {/* <div>
                  <button
                    onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                    className="flex items-center justify-between w-full text-xl font-medium text-foreground hover:text-accent transition-colors py-2 border-b border-transparent hover:border-accent"
                  >
                    SHOP
                    <ChevronDown className={`h-6 w-6 transition-transform ${isMobileShopOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isMobileShopOpen && (
                    <div className="pl-6 mt-4 space-y-4">
                      <Link
                        href="/shop"
                        className="block text-lg text-foreground/80 hover:text-accent transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        All Products
                      </Link>
                      <Link
                        href="/shop/men"
                        className="block text-lg text-foreground/80 hover:text-accent transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Men
                      </Link>
                      <Link
                        href="/shop/women"
                        className="block text-lg text-foreground/80 hover:text-accent transition-colors py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Women
                      </Link>
                    </div>
                  )}
                </div> */}

                <Link
                  href="/about"
                  className="block text-lg font-medium text-foreground hover:text-accent transition-colors py-2 border-b border-transparent hover:border-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </Link>

                <Link
                  href="/contact"
                  className="block text-lg font-medium text-foreground hover:text-accent transition-colors py-2 border-b border-transparent hover:border-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>

                <Link
                  href="/contact"
                  className="block text-lg font-medium text-foreground hover:text-accent transition-colors py-2 border-b border-transparent hover:border-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>

              {/* Mobile Footer */}
              <div className="px-4 py-8 border-t border-border">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      href="/dashboard"
                      className="block text-lg font-medium text-foreground hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left text-lg font-medium text-foreground hover:text-accent transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center text-lg font-medium text-foreground hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Login
                  </Link>
                )}

                <div className="mt-6">
                  <CartIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}