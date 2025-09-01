import Link from "next/link"

const featuredProducts = [
  {
    id: 1,
    name: "ESSENTIAL BLACK TEE",
    price: "₦45,000",
    image: "/black-premium-t-shirt-on-model-streetwear.png",
    category: "Tops",
    colors: 3,
  },
  {
    id: 2,
    name: "SIGNATURE HOODIE",
    price: "₦85,000",
    image: "/black-premium-hoodie-streetwear-fashion.png",
    category: "Tops",
    colors: 2,
  },
  {
    id: 3,
    name: "CLASSIC JOGGERS",
    price: "₦65,000",
    image: "/black-premium-joggers-pants-streetwear.png",
    category: "Pants",
    colors: 4,
  },
  {
    id: 4,
    name: "STATEMENT JACKET",
    price: "₦150,000",
    image: "/black-premium-jacket-outerwear-streetwear.png",
    category: "Outerwear",
    colors: 2,
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-[13px] font-bold mb-4">Featured Collection</h2>
        <p className="text-muted-foreground text-[11px] max-w-2xl mx-auto">
          Discover our carefully curated selection of premium pieces that embody the Saint Paul aesthetic
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {featuredProducts.map((product) => (
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
                <p className="text-[11px] font-normal text-black">{product.price}</p>
                <p className="text-[10px] text-gray-500">Available in {product.colors} colors</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
