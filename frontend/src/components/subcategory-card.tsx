import type { Subcategory } from "../types/types"
import AssetItem from "./asset-item"

interface SubcategoryCardProps {
  subcategory: Subcategory
}

export default function SubcategoryCard({ subcategory }: SubcategoryCardProps) {
  // Calculate total balance for this subcategory
  const subcategoryTotal = (subcategory.assets ?? []).reduce((total, asset) => {
    return total + asset.balance
  }, 0)

  return (
    <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
      <div className="p-3 bg-gray-100 flex justify-between items-center">
        <h4 className="font-medium text-gray-700">{subcategory.subcategory}</h4>
        <div className="text-gray-700">${subcategoryTotal.toLocaleString()}</div>
      </div>

      <div className="divide-y divide-gray-200">
        {(subcategory.assets ?? []).map((asset, index) => (
          <AssetItem key={index} asset={asset} />
        ))}
      </div>
    </div>
  )
}
