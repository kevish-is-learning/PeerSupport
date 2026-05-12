/**
 * MentorServiceConfig Service (v2)
 *
 * PUT /mentor/services — upsert MentorService rows (price, duration per service).
 * Links to the seeded Service table rather than enum values.
 */

import { prisma } from '../../config/database.js';
import { upsertMentorServicesSchema } from '../../validators/v2.validator.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

async function requireMentorProfile(userId) {
  const profile = await prisma.mentorProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!profile) throw createServiceError(404, 'Mentor profile not found');
  return profile;
}

class MentorServiceConfigService {
  /**
   * GET all services (seeded catalogue).
   */
  async getAllServices() {
    return prisma.service.findMany({
      orderBy: { name: 'asc' },
    });
  }

  /**
   * GET mentor's configured services.
   */
  async getMentorServices(userId) {
    const profile = await requireMentorProfile(userId);

    const services = await prisma.mentorService.findMany({
      where: { mentorProfileId: profile.id },
            orderBy: { createdAt: 'asc' },
    });

    return services.map((ms) => ({
      id: ms.id,
      serviceId: ms.serviceId,
      serviceName: ms.service.name,
      serviceSlug: ms.service.slug,
      price: ms.price,
      durationMinutes: ms.durationMinutes,
      bufferMinutes: ms.bufferMinutes,
      isActive: ms.isActive,
    }));
  }

  /**
   * PUT /mentor/services — Bulk upsert services.
   * Services not in the payload are deactivated (not deleted, to preserve booking FKs).
   */
  async upsertServices(userId, payload) {
    const { services: incoming } = upsertMentorServicesSchema.parse(payload);
    const profile = await requireMentorProfile(userId);
    const profileId = profile.id;

    // Validate that all serviceIds reference real Service rows
    const serviceIds = incoming.map((s) => s.serviceId);
    const validServices = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true },
    });

    if (validServices.length !== new Set(serviceIds).size) {
      const validIds = new Set(validServices.map((s) => s.id));
      const invalid = serviceIds.filter((id) => !validIds.has(id));
      throw createServiceError(400, `Invalid service IDs: ${invalid.join(', ')}`);
    }

    const result = await prisma.$transaction(async (tx) => {
      const incomingServiceIds = incoming.map((s) => s.serviceId);

      // Deactivate services not in the incoming set
      await tx.mentorService.updateMany({
        where: {
          mentorProfileId: profileId,
          serviceId: { notIn: incomingServiceIds },
        },
        data: { isActive: false },
      });

      // Upsert each incoming service
      const upserted = [];
      for (const svc of incoming) {
        const row = await tx.mentorService.upsert({
          where: {
            mentorProfileId_serviceId: {
              mentorProfileId: profileId,
              serviceId: svc.serviceId,
            },
          },
          update: {
            price: svc.price,
            durationMinutes: svc.durationMinutes,
            bufferMinutes: svc.bufferMinutes ?? 0,
            isActive: svc.isActive ?? true,
          },
          create: {
            mentorProfileId: profileId,
            serviceId: svc.serviceId,
            price: svc.price,
            durationMinutes: svc.durationMinutes,
            bufferMinutes: svc.bufferMinutes ?? 0,
            isActive: svc.isActive ?? true,
          },
                  });
        upserted.push(row);
      }

      return upserted;
    });

    return result.map((ms) => ({
      id: ms.id,
      serviceId: ms.serviceId,
      serviceName: ms.service.name,
      serviceSlug: ms.service.slug,
      price: ms.price,
      durationMinutes: ms.durationMinutes,
      bufferMinutes: ms.bufferMinutes,
      isActive: ms.isActive,
    }));
  }
}

export default new MentorServiceConfigService();
