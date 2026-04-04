// Build a Google Maps multi-stop directions URL.
// Each point can be { lat, lng } or an address string.
// Produces: https://www.google.com/maps/dir/point1/point2/.../pointN
export function buildGoogleMapsUrl(points) {
  const parts = points.map((p) => {
    if (typeof p === 'string') return encodeURIComponent(p)
    return `${p.lat},${p.lng}`
  })
  return `https://www.google.com/maps/dir/${parts.join('/')}`
}
