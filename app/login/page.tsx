"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, LogIn, User, Lock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import toast from "react-hot-toast"
import { mapFirebaseAuthError } from "@/lib/utils"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [focusedField, setFocusedField] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: { clientX: any; clientY: any }) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        toast.success("Welcome back to Saint Paul!", { 
          duration: 3000,
          style: {
            background: '#dc2626',
            color: '#ffffff',
            fontWeight: 'bold'
          }
        });
        router.push("/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err: any) {
      const error = mapFirebaseAuthError(err);
      setError(error)
      toast.error(error, {
        style: {
          background: '#dc2626',
          color: '#ffffff',
          fontWeight: 'bold'
        }
      });
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Floating Cursor Effect */}
      <div 
        // className="fixed w-6 h-6 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
        // style={{
        //   left: `${mousePosition.x - 12}px`,
        //   top: `${mousePosition.y - 12}px`,
        // }}
      />

      {/* Background Elements */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/10 to-purple-900/10" />
        
        {/* Moving shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" 
               style={{ transform: `translate(${scrollY * 0.3}px, ${scrollY * -0.2}px)` }} />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-bounce" 
               style={{ transform: `translate(${scrollY * -0.2}px, ${scrollY * 0.1}px)` }} />
        </div>
        
        {/* Floating text */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="absolute top-20 left-20 text-9xl font-black text-red-500 transform -rotate-12 select-none">
            LOGIN
          </div>
          <div className="absolute bottom-20 right-20 text-9xl font-black text-white transform rotate-12 select-none">
            SAINT
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-16 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-red-600 text-white text-base px-4 py-2 font-black tracking-widest mb-6 animate-pulse">
              WELCOME BACK
            </Badge>
            
            <h1 className="text-3xl md:text-5xl font-black mb-6 leading-none">
              <span className="block text-white mb-2">SIGN IN</span>
            </h1>
            
            <p className="text-gray-400 text-xl">Access your Saint Paul account</p>
          </div>

          {/* Login Card */}
          <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <LogIn className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-l font-black text-white">LOGIN</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Label htmlFor="email" className="text-red-400 font-bold text-l mb-2 block">
                  EMAIL ADDRESS
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className={`bg-gray-800 border-gray-700 text-white h-16 text-lg pl-14 transition-all duration-300 ${
                      focusedField === 'email' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                    }`}
                    placeholder="your@email.com"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="password" className="text-red-400 font-bold text-l mb-2 block">
                  PASSWORD
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`bg-gray-800 border-gray-700 text-white h-16 text-lg pl-14 pr-14 transition-all duration-300 ${
                      focusedField === 'password' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                    }`}
                    placeholder="Enter your password"
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 text-gray-500 hover:text-white hover:bg-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="bg-red-600/20 border border-red-600/50 text-red-400 p-4 rounded-lg text-center font-bold">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white h-16 text-xl font-black tracking-wider transform hover:scale-105 transition-all duration-300 shadow-2xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    SIGNING IN...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <LogIn className="h-6 w-6" />
                    SIGN IN
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-900 px-4 text-gray-400 font-bold">OR</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-400 mt-6">
                Don't have an account?{" "}
                <Link href="/signup" className="text-red-400 hover:text-white font-bold transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}