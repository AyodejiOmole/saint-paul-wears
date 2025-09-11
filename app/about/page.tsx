import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"

export default function AboutPage() {
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
              Our Story
            </Badge>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 tracking-tight">About Saint Paul</h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Where fashion becomes a canvas for meaningful expression, and every piece tells a story worth wearing.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  At Saint Paul, we believe that clothing is more than fabric and thread—it's a medium for
                  self-expression, a statement of values, and a bridge between the wearer and the world.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Founded on the principle that "the product is always the message," we create premium streetwear that
                  speaks to the soul, challenges conventions, and empowers individuals to wear their truth boldly.
                </p>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/shop">Explore Our Collection</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/saint-paul-brand-philosophy-image.png"
                    alt="Saint Paul Brand Philosophy"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every decision we make is guided by these core principles that define who we are and what we stand for.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center p-6 border-2 hover:border-accent transition-colors">
                <CardContent className="pt-6">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-serif text-xl font-bold mb-3">Authenticity</h3>
                  <p className="text-muted-foreground">
                    We create genuine pieces that reflect real stories and authentic experiences.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-2 hover:border-accent transition-colors">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-serif text-xl font-bold mb-3">Quality</h3>
                  <p className="text-muted-foreground">
                    Premium materials and craftsmanship ensure every piece stands the test of time.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-2 hover:border-accent transition-colors">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-serif text-xl font-bold mb-3">Community</h3>
                  <p className="text-muted-foreground">
                    Building connections through shared values and meaningful conversations.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 border-2 hover:border-accent transition-colors">
                <CardContent className="pt-6">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-accent" />
                  <h3 className="font-serif text-xl font-bold mb-3">Impact</h3>
                  <p className="text-muted-foreground">
                    Creating positive change through conscious design and responsible practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-1">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/saint-paul-founder-portrait.png"
                    alt="Saint Paul Founder"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <Badge variant="secondary" className="mb-4">
                  Founder's Note
                </Badge>
                <h2 className="font-serif text-3xl font-bold mb-6">A Message from Our Founder</h2>
                <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 italic">
                  "Fashion has always been my language of choice. Through Saint Paul, I wanted to create more than just
                  clothing— I wanted to build a platform where style meets substance, where every thread carries
                  intention, and where wearing our pieces means joining a movement of conscious expression."
                </blockquote>
                <div>
                  <p className="font-semibold">Jordan Saint Paul</p>
                  <p className="text-muted-foreground">Founder & Creative Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl font-bold mb-6">Join the Movement</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ready to wear your message? Discover pieces that speak to your soul and connect with a community that
              values authenticity, quality, and meaningful expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/shop">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
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
                <Image src="/images/saint-paul-logo-new.png" alt="Saint Paul" width={40} height={40} className="mb-4" />
                <p className="text-background/80 leading-relaxed">
                  Premium soulful fashion where the product is always the message. Wear your truth, express your values,
                  join the movement.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-background/80">
                  <li>
                    <Link href="/shop" className="hover:text-background transition-colors">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-background transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-background transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-background/80">
                  <li>
                    <Link href="#" className="hover:text-background transition-colors">
                      Size Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-background transition-colors">
                      Returns
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-background transition-colors">
                      FAQ
                    </Link>
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
