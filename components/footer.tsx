"use client";

import Link from "next/link"
import { useState } from "react";
import { Instagram, Twitter, Facebook } from "lucide-react"
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.38-2.016-1.38-3.338h-3.604v13.644a3.867 3.867 0 0 1-3.863 3.864 3.867 3.867 0 0 1-3.863-3.864 3.867 3.867 0 0 1 3.863-3.863c.214 0 .425.018.63.052V7.156c-.208-.03-.42-.045-.63-.045C4.486 7.111 1 10.597 1 14.904s3.486 7.793 7.794 7.793c4.308 0 7.794-3.485 7.794-7.793V9.66a9.846 9.846 0 0 0 5.66 1.761V7.818a6.294 6.294 0 0 1-3.927-2.256Z"/>
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
  </svg>
)

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
  
  const currentYear = new Date().getFullYear()

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
              <Link 
                href="https://www.instagram.com/wearsaintpaul?igsh=a3VjeDdtczltNjk3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                  <Instagram className="h-5 w-5" />
                </Button>
              </Link>
              <Link 
                href="https://www.tiktok.com/@wearsaintpaul?_t=ZS-8zdk7eDYRfu&_r=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                  <TikTokIcon className="h-5 w-5" />
                </Button>
              </Link>
              <Link 
                href="https://wa.me/2348076142336"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
                  <WhatsAppIcon className="h-5 w-5" />
                </Button>
              </Link>
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
              {/* <li>
                <Link href="/size-guide" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Size Guide
                </Link>
              </li> */}
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
          <p className="text-primary-foreground/60 text-sm">© {currentYear} Saint Paul. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}