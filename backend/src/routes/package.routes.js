/**
 * Package & Document Routes
 *
 *   /api/packages          — mentor-authored session bundles, mentee purchases
 *   /api/mentee-documents  — named resumes/SOPs and per-booking sharing
 */

import { Router } from 'express';
import { authenticateJWT, authorizeRoles, requireApprovedMentor } from '../middleware/auth.js';
import packageController from '../controllers/PackageController.js';

const packageRouter = Router();

// Public — shown on a mentor's profile
packageRouter.get('/mentor/:mentorProfileId', packageController.listForMentor);

// Mentor authoring
packageRouter.get(
  '/mine',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  requireApprovedMentor,
  packageController.listMine
);
packageRouter.post(
  '/',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  requireApprovedMentor,
  packageController.create
);
packageRouter.patch(
  '/:id',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  requireApprovedMentor,
  packageController.update
);
packageRouter.delete(
  '/:id',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  requireApprovedMentor,
  packageController.remove
);

// Mentee purchase & redemption
packageRouter.get('/purchases/mine', authenticateJWT, packageController.listMyPurchases);
packageRouter.get('/purchases/redeemable', authenticateJWT, packageController.listRedeemable);
packageRouter.post('/verify-payment', authenticateJWT, packageController.verifyPurchase);
packageRouter.post('/:id/purchase', authenticateJWT, packageController.purchase);

const documentRouter = Router();

documentRouter.use(authenticateJWT);

documentRouter.get('/', packageController.listDocuments);
documentRouter.post('/', packageController.addDocument);
documentRouter.delete('/:id', packageController.deleteDocument);

documentRouter.get('/bookings/:bookingId/shared', packageController.getSharedDocuments);
documentRouter.put('/bookings/:bookingId/shared', packageController.setSharedDocuments);
documentRouter.get('/previous-feedback/:mentorProfileId', packageController.getPreviousFeedback);

export { packageRouter, documentRouter };
