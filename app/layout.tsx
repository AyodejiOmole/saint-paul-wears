import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import { CartDrawer } from "@/components/cart-drawer"
// import { Toaster } from "@/components/ui/toaster"
import { Toaster } from "react-hot-toast"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Saint Paul - Wear the Message",
  description: "Premium soulful fashion brand - where the product is always the message",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${notoSansJP.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <Toaster 
              position="top-right"
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
