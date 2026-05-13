import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class PublicMenteeService {
  async getMenteeProfile(menteeId) {
    const user = await prisma.user.findUnique({
      where: { id: menteeId },
      include: {
        menteeProfile: true,
      },
    });

    if (!user || user.role !== 'MENTEE') {
      throw createServiceError(404, 'Mentee not found');
    }

    if (!user.menteeProfile) {
      throw createServiceError(404, 'Mentee profile not set up yet');
    }

    const { menteeProfile, ...userData } = user;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      createdAt: user.createdAt,
      profile: {
        ...menteeProfile,
      },
    };
  }
}

export default new PublicMenteeService();
