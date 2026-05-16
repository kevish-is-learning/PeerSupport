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
      profilePicture: true,
    },
  },
  mentorServices: {
    where: { isActive: true },
        orderBy: { createdAt: 'asc' },
  },
  availabilityWindows: {
    include: {
      windowServices: {
        include: {
          mentorService: {
            select: { title: true },
          },
        },
      },
    },
    orderBy: { startTime: 'asc' },
  },
};

const mapProfile = (profile) => ({
  id: profile.id,
  userId: profile.userId,
  username: profile.username,
  name: profile.user.name || null,
  email: profile.user.email,
  linkedInUrl: profile.linkedInUrl,
  contactNumber: profile.contactNumber,
  bio: profile.bio,
  expertiseTags: profile.expertiseTags,
  // Normalized services
  services: (profile.mentorServices || []).map((ms) => ({
    id: ms.id,
    serviceId: ms.id,
    serviceName: ms.title,
    label: ms.title, // Added for frontend compatibility
    serviceSlug: ms.title?.toLowerCase().replace(/\s+/g, '-'),
    serviceType: ms.title?.toLowerCase().replace(/\s+/g, '-'), // Added for frontend compatibility
    price: ms.price,
    pricePerSession: ms.price, // Added for frontend compatibility
    durationMinutes: ms.durationMinutes,
    bufferMinutes: ms.bufferMinutes,
    isActive: ms.isActive,
  })),
  // Normalized availability windows
  availability: (profile.availabilityWindows || []).map((w) => ({
    id: w.id,
    specificDate: w.specificDate
      ? new Date(w.specificDate).toISOString().split('T')[0]
      : null,
    startTime: w.startTime,
    endTime: w.endTime,
    services: (w.windowServices || []).map((ws) => ({
      windowServiceId: ws.id,
      mentorServiceId: ws.mentorServiceId,
      serviceName: ws.mentorService?.title,
    })),
  })),
  ugCollegeProfile: profile.ugCollegeProfile,
  pgProfile: profile.pgCollegeProfile,
  workExperience: profile.workExperience,
  certifications: profile.certifications,
  profilePhotoUrl: profile.user?.profilePicture,
  collegeDocumentUrl: profile.collegeDocumentUrl,
  isVerified: profile.isVerified,
  approvalStatus: profile.approvalStatus,
  createdAt: profile.createdAt,
  updatedAt: profile.updatedAt,
});

class MentorProfileService {
  async getById(mentorProfileId) {
    if (!mentorProfileId) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const profile = await prisma.mentorProfile.findUnique({
      where: { id: mentorProfileId },
      include: profileInclude,
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor onboarding profile not found');
    }
    
    return mapProfile(profile);
  }

  async getByUserId(userId) {
    if (!userId) {
      throw createServiceError(400, 'User ID is required');
    }

    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      include: profileInclude,
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }
    
    return mapProfile(profile);
  }

  async create(userId, payload) {
    const parsedData = createMentorProfileSchema.parse(payload);
    
    // Extract fields that don't match MentorProfile model directly
    const { profilePhotoUrl, pgProfile, ...restData } = parsedData;

    const existingProfile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (existingProfile) {
      throw createServiceError(409, 'Mentor onboarding profile already exists');
    }

    // Default username if not provided (Prisma requires it to be unique)
    const baseUsername = `mentor_${userId.substring(0, 8)}`;

    const createdProfile = await prisma.mentorProfile.create({
      data: {
        userId,
        username: baseUsername,
        ...restData,
        pgCollegeProfile: pgProfile,
        isVerified: false,
        approvalStatus: 'PENDING',
      },
      include: profileInclude,
    });

    if (profilePhotoUrl) {
      await prisma.user.update({
        where: { id: userId },
        data: { profilePicture: profilePhotoUrl }
      });
      createdProfile.user.profilePicture = profilePhotoUrl;
    }

    return mapProfile(createdProfile);
  }

  async update(userId, payload) {
    const parsedData = updateMentorProfileSchema.parse(payload);
    const { profilePhotoUrl, pgProfile, ...restData } = parsedData;

    const existingProfile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        collegeDocumentUrl: true,
        user: { select: { profilePicture: true } }
      },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentor onboarding profile not found');
    }

    const nextProfilePhotoUrl = profilePhotoUrl ?? existingProfile.user?.profilePicture;
    const nextCollegeDocumentUrl = restData.collegeDocumentUrl ?? existingProfile.collegeDocumentUrl;

    const updatedProfile = await prisma.mentorProfile.update({
      where: { userId },
      data: {
        ...restData,
        pgCollegeProfile: pgProfile,
        collegeDocumentUrl: nextCollegeDocumentUrl,
      },
      include: profileInclude,
    });

    if (profilePhotoUrl) {
      await prisma.user.update({
        where: { id: userId },
        data: { profilePicture: nextProfilePhotoUrl }
      });
      updatedProfile.user.profilePicture = nextProfilePhotoUrl;
    }

    if (profilePhotoUrl && existingProfile.user?.profilePicture && profilePhotoUrl !== existingProfile.user.profilePicture) {
      await removeUploadedFile(existingProfile.user.profilePicture);
    }

    if (
      restData.collegeDocumentUrl &&
      existingProfile.collegeDocumentUrl &&
      restData.collegeDocumentUrl !== existingProfile.collegeDocumentUrl
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
        collegeDocumentUrl: true,
        user: { select: { profilePicture: true } }
      },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentor onboarding profile not found');
    }

    await removeUploadedFile(existingProfile.user?.profilePicture);
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
        isVerified: parsedData.approvalStatus === 'APPROVED',
      },
      include: profileInclude,
    });

    return mapProfile(updatedProfile);
  }
}

export default new MentorProfileService();
