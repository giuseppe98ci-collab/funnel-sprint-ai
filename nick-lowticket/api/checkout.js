const STRIPE_SK = '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';
const PRICE_ID = 'price_1T6aK3PbCvQnn6IOGUNnXquF';
const SUCCESS_URL = 'https://t.me/m/CKyBPLzyN2Vk';
const CANCEL_URL = 'https://nickparoditrading.com/guida-alla-crisi';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SK}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': 'payment',
        'line_items[0][price]': PRICE_ID,
        'line_items[0][quantity]': '1',
        'success_url': SUCCESS_URL,
        'cancel_url': CANCEL_URL,
        'payment_method_types[0]': 'card',
        'allow_promotion_codes': 'true',
      }).toString(),
    });

    const session = await response.json();

    if (session.error) {
      return res.status(400).json({ error: session.error.message });
    }

    res.setHeader('Location', session.url);
    res.setHeader('Cache-Control', 'no-cache, no-store');
    return res.status(303).end();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
