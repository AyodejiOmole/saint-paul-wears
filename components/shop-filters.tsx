"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShopFiltersProps {
  defaultCategory?: string
}

export function ShopFilters({ defaultCategory = "all" }: ShopFiltersProps) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory)
  const [sortBy, setSortBy] = useState("featured")

  const categories = [
    { value: "all", label: "All" },
    { value: "tops", label: "Tops" },
    { value: "pants", label: "Pants" },
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
  ]

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-border">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={activeCategory === category.value ? "default" : "outline"}
            onClick={() => setActiveCategory(category.value)}
            className="text-sm"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
