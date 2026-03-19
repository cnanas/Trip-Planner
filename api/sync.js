import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const dbUrl = process.env.trip_DATABASE_URL || process.env.trip_POSTGRES_URL
  if (!dbUrl) {
    return res.status(503).json({ error: 'Database not configured' })
  }

  const sql = neon(dbUrl)
  const { key } = req.query

  if (!key) return res.status(400).json({ error: 'key required' })

  try {
    if (req.method === 'GET') {
      const rows = await sql`SELECT data FROM app_state WHERE key = ${key}`
      return res.json(rows[0]?.data ?? null)
    }

    if (req.method === 'PUT') {
      const body = req.body
      await sql`
        INSERT INTO app_state (key, data, updated_at)
        VALUES (${key}, ${JSON.stringify(body.data)}::jsonb, NOW())
        ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
      `
      return res.json({ ok: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    console.error('[sync]', e)
    res.status(500).json({ error: e.message })
  }
}
