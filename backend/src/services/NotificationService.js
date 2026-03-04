import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

class NotificationService {
  async create({ userId, title, message }) {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          title,
          message,
          isRead: false,
        },
      });
      return notification;
    } catch (error) {
      console.error('Failed to create notification:', error);
      throw error;
    }
  }

  async createBookingNotificationForMentee({ menteeId, mentorName, slotDate, bookingId }) {
    return this.create({
      userId: menteeId,
      title: 'Booking Confirmed',
      message: `Your session with ${mentorName} on ${slotDate} has been confirmed. Booking ID: ${bookingId}`,
    });
  }

  async createBookingNotificationForMentor({ mentorId, menteeName, slotDate, bookingId }) {
    return this.create({
      userId: mentorId,
      title: 'New Booking',
      message: `You have a new booking from ${menteeName} on ${slotDate}. Booking ID: ${bookingId}`,
    });
  }

  async createPaymentNotification({ userId, amount, status }) {
    const statusMessage = status === 'SUCCESS' 
      ? `Payment of ₹${amount} was successful.`
      : `Payment of ₹${amount} failed. Please try again.`;
    
    return this.create({
      userId,
      title: status === 'SUCCESS' ? 'Payment Successful' : 'Payment Failed',
      message: statusMessage,
    });
  }

  async getUnreadCount(userId) {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
      },
    });
  }

  async markAsRead(notificationId, userId) {
    return prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: {
        isRead: true,
      },
    });
  }

  async markAllAsRead(userId) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }
}

export default new NotificationService();
