import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { generate, getEvidence, getOne, getResult, getSuspects, verdict } from '../controllers/investigationController.js';

const router = Router();
const generationLimit = rateLimit({ windowMs: 60 * 60 * 1000, limit: 8, standardHeaders: 'draft-7', legacyHeaders: false, message: { message: 'Too many case generation requests. Please try again later.' } });
router.post('/generate', generationLimit, generate);
router.get('/:id/evidence', getEvidence);
router.get('/:id/suspects', getSuspects);
router.post('/:id/verdict', verdict);
router.get('/:id/result', getResult);
router.get('/:id', getOne);
export default router;
