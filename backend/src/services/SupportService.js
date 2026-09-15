/**
 * Support Service
 *
 * Ticket threads between users and admins. A ticket opens with its first
 * message; every reply appends to the thread.
 */

import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const CLOSED_STATUSES = new Set(['RESOLVED', 'CLOSED']);

const ticketInclude = {
  user: { select: { id: true, name: true, email: true, profilePicture: true } },
  messages: {
    orderBy: { createdAt: 'asc' },
    include: { author: { select: { id: true, name: true, profilePicture: true } } },
  },
};

const mapTicket = (ticket) => ({
  id: ticket.id,
  subject: ticket.subject,
  category: ticket.category,
  status: ticket.status,
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
  resolvedAt: ticket.resolvedAt,
  user: ticket.user
    ? {
        id: ticket.user.id,
        name: ticket.user.name,
        email: ticket.user.email,
        profilePicture: ticket.user.profilePicture,
      }
    : null,
  messages: (ticket.messages || []).map((m) => ({
    id: m.id,
    body: m.body,
    isStaffReply: m.isStaffReply,
    createdAt: m.createdAt,
    authorName: m.author?.name ?? 'Unknown',
    authorPicture: m.author?.profilePicture ?? null,
  })),
  lastMessageAt: ticket.messages?.at(-1)?.createdAt ?? ticket.createdAt,
});

class SupportService {
  async createTicket(userId, { subject, category, message }) {
    const ticket = await prisma.supportTicket.create({
      data: {
        userId,
        subject,
        category: category || 'General',
        messages: {
          create: { authorId: userId, body: message, isStaffReply: false },
        },
      },
      include: ticketInclude,
    });

    return mapTicket(ticket);
  }

  async listMyTickets(userId) {
    const tickets = await prisma.supportTicket.findMany({
      where: { userId },
      include: ticketInclude,
      orderBy: { updatedAt: 'desc' },
    });

    return tickets.map(mapTicket);
  }

  async getTicket(userId, ticketId, { isAdmin = false } = {}) {
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
      include: ticketInclude,
    });

    if (!ticket) throw createServiceError(404, 'Ticket not found');
    if (!isAdmin && ticket.userId !== userId) {
      throw createServiceError(403, 'You do not have access to this ticket');
    }

    return mapTicket(ticket);
  }

  async replyToTicket(userId, ticketId, body, { isAdmin = false } = {}) {
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
      select: { id: true, userId: true, status: true },
    });

    if (!ticket) throw createServiceError(404, 'Ticket not found');
    if (!isAdmin && ticket.userId !== userId) {
      throw createServiceError(403, 'You do not have access to this ticket');
    }
    if (ticket.status === 'CLOSED') {
      throw createServiceError(400, 'This ticket is closed — open a new one instead');
    }

    // An admin reply moves an untouched ticket into progress; a user reply on a
    // resolved ticket reopens it.
    const nextStatus = isAdmin
      ? ticket.status === 'OPEN' ? 'IN_PROGRESS' : ticket.status
      : CLOSED_STATUSES.has(ticket.status) ? 'OPEN' : ticket.status;

    const updated = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        status: nextStatus,
        ...(nextStatus !== 'RESOLVED' ? { resolvedAt: null } : {}),
        messages: { create: { authorId: userId, body, isStaffReply: isAdmin } },
      },
      include: ticketInclude,
    });

    return mapTicket(updated);
  }

  async listAllTickets({ status, page = 1, limit = 20 } = {}) {
    const where = status ? { status } : {};
    const take = Number(limit);

    const [tickets, total] = await Promise.all([
      prisma.supportTicket.findMany({
        where,
        include: ticketInclude,
        orderBy: { updatedAt: 'desc' },
        skip: (Number(page) - 1) * take,
        take,
      }),
      prisma.supportTicket.count({ where }),
    ]);

    return {
      tickets: tickets.map(mapTicket),
      pagination: { page: Number(page), limit: take, total, totalPages: Math.ceil(total / take) },
    };
  }

  async updateStatus(ticketId, status) {
    const ticket = await prisma.supportTicket.findUnique({
      where: { id: ticketId },
      select: { id: true },
    });
    if (!ticket) throw createServiceError(404, 'Ticket not found');

    const updated = await prisma.supportTicket.update({
      where: { id: ticketId },
      data: {
        status,
        resolvedAt: CLOSED_STATUSES.has(status) ? new Date() : null,
      },
      include: ticketInclude,
    });

    return mapTicket(updated);
  }
}

export default new SupportService();
