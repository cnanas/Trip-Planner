export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') return res.status(405).end()

  const password = process.env.AUTH_PASSWORD
  if (!password) return res.status(503).json({ error: 'Auth not configured' })

  const { password: attempt } = req.body
  if (attempt === password) {
    return res.json({ ok: true })
  }
  return res.status(401).json({ ok: false })
}
