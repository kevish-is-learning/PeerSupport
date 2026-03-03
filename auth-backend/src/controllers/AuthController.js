import authService from "../services/AuthService.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
class AuthController {
  // Register with Email/Password
  async register(req, res) {
    try {
      const { email, password, name } = req.body;

      const result = await authService.register({ email, password, name });

      res
        .status(201)
        .json(new ApiResponse(201, "Registration successful", result));
    } catch (error) {
      res
        .status(500)
        .json(new ApiError(500, "Registration failed", error.message));
    }
  }

  // Login with Email/Password
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await authService.login({ email, password });

      res.status(200).json(new ApiResponse(200, "Login successful", result));
    } catch (error) {
      res.status(401).json(new ApiError(401, "Login failed", error.message));
    }
  }

  // Google OAuth Callback Handler
  googleCallback(req, res) {
    try {
      if (!req.user) {
        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=authentication_failed`,
        );
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

      res
        .status(200)
        .json(new ApiResponse(200, "Profile retrieved successfully", user));
    } catch (error) {
      res
        .status(404)
        .json(new ApiError(404, "Profile not found", error.message));
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

      res
        .status(200)
        .json(new ApiResponse(200, "Profile updated successfully", user));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Profile update failed", error.message));
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

      res
        .status(200)
        .json(new ApiResponse(200, "Password changed successfully", result));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Password change failed", error.message));
    }
  }

  // Logout (optional - mainly for session-based auth)
  logout(req, res) {
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json(new ApiError(500, "Logout failed", err.message));
      }

      res.status(200).json(new ApiResponse(200, "Logged out successfully"));
    });
  }
}

export default new AuthController();
