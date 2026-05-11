import { prisma } from '../config/database.js';
import { upsertServicesSchema, serviceTypeParamSchema } from '../validators/mentorService.validator.js';

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
  serviceId: row.serviceId,
  serviceName: row.service?.name,
  label: row.service?.name, // Added for frontend compatibility
  serviceSlug: row.service?.slug,
  serviceType: row.service?.slug, // Added for frontend compatibility
  price: row.price,
  pricePerSession: row.price, // Added for frontend compatibility
  durationMinutes: row.durationMinutes,
  bufferMinutes: row.bufferMinutes,
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

class MentorServiceService {
  /**
   * Returns the catalogue of available services.
   */
  async getServiceTypes() {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' },
    });
    return services.map((s) => ({
      id: s.id,
      value: s.slug,
      label: s.name,
      description: s.description,
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
      include: { service: true },
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

    // Resolve serviceType slugs to service IDs
    const slugs = incoming.map((s) => s.serviceType);
    const serviceRows = await prisma.service.findMany({
      where: { slug: { in: slugs } },
    });
    const slugToId = {};
    for (const svc of serviceRows) {
      slugToId[svc.slug] = svc.id;
    }

    const incomingServiceIds = incoming.map((s) => slugToId[s.serviceType]).filter(Boolean);

    // Run inside a transaction for atomicity
    const result = await prisma.$transaction(async (tx) => {
      // 1. Delete services that are no longer in the incoming set
      await tx.mentorService.deleteMany({
        where: {
          mentorProfileId: profileId,
          serviceId: { notIn: incomingServiceIds },
        },
      });

      // 2. Upsert each incoming service
      const upserted = [];
      for (const svc of incoming) {
        const serviceId = slugToId[svc.serviceType];
        if (!serviceId) continue;

        const row = await tx.mentorService.upsert({
          where: {
            mentorProfileId_serviceId: {
              mentorProfileId: profileId,
              serviceId,
            },
          },
          update: {
            price: svc.pricePerSession,
            durationMinutes: svc.durationMinutes ?? 30,
            isActive: svc.isActive ?? true,
          },
          create: {
            mentorProfileId: profileId,
            serviceId,
            price: svc.pricePerSession,
            durationMinutes: svc.durationMinutes ?? 30,
            isActive: svc.isActive ?? true,
          },
          include: { service: true },
        });
        upserted.push(row);
      }

      return upserted;
    });

    return result.map(mapService);
  }

  /**
   * Delete a single service by type (slug) for the authenticated mentor.
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

    // Resolve slug to service ID
    const serviceRow = await prisma.service.findUnique({
      where: { slug: serviceType },
    });

    if (!serviceRow) {
      throw createServiceError(404, `Service ${serviceType} not found`);
    }

    const existing = await prisma.mentorService.findUnique({
      where: {
        mentorProfileId_serviceId: {
          mentorProfileId: profile.id,
          serviceId: serviceRow.id,
        },
      },
    });

    if (!existing) {
      throw createServiceError(404, `Service ${serviceType} not configured for this mentor`);
    }

    await prisma.mentorService.delete({
      where: { id: existing.id },
    });

    return { deleted: true, serviceType };
  }
}

export default new MentorServiceService();
