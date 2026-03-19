import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

const SESSION_KEY = 'rtp-auth'
const SESSION_HOURS = 8

export function isAuthed() {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY)
    if (!stored) return false
    const { expiry } = JSON.parse(stored)
    return Date.now() < expiry
  } catch {
    return false
  }
}

export default function AuthGate({ onAuth }) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({
          expiry: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
        }))
        onAuth()
      } else {
        setError(true)
        setPassword('')
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-12">
      <div className="w-full max-w-xs">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-[#f97316] rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-[#0f172a]">Private</h1>
          <p className="text-sm text-[#64748b] mt-1.5 text-center">Enter the password to access this section</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              autoFocus
              className={`w-full bg-[#f8fafc] border rounded-xl px-4 py-3.5 text-base text-[#0f172a] placeholder-[#94a3b8] outline-none transition-colors pr-12 ${
                error ? 'border-[#ef4444] bg-[#fef2f2]' : 'border-[#e2e8f0] focus:border-[#f97316]'
              }`}
              style={{ fontSize: '16px' }}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b] transition-colors p-1"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <p className="text-xs text-[#ef4444] text-center">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#f97316] hover:bg-[#ea6c0e] disabled:opacity-50 text-white font-semibold rounded-2xl py-3.5 transition-colors text-base"
          >
            {loading ? 'Checking...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  )
}
