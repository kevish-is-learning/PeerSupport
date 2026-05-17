import MeetingService from '../services/MeetingService.js';

class MeetingController {
  /**
   * GET /api/meetings/:bookingId/token
   * Returns Agora RTC credentials to join a video session.
   */
  async getToken(req, res, next) {
    try {
      const result = await MeetingService.getToken(req.user.id, req.params.bookingId);
      res.json({ success: true, data: result });
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }

  /**
   * PATCH /api/meetings/:bookingId/finish
   * Signal that a participant has finished the meeting.
   */
  async finish(req, res, next) {
    try {
      const result = await MeetingService.finishMeeting(req.user.id, req.params.bookingId);
      res.json({ success: true, data: result });
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }
      next(error);
    }
  }
}

export default new MeetingController();
