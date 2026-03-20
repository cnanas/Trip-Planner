import { createContext, useContext, useState } from 'react'

export const THEMES = [
  { name: 'Orange', accent: '#f97316', pill: 'rgba(249,115,22,0.12)'  },
  { name: 'Blue',   accent: '#3b82f6', pill: 'rgba(59,130,246,0.12)'  },
  { name: 'Violet', accent: '#7c3aed', pill: 'rgba(124,58,237,0.12)'  },
  { name: 'Green',  accent: '#22c55e', pill: 'rgba(34,197,94,0.12)'   },
  { name: 'Pink',   accent: '#ec4899', pill: 'rgba(236,72,153,0.12)'  },
  { name: 'Teal',   accent: '#0d9488', pill: 'rgba(13,148,136,0.12)'  },
]

const ThemeContext = createContext(THEMES[0])

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('rt-theme')
    return THEMES.find(t => t.accent === saved) ?? THEMES[0]
  })

  const setAccent = (accent) => {
    const t = THEMES.find(t => t.accent === accent) ?? THEMES[0]
    setTheme(t)
    localStorage.setItem('rt-theme', t.accent)
  }

  return (
    <ThemeContext.Provider value={{ ...theme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
