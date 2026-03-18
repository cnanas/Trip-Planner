// Re-export from itinerary.js as the single source of truth
export { EXPENSE_CATEGORIES, DEFAULT_BUDGET } from './itinerary'

// Convenience map for quick lookups
import { EXPENSE_CATEGORIES } from './itinerary'
export const CATEGORY_MAP = Object.fromEntries(EXPENSE_CATEGORIES.map(c => [c.id, c]))
