export interface Asset {
    name: string
    balance: number
  }
  
  export interface Subcategory {
    subcategory: string
    assets: Asset[]
  }
  
  export interface Category {
    category: string
    subcategories: Subcategory[]
  }
  