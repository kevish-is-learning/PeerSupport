import express from 'express';
import passport from 'passport';
import authController from '../controllers/AuthController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authenticateJWT, authController.getMe);

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/google/failure',
    session: false,
  }),
  authController.googleCallback
);

router.get('/google/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Google authentication failed',
  });
});

router.post('/change-password', authenticateJWT, authController.changePassword);

router.post('/logout', authenticateJWT, authController.logout);

export default router;