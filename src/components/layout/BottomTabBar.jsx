import { NavLink } from 'react-router-dom'
import { Navigation, Map, CreditCard, ScanLine, BookOpen, BarChart2, ClipboardList } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const TABS = [
  { to: '/',           Icon: Navigation,    label: 'Drive'     },
  { to: '/itinerary',  Icon: Map,           label: 'Itinerary' },
  { to: '/expenses',   Icon: CreditCard,    label: 'Expenses'  },
  { to: '/receipts',   Icon: ScanLine,      label: 'Receipts'  },
  { to: '/journal',    Icon: BookOpen,      label: 'Journal'   },
  { to: '/summary',    Icon: BarChart2,     label: 'Summary'   },
  { to: '/checklist',  Icon: ClipboardList, label: 'Checklist' },
]

export default function BottomTabBar() {
  const { accent, pill } = useTheme()

  return (
    <nav
      className="fixed z-30 md:hidden flex items-center gap-0.5 px-2 py-2"
      style={{
        bottom: 'max(var(--safe-bottom), 18px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255, 255, 255, 0.72)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.55)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)',
      }}
    >
      {TABS.map(({ to, Icon, label }) => (
        <NavLink key={to} to={to} end={to === '/'} title={label}>
          {({ isActive }) => (
            <div
              className="flex items-center justify-center transition-all duration-200"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '999px',
                background: isActive ? pill : 'transparent',
              }}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.2 : 1.5}
                style={{ color: isActive ? accent : '#94a3b8' }}
              />
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
