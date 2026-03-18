import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { openDB } from 'idb'

const DB = 'rtp-receipts'
const BLOB_STORE = 'blobs'
let _db

function getDB() {
  return (_db ??= openDB(DB, 1, {
    upgrade(db) {
      db.createObjectStore(BLOB_STORE)
    },
  }))
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export const useReceiptStore = create(
  persist(
    (set) => ({
      receipts: [],

      addReceipt: async (file, expenseId = null) => {
        const id = uid()
        const idb = await getDB()
        await idb.put(BLOB_STORE, file, id)
        set((s) => ({
          receipts: [
            {
              id,
              name: file.name,
              size: file.size,
              mimeType: file.type,
              timestamp: new Date().toISOString(),
              expenseId,
            },
            ...s.receipts,
          ],
        }))
        return id
      },

      deleteReceipt: async (id) => {
        const idb = await getDB()
        await idb.delete(BLOB_STORE, id)
        set((s) => ({ receipts: s.receipts.filter((r) => r.id !== id) }))
      },

      getObjectUrl: async (id) => {
        const idb = await getDB()
        const blob = await idb.get(BLOB_STORE, id)
        return blob ? URL.createObjectURL(blob) : null
      },
    }),
    { name: 'rtp-receipt-meta' }
  )
)
