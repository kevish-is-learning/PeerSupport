import { prisma } from '../config/database.js';
import { upsertServicesSchema, serviceTypeParamSchema } from '../validators/mentorService.validator.js';
import { SERVICE_TYPE_LABELS, VALID_SERVICE_TYPES } from '../constants/services.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Maps a raw MentorService row to a clean API shape.
 */
const mapService = (row) => ({
  id: row.id,
  serviceType: row.serviceType,
  label: SERVICE_TYPE_LABELS[row.serviceType],
  pricePerSession: row.pricePerSession,
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

class MentorServiceService {
  /**
   * Returns the catalogue of available service types with display labels.
   * No auth required — useful for the frontend to populate dropdowns.
   */
  getServiceTypes() {
    return VALID_SERVICE_TYPES.map((type) => ({
      value: type,
      label: SERVICE_TYPE_LABELS[type],
    }));
  }

  /**
   * Fetch all services for a mentor (by userId).
   */
  async getByUserId(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const services = await prisma.mentorService.findMany({
      where: { mentorProfileId: profile.id },
      orderBy: { createdAt: 'asc' },
    });

    return services.map(mapService);
  }

  /**
   * Bulk upsert services + pricing.
   * Replaces the full set: services not in the payload are deleted.
   */
  async bulkUpsert(userId, payload) {
    const { services: incoming } = upsertServicesSchema.parse(payload);

    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const profileId = profile.id;
    const incomingTypes = incoming.map((s) => s.serviceType);

    // Run inside a transaction for atomicity
    const result = await prisma.$transaction(async (tx) => {
      // 1. Delete services that are no longer in the incoming set
      await tx.mentorService.deleteMany({
        where: {
          mentorProfileId: profileId,
          serviceType: { notIn: incomingTypes },
        },
      });

      // 2. Upsert each incoming service
      const upserted = [];
      for (const svc of incoming) {
        const row = await tx.mentorService.upsert({
          where: {
            mentorProfileId_serviceType: {
              mentorProfileId: profileId,
              serviceType: svc.serviceType,
            },
          },
          update: {
            pricePerSession: svc.pricePerSession,
            isActive: svc.isActive ?? true,
          },
          create: {
            mentorProfileId: profileId,
            serviceType: svc.serviceType,
            pricePerSession: svc.pricePerSession,
            isActive: svc.isActive ?? true,
          },
        });
        upserted.push(row);
      }

      return upserted;
    });

    return result.map(mapService);
  }

  /**
   * Delete a single service by type for the authenticated mentor.
   */
  async deleteByType(userId, params) {
    const { serviceType } = serviceTypeParamSchema.parse(params);

    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const existing = await prisma.mentorService.findUnique({
      where: {
        mentorProfileId_serviceType: {
          mentorProfileId: profile.id,
          serviceType,
        },
      },
    });

    if (!existing) {
      throw createServiceError(404, `Service ${serviceType} not found`);
    }

    await prisma.mentorService.delete({
      where: { id: existing.id },
    });

    return { deleted: true, serviceType };
  }
}

export default new MentorServiceService();
