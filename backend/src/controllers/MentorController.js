import mentorService from "../services/MentorService.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { deleteFile } from "../middleware/upload.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class MentorController {
  ///////////////////////////
  // MENTOR APPLICATION
  ///////////////////////////

  // Submit mentor application
  async submitApplication(req, res) {
    try {
      const application = await mentorService.submitMentorApplication(
        req.user.id,
        req.body
      );

      res.status(201).json(
        new ApiResponse(true, "Mentor application submitted successfully", application)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to submit application")
      );
    }
  }

  // Update mentor application
  async updateApplication(req, res) {
    try {
      const application = await mentorService.updateMentorApplication(
        req.user.id,
        req.body
      );

      res.status(200).json(
        new ApiResponse(true, "Application updated successfully", application)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to update application")
      );
    }
  }

  // Get my application
  async getMyApplication(req, res) {
    try {
      const application = await mentorService.getUserMentorApplication(req.user.id);

      if (!application) {
        return res.status(404).json(
          new ApiResponse(false, "No application found", null)
        );
      }

      res.status(200).json(
        new ApiResponse(true, "Application retrieved successfully", application)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve application")
      );
    }
  }

  // Approve application (admin only)
  async approveApplication(req, res) {
    try {
      const { applicationId } = req.params;

      const result = await mentorService.approveMentorApplication(
        applicationId,
        req.user.id
      );

      res.status(200).json(
        new ApiResponse(true, "Application approved successfully", result)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to approve application")
      );
    }
  }

  ///////////////////////////
  // MENTOR PROFILE
  ///////////////////////////

  // Get mentor profile
  async getProfile(req, res) {
    try {
      const profile = await mentorService.getMentorProfile(req.user.id);

      res.status(200).json(
        new ApiResponse(true, "Profile retrieved successfully", profile)
      );
    } catch (error) {
      res.status(404).json(
        new ApiError(404, error.message || "Profile not found")
      );
    }
  }

  // Update mentor profile
  async updateProfile(req, res) {
    try {
      const profile = await mentorService.updateMentorProfile(
        req.user.id,
        req.body
      );

      res.status(200).json(
        new ApiResponse(true, "Profile updated successfully", profile)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to update profile")
      );
    }
  }

  ///////////////////////////
  // SERVICE MANAGEMENT
  ///////////////////////////

  // Create a new service
  async createService(req, res) {
    try {
      const service = await mentorService.createService(req.user.id, req.body);

      res.status(201).json(
        new ApiResponse(true, "Service created successfully", service)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to create service")
      );
    }
  }

  // Get mentor's services
  async getServices(req, res) {
    try {
      const { status, category, page, limit } = req.query;

      const result = await mentorService.getServices(req.user.id, {
        status,
        category,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
      });

      res.status(200).json(
        new ApiResponse(true, "Services retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve services")
      );
    }
  }

  // Get a specific service
  async getService(req, res) {
    try {
      const { serviceId } = req.params;

      const service = await mentorService.getServiceById(req.user.id, serviceId);

      res.status(200).json(
        new ApiResponse(true, "Service retrieved successfully", service)
      );
    } catch (error) {
      res.status(404).json(
        new ApiError(404, error.message || "Service not found")
      );
    }
  }

  // Update a service
  async updateService(req, res) {
    try {
      const { serviceId } = req.params;

      const service = await mentorService.updateService(
        req.user.id,
        serviceId,
        req.body
      );

      res.status(200).json(
        new ApiResponse(true, "Service updated successfully", service)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to update service")
      );
    }
  }

  // Delete a service
  async deleteService(req, res) {
    try {
      const { serviceId } = req.params;

      const result = await mentorService.deleteService(req.user.id, serviceId);

      res.status(200).json(
        new ApiResponse(true, result.message, null)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to delete service")
      );
    }
  }

  // Toggle service status
  async toggleServiceStatus(req, res) {
    try {
      const { serviceId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json(
          new ApiError(400, "Status is required")
        );
      }

      const service = await mentorService.toggleServiceStatus(
        req.user.id,
        serviceId,
        status
      );

      res.status(200).json(
        new ApiResponse(true, "Service status updated successfully", service)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to update service status")
      );
    }
  }

  ///////////////////////////
  // DASHBOARD & ANALYTICS
  ///////////////////////////

  // Get dashboard stats
  async getDashboardStats(req, res) {
    try {
      const stats = await mentorService.getDashboardStats(req.user.id);

      res.status(200).json(
        new ApiResponse(true, "Dashboard stats retrieved successfully", stats)
      );
    } catch (error) {
      console.log(error)
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve dashboard stats")
      );
    }
  }

  // Get transactions
  async getTransactions(req, res) {
    try {
      const { page, limit, type } = req.query;

      const result = await mentorService.getTransactions(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        type,
      });

      res.status(200).json(
        new ApiResponse(true, "Transactions retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve transactions")
      );
    }
  }

  ///////////////////////////
  // WITHDRAWALS
  ///////////////////////////

  // Request withdrawal
  async requestWithdrawal(req, res) {
    try {
      const withdrawal = await mentorService.requestWithdrawal(
        req.user.id,
        req.body
      );

      res.status(201).json(
        new ApiResponse(true, "Withdrawal request submitted successfully", withdrawal)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to request withdrawal")
      );
    }
  }

  // Get withdrawals
  async getWithdrawals(req, res) {
    try {
      const { page, limit, status } = req.query;

      const result = await mentorService.getWithdrawals(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
      });

      res.status(200).json(
        new ApiResponse(true, "Withdrawals retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve withdrawals")
      );
    }
  }

  ///////////////////////////
  // RATINGS & REVIEWS
  ///////////////////////////

  // Get ratings and feedback
  async getRatingsAndFeedback(req, res) {
    try {
      const { page, limit } = req.query;

      const result = await mentorService.getRatingsAndFeedback(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
      });

      res.status(200).json(
        new ApiResponse(true, "Ratings retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve ratings")
      );
    }
  }

  ///////////////////////////
  // RESUME MANAGEMENT
  ///////////////////////////

  // Upload resume (handles file upload)
  async uploadResume(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json(new ApiError(400, "No file uploaded"));
      }

      const { name } = req.body;
      if (!name) {
        // Delete uploaded file if name not provided
        deleteFile(req.file.path);
        return res.status(400).json(new ApiError(400, "Resume name is required"));
      }

      // Create resume record with file URL
      const resumeUrl = `/uploads/resumes/${req.file.filename}`;
      const resume = await mentorService.addResume(req.user.id, {
        name,
        fileUrl: resumeUrl,
      });

      res.status(201).json(
        new ApiResponse(true, "Resume uploaded successfully", resume)
      );
    } catch (error) {
      // Delete uploaded file if there was an error
      if (req.file) {
        deleteFile(req.file.path);
      }
      res.status(400).json(
        new ApiError(400, error.message || "Failed to upload resume")
      );
    }
  }

  // Add resume (for backward compatibility - expects fileUrl in body)
  async addResume(req, res) {
    try {
      const resume = await mentorService.addResume(req.user.id, req.body);

      res.status(201).json(
        new ApiResponse(true, "Resume added successfully", resume)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to add resume")
      );
    }
  }

  // Get resumes
  async getResumes(req, res) {
    try {
      const resumes = await mentorService.getResumes(req.user.id);

      res.status(200).json(
        new ApiResponse(true, "Resumes retrieved successfully", resumes)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve resumes")
      );
    }
  }

  // Delete resume
  async deleteResume(req, res) {
    try {
      const { resumeId } = req.params;

      // Get resume details to delete file
      const resumes = await mentorService.getResumes(req.user.id);
      const resume = resumes.find(r => r.id === resumeId);

      if (resume && resume.fileUrl) {
        const resumePath = path.join(__dirname, '../../uploads/resumes', path.basename(resume.fileUrl));
        deleteFile(resumePath);
      }

      const result = await mentorService.deleteResume(req.user.id, resumeId);

      res.status(200).json(
        new ApiResponse(true, result.message, null)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to delete resume")
      );
    }
  }
}

export default new MentorController();
