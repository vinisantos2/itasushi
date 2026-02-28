'use client'

import { useEffect, useRef, useState } from 'react'
import { convertImageToWebP } from '@/src/utils/imageUtils'

type Props = {
  onSelect: (file: File) => void
  onRemove?: () => void
}

export default function ImageUploader({ onSelect, onRemove }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setLoading(true)

      // 🔥 CONVERSÃO ACONTECE AQUI
      const optimizedFile = await convertImageToWebP(file)

      const url = URL.createObjectURL(optimizedFile)
      setPreviewUrl(url)

      onSelect(optimizedFile)

      // permite selecionar o mesmo arquivo novamente
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    } catch (error) {
      console.error('Erro ao processar imagem:', error)
      alert('Erro ao processar imagem.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    setPreviewUrl(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    onRemove?.()
  }

  // cleanup
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
        disabled={loading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                   disabled:opacity-50"
      />

      {loading && (
        <p className="text-sm text-gray-500">Processando imagem...</p>
      )}

      {previewUrl && !loading && (
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