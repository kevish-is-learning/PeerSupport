import passport from 'passport';
import authService from '../services/AuthService.js';

class AuthController {
  // Register with Email/Password
  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      
      const result = await authService.register({ email, password, name });
      
      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Login with Email/Password
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const result = await authService.login({ email, password });
      
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Google OAuth Callback Handler
  googleCallback(req, res) {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL}/login?error=authentication_failed`);
      }

      // Generate JWT token
      const token = authService.generateToken(req.user.id);
      
      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
    }
  }

  // Get Current User Profile
  async getProfile(req, res) {
    try {
      const user = await authService.getProfile(req.user.id);
      
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update User Profile
  async updateProfile(req, res) {
    try {
      const { name, profilePicture } = req.body;
      
      const user = await authService.updateProfile(req.user.id, {
        name,
        profilePicture,
      });
      
      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Change Password
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      
      const result = await authService.changePassword(req.user.id, {
        currentPassword,
        newPassword,
      });
      
      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Logout (optional - mainly for session-based auth)
  logout(req, res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Logout failed',
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    });
  }
}

export default new AuthController();
