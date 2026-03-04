import userService from "../services/UserService.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

class UserController {
  // Get all users with pagination and filtering
  async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 10, role, isActive, search } = req.query;

      const result = await userService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        role,
        isActive: isActive !== undefined ? isActive === "true" : undefined,
        search,
      });

      res
        .status(200)
        .json(new ApiResponse(true, "Users retrieved successfully", result));
    } catch (error) {
      res
        .status(500)
        .json(new ApiError(500, "Failed to retrieve users", error.message));
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      res
        .status(200)
        .json(new ApiResponse(true, "User retrieved successfully", user));
    } catch (error) {
      res.status(404).json(new ApiError(404, "User not found", error.message));
    }
  }

  // Get current user
  async getCurrentUser(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);

      res
        .status(200)
        .json(new ApiResponse(true, "User retrieved successfully", user));
    } catch (error) {
      res.status(404).json(new ApiError(404, "User not found", error.message));
    }
  }

  // Create user (admin only)
  async createUser(req, res) {
    try {
      const { email, password, name, role, isVerified } = req.body;

      const user = await userService.createUser({
        email,
        password,
        name,
        role,
        isVerified,
      });

      res
        .status(201)
        .json(new ApiResponse(true, "User created successfully", user));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to create user", error.message));
    }
  }

  // Update user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const user = await userService.updateUser(id, updateData);

      res
        .status(200)
        .json(new ApiResponse(true, "User updated successfully", user));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to update user", error.message));
    }
  }

  // Update current user
  async updateCurrentUser(req, res) {
    try {
      const { name, profilePicture } = req.body;

      const user = await userService.updateUser(req.user.id, {
        name,
        profilePicture,
      });

      res
        .status(200)
        .json(new ApiResponse(true, "Profile updated successfully", user));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to update profile", error.message));
    }
  }

  // Update user role (admin only)
  async updateUserRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await userService.updateUserRole(id, role);

      res
        .status(200)
        .json(new ApiResponse(true, "User role updated successfully", user));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to update user role", error.message));
    }
  }

  // Soft delete user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await userService.deleteUser(id);

      res.status(200).json(new ApiResponse(true, result.message, null));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to delete user", error.message));
    }
  }

  // Permanent delete user (admin only)
  async permanentDeleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await userService.permanentDeleteUser(id);

      res.status(200).json(new ApiResponse(true, result.message, null));
    } catch (error) {
      res
        .status(400)
        .json(
          new ApiError(400, "Failed to permanently delete user", error.message),
        );
    }
  }

  // Restore deleted user
  async restoreUser(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.restoreUser(id);

      res
        .status(200)
        .json(new ApiResponse(true, "User restored successfully", user));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to restore user", error.message));
    }
  }

  // Toggle user status (activate/deactivate)
  async toggleUserStatus(req, res) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const user = await userService.toggleUserStatus(id, isActive);

      res
        .status(200)
        .json(
          new ApiResponse(
            true,
            `User ${isActive ? "activated" : "deactivated"} successfully`,
            user,
          ),
        );
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to toggle user status", error.message));
    }
  }

  // Get users by role
  async getUsersByRole(req, res) {
    try {
      const { role } = req.params;
      const { page = 1, limit = 10 } = req.query;

      const result = await userService.getUsersByRole(role, {
        page: parseInt(page),
        limit: parseInt(limit),
      });

      res
        .status(200)
        .json(new ApiResponse(true, "Users retrieved successfully", result));
    } catch (error) {
      res
        .status(400)
        .json(
          new ApiError(400, "Failed to retrieve users by role", error.message),
        );
    }
  }

  // Verify user
  async verifyUser(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.verifyUser(id);

      res
        .status(200)
        .json(new ApiResponse(true, "User verified successfully", user));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to verify user", error.message));
    }
  }

  // Check if email exists
  async checkEmailExists(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json(new ApiError(400, "Email is required"));
      }

      const exists = await userService.emailExists(email);

      res
        .status(200)
        .json(new ApiResponse(true, "Email check completed", { exists }));
    } catch (error) {
      res
        .status(500)
        .json(new ApiError(500, "Failed to check email", error.message));
    }
  }

  ///////////////////////////
  // PROFILE MANAGEMENT - ROLE-BASED
  ///////////////////////////

  // Get current user profile (role-based)
  async getCurrentUserProfile(req, res) {
    try {
      const profileData = await userService.getProfileByRole(req.user.id);

      res
        .status(200)
        .json(new ApiResponse(true, "Profile retrieved successfully", profileData));
    } catch (error) {
      res
        .status(404)
        .json(new ApiError(404, "Profile not found", error.message));
    }
  }

  // Update current user profile (role-based)
  async updateCurrentUserProfile(req, res) {
    try {
      const profile = await userService.updateProfileByRole(req.user.id, req.body);

      res
        .status(200)
        .json(new ApiResponse(true, "Profile updated successfully", profile));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to update profile", error.message));
    }
  }

  // Delete current user profile (role-based)
  async deleteCurrentUserProfile(req, res) {
    try {
      const result = await userService.deleteProfileByRole(req.user.id);

      res
        .status(200)
        .json(new ApiResponse(true, result.message, null));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to delete profile", error.message));
    }
  }

  ///////////////////////////
  // MENTEE PROFILE CRUD
  ///////////////////////////

  // Create or Update Mentee Profile
  async createOrUpdateMenteeProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;
      
      // If not admin and trying to update another user's profile
      if (req.user.role !== 'ADMIN' && userId !== req.user.id) {
        return res.status(403).json(new ApiError(403, "Forbidden"));
      }

      const profile = await userService.createOrUpdateMenteeProfile(userId, req.body);

      res
        .status(200)
        .json(new ApiResponse(true, "Mentee profile saved successfully", profile));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to save mentee profile", error.message));
    }
  }

  // Get Mentee Profile
  async getMenteeProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;

      const profile = await userService.getMenteeProfile(userId);

      res
        .status(200)
        .json(new ApiResponse(true, "Mentee profile retrieved successfully", profile));
    } catch (error) {
      res
        .status(404)
        .json(new ApiError(404, "Mentee profile not found", error.message));
    }
  }

  // Delete Mentee Profile
  async deleteMenteeProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;
      
      // If not admin and trying to delete another user's profile
      if (req.user.role !== 'ADMIN' && userId !== req.user.id) {
        return res.status(403).json(new ApiError(403, "Forbidden"));
      }

      const result = await userService.deleteMenteeProfile(userId);

      res
        .status(200)
        .json(new ApiResponse(true, result.message, null));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to delete mentee profile", error.message));
    }
  }

  ///////////////////////////
  // MENTOR PROFILE CRUD
  ///////////////////////////

  // Create or Update Mentor Profile
  async createOrUpdateMentorProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;
      
      // If not admin and trying to update another user's profile
      if (req.user.role !== 'ADMIN' && userId !== req.user.id) {
        return res.status(403).json(new ApiError(403, "Forbidden"));
      }

      const profile = await userService.createOrUpdateMentorProfile(userId, req.body);

      res
        .status(200)
        .json(new ApiResponse(true, "Mentor profile saved successfully", profile));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to save mentor profile", error.message));
    }
  }

  // Get Mentor Profile
  async getMentorProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;

      const profile = await userService.getMentorProfile(userId);

      res
        .status(200)
        .json(new ApiResponse(true, "Mentor profile retrieved successfully", profile));
    } catch (error) {
      res
        .status(404)
        .json(new ApiError(404, "Mentor profile not found", error.message));
    }
  }

  // Delete Mentor Profile
  async deleteMentorProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;
      
      // If not admin and trying to delete another user's profile
      if (req.user.role !== 'ADMIN' && userId !== req.user.id) {
        return res.status(403).json(new ApiError(403, "Forbidden"));
      }

      const result = await userService.deleteMentorProfile(userId);

      res
        .status(200)
        .json(new ApiResponse(true, result.message, null));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to delete mentor profile", error.message));
    }
  }

  ///////////////////////////
  // ADMIN PROFILE CRUD
  ///////////////////////////

  // Create or Update Admin Profile (Admin only)
  async createOrUpdateAdminProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;

      const profile = await userService.createOrUpdateAdminProfile(userId, req.body);

      res
        .status(200)
        .json(new ApiResponse(true, "Admin profile saved successfully", profile));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to save admin profile", error.message));
    }
  }

  // Get Admin Profile (Admin only)
  async getAdminProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;

      const profile = await userService.getAdminProfile(userId);

      res
        .status(200)
        .json(new ApiResponse(true, "Admin profile retrieved successfully", profile));
    } catch (error) {
      res
        .status(404)
        .json(new ApiError(404, "Admin profile not found", error.message));
    }
  }

  // Delete Admin Profile (Admin only)
  async deleteAdminProfile(req, res) {
    try {
      const userId = req.params.userId || req.user.id;

      const result = await userService.deleteAdminProfile(userId);

      res
        .status(200)
        .json(new ApiResponse(true, result.message, null));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to delete admin profile", error.message));
    }
  }

  ///////////////////////////
  // RESUME MANAGEMENT (MENTEE)
  ///////////////////////////

  // Add resume to mentee profile
  async addResume(req, res) {
    try {
      const { name, fileUrl } = req.body;

      // Get mentee profile
      const menteeProfile = await userService.getMenteeProfile(req.user.id);

      const resume = await userService.addResume(menteeProfile.id, { name, fileUrl });

      res
        .status(201)
        .json(new ApiResponse(true, "Resume added successfully", resume));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to add resume", error.message));
    }
  }

  // Get resumes for current user
  async getResumes(req, res) {
    try {
      // Get mentee profile
      const menteeProfile = await userService.getMenteeProfile(req.user.id);

      const resumes = await userService.getResumes(menteeProfile.id);

      res
        .status(200)
        .json(new ApiResponse(true, "Resumes retrieved successfully", resumes));
    } catch (error) {
      res
        .status(404)
        .json(new ApiError(404, "Failed to retrieve resumes", error.message));
    }
  }

  // Delete resume
  async deleteResume(req, res) {
    try {
      const { resumeId } = req.params;

      const result = await userService.deleteResume(resumeId, req.user.id);

      res
        .status(200)
        .json(new ApiResponse(true, result.message, null));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to delete resume", error.message));
    }
  }

  ///////////////////////////
  // MENTOR APPLICATION MANAGEMENT
  ///////////////////////////

  // Submit mentor application (user)
  async submitMentorApplication(req, res) {
    try {
      const { bio, expertise, certifications, pricePerSession } = req.body;

      const application = await userService.submitMentorApplication(req.user.id, {
        bio,
        expertise,
        certifications,
        pricePerSession,
      });

      res
        .status(201)
        .json(new ApiResponse(true, "Mentor application submitted successfully", application));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to submit application", error.message));
    }
  }

  // Get all mentor applications (admin only)
  async getAllMentorApplications(req, res) {
    try {
      const { page = 1, limit = 10, status } = req.query;

      const result = await userService.getAllMentorApplications({
        page: parseInt(page),
        limit: parseInt(limit),
        status,
      });

      res
        .status(200)
        .json(new ApiResponse(true, "Applications retrieved successfully", result));
    } catch (error) {
      res
        .status(500)
        .json(new ApiError(500, "Failed to retrieve applications", error.message));
    }
  }

  // Get single mentor application (admin)
  async getMentorApplicationById(req, res) {
    try {
      const { applicationId } = req.params;

      const application = await userService.getMentorApplicationById(applicationId);

      res
        .status(200)
        .json(new ApiResponse(true, "Application retrieved successfully", application));
    } catch (error) {
      res
        .status(404)
        .json(new ApiError(404, "Application not found", error.message));
    }
  }

  // Get user's own mentor application
  async getMyMentorApplication(req, res) {
    try {
      const application = await userService.getUserMentorApplication(req.user.id);

      if (!application) {
        return res
          .status(404)
          .json(new ApiResponse(false, "No application found", null));
      }

      res
        .status(200)
        .json(new ApiResponse(true, "Application retrieved successfully", application));
    } catch (error) {
      res
        .status(500)
        .json(new ApiError(500, "Failed to retrieve application", error.message));
    }
  }

  // Approve mentor application (admin only)
  async approveMentorApplication(req, res) {
    try {
      const { applicationId } = req.params;

      const result = await userService.approveMentorApplication(applicationId);

      res
        .status(200)
        .json(new ApiResponse(true, "Application approved successfully", result));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to approve application", error.message));
    }
  }

  // Reject mentor application (admin only)
  async rejectMentorApplication(req, res) {
    try {
      const { applicationId } = req.params;
      const { rejectionReason } = req.body;

      const application = await userService.rejectMentorApplication(
        applicationId,
        rejectionReason
      );

      res
        .status(200)
        .json(new ApiResponse(true, "Application rejected successfully", application));
    } catch (error) {
      res
        .status(400)
        .json(new ApiError(400, "Failed to reject application", error.message));
    }
  }
}

export default new UserController();
