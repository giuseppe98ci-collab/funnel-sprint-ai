import Stripe from 'stripe';
import crypto from 'crypto';

const STRIPE_SK = process.env.STRIPE_SECRET_KEY || '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';
const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-ff3ad135-3f51-4072-a533-533bc16038f9';
const GHL_LOCATION_ID = '6600KjjI4Q4k8ICFPzFC';
const GHL_VERSION = '2021-07-28';
const GHL_SOURCE_ID = '69495c442024d429282d6509';

const META_PIXEL_ID = '618972313422090';
const META_ACCESS_TOKEN = process.env.META_CAPI_TOKEN || 'EAAHWm0p7jxsBQ2eM6AvHoYpPJ5kXzZBP5xmUAaaw1fId6YCPmJkWBWWauye7ie9QSZCWAKsRA89UfJfsSyJWSkV1T4oTTqWTYLjUEgyIBuQatqvSPZB10jiz7WNSF1F7aE31gqprlzUgekbHdCpPsZAtoKrI6D17jdL5o7Yuf2UX6iUhnuzoaTcW4ZA5S74JhaQZDZD';

function hashSHA256(value) {
  if (!value) return undefined;
  const trimmed = String(value).trim().toLowerCase();
  if (!trimmed) return undefined;
  return crypto.createHash('sha256').update(trimmed).digest('hex');
}

const stripe = new Stripe(STRIPE_SK);

const ghlHeaders = {
  'Authorization': `Bearer ${GHL_API_KEY}`,
  'Version': GHL_VERSION,
  'Content-Type': 'application/json',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { paymentIntentId, firstName: formFirst, lastName: formLast, email: formEmail, phone: formPhone, bumpAdded } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify payment on Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['latest_charge'],
    });
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const amount = paymentIntent.amount;
    
    // Get billing details from Stripe charge (Apple Pay/Google Pay provide these)
    const billing = paymentIntent.latest_charge?.billing_details || {};
    const stripeName = billing.name || '';
    const stripeNameParts = stripeName.split(' ');
    
    const firstName = formFirst || stripeNameParts[0] || 'N/A';
    const lastName = formLast || stripeNameParts.slice(1).join(' ') || 'N/A';
    const email = formEmail || billing.email || paymentIntent.receipt_email || 'N/A';
    const phone = formPhone || billing.phone || 'N/A';
    const phoneClean = phone.replace(/[^0-9+]/g, '');

    // GHL upsert + order + note
    let contactId = null;
    let orderId = null;
    try {
      const tags = ['funnel-sprint-ai', 'acquisto-fso'];
      if (bumpAdded) tags.push('acquisto-bump-gemini');

      const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phoneClean,
          locationId: GHL_LOCATION_ID,
          tags,
          source: 'funnel-sprint-ai',
        }),
      });

      const upsertData = await upsertRes.json();
      contactId = upsertData?.contact?.id;

      if (contactId) {
        const products = [
          { id: '69b8211562bc2b37cb1dc3db', qty: 1, name: 'Sprint Funnel IA', price: 1700 }
        ];
        if (bumpAdded) {
          products.push({ id: '69b95b03a6c09972a197a3a3', qty: 1, name: 'Bot Creativo Gemini', price: 1900 });
        }

        const orderRes = await fetch('https://services.leadconnectorhq.com/payments/orders', {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({
            altId: GHL_LOCATION_ID,
            altType: 'location',
            contactId,
            source: { type: 'payment_link', id: GHL_SOURCE_ID, name: 'funnel-sprint-ai' },
            fingerprint: `fsa-${Date.now()}`,
            trackingId: `fsa-${paymentIntentId.slice(-12)}`,
            currency: 'EUR',
            products,
          }),
        });

        const orderData = await orderRes.json();
        if (orderData.order) orderId = orderData.order._id;

        // Mark order as fulfilled (triggers GHL "Ordine Inviato" workflow)
        if (orderId) {
          const fulfillItems = products.map(p => ({ priceId: p.id, qty: p.qty }));
          await fetch(`https://services.leadconnectorhq.com/payments/orders/${orderId}/fulfillments`, {
            method: 'POST',
            headers: ghlHeaders,
            body: JSON.stringify({
              altId: GHL_LOCATION_ID,
              altType: 'location',
              notifyCustomer: false,
              items: fulfillItems,
            }),
          });
        }

        const noteBody = [
          '🛒 ORDINE FUNNEL SPRINT AI',
          `📦 Order ID: ${orderId || 'N/A'}`,
          '',
          ...products.map(p => `✅ ${p.name} — €${(p.price / 100).toFixed(0)}`),
          `💰 Totale: €${(amount / 100).toFixed(0)}`,
          `💳 Stripe PaymentIntent: ${paymentIntentId}`,
          `📅 Data: ${new Date().toISOString().split('T')[0]}`,
        ].join('\n');

        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({ body: noteBody }),
        });
      }
    } catch (ghlError) {
      console.error('GHL API error:', ghlError.message || ghlError);
    }

    // Send Purchase event to Meta CAPI (server-side, authoritative)
    try {
      const capiPayload = {
        data: [
          {
            event_name: 'Purchase',
            event_time: Math.floor(Date.now() / 1000),
            event_id: `purchase-${paymentIntentId}`,
            event_source_url: 'https://funnel-sprint-ai.vercel.app/checkout',
            action_source: 'website',
            user_data: {
              em: hashSHA256(email) ? [hashSHA256(email)] : undefined,
              ph: hashSHA256(phoneClean) ? [hashSHA256(phoneClean)] : undefined,
              fn: hashSHA256(firstName) ? [hashSHA256(firstName)] : undefined,
              ln: hashSHA256(lastName) ? [hashSHA256(lastName)] : undefined,
              client_ip_address: req.headers['x-forwarded-for']?.split(',')[0]?.trim(),
              client_user_agent: req.headers['user-agent'],
            },
            custom_data: {
              value: amount / 100,
              currency: 'EUR',
              content_name: 'Funnel Sprint AI',
            },
          },
        ],
      };

      await fetch(
        `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(capiPayload),
        }
      );
    } catch (capiError) {
      console.error('Meta CAPI error:', capiError.message || capiError);
    }

    return res.status(200).json({ success: true, contactId, orderId });
  } catch (error) {
    console.error('Confirm order error:', error.message || error);
    return res.status(500).json({ error: 'Order confirmation failed.' });
  }
}
