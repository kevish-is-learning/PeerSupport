import { prisma } from '../config/database.js';

const VALID_DURATIONS = [15, 30, 45, 60];
const VALID_BUFFERS = [0, 5, 10, 15];
const MIN_PRICE = 50;
const MAX_PRICE = 2000;

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
  serviceId: row.id,
  title: row.title || 'Untitled Service',
  description: row.description || '',
  serviceName: row.title,
  label: row.title,
  serviceSlug: row.title?.toLowerCase().replace(/\s+/g, '-'),
  serviceType: row.title?.toLowerCase().replace(/\s+/g, '-'),
  price: row.price,
  pricePerSession: row.price,
  durationMinutes: row.durationMinutes,
  bufferMinutes: row.bufferMinutes,
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

/**
 * Helper: resolve mentor profile id from user id.
 */
async function getProfileId(userId) {
  const profile = await prisma.mentorProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!profile) throw createServiceError(404, 'Mentor profile not found');
  return profile.id;
}

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
    const profileId = await getProfileId(userId);

    const services = await prisma.mentorService.findMany({
      where: { mentorProfileId: profileId },
            orderBy: { createdAt: 'asc' },
    });

    return services.map(mapService);
  }

  /**
   * Create a new custom service.
   * Active by default.
   */
  async createService(userId, data) {
    const profileId = await getProfileId(userId);

    const { title, description, price, durationMinutes, bufferMinutes } = data;

    if (!title || !title.trim()) {
      throw createServiceError(400, 'Service title is required');
    }
    if (price == null || price < MIN_PRICE || price > MAX_PRICE) {
      throw createServiceError(400, `Price must be between ₹${MIN_PRICE} and ₹${MAX_PRICE}`);
    }
    if (!VALID_DURATIONS.includes(durationMinutes)) {
      throw createServiceError(400, 'Duration must be 15, 30, 45, or 60 minutes');
    }
    const buf = bufferMinutes ?? 0;
    if (!VALID_BUFFERS.includes(buf)) {
      throw createServiceError(400, 'Buffer must be 0, 5, 10, or 15 minutes');
    }

    const service = await prisma.mentorService.create({
      data: {
        mentorProfileId: profileId,
        title: title.trim(),
        description: description?.trim() || null,
        price,
        durationMinutes,
        bufferMinutes: buf,
        isActive: true,
      },
          });

    return mapService(service);
  }

  /**
   * Update an existing service by ID.
   */
  async updateService(userId, id, data) {
    const profileId = await getProfileId(userId);

    const existing = await prisma.mentorService.findFirst({
      where: { id, mentorProfileId: profileId },
    });
    if (!existing) throw createServiceError(404, 'Service not found');

    if (data.title !== undefined && !data.title.trim()) {
      throw createServiceError(400, 'Service title cannot be empty');
    }
    if (data.price !== undefined && (data.price < MIN_PRICE || data.price > MAX_PRICE)) {
      throw createServiceError(400, `Price must be between ₹${MIN_PRICE} and ₹${MAX_PRICE}`);
    }
    if (data.durationMinutes !== undefined && !VALID_DURATIONS.includes(data.durationMinutes)) {
      throw createServiceError(400, 'Duration must be 15, 30, 45, or 60 minutes');
    }
    if (data.bufferMinutes !== undefined && !VALID_BUFFERS.includes(data.bufferMinutes)) {
      throw createServiceError(400, 'Buffer must be 0, 5, 10, or 15 minutes');
    }

    const updateData = {};
    if (data.title !== undefined) updateData.title = data.title.trim();
    if (data.description !== undefined) updateData.description = data.description?.trim() || null;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.durationMinutes !== undefined) updateData.durationMinutes = data.durationMinutes;
    if (data.bufferMinutes !== undefined) updateData.bufferMinutes = data.bufferMinutes;

    const updated = await prisma.mentorService.update({
      where: { id },
      data: updateData,
          });

    return mapService(updated);
  }

  /**
   * Toggle the isActive flag for a service.
   */
  async toggleActive(userId, id) {
    const profileId = await getProfileId(userId);

    const existing = await prisma.mentorService.findFirst({
      where: { id, mentorProfileId: profileId },
    });
    if (!existing) throw createServiceError(404, 'Service not found');

    const updated = await prisma.mentorService.update({
      where: { id },
      data: { isActive: !existing.isActive },
          });

    return mapService(updated);
  }

  /**
   * Delete a service by ID.
   */
  async deleteService(userId, id) {
    const profileId = await getProfileId(userId);

    const existing = await prisma.mentorService.findFirst({
      where: { id, mentorProfileId: profileId },
    });
    if (!existing) throw createServiceError(404, 'Service not found');

    await prisma.mentorService.delete({ where: { id } });
    return { deleted: true, id };
  }

  // ─── Legacy: bulk upsert (backward compat) ──────────────────────────────
  async bulkUpsert(userId, payload) {
    const { services: incoming } = payload;
    const profileId = await getProfileId(userId);

    const slugs = incoming.map((s) => s.serviceType).filter(Boolean);
    const serviceRows = await prisma.service.findMany({
      where: { slug: { in: slugs } },
    });
    const slugToId = {};
    for (const svc of serviceRows) slugToId[svc.slug] = svc.id;

    const incomingServiceIds = incoming.map((s) => slugToId[s.serviceType]).filter(Boolean);

    const result = await prisma.$transaction(async (tx) => {
      await tx.mentorService.deleteMany({
        where: {
          mentorProfileId: profileId,
          serviceId: { notIn: incomingServiceIds },
        },
      });

      const upserted = [];
      for (const svc of incoming) {
        const serviceId = slugToId[svc.serviceType];
        if (!serviceId) continue;
        const row = await tx.mentorService.upsert({
          where: {
            mentorProfileId_serviceId: { mentorProfileId: profileId, serviceId },
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
                  });
        upserted.push(row);
      }
      return upserted;
    });

    return result.map(mapService);
  }
}

export default new MentorServiceService();
