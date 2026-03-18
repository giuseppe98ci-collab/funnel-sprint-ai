const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = '6600KjjI4Q4k8ICFPzFC';

const ghlHeaders = {
  'Authorization': `Bearer ${GHL_API_KEY}`,
  'Version': '2021-07-28',
  'Content-Type': 'application/json',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email } = req.body;

    if (!email || !email.includes('@') || email.length < 5) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Upsert contact on GHL with lead tag (NOT acquisto-fso)
    const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify({
        email,
        locationId: GHL_LOCATION_ID,
        tags: ['funnel-sprint-ai', 'lead-fso'],
        source: 'funnel-sprint-ai',
      }),
    });

    const upsertData = await upsertRes.json();
    const contactId = upsertData?.contact?.id;

    return res.status(200).json({ success: true, contactId });
  } catch (error) {
    console.error('Capture lead error:', error.message || error);
    return res.status(500).json({ error: 'Failed to capture lead' });
  }
}
