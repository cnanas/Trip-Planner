import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import ItineraryPage from './pages/ItineraryPage'
import ExpensesPage from './pages/ExpensesPage'
import ReceiptsPage from './pages/ReceiptsPage'
import JournalPage from './pages/JournalPage'
import SummaryPage from './pages/SummaryPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<ItineraryPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="receipts" element={<ReceiptsPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="summary" element={<SummaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
