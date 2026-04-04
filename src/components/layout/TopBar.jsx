import { Map } from 'lucide-react'
import ThemePicker from '../ThemePicker'
import TripCodePicker from '../TripCodePicker'
import { useTheme } from '../../context/ThemeContext'

export default function TopBar({ title = 'Road Trip' }) {
  const { accent } = useTheme()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 bg-white border-b border-[#e2e8f0]"
      style={{
        paddingTop: 'calc(var(--safe-top) + 10px)',
        height: 'calc(var(--safe-top) + 52px)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors" style={{ background: accent }}>
          <Map size={14} className="text-white" />
        </div>
        <span className="font-semibold text-sm text-[#0f172a]">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <TripCodePicker compact />
        <ThemePicker />
      </div>
    </header>
  )
}
