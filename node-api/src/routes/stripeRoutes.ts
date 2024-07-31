import { Router } from 'express';
import { createCheckoutSession, handleStripeWebhook } from '../shared/services/stripe';
import bodyParser from 'body-parser';

const router = Router();

router.post('/create-checkout-session', createCheckoutSession);
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
