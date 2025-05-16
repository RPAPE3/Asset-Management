"use client"

import type React from "react"

import { useState } from "react"
import type { Category } from "../types/types"

interface FileUploadProps {
  onDataUpload: (data: Category[]) => Promise<void>
}

export default function FileUpload({ onDataUpload }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setSuccess(false)

    const file = event.target.files?.[0]
    if (!file) return

    // Check if file is JSON
    if (file.type !== "application/json" && !file.name.endsWith(".json")) {
      setError("Please upload a valid JSON file")
      return
    }

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string)

        try {
          await onDataUpload(jsonData)
          setSuccess(true)
        } catch (uploadErr) {
          setError("Failed to upload data to backend")
          return
        }

        event.target.value = ""
      } catch (err) {
        setError("Error parsing JSON file")
        console.error(err)
      }
    }

    reader.readAsText(file)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Asset Data</h2>

      <div className="flex flex-col space-y-4">
        <label className="flex flex-col items-center px-4 py-6 bg-gray-50 text-gray-500 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
          <svg
            className="w-8 h-8 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-sm font-medium">Click to upload JSON file</span>
          <input type="file" className="hidden" accept=".json,application/json" onChange={handleFileChange} />
        </label>

        {error && <div className="p-3 bg-red-50 text-red-700 rounded-md">{error}</div>}

        {success && (
          <div className="p-3 bg-green-50 text-green-700 rounded-md">
            File uploaded successfully! The asset list has been updated.
          </div>
        )}
      </div>
    </div>
  )
}
