const PIXEL_ID = '1984612195432322';
const ACCESS_TOKEN = 'EAAWc97ipiW0BQm99opeN6BXsAvfIBUNmesZAt6jhJMxFNaIExPnyVeO5dSPBOEXasRpq6ttAL6vdj056FuvaTcEEy4Bt5sq1ui5y2Fy0vo9pNL13QrEhCSxU1wR1U6FvmA11aGYDJxMCyHlcYZCxZBjeo3FQ3Vc1kZCVFymgZByfFnPz2S4eObFeumZCK0obvJzwZDZD';
const API_VERSION = 'v21.0';
const TELEGRAM_LINK = 'https://t.me/+xm4vsqS5IwdkYWRk';

export default async function handler(req, res) {
  const variant = req.query.v || 'unknown';
  const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  const referer = req.headers['referer'] || req.headers['origin'] || 'https://nickparoditrading.com';
  const fbp = req.cookies?._fbp || req.query.fbp || null;
  const fbc = req.cookies?._fbc || req.query.fbc || null;

  const event = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: referer,
    action_source: 'website',
    user_data: {
      client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
      client_user_agent: req.headers['user-agent'],
      ...(fbp && { fbp }),
      ...(fbc && { fbc }),
    },
    custom_data: {
      variant,
      content_name: 'Nick Parodi Telegram CTA',
    },
  };

  // Fire CAPI - don't await, redirect immediately
  fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [event] }),
    }
  ).catch(() => {});

  // 302 redirect to Telegram
  res.setHeader('Location', TELEGRAM_LINK);
  res.setHeader('Cache-Control', 'no-cache, no-store');
  return res.status(302).end();
}
