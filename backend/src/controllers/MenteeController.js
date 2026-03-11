import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { deleteFile } from "../middleware/upload.middleware.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
        new ApiResponse(true, "Mentor retrieved successfully", { mentor })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve mentor", error.message)
      );
    }
  }

  // Get mentor services
  async getMentorServices(req, res) {
    try {
      const { mentorId } = req.params;

      // Verify mentor exists
      const mentor = await prisma.user.findUnique({
        where: { id: mentorId },
        include: { mentorProfile: true },
      });

      if (!mentor || !mentor.mentorProfile) {
        return res.status(404).json(new ApiError(404, "Mentor not found"));
      }

      const services = await prisma.service.findMany({
        where: {
          mentorId,
          isActive: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json(
        new ApiResponse(true, "Services retrieved successfully", { services })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve services", error.message)
      );
    }
  }

  // Get mentor reviews
  async getMentorReviews(req, res) {
    try {
      const { mentorId } = req.params;

      // Get all services for this mentor
      const services = await prisma.service.findMany({
        where: { mentorId },
        select: { id: true },
      });

      const serviceIds = services.map(s => s.id);

      const reviews = await prisma.serviceReview.findMany({
        where: {
          serviceId: {
            in: serviceIds,
          },
        },
        include: {
          mentee: {
            select: {
              id: true,
              name: true,
              profilePicture: true,
            },
          },
          service: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 20,
      });

      res.status(200).json(
        new ApiResponse(true, "Reviews retrieved successfully", { reviews })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve reviews", error.message)
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

  // Get dashboard stats
  async getDashboardStats(req, res) {
    try {
      const userId = req.user.id;

      const [
        totalServiceReviews,
        totalSpent,
        upcomingWebinars,
        totalWebinarsAttended,
      ] = await Promise.all([
        prisma.serviceReview.count({
          where: {
            menteeId: userId,
          },
        }),
        prisma.transaction.aggregate({
          where: {
            userId,
            type: 'DEBIT',
            status: 'COMPLETED',
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
        prisma.webinarRegistration.count({
          where: {
            userId,
            webinar: {
              startTime: {
                lt: new Date(),
              },
            },
          },
        }),
      ]);

      res.status(200).json(
        new ApiResponse(true, "Dashboard stats retrieved successfully", {
          totalServiceReviews,
          totalSpent: totalSpent._sum.amount || 0,
          upcomingWebinars,
          totalWebinarsAttended,
        })
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, "Failed to retrieve dashboard stats", error.message)
      );
    }
  }

  ///////////////////////////
  // RESUME MANAGEMENT
  ///////////////////////////

  // Upload resume (handles file upload)
  async uploadResume(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json(new ApiError(400, "No file uploaded"));
      }

      const { name } = req.body;
      if (!name) {
        // Delete uploaded file if name not provided
        deleteFile(req.file.path);
        return res.status(400).json(new ApiError(400, "Resume name is required"));
      }

      // Get mentee profile
      const profile = await prisma.menteeProfile.findUnique({
        where: { userId: req.user.id },
      });

      if (!profile) {
        deleteFile(req.file.path);
        return res.status(404).json(
          new ApiError(404, "Mentee profile not found")
        );
      }

      // Create resume record with file URL
      const resumeUrl = `/uploads/resumes/${req.file.filename}`;
      const resume = await prisma.menteeResume.create({
        data: {
          menteeId: profile.id,
          name,
          fileUrl: resumeUrl,
        },
      });

      res.status(201).json(
        new ApiResponse(true, "Resume uploaded successfully", resume)
      );
    } catch (error) {
      // Delete uploaded file if there was an error
      if (req.file) {
        deleteFile(req.file.path);
      }
      res.status(400).json(
        new ApiError(400, error.message || "Failed to upload resume")
      );
    }
  }

  // Get resumes
  async getResumes(req, res) {
    try {
      const profile = await prisma.menteeProfile.findUnique({
        where: { userId: req.user.id },
      });

      if (!profile) {
        return res.status(404).json(
          new ApiError(404, "Mentee profile not found")
        );
      }

      const resumes = await prisma.menteeResume.findMany({
        where: { menteeId: profile.id },
        orderBy: { createdAt: 'desc' },
      });

      res.status(200).json(
        new ApiResponse(true, "Resumes retrieved successfully", resumes)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve resumes")
      );
    }
  }

  // Delete resume
  async deleteResume(req, res) {
    try {
      const { resumeId } = req.params;

      const profile = await prisma.menteeProfile.findUnique({
        where: { userId: req.user.id },
      });

      if (!profile) {
        return res.status(404).json(
          new ApiError(404, "Mentee profile not found")
        );
      }

      const resume = await prisma.menteeResume.findUnique({
        where: { id: resumeId },
      });

      if (!resume) {
        return res.status(404).json(
          new ApiError(404, "Resume not found")
        );
      }

      if (resume.menteeId !== profile.id) {
        return res.status(403).json(
          new ApiError(403, "Unauthorized to delete this resume")
        );
      }

      // Delete the file
      if (resume.fileUrl) {
        const resumePath = path.join(__dirname, '../../uploads/resumes', path.basename(resume.fileUrl));
        deleteFile(resumePath);
      }

      await prisma.menteeResume.delete({
        where: { id: resumeId },
      });

      res.status(200).json(
        new ApiResponse(true, "Resume deleted successfully", null)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to delete resume")
      );
    }
  }
}

export default new MenteeController();
