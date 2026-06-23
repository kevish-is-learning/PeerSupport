import menteeProfileService from "../services/MenteeProfileService.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getStatusCode = (error) => {
  if (error?.statusCode) {
    return error.statusCode;
  }

  if (error?.name === "ZodError") {
    return 400;
  }

  return 500;
};

class MenteeProfileController {
  async getMyProfile(req, res) {
    try {
      const profile = await menteeProfileService.getByUserId(req.user.id);
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Mentee profile fetched successfully", {
            profile,
          }),
        );
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Failed to fetch mentee profile",
      });
    }
  }

  async createMyProfile(req, res) {
    try {
      const profile = await menteeProfileService.create(req.user.id, {
        ...req.body,
        ...req.uploadedFiles,
      });

      // Refresh token to update onboarding state
      const { prisma } = await import("../config/database.js");
      const authServiceModule = await import("../services/AuthService.js");
      const updatedUser = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          mentorProfile: {
            select: { id: true, approvalStatus: true, isVerified: true },
          },
          menteeProfile: { select: { id: true } },
        },
      });
      const mappedUser =
        authServiceModule.mapUserWithOnboardingState(updatedUser);
      const token = authServiceModule.default.generateToken(mappedUser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(201)
        .json(
          new ApiResponse(201, "Mentee profile created successfully", {
            profile,
            user: mappedUser,
          }),
        );
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Failed to create mentee profile",
      });
    }
  }

  async updateMyProfile(req, res) {
    try {
      const profile = await menteeProfileService.update(req.user.id, {
        ...req.body,
        ...req.uploadedFiles,
      });

      // Refresh token to update onboarding state
      const { prisma } = await import("../config/database.js");
      const authServiceModule = await import("../services/AuthService.js");
      const updatedUser = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          mentorProfile: {
            select: { id: true, approvalStatus: true, isVerified: true },
          },
          menteeProfile: { select: { id: true } },
        },
      });
      const mappedUser =
        authServiceModule.mapUserWithOnboardingState(updatedUser);
      const token = authServiceModule.default.generateToken(mappedUser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json(
          new ApiResponse(200, "Mentee profile updated successfully", {
            profile,
            user: mappedUser,
          }),
        );
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Failed to update mentee profile",
      });
    }
  }

  async deleteMyProfile(req, res) {
    try {
      await menteeProfileService.delete(req.user.id);
      return res
        .status(200)
        .json(new ApiResponse(200, "Mentee profile deleted successfully"));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Failed to delete mentee profile",
      });
    }
  }
}

export default new MenteeProfileController();
