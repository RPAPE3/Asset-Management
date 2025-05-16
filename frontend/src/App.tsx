"use client"

import { useState, useEffect } from "react"
import FileUpload from "./components/file-upload"
// import AssetList from "./components/asset-list"
import type { Category } from "./types/types"

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])

  // Move fetchCategories outside useEffect
  const fetchCategories = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories from backend');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDataUpload = async (data: Category[]) => {
    // Send data to backend as a file upload
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    formData.append('file', jsonBlob, 'assets.json');

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/rebuild-database`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload data to backend');
    }
    // Re-fetch categories after successful upload
    await fetchCategories();
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Asset Management</h1>

        <div className="mb-8">
          <FileUpload onDataUpload={handleDataUpload} />
        </div>

        {categories.length > 0 ? (
          <div></div>
          // <AssetList categories={categories} />
        ) : (
          <div className="text-center p-10 bg-white rounded-lg shadow">
            <p className="text-gray-500">No assets found. Please upload a JSON file to get started.</p>
          </div>
        )}
      </div>
    </main>
  )
}
