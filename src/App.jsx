import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import AppShell from './components/layout/AppShell'
import DBInit from './components/DBInit'
import AuthGate, { isAuthed } from './components/AuthGate'
import DrivePage from './pages/DrivePage'
import ItineraryPage from './pages/ItineraryPage'
import ExpensesPage from './pages/ExpensesPage'
import ReceiptsPage from './pages/ReceiptsPage'
import JournalPage from './pages/JournalPage'
import SummaryPage from './pages/SummaryPage'
import ChecklistPage from './pages/ChecklistPage'

function PrivateRoute({ children }) {
  const [authed, setAuthed] = useState(isAuthed)
  if (!authed) return <AuthGate onAuth={() => setAuthed(true)} />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <DBInit />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DrivePage />} />
          <Route path="itinerary" element={<ItineraryPage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="expenses" element={<PrivateRoute><ExpensesPage /></PrivateRoute>} />
          <Route path="receipts" element={<PrivateRoute><ReceiptsPage /></PrivateRoute>} />
          <Route path="journal" element={<PrivateRoute><JournalPage /></PrivateRoute>} />
          <Route path="checklist" element={<PrivateRoute><ChecklistPage /></PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}
