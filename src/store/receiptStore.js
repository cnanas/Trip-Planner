import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { loadState, saveState } from '../lib/db'
import { getTripCode } from '../lib/tripCode'

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export const useReceiptStore = create(
  persist(
    (set, get) => ({
      receipts: [],

      init: async () => {
        const data = await loadState('receipts')
        set({ receipts: Array.isArray(data) ? data : [] })
      },

      addReceipt: async (file, expenseId = null) => {
        const code = getTripCode()
        const id = code ? `${code}:${uid()}` : uid()
        const base64 = await fileToBase64(file)

        await fetch('/api/receipt-blob', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, data: base64, mimeType: file.type }),
        })

        const newReceipts = [
          {
            id,
            name: file.name,
            size: file.size,
            mimeType: file.type,
            timestamp: new Date().toISOString(),
            expenseId,
          },
          ...get().receipts,
        ]
        set({ receipts: newReceipts })
        saveState('receipts', newReceipts)
        return id
      },

      deleteReceipt: async (id) => {
        await fetch(`/api/receipt-blob?id=${id}`, { method: 'DELETE' })
        const newReceipts = get().receipts.filter((r) => r.id !== id)
        set({ receipts: newReceipts })
        saveState('receipts', newReceipts)
      },

      // Returns a direct URL — no async needed, works as an img src
      getReceiptUrl: (id) => `/api/receipt-blob?id=${id}`,
    }),
    { name: 'rtp-receipt-meta' }
  )
)
