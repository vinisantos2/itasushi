'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  onSelect: (file: File) => void
  onRemove?: () => void // ⭐ opcional
}

export default function ImageUploader({ onSelect, onRemove }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    onSelect(file)

    // permite selecionar o mesmo arquivo novamente
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setPreviewUrl(null)

    // limpa input
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    onRemove?.()
  }

  // evita memory leak ao desmontar
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleSelect}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {previewUrl && (
        <div className="flex items-start gap-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded border"
          />

          <button
            type="button"
            onClick={handleRemove}
            className="h-fit px-3 py-1.5 text-sm font-medium rounded-lg
                       bg-red-50 text-red-600 hover:bg-red-100
                       border border-red-200 transition"
          >
            Remover
          </button>
        </div>
      )}
    </div>
  )
}