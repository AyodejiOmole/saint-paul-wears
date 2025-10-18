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
import { Eye, EyeOff, UserPlus, User, Mail, Phone, Lock, Zap } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import toast from "react-hot-toast"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [focusedField, setFocusedField] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { signup, isLoading } = useAuth()
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

  useEffect(() => {
    // Calculate password strength
    const password = formData.password;
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      toast.error("Passwords do not match", {
        style: {
          background: '#dc2626',
          color: '#ffffff',
          fontWeight: 'bold'
        }
      });
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      toast.error("Password must be at least 6 characters", {
        style: {
          background: '#dc2626',
          color: '#ffffff',
          fontWeight: 'bold'
        }
      });
      return
    }

    try {
      const success = await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      })

      if (success) {
        toast.success("Welcome to Saint Paul! 🔥", { 
          duration: 3000,
          style: {
            background: '#dc2626',
            color: '#ffffff',
            fontWeight: 'bold'
          }
        });
        router.push("/dashboard")
      } else {
        setError("Failed to create account")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
      toast.error(err.message || "An error occurred", {
        style: {
          background: '#dc2626',
          color: '#ffffff',
          fontWeight: 'bold'
        }
      });
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-orange-500';
    if (passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'WEAK';
    if (passwordStrength <= 50) return 'FAIR';
    if (passwordStrength <= 75) return 'GOOD';
    return 'STRONG';
  };

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
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" 
               style={{ transform: `translate(${scrollY * 0.3}px, ${scrollY * -0.2}px)` }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-bounce" 
               style={{ transform: `translate(${scrollY * -0.2}px, ${scrollY * 0.1}px)` }} />
        </div>
        
        {/* Floating text */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="absolute top-20 right-20 text-9xl font-black text-red-500 transform rotate-12 select-none">
            JOIN
          </div>
          <div className="absolute bottom-20 left-20 text-9xl font-black text-white transform -rotate-12 select-none">
            PAUL
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-16 min-h-screen flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-red-600 text-white text-lg px-6 py-3 font-black tracking-widest mb-6 animate-pulse">
              JOIN THE MOVEMENT
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none">
              <span className="block text-white mb-2">SIGN</span>
              <span className="block text-red-500">UP</span>
            </h1>
            
            <p className="text-gray-400 text-xl">Create your Saint Paul account</p>
          </div>

          {/* Signup Card */}
          <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white">CREATE ACCOUNT</h2>
              </div>
              <p className="text-gray-400">Join thousands of Saint Paul enthusiasts</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Label htmlFor="firstName" className="text-red-400 font-bold text-lg mb-2 block">
                    FIRST NAME
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={`bg-gray-800 border-gray-700 text-white h-14 text-lg pl-12 transition-all duration-300 ${
                        focusedField === 'firstName' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                      }`}
                      placeholder="John"
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="lastName" className="text-red-400 font-bold text-lg mb-2 block">
                    LAST NAME
                  </Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      required 
                      className={`bg-gray-800 border-gray-700 text-white h-14 text-lg pl-12 transition-all duration-300 ${
                        focusedField === 'lastName' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                      }`}
                      placeholder="Doe"
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <Label htmlFor="email" className="text-red-400 font-bold text-lg mb-2 block">
                  EMAIL ADDRESS
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
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

              {/* Phone */}
              <div className="relative">
                <Label htmlFor="phone" className="text-red-400 font-bold text-lg mb-2 block">
                  PHONE NUMBER
                </Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={`bg-gray-800 border-gray-700 text-white h-16 text-lg pl-14 transition-all duration-300 ${
                      focusedField === 'phone' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                    }`}
                    placeholder="+234 xxx xxx xxxx"
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <Label htmlFor="password" className="text-red-400 font-bold text-lg mb-2 block">
                  PASSWORD
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`bg-gray-800 border-gray-700 text-white h-16 text-lg pl-14 pr-14 transition-all duration-300 ${
                      focusedField === 'password' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                    }`}
                    placeholder="Create a strong password"
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-400 font-bold">PASSWORD STRENGTH</span>
                      <span className={`text-sm font-black ${
                        passwordStrength <= 25 ? 'text-red-400' :
                        passwordStrength <= 50 ? 'text-orange-400' :
                        passwordStrength <= 75 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Label htmlFor="confirmPassword" className="text-red-400 font-bold text-lg mb-2 block">
                  CONFIRM PASSWORD
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`bg-gray-800 border-gray-700 text-white h-16 text-lg pl-14 pr-14 transition-all duration-300 ${
                      focusedField === 'confirmPassword' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                    }`}
                    placeholder="Confirm your password"
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-12 w-12 text-gray-500 hover:text-white hover:bg-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
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
                    CREATING ACCOUNT...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6" />
                    CREATE ACCOUNT
                  </div>
                )}
              </Button>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔥</div>
                  <p className="text-xs text-gray-400 font-bold">EXCLUSIVE DROPS</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">🚀</div>
                  <p className="text-xs text-gray-400 font-bold">FAST SHIPPING</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">💎</div>
                  <p className="text-xs text-gray-400 font-bold">TOP QUALITY</p>
                </div>
              </div>
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
                Already have an account?{" "}
                <Link href="/login" className="text-red-400 hover:text-white font-bold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}