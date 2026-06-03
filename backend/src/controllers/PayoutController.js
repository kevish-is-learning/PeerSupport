import payoutService from '../services/PayoutService.js';

class PayoutController {
  // ─── Mentor Endpoints ───────────────────────────────────────────────────

  async requestPayout(req, res, next) {
    try {
      const result = await payoutService.requestPayout(req.user.id, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async getMyPayouts(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await payoutService.getPayoutHistory(req.user.id, {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  // ─── Admin Endpoints ────────────────────────────────────────────────────

  async getAllPayouts(req, res, next) {
    try {
      const { status, page, limit } = req.query;
      const result = await payoutService.getAllPayouts({
        status: status || undefined,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async approvePayout(req, res, next) {
    try {
      const result = await payoutService.approvePayout(req.params.id);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async completePayout(req, res, next) {
    try {
      const result = await payoutService.completePayout(req.params.id, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }

  async failPayout(req, res, next) {
    try {
      const result = await payoutService.failPayout(req.params.id, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
}

export default new PayoutController();
