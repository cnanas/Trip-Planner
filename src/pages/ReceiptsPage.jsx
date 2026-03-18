import { useState, useEffect, useRef } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import { useReceiptStore } from '../store/receiptStore'

function formatBytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}

function ReceiptCard({ receipt }) {
  const { deleteReceipt, getObjectUrl } = useReceiptStore()
  const [url, setUrl] = useState(null)
  const [lightbox, setLightbox] = useState(false)
  const isImage = receipt.mimeType?.startsWith('image/')

  useEffect(() => {
    if (!isImage) return
    let objectUrl
    getObjectUrl(receipt.id).then((u) => {
      objectUrl = u
      setUrl(u)
    })
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [receipt.id, isImage])

  return (
    <>
      <div className="relative group bg-white rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-sm">
        {isImage && url ? (
          <button className="block w-full" onClick={() => setLightbox(true)}>
            <img
              src={url}
              alt={receipt.name}
              className="w-full h-36 object-cover"
            />
          </button>
        ) : (
          <div className="w-full h-36 flex items-center justify-center bg-[#f8fafc]">
            <FileText size={32} className="text-[#cbd5e1]" />
          </div>
        )}

        <div className="px-3 py-2.5">
          <p className="text-xs font-semibold text-[#0f172a] truncate">{receipt.name}</p>
          <p className="text-[10px] text-[#94a3b8] mt-0.5">{formatBytes(receipt.size)}</p>
        </div>

        <button
          onClick={() => deleteReceipt(receipt.id)}
          className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-[#94a3b8] hover:text-[#ef4444] shadow-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <X size={14} />
        </button>
      </div>

      {lightbox && url && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <img
            src={url}
            alt={receipt.name}
            className="max-w-full max-h-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
            onClick={() => setLightbox(false)}
          >
            <X size={18} />
          </button>
        </div>
      )}
    </>
  )
}

export default function ReceiptsPage() {
  const { receipts, addReceipt } = useReceiptStore()
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleFiles = async (files) => {
    setUploading(true)
    for (const file of files) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        await addReceipt(file)
      }
    }
    setUploading(false)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFiles([...e.dataTransfer.files])
  }

  return (
    <div className="flex flex-col min-h-full px-4 pt-4 pb-8">
      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-12 cursor-pointer transition-all ${
          dragging
            ? 'border-[#f97316] bg-[#fff7ed] scale-[0.99]'
            : uploading
            ? 'border-[#f97316] bg-[#fff7ed]'
            : 'border-[#e2e8f0] bg-[#f8fafc] hover:border-[#f97316] hover:bg-[#fff7ed]'
        }`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
          dragging || uploading ? 'bg-[#f97316]' : 'bg-white border border-[#e2e8f0]'
        }`}>
          <Upload size={20} className={dragging || uploading ? 'text-white' : 'text-[#64748b]'} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[#0f172a]">
            {uploading ? 'Saving...' : 'Upload receipts'}
          </p>
          <p className="text-xs text-[#94a3b8] mt-0.5">Photos and PDFs · tap or drag & drop</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFiles([...e.target.files])}
        />
      </div>

      {/* Receipt grid */}
      {receipts.length > 0 ? (
        <div className="mt-6">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-3">
            {receipts.length} {receipts.length === 1 ? 'Receipt' : 'Receipts'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {receipts.map((r) => (
              <ReceiptCard key={r.id} receipt={r} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-xs text-[#94a3b8] mt-10">No receipts saved yet</p>
      )}
    </div>
  )
}
