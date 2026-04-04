const LS_KEY = 'rtp-trip-code'

export function getTripCode() {
  return localStorage.getItem(LS_KEY) || ''
}

export function setTripCode(raw) {
  const sanitized = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  if (sanitized) {
    localStorage.setItem(LS_KEY, sanitized)
  } else {
    localStorage.removeItem(LS_KEY)
  }
  return sanitized
}
