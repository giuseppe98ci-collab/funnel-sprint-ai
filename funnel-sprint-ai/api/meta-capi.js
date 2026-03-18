import crypto from 'crypto'

const PIXEL_ID = '618972313422090'
const ACCESS_TOKEN = process.env.META_CAPI_TOKEN

function hashSHA256(value) {
  if (!value) return undefined
  const trimmed = String(value).trim().toLowerCase()
  if (!trimmed) return undefined
  return crypto.createHash('sha256').update(trimmed).digest('hex')
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const { event_name, event_id, event_source_url, custom_data, user_data } = req.body

    if (!event_name) {
      return res.status(400).json({ error: 'Missing event_name' })
    }

    const hashedUserData = {}
    if (user_data) {
      if (user_data.em) hashedUserData.em = [hashSHA256(user_data.em)]
      if (user_data.ph) hashedUserData.ph = [hashSHA256(user_data.ph)]
      if (user_data.fn) hashedUserData.fn = [hashSHA256(user_data.fn)]
      if (user_data.ln) hashedUserData.ln = [hashSHA256(user_data.ln)]
    }

    // Forward client IP and user agent for better matching
    hashedUserData.client_ip_address = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress
    hashedUserData.client_user_agent = req.headers['user-agent']

    // Get fbc/fbp cookies if forwarded
    if (user_data?.fbc) hashedUserData.fbc = user_data.fbc
    if (user_data?.fbp) hashedUserData.fbp = user_data.fbp

    const eventPayload = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: event_id || undefined,
          event_source_url: event_source_url || undefined,
          action_source: 'website',
          user_data: hashedUserData,
          custom_data: custom_data || undefined,
        },
      ],
    }

    const capiRes = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      }
    )

    const capiData = await capiRes.json()

    if (!capiRes.ok) {
      console.error('Meta CAPI error:', JSON.stringify(capiData))
      return res.status(502).json({ error: 'CAPI request failed', details: capiData })
    }

    return res.status(200).json({ success: true, ...capiData })
  } catch (error) {
    console.error('Meta CAPI handler error:', error.message || error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
