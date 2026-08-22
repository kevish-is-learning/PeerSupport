import mentorProfileService from "../services/MentorProfileService.js";
import authService, { mapUserWithOnboardingState } from "../services/AuthService.js";
import { prisma } from "../config/database.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { destroyAsset } from "../config/cloudinary.js";

const cleanupNewUploads = async (uploadedFiles = {}) => {
  await Promise.allSettled(Object.values(uploadedFiles).filter(Boolean).map(destroyAsset));
};

const getStatusCode = (error) => {
  if (error?.statusCode) {
    return error.statusCode;
  }

  if (error?.name === "ZodError") {
    return 400;
  }

  return 500;
};

const getErrorMessage = (error) => {
  if (error?.name !== 'ZodError') return error.message || 'Unable to save mentor profile';
  const paths = error.issues?.map((issue) => issue.path?.join('.')) || [];
  if (paths.some((path) => path.startsWith('education'))) {
    return 'Please complete your education details and enter valid graduation years.';
  }
  if (paths.some((path) => path.startsWith('professionalExperience'))) {
    return 'Please complete your work experience details.';
  }
  if (paths.includes('profilePhotoUrl')) {
    return 'Please upload a valid profile picture.';
  }
  if (paths.includes('fullName')) {
    return 'Please enter your full name.';
  }
  if (paths.includes('bio')) {
    return 'Please add a short bio of at least 10 characters.';
  }
  const mentoringIssues = error.issues?.filter((issue) => issue.path?.join('.').startsWith('mentoringQA')) || [];
  if (mentoringIssues.some((issue) => issue.code === 'too_small')) {
    return 'Each mentoring response must be at least 30 characters.';
  }
  if (mentoringIssues.length) {
    return 'Please complete all mentoring questions.';
  }
  return 'Please review the required profile fields and try again.';
};

class MentorProfileController {
  async getMyProfile(req, res) {
    try {
      const profile = await mentorProfileService.getByUserId(req.user.id);
      return res
        .status(200)
        .json(
          new ApiResponse(200, "Mentor profile fetched successfully", {
            profile,
          }),
        );
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Failed to fetch mentor profile",
      });
    }
  }

  async createMyProfile(req, res) {
    try {
      const profile = await mentorProfileService.create(req.user.id, {
        ...req.body,
        ...req.uploadedFiles,
      });

      // Refresh token to update onboarding state
      const updatedUser = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          mentorProfile: {
            select: { id: true, approvalStatus: true, isVerified: true },
          },
          menteeProfile: { select: { id: true } },
        },
      });
      const mappedUser = mapUserWithOnboardingState(updatedUser);
      const token = authService.generateToken(mappedUser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(201)
        .json(
          new ApiResponse(201, "Mentor profile created successfully", {
            profile,
            user: mappedUser,
          }),
        );
    } catch (error) {
      await cleanupNewUploads(req.uploadedFiles);
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  async updateMyProfile(req, res) {
    try {
      const profile = await mentorProfileService.update(req.user.id, {
        ...req.body,
        ...req.uploadedFiles,
      });

      // Refresh token to update onboarding state
      const updatedUser = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          mentorProfile: {
            select: { id: true, approvalStatus: true, isVerified: true },
          },
          menteeProfile: { select: { id: true } },
        },
      });
      const mappedUser = mapUserWithOnboardingState(updatedUser);
      const token = authService.generateToken(mappedUser);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json(
          new ApiResponse(200, "Mentor profile updated successfully", {
            profile,
            user: mappedUser,
          }),
        );
    } catch (error) {
      await cleanupNewUploads(req.uploadedFiles);
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: getErrorMessage(error),
      });
    }
  }

  async deleteMyProfile(req, res) {
    try {
      await mentorProfileService.delete(req.user.id);
      return res
        .status(200)
        .json(new ApiResponse(200, "Mentor profile deleted successfully"));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || "Failed to delete mentor profile",
      });
    }
  }
}

export default new MentorProfileController();
