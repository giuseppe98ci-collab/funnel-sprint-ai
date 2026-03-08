const PIXEL_ID = '1984612195432322';
const ACCESS_TOKEN = 'EAAWc97ipiW0BQm99opeN6BXsAvfIBUNmesZAt6jhJMxFNaIExPnyVeO5dSPBOEXasRpq6ttAL6vdj056FuvaTcEEy4Bt5sq1ui5y2Fy0vo9pNL13QrEhCSxU1wR1U6FvmA11aGYDJxMCyHlcYZCxZBjeo3FQ3Vc1kZCVFymgZByfFnPz2S4eObFeumZCK0obvJzwZDZD';
const API_VERSION = 'v21.0';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const { event_name, event_id, source_url, user_agent, ip, variant, fbp, fbc } = req.body;

    const event = {
      event_name: event_name || 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      event_id: event_id,
      event_source_url: source_url,
      action_source: 'website',
      user_data: {
        client_ip_address: ip || req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
        client_user_agent: user_agent || req.headers['user-agent'],
        ...(fbp && { fbp }),
        ...(fbc && { fbc }),
      },
      custom_data: {
        variant: variant,
        content_name: 'Nick Parodi Telegram CTA',
      },
    };

    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [event],
        }),
      }
    );

    const result = await response.json();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
