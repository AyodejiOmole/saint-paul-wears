"use client";

import Link from "next/link"
import { useState } from "react";
import { Instagram, Twitter, Facebook } from "lucide-react"
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const [email, setEmail] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      })
      if(!res.ok) throw new Error("Could not subscribe at the moment.");
      return res.json();
    },
    onSuccess: () => {
      toast.success("You have subscribed to our newsletter.");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Could not subscribe at the moment.");
    }
  });

  const handleSubscribe = () => {
    mutation.mutate({ email: email });
  }
  
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-4">SAINT PAUL</h3>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Premium soulful fashion where every piece carries a message. Wear your values, express your truth.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-primary-foreground/80 mb-4 text-sm">
              Subscribe to receive updates on new collections and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button onClick={handleSubscribe} variant="secondary" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">© 2024 Saint Paul. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
