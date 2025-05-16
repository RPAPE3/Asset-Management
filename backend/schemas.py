from pydantic import BaseModel, field_validator
from typing import List
from datetime import datetime
import re

class AssetBase(BaseModel):
    """
    Schema for the assets of the subcategories.
    """
    name: str
    balance: float

class AssetCreate(AssetBase):
    pass

class Asset(AssetBase):
    """
    Schema for the assets of the subcategories.
    """
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class SubCategoryBase(BaseModel):
    """
    Schema for the subcategories of the categories.
    """
    subcategory: str
    assets: List[AssetCreate]

class SubCategoryCreate(SubCategoryBase):
    pass

class SubCategory(SubCategoryBase):
    """
    Schema for the subcategories of the categories.
    """
    id: int
    created_at: datetime
    updated_at: datetime

class CategoryBase(BaseModel):
    """
    Schema for the categories of the assets.
    """
    category: str
    subcategories: List[SubCategoryCreate]

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    """
    Schema for the categories of the assets.
    """
    id: int
    created_at: datetime
    updated_at: datetime


