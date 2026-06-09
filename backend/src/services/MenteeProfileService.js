import { prisma } from '../config/database.js';
import { destroyAsset } from '../config/cloudinary.js';
import {
  createMenteeProfileSchema,
  updateMenteeProfileSchema,
} from '../validators/menteeProfile.validator.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const removeUploadedAsset = async (url) => {
  if (!url) return;
  await destroyAsset(url);
};

const mapProfile = (profile) => ({
  id: profile.id,
  userId: profile.userId,
  username: profile.username,
  name: profile.user.name || null,
  email: profile.user.email,
  profilePhotoUrl: profile.user.profilePicture || null,
  dateOfBirth: profile.dateOfBirth.toISOString().split('T')[0],
  contactNumber: profile.contactNumber,
  education: profile.education || [],
  catHistory: profile.catHistory,
  otherMbaScore: profile.otherMbaScore,
  workExperience: profile.workExperience,
  certifications: profile.certifications,
  expectations: profile.expectations,
  skillsets: profile.skillsets || [],
  linkedInUrl: profile.linkedInUrl,
  resumeUrl: profile.resumeUrl,
  createdAt: profile.createdAt,
  updatedAt: profile.updatedAt,
});

const profileInclude = {
  user: {
    select: {
      name: true,
      email: true,
      profilePicture: true,
    },
  },
};

class MenteeProfileService {
  async getByUserId(userId) {
    const profile = await prisma.menteeProfile.findUnique({
      where: { userId },
      include: profileInclude,
    });

    if (!profile) {
      throw createServiceError(404, 'Mentee onboarding profile not found');
    }

    return mapProfile(profile);
  }

  async create(userId, payload) {
    const parsedData = createMenteeProfileSchema.parse(payload);
    const { name, profilePhotoUrl, ...profileData } = parsedData;

    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (existingProfile) {
      throw createServiceError(409, 'Mentee onboarding profile already exists');
    }

    const baseUsername = `mentee_${userId.substring(0, 8)}`;

    const createdProfile = await prisma.menteeProfile.create({
      data: {
        userId,
        username: baseUsername,
        ...profileData,
      },
      include: profileInclude,
    });

    if (name || profilePhotoUrl) {
      const updateData = {};
      if (name) updateData.name = name;
      if (profilePhotoUrl) updateData.profilePicture = profilePhotoUrl;
      await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
      if (name) createdProfile.user.name = name;
      if (profilePhotoUrl) createdProfile.user.profilePicture = profilePhotoUrl;
    }

    return mapProfile(createdProfile);
  }

  async update(userId, payload) {
    const parsedData = updateMenteeProfileSchema.parse(payload);
    const { name, profilePhotoUrl, ...profileData } = parsedData;

    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        resumeUrl: true,
        user: { select: { profilePicture: true } },
      },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentee onboarding profile not found');
    }

    const nextResumeUrl = profileData.resumeUrl ?? existingProfile.resumeUrl;

    const updatedProfile = await prisma.menteeProfile.update({
      where: { userId },
      data: {
        ...profileData,
        resumeUrl: nextResumeUrl,
      },
      include: profileInclude,
    });

    // Update User record (name and/or profilePicture)
    const nextProfilePhotoUrl = profilePhotoUrl ?? existingProfile.user?.profilePicture;
    if (name || profilePhotoUrl) {
      const updateData = {};
      if (name) updateData.name = name;
      if (profilePhotoUrl) updateData.profilePicture = nextProfilePhotoUrl;
      await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });
      if (name) updatedProfile.user.name = name;
      if (profilePhotoUrl) updatedProfile.user.profilePicture = nextProfilePhotoUrl;
    }

    // Clean up old profile photo from Cloudinary if replaced
    if (profilePhotoUrl && existingProfile.user?.profilePicture && profilePhotoUrl !== existingProfile.user.profilePicture) {
      await removeUploadedAsset(existingProfile.user.profilePicture);
    }

    if (profileData.resumeUrl && existingProfile.resumeUrl && profileData.resumeUrl !== existingProfile.resumeUrl) {
      await removeUploadedAsset(existingProfile.resumeUrl);
    }

    return mapProfile(updatedProfile);
  }

  async delete(userId) {
    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        resumeUrl: true,
        user: { select: { profilePicture: true } },
      },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentee onboarding profile not found');
    }

    await removeUploadedAsset(existingProfile.resumeUrl);
    await removeUploadedAsset(existingProfile.user?.profilePicture);

    await prisma.menteeProfile.delete({ where: { userId } });

    return { deleted: true };
  }
}

export default new MenteeProfileService();
