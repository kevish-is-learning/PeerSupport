/**
 * Mentee Document Routes
 *
 *   /api/mentee-documents  — named resumes/SOPs and per-booking sharing
 */

import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import menteeDocumentController from '../controllers/MenteeDocumentController.js';

const documentRouter = Router();

documentRouter.use(authenticateJWT);

documentRouter.get('/', menteeDocumentController.listDocuments);
documentRouter.post('/', menteeDocumentController.addDocument);
documentRouter.delete('/:id', menteeDocumentController.deleteDocument);

documentRouter.get('/bookings/:bookingId/shared', menteeDocumentController.getSharedDocuments);
documentRouter.put('/bookings/:bookingId/shared', menteeDocumentController.setSharedDocuments);
documentRouter.get('/previous-feedback/:mentorProfileId', menteeDocumentController.getPreviousFeedback);

export { documentRouter };
