import authService from "../services/AuthService.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
class AuthController {
  // Get currently authenticated user
  getMe(req, res) {
    try {
      return res
        .status(200)
        .json(new ApiResponse(200, "Current user fetched", { user: req.user }));
    } catch (error) {
      return res
        .status(500)
        .json(new ApiError(500, "Failed to fetch current user", error.message));
    }
  }

  // Register with Email/Password
  async register(req, res) {
    try {
      const { email, password, name, role } = req.body;

      const result = await authService.register({ email, password, name, role });

      // Set JWT token in HTTP-only cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 21 * 24 * 60 * 60 * 1000, // 21 days
      });

      // Return user data without token
      res
        .status(201)
        .json(new ApiResponse(201, "Registration successful", { user: result.user }));
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

      // Set JWT token in HTTP-only cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Return user data without token
      res.status(200).json(new ApiResponse(200, "Login successful", { user: result.user }));
    } catch (error) {
      res.status(401).json(new ApiError(401, "Login failed", error.message));
    }
  }

  // Select onboarding role (MENTEE or MENTOR)
  async selectRole(req, res) {
    try {
      const { role } = req.body;

      const user = await authService.selectRole(req.user.id, { role });

      return res
        .status(200)
        .json(new ApiResponse(200, "Role selected successfully", { user }));
    } catch (error) {
      const statusCode = error?.name === "ZodError" ? 400 : 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Failed to select role",
      });
    }
  }

  // Google OAuth Callback Handler
  async googleCallback(req, res) {
    try {
      const frontendUrl = process.env.FRONTEND_URL || `http://localhost:${process.env.PORT || 5000}`;
      
      if (!req.user) {
        return res.redirect(
          `${frontendUrl}/login?error=authentication_failed`,
        );
      }

      // Generate JWT token
      const token = authService.generateToken(req.user.id);

      // Set JWT token in HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      const postAuthRedirectPath = await authService.getPostAuthRedirectPath(req.user.id);

      // Redirect to frontend without token in URL
      res.redirect(`${frontendUrl}${postAuthRedirectPath}?success=true`);
    } catch (error) {
      const frontendUrl = process.env.FRONTEND_URL || `http://localhost:${process.env.PORT || 5000}`;
      res.redirect(`${frontendUrl}/?error=server_error`);
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

  // Logout - clear JWT cookie
  logout(req, res) {
    try {
      // Clear the token cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
      });

      // Also handle passport session logout if exists
      if (req.logout) {
        req.logout((err) => {
          if (err) {
            console.error('Passport logout error:', err);
          }
        });
      }

      res.status(200).json(new ApiResponse(200, "Logged out successfully"));
    } catch (error) {
      res.status(500).json(new ApiError(500, "Logout failed", error.message));
    }
  }
  // Update profile (name)
  async updateProfile(req, res) {
    try {
      const { name } = req.body;
      const { prisma } = await import('../config/database.js');
      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: { name: name?.trim() || req.user.name },
        select: { id:true, name:true, email:true, role:true },
      });
      return res.status(200).json(new ApiResponse(200, "Profile updated", { user: updatedUser }));
    } catch (error) {
      return res.status(500).json({ success:false, message: error.message || "Update failed" });
    }
  }
}

export default new AuthController();
