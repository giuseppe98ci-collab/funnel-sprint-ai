import Stripe from 'stripe';

const STRIPE_SK = process.env.STRIPE_SECRET_KEY || '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';
const GHL_API_KEY = process.env.GHL_API_KEY || 'pit-ff3ad135-3f51-4072-a533-533bc16038f9';
const GHL_LOCATION_ID = '6600KjjI4Q4k8ICFPzFC';

const stripe = new Stripe(STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, phone, bumpAdded } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const amount = bumpAdded ? 3600 : 1700;

    // 1. Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      metadata: {
        firstName,
        lastName,
        email,
        phone,
        bumpAdded: String(bumpAdded),
      },
    });

    // 2. Upsert contact in GHL
    let contactId = null;
    try {
      const ghlHeaders = {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json',
      };

      const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          locationId: GHL_LOCATION_ID,
          tags: ['funnel-sprint-ai', 'acquisto-fso'],
          source: 'funnel-sprint-ai',
        }),
      });

      const upsertData = await upsertRes.json();
      contactId = upsertData?.contact?.id;

      // 3. Create order in GHL
      if (contactId) {
        const items = [{ priceId: '69b8211562bc2b37cb1dc3db', quantity: 1 }];
        if (bumpAdded) {
          items.push({ priceId: '69b95b03a6c09972a197a3a3', quantity: 1 });
        }

        await fetch('https://services.leadconnectorhq.com/payments/orders', {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({
            altId: GHL_LOCATION_ID,
            altType: 'location',
            contactId,
            items,
          }),
        });
      }
    } catch (ghlError) {
      // Log but don't fail the payment if GHL has issues
      console.error('GHL API error:', ghlError);
    }

    // 4. Return client secret
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Checkout error:', error);
    return res.status(500).json({ error: 'Payment creation failed' });
  }
}
