import type { Asset } from "../types/types"

interface AssetItemProps {
  asset: Asset
}

export default function AssetItem({ asset }: AssetItemProps) {
  return (
    <div className="p-3 flex justify-between items-center">
      <span className="text-gray-700">{asset.name}</span>
      <span className="font-medium">${asset.balance.toLocaleString()}</span>
    </div>
  )
}
