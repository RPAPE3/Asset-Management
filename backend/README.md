# Asset Management Backend

This is the backend service for the Asset Management application, built with **FastAPI** and **SQLAlchemy**. It provides a RESTful API for managing asset categories, subcategories, and assets, and supports database rebuilds from uploaded JSON files.

## Features
- FastAPI-based REST API
- PostgreSQL database via SQLAlchemy ORM
- CORS support for frontend integration
- Upload and rebuild database from JSON
- Models for Category, SubCategory, and Asset

## Requirements
- Python 3.8+
- PostgreSQL

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Asset-Management/backend
   ```
2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```
DATABASE_URL=postgresql://postgres:password@localhost/assets_db
FRONTEND_ORIGIN=http://localhost:5173
```
- `DATABASE_URL`: PostgreSQL connection string.
- `FRONTEND_ORIGIN`: Allowed CORS origin for the frontend (default: `http://localhost:5173`).

## Running the Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000` by default.

## API Endpoints

### POST `/rebuild-database`
Upload a JSON file to rebuild the database. The JSON should be an array of asset objects with fields like `primaryAssetCategory`, `wealthAssetType`, `nickname`, and `balanceCurrent`.

### GET `/categories`
Returns all categories, each with nested subcategories and assets.

### GET `/subcategories`
Returns all subcategories with their assets.

### GET `/assets`
Returns all assets.

## Database Models
- **Category**: id, category, created_at, updated_at
- **SubCategory**: id, subcategory, category_id, created_at, updated_at
- **Asset**: id, name, balance, subcategory_id, created_at, updated_at

## Project Structure
```
backend/
├── main.py         # FastAPI app and API endpoints
├── models.py       # SQLAlchemy ORM models
├── schemas.py      # Pydantic schemas for API
├── database.py     # Database connection and session
├── requirements.txt
└── README.md
```

## License
MIT 