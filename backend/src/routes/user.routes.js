import express from 'express';
import userController from '../controllers/UserController.js';
import { authenticateJWT, adminOnly, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/check-email', userController.checkEmailExists);

// Protected routes (authenticated users)
router.get('/me', authenticateJWT, userController.getCurrentUser);
router.put('/me', authenticateJWT, userController.updateCurrentUser);

// Admin routes
router.get('/', authenticateJWT, adminOnly, userController.getAllUsers);
router.get('/role/:role', authenticateJWT, adminOnly, userController.getUsersByRole);
router.post('/', authenticateJWT, adminOnly, userController.createUser);
router.get('/:id', authenticateJWT, adminOnly, userController.getUserById);
router.put('/:id', authenticateJWT, adminOnly, userController.updateUser);
router.patch('/:id/role', authenticateJWT, adminOnly, userController.updateUserRole);
router.patch('/:id/status', authenticateJWT, adminOnly, userController.toggleUserStatus);
router.patch('/:id/verify', authenticateJWT, adminOnly, userController.verifyUser);
router.delete('/:id', authenticateJWT, adminOnly, userController.deleteUser);
router.delete('/:id/permanent', authenticateJWT, adminOnly, userController.permanentDeleteUser);
router.patch('/:id/restore', authenticateJWT, adminOnly, userController.restoreUser);

export default router;
