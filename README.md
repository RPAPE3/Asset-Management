# Asset Management

Asset Management is a full-stack web application for managing asset categories, subcategories, and assets. It allows users to upload asset data via JSON, view and organize assets, and rebuild the backend database from uploaded files. The project consists of a **FastAPI** backend and a **React + Vite** frontend.

---

## Project Structure

```
Asset-Management/
├── backend/   # FastAPI backend (API, database, models)
├── frontend/  # React + Vite frontend (UI, asset upload)
└── README.md  # (this file)
```

---

## Features
- Upload asset data via JSON file
- RESTful API for asset management
- Modern, user-friendly UI
- PostgreSQL database integration
- CORS support for frontend-backend communication

---

## Tech Stack
- **Backend:** FastAPI, SQLAlchemy, PostgreSQL
- **Frontend:** React, Vite, TailwindCSS

---

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js (v16+ recommended)
- npm (v8+ recommended)
- PostgreSQL

### 1. Clone the Repository
```sh
git clone <repo-url>
cd Asset-Management
```

### 2. Backend Setup
```sh
cd backend
python -m venv venv
# Activate the virtual environment:
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:
```
DATABASE_URL=postgresql://postgres:password@localhost/assets_db
FRONTEND_ORIGIN=http://localhost:5173
```

Start the backend server:
```sh
uvicorn main:app --reload
```
The API will be available at [http://localhost:8000](http://localhost:8000).

**API Documentation:**
- Visit [http://localhost:8000/docs](http://localhost:8000/docs) in your browser to view the interactive Swagger UI and explore the available API endpoints.

### 3. Frontend Setup
```sh
cd ../frontend
npm install
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Usage
- Visit the frontend in your browser.
- Use the UI to upload a JSON file containing asset data.
- The backend will process the file and update the database.
- View and manage assets via the frontend interface.

---

## License
- Backend: MIT
- Frontend: Internal use (contact maintainer for details) 