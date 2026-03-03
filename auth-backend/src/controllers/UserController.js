import userService from '../services/UserService.js';

class UserController {
  // Get all users with pagination and filtering
  async getAllUsers(req, res) {
    try {
      const { page = 1, limit = 10, role, isActive, search } = req.query;

      const result = await userService.getAllUsers({
        page: parseInt(page),
        limit: parseInt(limit),
        role,
        isActive: isActive !== undefined ? isActive === 'true' : undefined,
        search,
      });

      res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

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

  // Get current user
  async getCurrentUser(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);

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

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const user = await userService.updateUser(id, updateData);

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
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

  // Update user role (admin only)
  async updateUserRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await userService.updateUserRole(id, role);

      res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Soft delete user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await userService.deleteUser(id);

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

  // Permanent delete user (admin only)
  async permanentDeleteUser(req, res) {
    try {
      const { id } = req.params;

      const result = await userService.permanentDeleteUser(id);

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

  // Restore deleted user
  async restoreUser(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.restoreUser(id);

      res.status(200).json({
        success: true,
        message: 'User restored successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Toggle user status (activate/deactivate)
  async toggleUserStatus(req, res) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const user = await userService.toggleUserStatus(id, isActive);

      res.status(200).json({
        success: true,
        message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
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

      res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Verify user
  async verifyUser(req, res) {
    try {
      const { id } = req.params;

      const user = await userService.verifyUser(id);

      res.status(200).json({
        success: true,
        message: 'User verified successfully',
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Check if email exists
  async checkEmailExists(req, res) {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      const exists = await userService.emailExists(email);

      res.status(200).json({
        success: true,
        exists,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new UserController();
