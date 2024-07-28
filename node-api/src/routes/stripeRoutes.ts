import { Router } from 'express';
import { createCheckoutSession } from '../shared/services/stripe';

const router = Router();

router.post('/create-checkout-session', createCheckoutSession);

export default router;
