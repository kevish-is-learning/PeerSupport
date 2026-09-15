import packageService from '../services/PackageService.js';
import menteeDocumentService from '../services/MenteeDocumentService.js';
import { respond } from '../utils/controllerResponse.js';
import {
  createPackageSchema,
  updatePackageSchema,
  verifyPackagePaymentSchema,
  addDocumentSchema,
  shareDocumentsSchema,
} from '../validators/groupSession.validator.js';

class PackageController {
  // ─── Mentor ──────────────────────────────────────────────────────────────

  listMine(req, res) {
    return respond(res, {
      message: 'Packages fetched',
      action: () => packageService.listMyPackages(req.user.id),
      data: (packages) => ({ packages }),
    });
  }

  create(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Package created',
      action: () => packageService.createPackage(req.user.id, createPackageSchema.parse(req.body)),
      data: (pkg) => ({ package: pkg }),
    });
  }

  update(req, res) {
    return respond(res, {
      message: 'Package updated',
      action: () =>
        packageService.updatePackage(req.user.id, req.params.id, updatePackageSchema.parse(req.body)),
      data: (pkg) => ({ package: pkg }),
    });
  }

  remove(req, res) {
    return respond(res, {
      message: 'Package removed',
      action: () => packageService.deletePackage(req.user.id, req.params.id),
    });
  }

  // ─── Public ──────────────────────────────────────────────────────────────

  listForMentor(req, res) {
    return respond(res, {
      message: 'Packages fetched',
      action: () => packageService.listPackagesForMentor(req.params.mentorProfileId),
      data: (packages) => ({ packages }),
    });
  }

  // ─── Mentee ──────────────────────────────────────────────────────────────

  purchase(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Purchase started',
      action: () => packageService.initiatePurchase(req.user.id, req.params.id),
    });
  }

  verifyPurchase(req, res) {
    return respond(res, {
      message: 'Package activated',
      action: () =>
        packageService.verifyPurchase(req.user.id, verifyPackagePaymentSchema.parse(req.body)),
      data: (purchase) => ({ purchase }),
    });
  }

  listMyPurchases(req, res) {
    return respond(res, {
      message: 'Purchases fetched',
      action: () => packageService.listMyPurchases(req.user.id),
      data: (purchases) => ({ purchases }),
    });
  }

  listRedeemable(req, res) {
    const { mentorProfileId, mentorServiceId } = req.query;
    return respond(res, {
      message: 'Redeemable packages fetched',
      action: () => packageService.listRedeemable(req.user.id, { mentorProfileId, mentorServiceId }),
      data: (purchases) => ({ purchases }),
    });
  }

  // ─── Mentee documents & sharing ──────────────────────────────────────────

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

export default new PackageController();
