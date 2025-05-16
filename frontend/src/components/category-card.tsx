import type { Category } from "../types/types"
import SubcategoryCard from "./subcategory-card"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Calculate total balance for this category
  const categoryTotal = (category.subcategories ?? []).reduce((total, subcategory) => {
    return (
      total +
      (subcategory.assets ?? []).reduce((subTotal, asset) => {
        return subTotal + asset.balance
      }, 0)
    )
  }, 0)

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
        <h3 className="text-xl font-semibold">{category.category}</h3>
        <div className="font-medium">${categoryTotal.toLocaleString()}</div>
      </div>

      <div className="p-4 space-y-4">
        {(category.subcategories ?? []).map((subcategory, index) => (
          <SubcategoryCard key={index} subcategory={subcategory} />
        ))}
      </div>
    </div>
  )
}
