import express from 'express';
import passport from 'passport';
import authController from '../controllers/AuthController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authenticateJWT, authController.getMe);

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/select-role', authenticateJWT, authController.selectRole);

router.get(
  '/google',
  (req, res, next) => {
    const mode = req.query.mode || 'login';
    const role = req.query.role || 'MENTEE';
    const stateObj = { mode, role };
    const state = Buffer.from(JSON.stringify(stateObj)).toString('base64');
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      state: state,
    })(req, res, next);
  }
);

router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      if (err) {
        return res.redirect(`${frontendUrl}/auth?mode=login&error=server_error`);
      }
      if (!user) {
        const errorMsg = info?.message || 'authentication_failed';
        return res.redirect(`${frontendUrl}/auth?mode=login&error=${errorMsg}`);
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  authController.googleCallback
);

router.get('/google/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Google authentication failed',
  });
});

router.post('/change-password', authenticateJWT, authController.changePassword);

router.put('/update-profile', authenticateJWT, authController.updateProfile);

router.post('/logout', authenticateJWT, authController.logout);

export default router;
