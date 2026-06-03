import cancellationService from '../services/CancellationService.js';

class CancellationController {
  /**
   * POST /api/bookings/:id/cancel
   * Both mentee and mentor can cancel.
   */
  async cancelBooking(req, res, next) {
    try {
      const result = await cancellationService.cancelBooking(
        req.user.id,
        req.params.id,
        { reason: req.body?.reason || req.body?.cancelledReason }
      );
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
}

export default new CancellationController();
