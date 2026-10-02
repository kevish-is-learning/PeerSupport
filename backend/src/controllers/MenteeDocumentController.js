import menteeDocumentService from '../services/MenteeDocumentService.js';
import { respond } from '../utils/controllerResponse.js';
import { addDocumentSchema, shareDocumentsSchema } from '../validators/menteeDocument.validator.js';

class MenteeDocumentController {
  listDocuments(req, res) {
    return respond(res, {
      message: 'Documents fetched',
      action: () => menteeDocumentService.listMyDocuments(req.user.id),
    });
  }

  addDocument(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Document added',
      action: () => menteeDocumentService.addDocument(req.user.id, addDocumentSchema.parse(req.body)),
      data: (document) => ({ document }),
    });
  }

  deleteDocument(req, res) {
    return respond(res, {
      message: 'Document deleted',
      action: () => menteeDocumentService.deleteDocument(req.user.id, req.params.id),
    });
  }

  getSharedDocuments(req, res) {
    return respond(res, {
      message: 'Shared documents fetched',
      action: () => menteeDocumentService.getSharedDocuments(req.user.id, req.params.bookingId),
    });
  }

  setSharedDocuments(req, res) {
    return respond(res, {
      message: 'Sharing updated',
      action: () =>
        menteeDocumentService.setSharedDocuments(
          req.user.id,
          req.params.bookingId,
          shareDocumentsSchema.parse(req.body ?? {}).documentIds
        ),
    });
  }

  getPreviousFeedback(req, res) {
    return respond(res, {
      message: 'Previous feedback checked',
      action: () =>
        menteeDocumentService.findPreviousFeedbackBooking(
          req.user.id,
          req.params.mentorProfileId
        ),
      data: (previous) => ({ previous }),
    });
  }
}

export default new MenteeDocumentController();
