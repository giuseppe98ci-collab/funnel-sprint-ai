import Stripe from 'stripe';

const STRIPE_SK = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_SK) {
  console.error('STRIPE_SECRET_KEY not configured');
}
const stripe = STRIPE_SK ? new Stripe(STRIPE_SK) : null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { bumpAdded, paymentIntentId } = req.body;
    const total = bumpAdded ? 3600 : 1700;

    // Update existing PaymentIntent if provided
    if (paymentIntentId) {
      const updated = await stripe.paymentIntents.update(paymentIntentId, {
        amount: total,
        metadata: { bumpAdded: String(!!bumpAdded) },
      });
      return res.status(200).json({
        clientSecret: updated.client_secret,
        paymentIntentId: updated.id,
      });
    }

    // Create new PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'eur',
      automatic_payment_methods: { enabled: true },
      metadata: {
        product: 'funnel-sprint-ai',
        bumpAdded: String(!!bumpAdded),
      },
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('PaymentIntent error:', error.message || error);
    return res.status(500).json({ error: 'Failed to create payment. Please try again.' });
  }
}
