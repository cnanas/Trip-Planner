import { NavLink } from 'react-router-dom'
import { Map, CreditCard, ScanLine, BookOpen, BarChart2 } from 'lucide-react'

const TABS = [
  { to: '/',         Icon: Map,        label: 'Itinerary' },
  { to: '/expenses', Icon: CreditCard, label: 'Expenses'  },
  { to: '/receipts', Icon: ScanLine,   label: 'Receipts'  },
  { to: '/journal',  Icon: BookOpen,   label: 'Journal'   },
  { to: '/summary',  Icon: BarChart2,  label: 'Summary'   },
]

export default function BottomTabBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#e2e8f0] flex md:hidden"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      {TABS.map(({ to, Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors min-h-[56px] ${
              isActive ? 'text-[#f97316]' : 'text-[#94a3b8] hover:text-[#64748b]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
              <span className={`text-[10px] font-medium leading-none transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
