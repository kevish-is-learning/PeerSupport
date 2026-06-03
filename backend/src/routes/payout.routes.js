import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import payoutController from '../controllers/PayoutController.js';

const router = Router();

// ─── Mentor Payout Endpoints ─────────────────────────────────────────────

// POST /api/payouts — Mentor requests payout
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  (req, res, next) => payoutController.requestPayout(req, res, next)
);

// GET /api/payouts/my — Mentor's payout history
router.get(
  '/my',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  (req, res, next) => payoutController.getMyPayouts(req, res, next)
);

// ─── Admin Payout Endpoints ──────────────────────────────────────────────

// GET /api/payouts/admin — Admin lists all payouts (filterable by status)
router.get(
  '/admin',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  (req, res, next) => payoutController.getAllPayouts(req, res, next)
);

// PATCH /api/payouts/:id/approve — Admin approves a payout
router.patch(
  '/:id/approve',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  (req, res, next) => payoutController.approvePayout(req, res, next)
);

// PATCH /api/payouts/:id/complete — Admin marks payout as completed
router.patch(
  '/:id/complete',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  (req, res, next) => payoutController.completePayout(req, res, next)
);

// PATCH /api/payouts/:id/fail — Admin rejects/fails a payout
router.patch(
  '/:id/fail',
  authenticateJWT,
  authorizeRoles('ADMIN'),
  (req, res, next) => payoutController.failPayout(req, res, next)
);

export default router;
