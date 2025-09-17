"use client"

import type React from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Zap, Star } from "lucide-react"
import { useState, useEffect } from "react"

import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [focusedField, setFocusedField] = useState("")

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
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert("Thank you for your message! We'll get back to you soon.")
    setIsSubmitting(false)
  }

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unworn items in original condition with tags attached.",
      icon: "📦"
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) available.",
      icon: "🚀"
    },
    {
      question: "How do I find my size?",
      answer: "Check our detailed size guide on each product page. When in doubt, size up for comfort.",
      icon: "📏"
    },
    // {
    //   question: "Do you ship internationally?",
    //   answer: "Yes! We ship worldwide. International shipping takes 7-14 business days.",
    //   icon: "🌍"
    // }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />

      {/* Floating Cursor Effect */}
      <div 
        // className="fixed w-8 h-8 bg-red-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
        // style={{
        //   left: `${mousePosition.x - 16}px`,
        //   top: `${mousePosition.y - 16}px`,
        // }}
      />

      {/* Hero Section - Dynamic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/20 to-purple-900/20" />
          
          {/* Moving geometric shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" 
                 style={{ transform: `translate(${scrollY * 0.2}px, ${scrollY * -0.1}px)` }} />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl animate-bounce" 
                 style={{ transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.2}px)` }} />
          </div>
          
          {/* Floating text elements */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-10 left-10 text-9xl font-black text-red-500 transform -rotate-12 select-none animate-pulse">
              CONTACT
            </div>
            <div className="absolute bottom-10 right-10 text-9xl font-black text-white transform rotate-12 select-none animate-pulse">
              US
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <Badge className="bg-red-600 text-white text-xl px-8 py-4 font-black tracking-widest mb-8 animate-bounce">
            GET IN TOUCH
          </Badge>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-none">
            <span className="block text-white mb-4">CONTACT</span>
            <span className="block text-red-500 animate-pulse">US</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-16">
            Have questions, feedback, or just want to connect? 
            <span className="text-red-500 font-bold"> We'd love to hear from you.</span>
          </p>
        </div>
      </section>

      {/* Contact Form & Info - Enhanced */}
      <section className="py-20 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form - Redesigned */}
            <div className="bg-black border-2 border-red-900/30 rounded-2xl p-8 shadow-2xl">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-600 p-3 rounded-full">
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-white">SEND MESSAGE</h2>
                </div>
                <p className="text-gray-400 text-lg">Let's start a conversation</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Label htmlFor="firstName" className="text-red-400 font-bold text-lg mb-2 block">
                      FIRST NAME
                    </Label>
                    <Input 
                      id="firstName" 
                      required 
                      className={`bg-gray-800 border-gray-700 text-white h-14 text-lg transition-all duration-300 ${
                        focusedField === 'firstName' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                      }`}
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="lastName" className="text-red-400 font-bold text-lg mb-2 block">
                      LAST NAME
                    </Label>
                    <Input 
                      id="lastName" 
                      required 
                      className={`bg-gray-800 border-gray-700 text-white h-14 text-lg transition-all duration-300 ${
                        focusedField === 'lastName' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                      }`}
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField('')}
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="email" className="text-red-400 font-bold text-lg mb-2 block">
                    EMAIL ADDRESS
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    className={`bg-gray-800 border-gray-700 text-white h-14 text-lg transition-all duration-300 ${
                      focusedField === 'email' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                    }`}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>

                <div className="relative">
                  <Label htmlFor="subject" className="text-red-400 font-bold text-lg mb-2 block">
                    SUBJECT
                  </Label>
                  <Input 
                    id="subject" 
                    required 
                    className={`bg-gray-800 border-gray-700 text-white h-14 text-lg transition-all duration-300 ${
                      focusedField === 'subject' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                    }`}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>

                <div className="relative">
                  <Label htmlFor="message" className="text-red-400 font-bold text-lg mb-2 block">
                    MESSAGE
                  </Label>
                  <Textarea 
                    id="message" 
                    rows={6} 
                    placeholder="Tell us how we can help you..." 
                    required 
                    className={`bg-gray-800 border-gray-700 text-white text-lg resize-none transition-all duration-300 ${
                      focusedField === 'message' ? 'border-red-500 shadow-lg shadow-red-500/20' : ''
                    }`}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white h-16 text-xl font-black tracking-wider transform hover:scale-105 transition-all duration-300 shadow-2xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      SENDING...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="h-6 w-6" />
                      SEND MESSAGE
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information - Enhanced */}
            <div className="space-y-8">
              
              {/* Phone Card */}
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <Phone className="h-12 w-12 text-white" />
                  <h3 className="text-3xl font-black text-white">CALL US</h3>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-white">Customer Service</h4>
                  <a 
                    href="tel:+2348076142336" 
                    className="text-2xl font-bold text-white hover:text-red-200 transition-colors block mb-2"
                  >
                    +234 807 614 2336
                  </a>
                  <p className="text-red-100">Mon-Fri: 9AM-8PM WAT</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <Mail className="h-12 w-12 text-white" />
                  <h3 className="text-3xl font-black text-white">EMAIL US</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-white">General Inquiries</h4>
                    <p className="text-xl text-white">wearsaintpaul@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-white">Customer Support</h4>
                    <p className="text-xl text-white">wearsaintpaul@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              {/* <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <MessageSquare className="h-12 w-12 text-white" />
                  <h3 className="text-3xl font-black text-white">FOLLOW US</h3>
                </div>
                <div>
                  <p className="text-white text-lg mb-4">Connect with us on social media for the latest updates</p>
                  <div className="flex space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <span className="text-2xl">📷</span>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <span className="text-2xl">🐦</span>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                      <span className="text-2xl">📘</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Interactive */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-9xl font-black text-red-500 transform -rotate-12 select-none">
            FAQ
          </div>
          <div className="absolute bottom-10 right-10 text-9xl font-black text-white transform rotate-12 select-none">
            HELP
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-black mb-8 text-white">
              <span className="text-red-500">FAQ</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Quick answers to common questions about Saint Paul
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-red-900/30 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{faq.icon}</div>
                  <h4 className="font-black text-xl text-white leading-tight">{faq.question}</h4>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed pl-16">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}