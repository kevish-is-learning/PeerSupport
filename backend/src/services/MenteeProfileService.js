import { prisma } from '../config/database.js';
import {
  createMenteeProfileSchema,
  updateMenteeProfileSchema,
} from '../validators/menteeProfile.validator.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const mapProfile = (profile) => ({
  id: profile.id,
  userId: profile.userId,
  name: profile.user.name || null,
  email: profile.user.email,
  dateOfBirth: profile.dateOfBirth.toISOString().split('T')[0],
  education10: profile.education10,
  education12: profile.education12,
  bachelors: profile.bachelors,
  masters: profile.masters,
  workExperience: profile.workExperience,
  certifications: profile.certifications,
  skillsets: profile.skillsets || [],
  catHistory: profile.catHistory,
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

    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (existingProfile) {
      throw createServiceError(409, 'Mentee onboarding profile already exists');
    }

    const createdProfile = await prisma.menteeProfile.create({
      data: {
        userId,
        ...parsedData,
      },
      include: profileInclude,
    });

    return mapProfile(createdProfile);
  }

  async update(userId, payload) {
    const parsedData = updateMenteeProfileSchema.parse(payload);

    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentee onboarding profile not found');
    }

    const updatedProfile = await prisma.menteeProfile.update({
      where: { userId },
      data: parsedData,
      include: profileInclude,
    });

    return mapProfile(updatedProfile);
  }

  async delete(userId) {
    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!existingProfile) {
      throw createServiceError(404, 'Mentee onboarding profile not found');
    }

    await prisma.menteeProfile.delete({ where: { userId } });

    return { deleted: true };
  }
}

export default new MenteeProfileService();
