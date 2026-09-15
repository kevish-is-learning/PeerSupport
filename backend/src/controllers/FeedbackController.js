import feedbackService from '../services/FeedbackService.js';
import { respond, sendControllerError } from '../utils/controllerResponse.js';

class FeedbackController {
  submitFeedback(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Feedback submitted',
      action: () => feedbackService.submitFeedback(req.user.id, req.params.bookingId, req.body),
      data: (feedback) => ({ feedback }),
    });
  }

  getFeedback(req, res) {
    return respond(res, {
      message: 'Feedback fetched',
      action: () => feedbackService.getFeedback(req.user.id, req.params.bookingId),
      data: (feedback) => ({ feedback }),
    });
  }

  async downloadFeedbackPdf(req, res) {
    try {
      const { buffer, filename } = await feedbackService.generateFeedbackPdf(
        req.user.id,
        req.params.bookingId
      );

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', buffer.length);
      return res.end(buffer);
    } catch (error) {
      return sendControllerError(res, error, { fallback: 'Failed to generate feedback PDF' });
    }
  }

  getHistory(req, res) {
    return respond(res, {
      message: 'Session history fetched',
      action: () => feedbackService.getHistoryWithCounterpart(req.user.id, req.params.counterpartId),
    });
  }

  listReceived(req, res) {
    return respond(res, {
      message: 'Feedback fetched',
      action: () => feedbackService.listReceivedFeedback(req.user.id),
      data: (feedbacks) => ({ feedbacks }),
    });
  }

  listGiven(req, res) {
    return respond(res, {
      message: 'Feedback fetched',
      action: () => feedbackService.listGivenFeedback(req.user.id),
      data: (feedbacks) => ({ feedbacks }),
    });
  }

  listPending(req, res) {
    return respond(res, {
      message: 'Pending feedback fetched',
      action: () => feedbackService.listPendingForMentor(req.user.id),
      data: (sessions) => ({ sessions }),
    });
  }
}

export default new FeedbackController();
