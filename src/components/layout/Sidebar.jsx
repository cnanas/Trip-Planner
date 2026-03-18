import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/',         icon: '🗺️',  label: 'Itinerary' },
  { to: '/expenses', icon: '💰',  label: 'Expenses'  },
  { to: '/receipts', icon: '🧾',  label: 'Receipts'  },
  { to: '/journal',  icon: '📔',  label: 'Journal'   },
  { to: '/summary',  icon: '📊',  label: 'Summary'   },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-56 bg-white border-r border-[#e2e8f0] shrink-0">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-[#e2e8f0]">
        <span className="text-xl">🚛</span>
        <span className="font-mono text-sm font-bold text-[#0f172a]">Road Trip</span>
      </div>
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[#fff7ed] text-[#f97316] font-medium'
                  : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
