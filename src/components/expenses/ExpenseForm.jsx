import { useState, useRef } from 'react'
import { X, Camera, ImageIcon } from 'lucide-react'
import { useExpenseStore } from '../../store/expenseStore'
import { useReceiptStore } from '../../store/receiptStore'
import { EXPENSE_CATEGORIES } from '../../data/itinerary'

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export default function ExpenseForm({ onClose }) {
  const { addExpense } = useExpenseStore()
  const { addReceipt } = useReceiptStore()

  const [form, setForm] = useState({
    category: 'fuel',
    amount: '',
    merchant: '',
    description: '',
    day: '',
    isEstimate: false,
    receiptId: null,
  })
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  const cameraRef = useRef(null)
  const fileRef = useRef(null)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleFile = async (file) => {
    if (!file) return
    setUploading(true)
    setPreview(URL.createObjectURL(file))
    const id = await addReceipt(file)
    setForm(f => ({ ...f, receiptId: id }))
    setUploading(false)
  }

  const removeReceipt = () => {
    setPreview(null)
    setForm(f => ({ ...f, receiptId: null }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.amount || isNaN(parseFloat(form.amount))) return
    addExpense({
      id: generateId(),
      day: form.day ? parseInt(form.day) : null,
      category: form.category,
      amount: parseFloat(parseFloat(form.amount).toFixed(2)),
      description: form.description,
      merchant: form.merchant,
      receiptId: form.receiptId,
      timestamp: new Date().toISOString(),
      isEstimate: form.isEstimate,
    })
    onClose()
  }

  return (
    <>
      <div className="bottom-sheet-overlay" onClick={onClose} />
      <div className="bottom-sheet">
        <div className="bottom-sheet-handle" />
        <div className="px-4 py-3 border-b border-[#e2e8f0] flex items-center justify-between">
          <h2 className="font-semibold text-[#0f172a]">Add Expense</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-[#94a3b8] hover:text-[#64748b] rounded-xl hover:bg-[#f8fafc] transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4 space-y-5">
          {/* Category */}
          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-2.5">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {EXPENSE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => set('category', cat.id)}
                  className={`py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                    form.category === cat.id
                      ? 'border-[#f97316] bg-[#fff7ed] text-[#f97316]'
                      : 'border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] hover:border-[#cbd5e1]'
                  }`}
                >
                  {cat.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-2">Amount *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] font-mono text-sm">$</span>
              <input
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                required
                placeholder="0.00"
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
                className="w-full bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#f97316] rounded-xl pl-8 pr-4 py-3 text-base font-mono text-[#0f172a] placeholder-[#94a3b8] outline-none transition-colors"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Merchant */}
          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-2">Merchant</label>
            <input
              type="text"
              placeholder="Shell Gas Station"
              value={form.merchant}
              onChange={e => set('merchant', e.target.value)}
              className="w-full bg-[#f8fafc] border border-[#e2e8f0] focus:border-[#f97316] rounded-xl px-4 py-3 text-base text-[#0f172a] placeholder-[#94a3b8] outline-none transition-colors"
              style={{ fontSize: '16px' }}
            />
          </div>

          {/* Day */}
          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-2">Trip Day</label>
            <div className="flex gap-2">
              {['', '1', '2', '3', '4', '5'].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => set('day', d)}
                  className={`flex-1 py-2.5 rounded-xl border text-sm font-mono transition-colors ${
                    form.day === d
                      ? 'border-[#f97316] bg-[#fff7ed] text-[#f97316]'
                      : 'border-[#e2e8f0] bg-[#f8fafc] text-[#64748b]'
                  }`}
                >
                  {d === '' ? 'Any' : `D${d}`}
                </button>
              ))}
            </div>
          </div>

          {/* Receipt */}
          <div>
            <label className="block text-[10px] font-semibold tracking-widest uppercase text-[#94a3b8] mb-2">Receipt</label>
            {preview ? (
              <div className="relative inline-flex">
                <img
                  src={preview}
                  alt="Receipt preview"
                  className={`h-28 w-auto rounded-xl object-cover border border-[#e2e8f0] ${uploading ? 'opacity-50' : ''}`}
                />
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-[#64748b] font-medium">Saving...</span>
                  </div>
                )}
                {!uploading && (
                  <button
                    type="button"
                    onClick={removeReceipt}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-[#e2e8f0] rounded-full flex items-center justify-center text-[#94a3b8] hover:text-[#ef4444] shadow-sm transition-colors"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <label className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border border-dashed border-[#e2e8f0] bg-[#f8fafc] text-xs text-[#64748b] cursor-pointer hover:border-[#f97316] hover:text-[#f97316] transition-colors">
                  <Camera size={18} />
                  Take Photo
                  <input
                    ref={cameraRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={e => handleFile(e.target.files[0])}
                  />
                </label>
                <label className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border border-dashed border-[#e2e8f0] bg-[#f8fafc] text-xs text-[#64748b] cursor-pointer hover:border-[#f97316] hover:text-[#f97316] transition-colors">
                  <ImageIcon size={18} />
                  Upload
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={e => handleFile(e.target.files[0])}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Estimate toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => set('isEstimate', !form.isEstimate)}
              className={`w-11 h-6 rounded-full transition-colors ${form.isEstimate ? 'bg-[#f97316]' : 'bg-[#e2e8f0]'} relative`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.isEstimate ? 'translate-x-6' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm text-[#64748b]">This is an estimate</span>
          </label>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-[#f97316] hover:bg-[#ea6c0e] disabled:opacity-50 text-white font-semibold rounded-2xl py-3.5 transition-colors text-base"
          >
            Add Expense
          </button>
        </form>
      </div>
    </>
  )
}
