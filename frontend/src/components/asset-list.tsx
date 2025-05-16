import type { Category } from "../types/types"
import CategoryCard from "./category-card"

interface AssetListProps {
  categories: Category[]
}

export default function AssetList({ categories }: AssetListProps) {
  // Calculate total balance across all assets
  const totalBalance = (categories ?? []).reduce((total, category) => {
    return (
      total +
      (category.subcategories ?? []).reduce((subTotal, subcategory) => {
        return (
          subTotal +
          (subcategory.assets ?? []).reduce((assetTotal, asset) => {
            return assetTotal + asset.balance
          }, 0)
        )
      }, 0)
    )
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Asset List</h2>
        <div className="text-xl font-semibold">Total: ${totalBalance.toLocaleString()}</div>
      </div>

      <div className="space-y-6">
        {(categories ?? []).map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  )
}
