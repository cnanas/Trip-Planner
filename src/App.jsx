import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { TripCodeProvider, useTripCode } from './context/TripCodeContext'
import AppShell from './components/layout/AppShell'
import DBInit from './components/DBInit'
import DrivePage from './pages/DrivePage'
import ItineraryPage from './pages/ItineraryPage'
import ExpensesPage from './pages/ExpensesPage'
import ReceiptsPage from './pages/ReceiptsPage'
import JournalPage from './pages/JournalPage'
import SummaryPage from './pages/SummaryPage'
import ChecklistPage from './pages/ChecklistPage'

function DBInitBridge() {
  const { tripCode } = useTripCode()
  return <DBInit tripCode={tripCode} />
}

export default function App() {
  return (
    <TripCodeProvider>
    <ThemeProvider>
    <BrowserRouter>
      <DBInitBridge />
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DrivePage />} />
          <Route path="itinerary" element={<ItineraryPage />} />
          <Route path="summary" element={<SummaryPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="receipts" element={<ReceiptsPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="checklist" element={<ChecklistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
    </TripCodeProvider>
  )
}
