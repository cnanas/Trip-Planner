export async function loadState(key) {
  try {
    const res = await fetch(`/api/sync?key=${key}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export function saveState(key, data) {
  fetch(`/api/sync?key=${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  }).catch((e) => console.warn('[db] sync failed:', e))
}
