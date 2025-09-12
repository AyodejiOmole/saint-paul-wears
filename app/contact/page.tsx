"use client"

import type React from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { useState } from "react"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert("Thank you for your message! We'll get back to you soon.")
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-background via-background/95 to-accent/10" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Get in Touch
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">Contact Us</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Have questions, feedback, or just want to connect? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                    <Send className="h-6 w-6" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" required />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" rows={6} placeholder="Tell us how we can help you..." required />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                      <MapPin className="h-6 w-6" />
                      Visit Our Studio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Saint Paul Studio</h4>
                      <p className="text-muted-foreground">
                        123 Fashion District
                        <br />
                        New York, NY 10013
                        <br />
                        United States
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Mon-Fri: 10AM-7PM, Sat-Sun: 11AM-6PM</span>
                    </div>
                  </CardContent>
                </Card> */}

               <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                      <Phone className="h-6 w-6" />
                      Call Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Customer Service</h4>
                      <a 
                        href="tel:+2348076142336" 
                        className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        +2348076142336
                      </a>
                      <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-8PM EST</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl font-serif">
                      <Mail className="h-6 w-6" />
                      Email Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">General Inquiries</h4>
                      <p className="text-muted-foreground">wearsaintpaul@gmail.com</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Customer Support</h4>
                      <p className="text-muted-foreground">wearsaintpaul@gmail.com</p>
                    </div>
                    {/* <div>
                      <h4 className="font-semibold mb-2">Press & Media</h4>
                      <p className="text-muted-foreground">wearsaintpaul@gmail.com</p>
                    </div> */}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Quick answers to common questions about Saint Paul.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">What is your return policy?</h4>
                  <p className="text-muted-foreground text-sm">
                    We offer a 30-day return policy for unworn items in original condition. 
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">How long does shipping take?</h4>
                  <p className="text-muted-foreground text-sm">
                    Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an
                    additional fee.
                  </p>
                </CardContent>
              </Card>

              {/* <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">Do you ship internationally?</h4>
                  <p className="text-muted-foreground text-sm">
                    Yes, we ship worldwide. International shipping takes 7-14 business days and rates vary by
                    destination.
                  </p>
                </CardContent>
              </Card> */}

              <Card>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">How do I find my size?</h4>
                  <p className="text-muted-foreground text-sm">
                    Check our detailed size guide on each product page. If you're between sizes, we recommend sizing up
                    for a comfortable fit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <h4 className="font-serif text-xl font-bold mb-4">Saint Paul</h4>
                <p className="text-background/80 leading-relaxed">
                  Premium soulful fashion where the product is always the message. Wear your truth, express your values,
                  join the movement.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-background/80">
                  <li>
                    <a href="/shop" className="hover:text-background transition-colors">
                      Shop
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:text-background transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-background transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-background/80">
                  <li>
                    <a href="#" className="hover:text-background transition-colors">
                      Size Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-background transition-colors">
                      Returns
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-background transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
              <p>&copy; 2024 Saint Paul. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer> */}

      <Footer />
    </div>
  )
}
