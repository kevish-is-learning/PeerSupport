import { prisma } from '../config/database.js';
import { 
  submitMentorApplicationSchema, 
  updateMentorApplicationSchema, 
  updateMentorProfileSchema 
} from '../validators/mentor.validator.js';

class MentorService {
  // Platform fee percentage (can be configured)
  PLATFORM_FEE_PERCENTAGE = 15;

  userSelect = {
    id: true,
    email: true,
    name: true,
    provider: true,
    role: true,
    profilePicture: true,
    isVerified: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
  };

  ///////////////////////////
  // MENTOR APPLICATION
  ///////////////////////////

  // Submit mentor application with all steps
  async submitMentorApplication(userId, applicationData) {
    // Validate input using Zod
    const validatedData = submitMentorApplicationSchema.parse(applicationData);
    
    const {
      // Step 1: Personal Details & Social Links
      bio,
      headline,
      phone,
      gender,
      location,
      socialLinks, // Array of {platform, url} - max 5
      verificationIds, // Array of verification document IDs
      
      // Step 2: Expertise
      expertise,
      
      // Step 3: Education
      bachelors,
      masters,
      
      // Step 4: Work Experience
      workExperience, // Array of {company, role, startDate, endDate, description}
      
      // Step 5: Exam Scores
      exams, // Array of {examName, score, year, percentile}
      
      // Step 6: Certifications
      certifications,
      
      // Step 7: Resumes
      resumes, // Array of {name, fileUrl}
    } = validatedData;

    // Check if user already has a pending/approved application
    const existingApplication = await prisma.mentorApplication.findFirst({
      where: {
        userId,
        status: { in: ['PENDING', 'APPROVED'] },
      },
    });

    if (existingApplication) {
      if (existingApplication.status === 'PENDING') {
        throw new Error('You already have a pending mentor application');
      }
      if (existingApplication.status === 'APPROVED') {
        throw new Error('Your mentor application has already been approved');
      }
    }

    // Check if user is already a mentor
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { mentorProfile: true },
    });

    if (user.role === 'MENTOR' || user.mentorProfile) {
      throw new Error('You are already registered as a mentor');
    }

    const application = await prisma.mentorApplication.create({
      data: {
        userId,
        bio,
        headline,
        phone,
        gender,
        location,
        socialLinks: socialLinks || [],
        verificationIds: verificationIds || [],
        expertise,
        bachelors: bachelors || [],
        masters: masters || [],
        workExperience: workExperience || [],
        exams: exams || [],
        certifications: certifications || [],
        resumes: resumes || [],
      },
      include: {
        user: {
          select: this.userSelect,
        },
      },
    });

    return application;
  }

  // Update existing application (only if PENDING or REJECTED)
  async updateMentorApplication(userId, applicationData) {
    // Validate input using Zod (partial validation for updates)
    const validatedData = updateMentorApplicationSchema.parse(applicationData);
    
    const application = await prisma.mentorApplication.findFirst({
      where: {
        userId,
        status: { in: ['PENDING', 'REJECTED'] },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!application) {
      throw new Error('No editable application found');
    }

    // Build update data object with proper type conversions
    const updateData = {
      status: 'PENDING', // Reset to pending if it was rejected
      updatedAt: new Date(),
    };

    // Add all fields from validatedData with proper processing
    if (validatedData.bio !== undefined) updateData.bio = validatedData.bio;
    if (validatedData.headline !== undefined) updateData.headline = validatedData.headline;
    if (validatedData.phone !== undefined) updateData.phone = validatedData.phone;
    if (validatedData.gender !== undefined) updateData.gender = validatedData.gender;
    if (validatedData.location !== undefined) updateData.location = validatedData.location;
    if (validatedData.socialLinks !== undefined) updateData.socialLinks = validatedData.socialLinks;
    if (validatedData.verificationIds !== undefined) updateData.verificationIds = validatedData.verificationIds;
    if (validatedData.expertise !== undefined) updateData.expertise = validatedData.expertise;
    if (validatedData.bachelors !== undefined) updateData.bachelors = validatedData.bachelors;
    if (validatedData.masters !== undefined) updateData.masters = validatedData.masters;
    if (validatedData.workExperience !== undefined) updateData.workExperience = validatedData.workExperience;
    if (validatedData.exams !== undefined) updateData.exams = validatedData.exams;
    if (validatedData.certifications !== undefined) updateData.certifications = validatedData.certifications;
    if (validatedData.resumes !== undefined) updateData.resumes = validatedData.resumes;

    const updatedApplication = await prisma.mentorApplication.update({
      where: { id: application.id },
      data: updateData,
      include: {
        user: {
          select: this.userSelect,
        },
      },
    });

    return updatedApplication;
  }

  // Get user's mentor application
  async getUserMentorApplication(userId) {
    const application = await prisma.mentorApplication.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: this.userSelect,
        },
      },
    });

    return application;
  }

  // Approve mentor application (admin only)
  async approveMentorApplication(applicationId, adminUserId) {
    const application = await prisma.mentorApplication.findUnique({
      where: { id: applicationId },
      include: { user: true },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    if (application.status !== 'PENDING') {
      throw new Error('Application has already been processed');
    }

    // Update application and create mentor profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update application
      const updatedApplication = await tx.mentorApplication.update({
        where: { id: applicationId },
        data: {
          status: 'APPROVED',
          reviewedAt: new Date(),
          reviewedBy: adminUserId,
        },
      });

      // Create mentor profile with all data from application
      const mentorProfile = await tx.mentorProfile.create({
        data: {
          userId: application.userId,
          bio: application.bio,
          headline: application.headline,
          phone: application.phone,
          gender: application.gender,
          location: application.location,
          socialLinks: application.socialLinks,
          verificationIds: application.verificationIds || [],
          expertise: application.expertise,
          bachelors: application.bachelors || [],
          masters: application.masters || [],
          workExperience: application.workExperience,
          exams: application.exams,
          certifications: application.certifications,
          verificationStatus: 'APPROVED',
        },
      });

      // Create mentor resumes from application
      if (application.resumes && Array.isArray(application.resumes)) {
        for (const resume of application.resumes) {
          await tx.mentorResume.create({
            data: {
              mentorId: mentorProfile.id,
              name: resume.name,
              fileUrl: resume.fileUrl,
            },
          });
        }
      }

      // Update user role to MENTOR
      await tx.user.update({
        where: { id: application.userId },
        data: { role: 'MENTOR' },
      });

      return { application: updatedApplication, mentorProfile };
    });

    return result;
  }

  ///////////////////////////
  // MENTOR PROFILE
  ///////////////////////////

  // Get mentor profile with full details
  async getMentorProfile(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      include: {
        slots: {
          where: {
            startTime: { gte: new Date() },
          },
          orderBy: { startTime: 'asc' },
          take: 50,
        },
        earnings: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        resumes: true,
        user: {
          select: this.userSelect,
        },
      },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    return profile;
  }

  // Update mentor profile
  async updateMentorProfile(userId, profileData) {
    // Validate input using Zod
    const validatedData = updateMentorProfileSchema.parse(profileData);
    
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const updatedProfile = await prisma.mentorProfile.update({
      where: { userId },
      data: {
        ...(validatedData.bio !== undefined && { bio: validatedData.bio }),
        ...(validatedData.headline !== undefined && { headline: validatedData.headline }),
        ...(validatedData.phone !== undefined && { phone: validatedData.phone }),
        ...(validatedData.gender !== undefined && { gender: validatedData.gender }),
        ...(validatedData.location !== undefined && { location: validatedData.location }),
        ...(validatedData.socialLinks !== undefined && { socialLinks: validatedData.socialLinks }),
        ...(validatedData.verificationIds !== undefined && { verificationIds: validatedData.verificationIds }),
        ...(validatedData.expertise !== undefined && { expertise: validatedData.expertise }),
        ...(validatedData.certifications !== undefined && { certifications: validatedData.certifications }),
        ...(validatedData.reschedulePolicy !== undefined && { reschedulePolicy: validatedData.reschedulePolicy }),
        ...(validatedData.cancellationPolicy !== undefined && { cancellationPolicy: validatedData.cancellationPolicy }),
        ...(validatedData.refundPolicy !== undefined && { refundPolicy: validatedData.refundPolicy }),
        ...(validatedData.workExperience !== undefined && { workExperience: validatedData.workExperience }),
        ...(validatedData.bachelors !== undefined && { bachelors: validatedData.bachelors }),
        ...(validatedData.masters !== undefined && { masters: validatedData.masters }),
        ...(validatedData.exams !== undefined && { exams: validatedData.exams }),
      },
      include: {
        user: {
          select: this.userSelect,
        },
        resumes: true,
      },
    });

    return updatedProfile;
  }

  ///////////////////////////
  // SERVICE MANAGEMENT
  ///////////////////////////

  // Create a new service
  async createService(userId, serviceData) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    if (profile.verificationStatus !== 'APPROVED') {
      throw new Error('Your mentor application must be approved before creating services');
    }

    const service = await prisma.service.create({
      data: {
        mentorId: profile.id,
        title: serviceData.title,
        shortDescription: serviceData.shortDescription,
        longDescription: serviceData.longDescription || null,
        price: serviceData.price,
        duration: serviceData.duration,
        status: serviceData.status || 'DRAFT',
        tags: serviceData.tags || [],
      },
    });

    return service;
  }

  // Get mentor's services
  async getServices(userId, filters = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const { status, category, page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const where = {
      mentorId: profile.id,
      ...(status && { status }),
      ...(category && { category }),
    };

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: {
          reviews: {
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
              mentee: {
                select: this.userSelect,
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.service.count({ where }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get a specific service by ID
  async getServiceById(userId, serviceId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        reviews: {
          include: {
            mentee: {
              select: this.userSelect,
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        mentor: {
          select: {
            id: true,
            userId: true,
            bio: true,
            headline: true,
            expertise: true,
            totalReviews: true,
            verificationStatus: true,
          },
        },
      },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (service.mentorId !== profile.id) {
      throw new Error('Unauthorized to access this service');
    }

    return service;
  }

  // Update a service
  async updateService(userId, serviceId, updateData) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (service.mentorId !== profile.id) {
      throw new Error('Unauthorized to update this service');
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        ...(updateData.title && { title: updateData.title }),
        ...(updateData.shortDescription && { shortDescription: updateData.shortDescription }),
        ...(updateData.longDescription !== undefined && { longDescription: updateData.longDescription }),
        ...(updateData.price !== undefined && { price: updateData.price }),
        ...(updateData.duration !== undefined && { duration: updateData.duration }),
        ...(updateData.tags && { tags: updateData.tags }),
        ...(updateData.category !== undefined && { category: updateData.category }),
      },
    });

    return updatedService;
  }

  // Delete a service
  async deleteService(userId, serviceId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (service.mentorId !== profile.id) {
      throw new Error('Unauthorized to delete this service');
    }

    // Don't allow deletion if service has bookings
    if (service.totalBookings > 0) {
      throw new Error('Cannot delete a service that has been booked. Set it to INACTIVE instead.');
    }

    await prisma.service.delete({
      where: { id: serviceId },
    });

    return { message: 'Service deleted successfully' };
  }

  // Toggle service status (ACTIVE, INACTIVE, DRAFT)
  async toggleServiceStatus(userId, serviceId, status) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      throw new Error('Service not found');
    }

    if (service.mentorId !== profile.id) {
      throw new Error('Unauthorized to update this service');
    }

    if (!['ACTIVE', 'INACTIVE', 'DRAFT'].includes(status)) {
      throw new Error('Invalid status. Must be ACTIVE, INACTIVE, or DRAFT');
    }

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: { status },
    });

    return updatedService;
  }

  ///////////////////////////
  // EARNINGS & ANALYTICS
  ///////////////////////////

  // Get dashboard stats
  async getDashboardStats(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      include: {
        services: {
          select: {
            id: true,
            totalBookings: true,
            totalRevenue: true,
            averageRating: true,
            totalReviews: true,
            status: true,
          },
        },
      },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    // Calculate aggregate service stats
    const totalServices = profile.services.length;
    const activeServices = profile.services.filter(s => s.status === 'ACTIVE').length;
    const totalServiceBookings = profile.services.reduce((sum, s) => sum + (s.totalBookings || 0), 0);
    const totalServiceRevenue = profile.services.reduce((sum, s) => sum + (s.totalRevenue || 0), 0);
    const totalServiceReviews = profile.services.reduce((sum, s) => sum + (s.totalReviews || 0), 0);

    // Calculate average rating across all services
    const servicesWithRatings = profile.services.filter(s => s.averageRating > 0);
    const avgRating = servicesWithRatings.length > 0
      ? servicesWithRatings.reduce((sum, s) => sum + s.averageRating, 0) / servicesWithRatings.length
      : 0;

    // Get this month's earnings from transactions
    const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const thisMonthEarnings = await prisma.transaction.aggregate({
      where: {
        mentorId: profile.id,
        type: 'EARNING',
        createdAt: { gte: thisMonthStart },
      },
      _sum: { amount: true },
    });

    return {
      balance: profile.balance,
      pendingEarnings: profile.pendingEarnings,
      totalEarnings: profile.totalEarnings,
      thisMonthEarnings: thisMonthEarnings._sum.amount || 0,
      services: {
        total: totalServices,
        active: activeServices,
        totalBookings: totalServiceBookings,
        totalRevenue: totalServiceRevenue,
      },
      rating: {
        average: Math.round(avgRating * 10) / 10,
        count: totalServiceReviews,
      },
      verificationStatus: profile.verificationStatus,
    };
  }

  // Get transactions
  async getTransactions(userId, filters = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const { page = 1, limit = 20, type } = filters;
    const skip = (page - 1) * limit;

    const where = {
      mentorId: profile.id,
      ...(type && { type }),
    };

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.transaction.count({ where }),
    ]);

    return {
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  ///////////////////////////
  // WITHDRAWALS
  ///////////////////////////

  // Request withdrawal
  async requestWithdrawal(userId, withdrawalData) {
    const { amount, paymentMethod, bankDetails, upiId } = withdrawalData;

    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    if (amount <= 0) {
      throw new Error('Invalid withdrawal amount');
    }

    if (amount > profile.balance) {
      throw new Error('Insufficient balance');
    }

    // Minimum withdrawal amount
    const MIN_WITHDRAWAL = 500;
    if (amount < MIN_WITHDRAWAL) {
      throw new Error(`Minimum withdrawal amount is ₹${MIN_WITHDRAWAL}`);
    }

    // Check for pending withdrawals
    const pendingWithdrawal = await prisma.withdrawal.findFirst({
      where: {
        mentorId: profile.id,
        status: { in: ['PENDING', 'PROCESSING'] },
      },
    });

    if (pendingWithdrawal) {
      throw new Error('You already have a pending withdrawal request');
    }

    // Validate payment method
    if (paymentMethod === 'bank_transfer' && !bankDetails) {
      throw new Error('Bank details are required for bank transfer');
    }

    if (paymentMethod === 'upi' && !upiId) {
      throw new Error('UPI ID is required for UPI payment');
    }

    // Create withdrawal request
    const withdrawal = await prisma.$transaction(async (tx) => {
      // Deduct from balance
      await tx.mentorProfile.update({
        where: { id: profile.id },
        data: {
          balance: { decrement: amount },
        },
      });

      // Create withdrawal
      const newWithdrawal = await tx.withdrawal.create({
        data: {
          mentorId: profile.id,
          amount,
          paymentMethod,
          bankDetails: bankDetails || null,
          upiId: upiId || null,
        },
      });

      // Record transaction
      await tx.transaction.create({
        data: {
          mentorId: profile.id,
          type: 'WITHDRAWAL',
          amount: -amount,
          balanceBefore: profile.balance,
          balanceAfter: profile.balance - amount,
          reference: newWithdrawal.id,
          description: `Withdrawal request #${newWithdrawal.id.slice(-6)}`,
          status: 'PENDING',
        },
      });

      return newWithdrawal;
    });

    return withdrawal;
  }

  // Get withdrawals
  async getWithdrawals(userId, filters = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const { page = 1, limit = 20, status } = filters;
    const skip = (page - 1) * limit;

    const where = {
      mentorId: profile.id,
      ...(status && { status }),
    };

    const [withdrawals, total] = await Promise.all([
      prisma.withdrawal.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.withdrawal.count({ where }),
    ]);

    return {
      withdrawals,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  ///////////////////////////
  // RATINGS & REVIEWS
  ///////////////////////////

  // Get ratings and feedback for mentor's services
  async getRatingsAndFeedback(userId, filters = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const { page = 1, limit = 20, serviceId } = filters;
    const skip = (page - 1) * limit;

    const where = {
      service: { mentorId: profile.id },
      ...(serviceId && { serviceId }),
    };

    const [reviews, total] = await Promise.all([
      prisma.serviceReview.findMany({
        where,
        include: {
          mentee: {
            select: this.userSelect,
          },
          service: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.serviceReview.count({ where }),
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  ///////////////////////////
  // RESUME MANAGEMENT
  ///////////////////////////

  // Add resume
  async addResume(userId, resumeData) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const resume = await prisma.mentorResume.create({
      data: {
        mentorId: profile.id,
        name: resumeData.name,
        fileUrl: resumeData.fileUrl,
      },
    });

    return resume;
  }

  // Get resumes
  async getResumes(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const resumes = await prisma.mentorResume.findMany({
      where: { mentorId: profile.id },
      orderBy: { createdAt: 'desc' },
    });

    return resumes;
  }

  // Delete resume
  async deleteResume(userId, resumeId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const resume = await prisma.mentorResume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      throw new Error('Resume not found');
    }

    if (resume.mentorId !== profile.id) {
      throw new Error('Unauthorized to delete this resume');
    }

    await prisma.mentorResume.delete({
      where: { id: resumeId },
    });

    return { message: 'Resume deleted successfully' };
  }
}

export default new MentorService();
