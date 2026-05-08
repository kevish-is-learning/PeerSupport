import { prisma } from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';
import {
  createMentorProfileSchema,
  updateMentorProfileSchema,
  updateMentorApprovalSchema,
} from '../validators/mentorProfile.validator.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const removeUploadedFile = async (publicFilePath) => {
  if (!publicFilePath) {
    return;
  }

  const absolutePath = path.resolve(process.cwd(), publicFilePath.replace(/^\/+/, ''));
  try {
    await fs.unlink(absolutePath);
  } catch (_error) {
    // Ignore deletion failures for stale files.
  }
};

const profileInclude = {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};

const mapProfile = (profile) => ({
  id: profile.id,
  userId: profile.userId,
  name: profile.user.name || null,
  email: profile.user.email,
  linkedInUrl: profile.linkedInUrl,
  contactNumber: profile.contactNumber,
  bio: profile.bio,
  expertiseTags: profile.expertiseTags,
  servicesOffered: profile.servicesOffered,
  servicePricing: profile.servicePricing,
  weeklyAvailability: profile.weeklyAvailability,
  ugCollegeProfile: profile.ugCollegeProfile,
  pgProfile: profile.pgProfile,
  workExperience: profile.workExperience,
  certifications: profile.certifications,
  profilePhotoUrl: profile.profilePhotoUrl,
  collegeDocumentUrl: profile.collegeDocumentUrl,
  isVerified: profile.isVerified,
  approvalStatus: profile.approvalStatus,
  adminReviewNotes: profile.adminReviewNotes,
  createdAt: profile.createdAt,
  updatedAt: profile.updatedAt,
});

class MentorProfileService {
  async getByUserId(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      include: profileInclude,
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor onboarding profile not found');
    }

    return mapProfile(profile);
  }

  async create(userId, payload) {
    const parsedData = createMentorProfileSchema.parse(payload);

    const existingProfile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (existingProfile) {
      throw createServiceError(409, 'Mentor onboarding profile already exists');
    }

    const createdProfile = await prisma.mentorProfile.create({
      data: {
        userId,
        ...parsedData,
        isVerified: false,
        approvalStatus: 'PENDING',
        adminReviewNotes: null,
      },
      include: profileInclude,
    });

    return mapProfile(createdProfile);
  }

  async update(userId, payload) {
    const parsedData = updateMentorProfileSchema.parse(payload);

    const existingProfile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        profilePhotoUrl: true,
        collegeDocumentUrl: true,
      },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentor onboarding profile not found');
    }

    const nextProfilePhotoUrl = parsedData.profilePhotoUrl ?? existingProfile.profilePhotoUrl;
    const nextCollegeDocumentUrl = parsedData.collegeDocumentUrl ?? existingProfile.collegeDocumentUrl;

    const updatedProfile = await prisma.mentorProfile.update({
      where: { userId },
      data: {
        ...parsedData,
        profilePhotoUrl: nextProfilePhotoUrl,
        collegeDocumentUrl: nextCollegeDocumentUrl,
        isVerified: false,
        approvalStatus: 'PENDING',
        adminReviewNotes: null,
      },
      include: profileInclude,
    });

    if (parsedData.profilePhotoUrl && existingProfile.profilePhotoUrl && parsedData.profilePhotoUrl !== existingProfile.profilePhotoUrl) {
      await removeUploadedFile(existingProfile.profilePhotoUrl);
    }

    if (
      parsedData.collegeDocumentUrl &&
      existingProfile.collegeDocumentUrl &&
      parsedData.collegeDocumentUrl !== existingProfile.collegeDocumentUrl
    ) {
      await removeUploadedFile(existingProfile.collegeDocumentUrl);
    }

    return mapProfile(updatedProfile);
  }

  async delete(userId) {
    const existingProfile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        profilePhotoUrl: true,
        collegeDocumentUrl: true,
      },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentor onboarding profile not found');
    }

    await removeUploadedFile(existingProfile.profilePhotoUrl);
    await removeUploadedFile(existingProfile.collegeDocumentUrl);

    await prisma.mentorProfile.delete({ where: { userId } });

    return { deleted: true };
  }

  async listWaitlist() {
    const profiles = await prisma.mentorProfile.findMany({
      where: { approvalStatus: 'PENDING' },
      include: profileInclude,
      orderBy: {
        createdAt: 'asc',
      },
    });

    return profiles.map(mapProfile);
  }

  async updateApproval(profileId, payload) {
    const parsedData = updateMentorApprovalSchema.parse(payload);

    const existingProfile = await prisma.mentorProfile.findUnique({
      where: { id: profileId },
      select: { id: true },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const updatedProfile = await prisma.mentorProfile.update({
      where: { id: profileId },
      data: {
        approvalStatus: parsedData.approvalStatus,
        adminReviewNotes: parsedData.adminReviewNotes || null,
        isVerified: parsedData.approvalStatus === 'APPROVED',
      },
      include: profileInclude,
    });

    return mapProfile(updatedProfile);
  }
}

export default new MentorProfileService();
