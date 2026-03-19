import { useEffect } from 'react'
import { useChecklistStore } from '../store/checklistStore'
import { useExpenseStore } from '../store/expenseStore'
import { useJournalStore } from '../store/journalStore'
import { useTripStore } from '../store/tripStore'
import { useReceiptStore } from '../store/receiptStore'

export default function DBInit() {
  const initChecklist = useChecklistStore((s) => s.init)
  const initExpenses = useExpenseStore((s) => s.init)
  const initJournal = useJournalStore((s) => s.init)
  const initTrip = useTripStore((s) => s.init)
  const initReceipts = useReceiptStore((s) => s.init)

  useEffect(() => {
    initChecklist()
    initExpenses()
    initJournal()
    initTrip()
    initReceipts()
  }, [])

  return null
}
