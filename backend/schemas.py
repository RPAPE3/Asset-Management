from pydantic import BaseModel, field_validator
from typing import List
from enum import Enum
from datetime import datetime
import re

class CategoryEnum(str, Enum):
    """
    Enum for the categories of the assets.
    """
    CASH = "CASH"
    INVESTMENT = "INVESTMENT"
    OTHER_PROPERTY = "OTHER_PROPERTY"
    REAL_ESTATE = "REAL_ESTATE"

class SubCategoryEnum(str, Enum):
    """
    Enum for the subcategories of the categories.
    """
    CASH = "CASH"
    CRYPTOCURRENCY = "CRYPTOCURRENCY"
    BROKERAGE = "BROKERAGE"
    VEHICLE = "VEHICLE"
    REAL_ESTATE = "REAL_ESTATE"


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
    subcategory: SubCategoryEnum
    assets: List[AssetCreate]

    @field_validator('subcategory', mode='before')
    @classmethod
    def case_insensitive_subcategory(cls, v):
        if isinstance(v, str):
            v = re.sub(r'(?<!^)(?=[A-Z])', '_', v)
            v = v.replace(" ", "_").replace("-", "_").upper()
        return v

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
    category: CategoryEnum
    subcategories: List[SubCategoryCreate]

    @field_validator('category', mode='before')
    @classmethod
    def case_insensitive_category(cls, v):
        if isinstance(v, str):
            v = re.sub(r'(?<!^)(?=[A-Z])', '_', v)
            v = v.replace(" ", "_").replace("-", "_").upper()
        return v

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    """
    Schema for the categories of the assets.
    """
    id: int
    created_at: datetime
    updated_at: datetime


