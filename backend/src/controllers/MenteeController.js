import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { createBookingSchema } from "../validators/mentee.validator.js";
import { ZodError } from "zod";

const prisma = new PrismaClient();

class MenteeController {
  // Get all mentors (available for booking)
  async getAllMentors(req, res) {
    try {
      const { page = 1, limit = 10, expertise, minPrice, maxPrice, minRating } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const where = {
        role: 'MENTOR',
        isActive: true,
        mentorProfile: {
          isNot: null,
        },
      };

      // Apply filters
      if (expertise) {
        where.mentorProfile.expertise = {
          has: expertise,
        };
      }

      const mentorWhere = {};
      if (minPrice || maxPrice || minRating) {
        if (minPrice) mentorWhere.pricePerSession = { gte: parseFloat(minPrice) };
        if (maxPrice) {
          mentorWhere.pricePerSession = {
            ...mentorWhere.pricePerSession,
            lte: parseFloat(maxPrice),
          };
        }
        if (minRating) mentorWhere.rating = { gte: parseFloat(minRating) };
      }

      const mentors = await prisma.user.findMany({
        where,
        include: {
          mentorProfile: {
            where: Object.keys(mentorWhere).length > 0 ? mentorWhere : undefined,
          },
        },
        skip,
        take: parseInt(limit),
        orderBy: {
          mentorProfile: {
            rating: 'desc',
          },
        },
      });

      const total = await prisma.user.count({ where });

      res.status(200).json(
        new ApiResponse(true, "Mentors retrieved successfully", {
          mentors: mentors.filter(m => m.mentorProfile !== null),
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
          },
        })
      );
    } catch (error) {
      console.log("-------",error)
      res.status(500).json(
        new ApiError(500, "Failed to retrieve mentors", error.message)
      );
    }
  }

  // Get mentor by ID with slots
  async getMentorById(req, res) {
    try {
      const { mentorId } = req.params;

      const mentor = await prisma.user.findUnique({
        where: { id: mentorId },
        include: {
          mentorProfile: {
            include: {
              slots: {
                where: {
                  status: 'AVAILABLE',
                  startTime: {
                    gte: new Date(),
                  },
                },
                orderBy: {
                  startTime: 'asc',
                },
                take: 20,
              },
            },
          },
        },
      });

      if (!mentor || !mentor.mentorProfile) {
        return res.status(404).json(new ApiError(404, "Mentor not found"));
      }

      res.status(200).json(
        new ApiResponse(true, "Mentor retrieved successfully", mentor)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve mentor", error.message)
      );
    }
  }

  // Get my bookings (as mentee)
  async getMyBookings(req, res) {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const where = {
        menteeId: req.user.id,
      };

      if (status) {
        where.status = status;
      }

      const bookings = await prisma.booking.findMany({
        where,
        include: {
          mentor: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePicture: true,
            },
          },
          slot: true,
          payment: true,
          feedback: true,
        },
        skip,
        take: parseInt(limit),
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await prisma.booking.count({ where });

      res.status(200).json(
        new ApiResponse(true, "Bookings retrieved successfully", {
          bookings,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
          },
        })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve bookings", error.message)
      );
    }
  }

  // Get booking by ID
  async getBookingById(req, res) {
    try {
      const { bookingId } = req.params;

      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          menteeId: req.user.id,
        },
        include: {
          mentor: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePicture: true,
              mentorProfile: true,
            },
          },
          slot: true,
          payment: true,
          feedback: true,
        },
      });

      if (!booking) {
        return res.status(404).json(new ApiError(404, "Booking not found"));
      }

      res.status(200).json(
        new ApiResponse(true, "Booking retrieved successfully", booking)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve booking", error.message)
      );
    }
  }

  // Create booking
  async createBooking(req, res) {
    try {
      // Validate input using Zod
      const { mentorId, slotId, sessionMode, purpose, shareProfile } = createBookingSchema.parse(req.body);

      // Check if slot exists and is available
      const slot = await prisma.slot.findUnique({
        where: { id: slotId },
        include: {
          mentor: true,
        },
      });

      if (!slot || slot.status !== 'AVAILABLE') {
        return res.status(400).json(
          new ApiError(400, "Slot not available")
        );
      }

      // Verify mentor exists
      const mentor = await prisma.user.findUnique({
        where: { id: mentorId },
        include: { mentorProfile: true },
      });

      if (!mentor || !mentor.mentorProfile) {
        return res.status(404).json(
          new ApiError(404, "Mentor not found")
        );
      }

      // Create booking
      const booking = await prisma.booking.create({
        data: {
          mentorId,
          menteeId: req.user.id,
          slotId,
          sessionMode,
          purpose,
          shareProfile,
          status: 'PENDING',
          sessionType: 'ONE_ON_ONE',
        },
        include: {
          mentor: {
            select: {
              id: true,
              name: true,
              email: true,
              mentorProfile: true,
            },
          },
          mentee: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          slot: true,
        },
      });

      // Update slot status
      await prisma.slot.update({
        where: { id: slotId },
        data: { status: 'BOOKED' },
      });

      res.status(201).json(
        new ApiResponse(true, "Booking created successfully. Proceed to payment.", {
          booking,
          paymentRequired: true,
          amount: mentor.mentorProfile.pricePerSession,
        })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to create booking", error.message)
      );
    }
  }

  // Cancel booking
  async cancelBooking(req, res) {
    try {
      const { bookingId } = req.params;

      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          menteeId: req.user.id,
        },
        include: {
          slot: true,
        },
      });

      if (!booking) {
        return res.status(404).json(new ApiError(404, "Booking not found"));
      }

      if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
        return res.status(400).json(
          new ApiError(400, "Cannot cancel this booking")
        );
      }

      // Update booking status
      const updatedBooking = await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'CANCELLED' },
      });

      // Free up the slot
      await prisma.slot.update({
        where: { id: booking.slotId },
        data: { status: 'AVAILABLE' },
      });

      res.status(200).json(
        new ApiResponse(true, "Booking cancelled successfully", updatedBooking)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to cancel booking", error.message)
      );
    }
  }

  // Submit review for booking
  async submitReview(req, res) {
    try {
      const { bookingId } = req.params;
      const { rating, comment } = req.body;

      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          menteeId: req.user.id,
          status: 'COMPLETED',
        },
      });

      if (!booking) {
        return res.status(404).json(
          new ApiError(404, "Booking not found or not completed")
        );
      }

      // Check if review already exists
      const existingReview = await prisma.review.findUnique({
        where: { bookingId },
      });

      if (existingReview) {
        return res.status(400).json(
          new ApiError(400, "Review already submitted")
        );
      }

      // Create review
      const review = await prisma.review.create({
        data: {
          bookingId,
          rating,
          comment,
        },
      });

      // Update mentor's rating
      const mentor = await prisma.user.findUnique({
        where: { id: booking.mentorId },
        include: { mentorProfile: true },
      });

      if (mentor?.mentorProfile) {
        const allReviews = await prisma.review.findMany({
          where: {
            booking: {
              mentorId: booking.mentorId,
            },
          },
        });

        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

        await prisma.mentorProfile.update({
          where: { id: mentor.mentorProfile.id },
          data: {
            rating: avgRating,
            totalReviews: allReviews.length,
          },
        });
      }

      res.status(201).json(
        new ApiResponse(true, "Review submitted successfully", review)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to submit review", error.message)
      );
    }
  }

  // Get all webinars
  async getAllWebinars(req, res) {
    try {
      const { type, page = 1, limit = 10 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const where = {
        startTime: {
          gte: new Date(),
        },
      };

      if (type) {
        where.type = type;
      }

      const webinars = await prisma.webinar.findMany({
        where,
        include: {
          registrations: {
            where: {
              userId: req.user.id,
            },
          },
          _count: {
            select: {
              registrations: true,
            },
          },
        },
        skip,
        take: parseInt(limit),
        orderBy: {
          startTime: 'asc',
        },
      });

      const total = await prisma.webinar.count({ where });

      const webinarsWithRegistration = webinars.map(w => ({
        ...w,
        isRegistered: w.registrations.length > 0,
        totalRegistrations: w._count.registrations,
        registrations: undefined,
        _count: undefined,
      }));

      res.status(200).json(
        new ApiResponse(true, "Webinars retrieved successfully", {
          webinars: webinarsWithRegistration,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
          },
        })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve webinars", error.message)
      );
    }
  }

  // Register for webinar
  async registerForWebinar(req, res) {
    try {
      const { webinarId } = req.params;

      const webinar = await prisma.webinar.findUnique({
        where: { id: webinarId },
      });

      if (!webinar) {
        return res.status(404).json(new ApiError(404, "Webinar not found"));
      }

      // Check if already registered
      const existing = await prisma.webinarRegistration.findFirst({
        where: {
          webinarId,
          userId: req.user.id,
        },
      });

      if (existing) {
        return res.status(400).json(
          new ApiError(400, "Already registered for this webinar")
        );
      }

      const registration = await prisma.webinarRegistration.create({
        data: {
          webinarId,
          userId: req.user.id,
          paymentId: webinar.type === 'PAID' 
            ? `pay_webinar_${Math.random().toString(36).substring(7)}` 
            : null,
        },
        include: {
          webinar: true,
        },
      });

      res.status(201).json(
        new ApiResponse(true, "Registered for webinar successfully", registration)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to register for webinar", error.message)
      );
    }
  }

  // Get my webinar registrations
  async getMyWebinarRegistrations(req, res) {
    try {
      const registrations = await prisma.webinarRegistration.findMany({
        where: {
          userId: req.user.id,
        },
        include: {
          webinar: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json(
        new ApiResponse(true, "Registrations retrieved successfully", registrations)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve registrations", error.message)
      );
    }
  }

  // Get notifications
  async getNotifications(req, res) {
    try {
      const { page = 1, limit = 20, isRead } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const where = {
        userId: req.user.id,
      };

      if (isRead !== undefined) {
        where.isRead = isRead === 'true';
      }

      const notifications = await prisma.notification.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: {
          createdAt: 'desc',
        },
      });

      const total = await prisma.notification.count({ where });
      const unreadCount = await prisma.notification.count({
        where: { userId: req.user.id, isRead: false },
      });

      res.status(200).json(
        new ApiResponse(true, "Notifications retrieved successfully", {
          notifications,
          unreadCount,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages: Math.ceil(total / parseInt(limit)),
          },
        })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve notifications", error.message)
      );
    }
  }

  // Mark notification as read
  async markNotificationAsRead(req, res) {
    try {
      const { notificationId } = req.params;

      const notification = await prisma.notification.update({
        where: {
          id: notificationId,
          userId: req.user.id,
        },
        data: {
          isRead: true,
        },
      });

      res.status(200).json(
        new ApiResponse(true, "Notification marked as read", notification)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to mark notification as read", error.message)
      );
    }
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead(req, res) {
    try {
      await prisma.notification.updateMany({
        where: {
          userId: req.user.id,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      res.status(200).json(
        new ApiResponse(true, "All notifications marked as read", null)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to mark all notifications as read", error.message)
      );
    }
  }

  // Get dashboard stats
  async getDashboardStats(req, res) {
    try {
      const userId = req.user.id;

      const [
        upcomingBookings,
        completedBookings,
        pendingBookings,
        totalSpent,
        upcomingWebinars,
        unreadNotifications,
      ] = await Promise.all([
        prisma.booking.count({
          where: {
            menteeId: userId,
            status: 'CONFIRMED',
            slot: {
              startTime: {
                gte: new Date(),
              },
            },
          },
        }),
        prisma.booking.count({
          where: {
            menteeId: userId,
            status: 'COMPLETED',
          },
        }),
        prisma.booking.count({
          where: {
            menteeId: userId,
            status: 'PENDING',
          },
        }),
        prisma.payment.aggregate({
          where: {
            booking: {
              menteeId: userId,
            },
            status: 'SUCCESS',
          },
          _sum: {
            amount: true,
          },
        }),
        prisma.webinarRegistration.count({
          where: {
            userId,
            webinar: {
              startTime: {
                gte: new Date(),
              },
            },
          },
        }),
        prisma.notification.count({
          where: {
            userId,
            isRead: false,
          },
        }),
      ]);

      res.status(200).json(
        new ApiResponse(true, "Dashboard stats retrieved successfully", {
          upcomingBookings,
          completedBookings,
          pendingBookings,
          totalSpent: totalSpent._sum.amount || 0,
          upcomingWebinars,
          unreadNotifications,
        })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve dashboard stats", error.message)
      );
    }
  }
}

export default new MenteeController();
