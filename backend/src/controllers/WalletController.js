import walletService from '../services/WalletService.js';

class WalletController {
  async getWallet(req, res, next) {
    try {
      const wallet = await walletService.getWallet(req.user.id);
      res.json({ success: true, data: wallet });
    } catch (err) {
      next(err);
    }
  }

  async getTransactions(req, res, next) {
    try {
      const { page, limit, type } = req.query;
      const result = await walletService.getTransactions(req.user.id, {
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        type: type || undefined,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  }
}

export default new WalletController();
