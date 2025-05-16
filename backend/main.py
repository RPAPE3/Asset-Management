from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session, joinedload
from typing import List
import schemas
import models
import database
from datetime import datetime
import json
import os
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()

models.Base.metadata.create_all(bind=database.engine)

origins = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/rebuild-database")
async def rebuild_database(file: UploadFile = File(...), db: Session = Depends(database.get_db)):
    try:
        contents = await file.read()
        data = json.loads(contents.decode())

        models.Base.metadata.drop_all(bind=database.engine)
        models.Base.metadata.create_all(bind=database.engine)

        category_map = {}
        subcategory_map = {}

        for asset in data:
            category_key = asset.get("primaryAssetCategory")
            subcategory_key = asset.get("wealthAssetType")
            asset_name = asset.get("nickname")
            asset_balance = asset.get("balanceCurrent", 0.0)

            if not (category_key and subcategory_key and asset_name):
                continue

            normalized_category_key = re.sub(r'(?<!^)(?=[A-Z])', '_', category_key)
            normalized_category_key = normalized_category_key.replace(" ", "_").replace("-", "_").upper()
            if normalized_category_key not in category_map:
                category = models.Category(
                    category=category_key,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                db.add(category)
                db.flush()
                category_map[normalized_category_key] = category
            else:
                category = category_map[normalized_category_key]

            normalized_subcategory_key = re.sub(r'(?<!^)(?=[A-Z])', '_', subcategory_key)
            normalized_subcategory_key = normalized_subcategory_key.replace(" ", "_").replace("-", "_").upper()
            subcat_key = (normalized_category_key, normalized_subcategory_key)
            if subcat_key not in subcategory_map:
                subcategory = models.SubCategory(
                    subcategory=subcategory_key,
                    category_id=category.id,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                db.add(subcategory)
                db.flush()
                subcategory_map[subcat_key] = subcategory
            else:
                subcategory = subcategory_map[subcat_key]

            asset_obj = models.Asset(
                name=asset_name,
                balance=asset_balance,
                subcategory_id=subcategory.id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(asset_obj)

        db.commit()
        return {"message": "Database rebuilt successfully"}

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON file")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/categories", response_model=List[schemas.Category])
async def get_categories(db: Session = Depends(database.get_db)):
    categories = db.query(models.Category).options(
        joinedload(models.Category.subcategories).joinedload(models.SubCategory.assets)
    ).all()
    return categories

@app.get("/subcategories")
async def get_subcategories(db: Session = Depends(database.get_db)):
    subcategories = db.query(models.SubCategory).options(
        joinedload(models.SubCategory.assets)
    ).all()
    return subcategories

@app.get("/assets")
async def get_assets(db: Session = Depends(database.get_db)):
    assets = db.query(models.Asset).all()
    return assets
