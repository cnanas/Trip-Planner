import { NavLink } from 'react-router-dom'
import { Map, CreditCard, ScanLine, BookOpen, BarChart2, ClipboardList } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/',          Icon: Map,           label: 'Itinerary' },
  { to: '/expenses',  Icon: CreditCard,    label: 'Expenses'  },
  { to: '/receipts',  Icon: ScanLine,      label: 'Receipts'  },
  { to: '/journal',   Icon: BookOpen,      label: 'Journal'   },
  { to: '/summary',   Icon: BarChart2,     label: 'Summary'   },
  { to: '/checklist', Icon: ClipboardList, label: 'Checklist' },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 bg-white border-r border-[#e2e8f0] shrink-0">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#e2e8f0]">
        <div className="w-7 h-7 bg-[#f97316] rounded-lg flex items-center justify-center shrink-0">
          <Map size={14} className="text-white" />
        </div>
        <span className="font-semibold text-sm text-[#0f172a]">Road Trip</span>
      </div>
      <nav className="flex flex-col gap-0.5 p-2 flex-1">
        {NAV_ITEMS.map(({ to, Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                isActive
                  ? 'bg-[#fff7ed] text-[#f97316] font-medium'
                  : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
