import Link from "next/link"
import { Button } from "@/components/ui/button"
export function BrandPhilosophy() {
  return (
    <section className="py-16 bg-secondary text-secondary-foreground">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">The Message</h2>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            At Saint Paul, we believe that fashion is more than fabric and thread—it's a language. Every piece we create
            carries a message, a story, a piece of soul.
          </p>
          <p>
            Our designs speak to those who understand that true style comes from within, who wear their values as boldly
            as they wear our clothes.
          </p>
          <p className="font-serif text-xl italic">"The product is always the message."</p>
        </div>
        <div className="mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary bg-transparent"
          >
            <Link href="/about">Our Story</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
