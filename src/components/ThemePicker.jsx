import { useState, useRef, useEffect } from 'react'
import { THEMES, useTheme } from '../context/ThemeContext'

export default function ThemePicker() {
  const { accent, setAccent } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('touchstart', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('touchstart', close)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-8 h-8 rounded-xl flex items-center justify-center border border-[#e2e8f0] bg-white transition-all active:scale-90"
        style={{ borderColor: open ? accent : undefined, boxShadow: open ? `0 0 0 3px ${accent}22` : undefined }}
        title="Change theme color"
      >
        <div className="w-4 h-4 rounded-full transition-colors" style={{ background: accent }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-10 z-50 flex gap-2 p-3 rounded-2xl border border-[#e2e8f0]"
          style={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            animation: 'picker-enter 150ms ease-out both',
          }}
        >
          {THEMES.map(t => (
            <button
              key={t.accent}
              onClick={() => { setAccent(t.accent); setOpen(false) }}
              title={t.name}
              className="w-7 h-7 rounded-full transition-transform active:scale-90 flex items-center justify-center"
              style={{
                background: t.accent,
                outline: t.accent === accent ? `2.5px solid ${t.accent}` : 'none',
                outlineOffset: '2px',
                boxShadow: t.accent === accent ? `0 0 0 4px ${t.accent}22` : 'none',
              }}
            >
              {t.accent === accent && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
