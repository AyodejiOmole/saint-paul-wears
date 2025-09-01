import Link from "next/link"

const allProducts = [
  {
    id: 1,
    name: "ESSENTIAL BLACK TEE",
    price: 71200,
    image: "/black-premium-t-shirt-on-model-streetwear.png",
    category: "tops",
    colors: 3,
  },
  {
    id: 2,
    name: "SIGNATURE HOODIE",
    price: 127200,
    image: "/black-premium-hoodie-streetwear-fashion.png",
    category: "tops",
    colors: 2,
  },
  {
    id: 3,
    name: "CLASSIC JOGGERS",
    price: 103200,
    image: "/black-premium-joggers-pants-streetwear.png",
    category: "pants",
    colors: 4,
  },
  {
    id: 4,
    name: "STATEMENT JACKET",
    price: 239200,
    image: "/black-premium-jacket-outerwear-streetwear.png",
    category: "outerwear",
    colors: 2,
  },
  {
    id: 5,
    name: "WOMEN'S FITTED TEE",
    price: 63200,
    image: "/womens-black-fitted-tee.png",
    category: "tops",
    colors: 3,
  },
  {
    id: 6,
    name: "MEN'S CARGO PANTS",
    price: 151200,
    image: "/mens-black-cargo-pants.png",
    category: "pants",
    colors: 2,
  },
]

interface RelatedProductsProps {
  currentProductId: number
}

export function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Filter out current product and show 4 related products
  const relatedProducts = allProducts.filter((product) => product.id !== currentProductId).slice(0, 4)

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto border-t border-border">
      <div className="text-center mb-12">
        <h2 className="text-[13px] font-bold mb-4">You Might Also Like</h2>
        <p className="text-muted-foreground text-[11px]">Complete your Saint Paul collection</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="group cursor-pointer bg-white p-2 md:p-3">
              <div className="relative overflow-hidden mb-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-bold text-[13px] text-black uppercase tracking-wide">{product.name}</h3>
                <p className="text-[11px] font-normal text-black">₦{product.price.toLocaleString()}</p>
                <p className="text-[10px] text-gray-500">Available in {product.colors} colors</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
