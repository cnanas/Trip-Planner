import { neon } from '@neondatabase/serverless'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const dbUrl = process.env.trip_DATABASE_URL || process.env.trip_POSTGRES_URL
  if (!dbUrl) {
    return res.status(503).json({ error: 'Database not configured' })
  }

  const sql = neon(dbUrl)

  try {
    if (req.method === 'GET') {
      const { id } = req.query
      const rows = await sql`SELECT data, mime_type FROM receipt_blobs WHERE id = ${id}`
      if (!rows[0]) return res.status(404).end()
      const buf = Buffer.from(rows[0].data, 'base64')
      res.setHeader('Content-Type', rows[0].mime_type)
      res.setHeader('Cache-Control', 'private, max-age=86400')
      return res.send(buf)
    }

    if (req.method === 'POST') {
      const { id, data, mimeType } = req.body
      await sql`
        INSERT INTO receipt_blobs (id, data, mime_type)
        VALUES (${id}, ${data}, ${mimeType})
        ON CONFLICT (id) DO NOTHING
      `
      return res.json({ ok: true })
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      await sql`DELETE FROM receipt_blobs WHERE id = ${id}`
      return res.json({ ok: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (e) {
    console.error('[receipt-blob]', e)
    res.status(500).json({ error: e.message })
  }
}
