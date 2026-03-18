import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Sidebar from './Sidebar'
import BottomTabBar from './BottomTabBar'

export default function AppShell() {
  return (
    <div className="flex h-full bg-white">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <div className="md:hidden">
          <TopBar />
        </div>

        <main
          className="flex-1 overflow-y-auto bg-[#f8fafc]"
          style={{
            paddingTop: 'calc(var(--safe-top) + 52px)',
            paddingBottom: 'calc(var(--tab-bar-height) + var(--safe-bottom) + 16px)',
          }}
        >
          <div className="h-full">
            <Outlet />
          </div>
        </main>

        <BottomTabBar />
      </div>
    </div>
  )
}
