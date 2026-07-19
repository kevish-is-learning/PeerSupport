import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class PublicMenteeService {
  async getMenteeProfile(menteeId, requester) {
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

    if (requester.role !== 'ADMIN') {
      const hasBookingRelationship = await prisma.booking.findFirst({
        where: {
          menteeId,
          mentorProfile: { userId: requester.id },
        },
        select: { id: true },
      });
      if (!hasBookingRelationship) {
        throw createServiceError(403, 'You are not authorized to view this mentee');
      }
    }

    const { menteeProfile, ...userData } = user;

    return {
      id: user.id,
      name: user.name,
      profilePicture: user.profilePicture,
      profile: {
        username: menteeProfile.username,
        education: menteeProfile.education,
        workExperience: menteeProfile.workExperience,
        certifications: menteeProfile.certifications,
        expectations: menteeProfile.expectations,
        skillsets: menteeProfile.skillsets,
        linkedInUrl: menteeProfile.linkedInUrl,
      },
    };
  }
}

export default new PublicMenteeService();
