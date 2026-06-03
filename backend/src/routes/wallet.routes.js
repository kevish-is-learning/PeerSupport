import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import walletController from '../controllers/WalletController.js';

const router = Router();

// All wallet routes require authenticated mentor
router.use(authenticateJWT, authorizeRoles('MENTOR'));

// GET /api/wallet — Get wallet summary (pending, available, withdrawn)
router.get('/', (req, res, next) => walletController.getWallet(req, res, next));

// GET /api/wallet/transactions — Get transaction history (paginated)
router.get('/transactions', (req, res, next) => walletController.getTransactions(req, res, next));

export default router;
