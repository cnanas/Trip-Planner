import { NavLink } from 'react-router-dom'

const TABS = [
  { to: '/',         icon: '🗺️',  label: 'Itinerary' },
  { to: '/expenses', icon: '💰',  label: 'Expenses'  },
  { to: '/receipts', icon: '🧾',  label: 'Receipts'  },
  { to: '/journal',  icon: '📔',  label: 'Journal'   },
  { to: '/summary',  icon: '📊',  label: 'Summary'   },
]

export default function BottomTabBar() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#e2e8f0] flex md:hidden"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      {TABS.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-xs transition-colors min-h-[56px] ${
              isActive ? 'text-[#f97316]' : 'text-[#94a3b8] hover:text-[#64748b]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className="text-xl leading-none">{tab.icon}</span>
              <span
                className={`text-[10px] font-medium leading-none transition-all ${
                  isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                }`}
              >
                {tab.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
