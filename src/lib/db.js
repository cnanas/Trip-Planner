import { getTripCode } from './tripCode'

function prefixKey(key) {
  const code = getTripCode()
  return code ? `${code}:${key}` : key
}

export async function loadState(key) {
  try {
    const res = await fetch(`/api/sync?key=${prefixKey(key)}`)
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export function saveState(key, data) {
  fetch(`/api/sync?key=${prefixKey(key)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data }),
  }).catch((e) => console.warn('[db] sync failed:', e))
}
