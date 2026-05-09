import { prisma } from '../config/database.js';
import fs from 'fs/promises';
import path from 'path';
import {
  createMenteeProfileSchema,
  updateMenteeProfileSchema,
} from '../validators/menteeProfile.validator.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const removeUploadedFile = async (publicFilePath) => {
  if (!publicFilePath || !publicFilePath.startsWith('/uploads/')) {
    return;
  }

  const absolutePath = path.resolve(process.cwd(), publicFilePath.replace(/^\/+/, ''));
  try {
    await fs.unlink(absolutePath);
  } catch (_error) {
    // Ignore stale file deletion errors.
  }
};

const mapProfile = (profile) => ({
  id: profile.id,
  userId: profile.userId,
  username: profile.username,
  name: profile.user.name || null,
  email: profile.user.email,
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
    const { name, ...profileData } = parsedData;

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

    if (name) {
      await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
      createdProfile.user.name = name;
    }

    return mapProfile(createdProfile);
  }

  async update(userId, payload) {
    const parsedData = updateMenteeProfileSchema.parse(payload);
    const { name, ...profileData } = parsedData;

    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        resumeUrl: true,
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

    if (name) {
      await prisma.user.update({
        where: { id: userId },
        data: { name },
      });
      updatedProfile.user.name = name;
    }

    if (profileData.resumeUrl && existingProfile.resumeUrl && profileData.resumeUrl !== existingProfile.resumeUrl) {
      await removeUploadedFile(existingProfile.resumeUrl);
    }

    return mapProfile(updatedProfile);
  }

  async delete(userId) {
    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: {
        id: true,
        resumeUrl: true,
      },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentee onboarding profile not found');
    }

    await removeUploadedFile(existingProfile.resumeUrl);

    await prisma.menteeProfile.delete({ where: { userId } });

    return { deleted: true };
  }
}

export default new MenteeProfileService();
