const GHL_API = 'https://services.leadconnectorhq.com'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const token = process.env.GHL_ACCESS_TOKEN
  if (!token) {
    return res.status(500).json({ error: 'GHL_ACCESS_TOKEN non configurato' })
  }

  const { action } = req.query

  try {
    // ── GET FREE SLOTS ──
    if (action === 'free-slots' && req.method === 'GET') {
      const { startDate, endDate, calendarId } = req.query
      if (!startDate || !endDate || !calendarId) {
        return res.status(400).json({ error: 'startDate, endDate e calendarId richiesti' })
      }
      // GHL expects epoch ms — convert if date string was sent
      const toEpoch = (v) => {
        const n = Number(v)
        if (!isNaN(n) && n > 1e12) return n // already epoch ms
        const d = new Date(v)
        return isNaN(d.getTime()) ? v : d.getTime()
      }
      const url = `${GHL_API}/calendars/${calendarId}/free-slots?startDate=${toEpoch(startDate)}&endDate=${toEpoch(endDate)}`
      const r = await fetch(url, {
        headers: { Authorization: `Bearer ${token}`, Version: '2021-04-15' },
      })
      const data = await r.json()
      if (!r.ok) return res.status(r.status).json(data)
      return res.status(200).json(data)
    }

    // ── UPSERT CONTACT ──
    if (action === 'upsert-contact' && req.method === 'POST') {
      const { firstName, lastName, email, phone, locationId } = req.body || {}
      if (!email && !phone) {
        return res.status(400).json({ error: 'Email o telefono richiesti' })
      }
      const r = await fetch(`${GHL_API}/contacts/upsert`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Version: '2021-07-28',
        },
        body: JSON.stringify({
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          phone: phone || '',
          source: 'traderboost-funnel',
          locationId: locationId || undefined,
        }),
      })
      const data = await r.json()
      if (!r.ok) return res.status(r.status).json(data)
      return res.status(200).json(data)
    }

    // ── CREATE APPOINTMENT ──
    if (action === 'create-appointment' && req.method === 'POST') {
      const { calendarId, contactId, slot, locationId, name } = req.body || {}
      if (!calendarId || !contactId || !slot) {
        return res.status(400).json({ error: 'calendarId, contactId e slot richiesti' })
      }

      // Calculate startTime and endTime (30min default duration)
      const startDate = new Date(slot)
      const endDate = new Date(startDate.getTime() + 30 * 60 * 1000)

      const r = await fetch(`${GHL_API}/calendars/events/appointments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Version: '2021-04-15',
        },
        body: JSON.stringify({
          calendarId,
          locationId,
          contactId,
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
          title: `Consulenza: ${name || 'Lead TraderBoost'}`,
          appointmentStatus: 'new',
          ignoreFreeSlotValidation: false,
        }),
      })
      const data = await r.json()
      if (!r.ok) return res.status(r.status).json(data)
      return res.status(200).json(data)
    }

    return res.status(400).json({ error: `Azione non valida: ${action}` })
  } catch (err) {
    console.error('GHL API error:', err)
    return res.status(500).json({ error: 'Errore interno del server' })
  }
}
