import Stripe from 'stripe';

const STRIPE_SK = process.env.STRIPE_SECRET_KEY || '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';
const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-ff3ad135-3f51-4072-a533-533bc16038f9';
const GHL_LOCATION_ID = '6600KjjI4Q4k8ICFPzFC';
const GHL_VERSION = '2021-07-28';

const stripe = new Stripe(STRIPE_SK);

const ghlHeaders = {
  'Authorization': `Bearer ${GHL_API_KEY}`,
  'Version': GHL_VERSION,
  'Content-Type': 'application/json',
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { firstName, lastName, email, phone, bumpAdded } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!email.includes('@') || email.length < 5) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    const phoneClean = phone.replace(/[^0-9+]/g, '');
    if (phoneClean.length < 8) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    const amount = bumpAdded ? 3600 : 1700; // €17 or €36

    // 1. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      metadata: {
        firstName,
        lastName,
        email,
        phone: phoneClean,
        bumpAdded: String(bumpAdded),
        product: 'funnel-sprint-ai',
      },
    });

    // 2. Upsert contact in GHL
    let contactId = null;
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

      // 3. Add order note to contact
      if (contactId) {
        const products = ['✅ Sprint Funnel IA — €17'];
        if (bumpAdded) products.push('✅ Bot Creativo Gemini — €19');
        
        const noteBody = [
          '🛒 ORDINE FUNNEL SPRINT AI',
          '',
          ...products,
          `💰 Totale: €${(amount / 100).toFixed(0)}`,
          `💳 Stripe PaymentIntent: ${paymentIntent.id}`,
          `📅 Data: ${new Date().toISOString().split('T')[0]}`,
          `📧 ${email}`,
          `📱 ${phoneClean}`,
        ].join('\n');

        await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({ body: noteBody }),
        });
      }
    } catch (ghlError) {
      // Log but don't fail the payment if GHL has issues
      console.error('GHL API error:', ghlError.message || ghlError);
    }

    // 4. Return client secret for Stripe confirmation on frontend
    return res.status(200).json({ 
      clientSecret: paymentIntent.client_secret,
      contactId,
    });
  } catch (error) {
    console.error('Checkout error:', error.message || error);
    return res.status(500).json({ error: 'Payment creation failed. Please try again.' });
  }
}
