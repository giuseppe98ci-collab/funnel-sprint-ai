import Stripe from 'stripe';

const STRIPE_SK = process.env.STRIPE_SECRET_KEY || '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';
const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-ff3ad135-3f51-4072-a533-533bc16038f9';
const GHL_LOCATION_ID = '6600KjjI4Q4k8ICFPzFC';
const GHL_VERSION = '2021-07-28';
const GHL_SOURCE_ID = '69495c442024d429282d6509';

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
    const { paymentIntentId, firstName, lastName, email, phone, bumpAdded } = req.body;

    if (!paymentIntentId || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify payment on Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const amount = paymentIntent.amount;
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

    return res.status(200).json({ success: true, contactId, orderId });
  } catch (error) {
    console.error('Confirm order error:', error.message || error);
    return res.status(500).json({ error: 'Order confirmation failed.' });
  }
}
