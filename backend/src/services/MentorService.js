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
      location,
      socialLinks, // Array of {platform, url} - max 5
      
      // Step 2: Expertise
      expertise,
      
      // Step 3: Education
      education10th,
      education12th,
      bachelors,
      masters,
      
      // Step 4: Work Experience
      workExperience, // Array of {company, role, startDate, endDate, description}
      
      // Step 5: CAT Score
      catScore,
      catYear,
      catPercentile,
      
      // Step 6: Certifications
      certifications,
      
      // Step 7: Resumes
      resumes, // Array of {name, fileUrl}
      
      // Pricing
      pricePerSession,
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
        location,
        socialLinks: socialLinks || [],
        expertise,
        education10th: education10th || [],
        education12th: education12th || [],
        bachelors: bachelors || [],
        masters: masters || [],
        workExperience: workExperience || [],
        catScore,
        catYear,
        catPercentile,
        certifications: certifications || [],
        resumes: resumes || [],
        pricePerSession: parseFloat(pricePerSession),
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

    const updatedApplication = await prisma.mentorApplication.update({
      where: { id: application.id },
      data: {
        ...validatedData,
        status: 'PENDING', // Reset to pending if it was rejected
        updatedAt: new Date(),
      },
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
          location: application.location,
          socialLinks: application.socialLinks,
          expertise: application.expertise,
          education10th: application.education10th || [],
          education12th: application.education12th || [],
          bachelors: application.bachelors || [],
          masters: application.masters || [],
          workExperience: application.workExperience,
          catScore: application.catScore,
          catYear: application.catYear,
          catPercentile: application.catPercentile,
          certifications: application.certifications,
          pricePerSession: application.pricePerSession,
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
        ...(validatedData.location !== undefined && { location: validatedData.location }),
        ...(validatedData.socialLinks !== undefined && { socialLinks: validatedData.socialLinks }),
        ...(validatedData.expertise !== undefined && { expertise: validatedData.expertise }),
        ...(validatedData.certifications !== undefined && { certifications: validatedData.certifications }),
        ...(validatedData.pricePerSession !== undefined && { pricePerSession: validatedData.pricePerSession }),
        ...(validatedData.reschedulePolicy !== undefined && { reschedulePolicy: validatedData.reschedulePolicy }),
        ...(validatedData.cancellationPolicy !== undefined && { cancellationPolicy: validatedData.cancellationPolicy }),
        ...(validatedData.refundPolicy !== undefined && { refundPolicy: validatedData.refundPolicy }),
        ...(validatedData.workExperience !== undefined && { workExperience: validatedData.workExperience }),
        ...(validatedData.education10th !== undefined && { education10th: validatedData.education10th }),
        ...(validatedData.education12th !== undefined && { education12th: validatedData.education12th }),
        ...(validatedData.bachelors !== undefined && { bachelors: validatedData.bachelors }),
        ...(validatedData.masters !== undefined && { masters: validatedData.masters }),
        ...(validatedData.catScore !== undefined && { catScore: validatedData.catScore }),
        ...(validatedData.catYear !== undefined && { catYear: validatedData.catYear }),
        ...(validatedData.catPercentile !== undefined && { catPercentile: validatedData.catPercentile }),
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

  // Check if mentor can accept bookings (approved status)
  async canAcceptBookings(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return { canAccept: false, reason: 'Mentor profile not found' };
    }

    if (profile.verificationStatus !== 'APPROVED') {
      return { 
        canAccept: false, 
        reason: 'Your mentor application is still pending approval' 
      };
    }

    return { canAccept: true };
  }

  ///////////////////////////
  // SLOT MANAGEMENT
  ///////////////////////////

  // Create slots
  async createSlots(userId, slots) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    // Check if mentor can accept bookings
    const { canAccept, reason } = await this.canAcceptBookings(userId);
    if (!canAccept) {
      throw new Error(reason);
    }

    const createdSlots = await prisma.$transaction(
      slots.map((slot) =>
        prisma.slot.create({
          data: {
            mentorId: profile.id,
            startTime: new Date(slot.startTime),
            endTime: new Date(slot.endTime),
            status: 'AVAILABLE',
          },
        })
      )
    );

    return createdSlots;
  }

  // Get mentor slots
  async getSlots(userId, filters = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const { status, startDate, endDate } = filters;

    const where = {
      mentorId: profile.id,
      ...(status && { status }),
      ...(startDate && { startTime: { gte: new Date(startDate) } }),
      ...(endDate && { endTime: { lte: new Date(endDate) } }),
    };

    const slots = await prisma.slot.findMany({
      where,
      orderBy: { startTime: 'asc' },
      include: {
        booking: {
          include: {
            mentee: {
              select: this.userSelect,
            },
          },
        },
      },
    });

    return slots;
  }

  // Update slot
  async updateSlot(userId, slotId, updateData) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
      include: { booking: true },
    });

    if (!slot) {
      throw new Error('Slot not found');
    }

    if (slot.mentorId !== profile.id) {
      throw new Error('Unauthorized to update this slot');
    }

    // Can't update booked slots
    if (slot.status === 'BOOKED' && updateData.status !== 'CANCELLED') {
      throw new Error('Cannot modify a booked slot');
    }

    const updatedSlot = await prisma.slot.update({
      where: { id: slotId },
      data: updateData,
    });

    return updatedSlot;
  }

  // Delete slot
  async deleteSlot(userId, slotId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      throw new Error('Slot not found');
    }

    if (slot.mentorId !== profile.id) {
      throw new Error('Unauthorized to delete this slot');
    }

    if (slot.status === 'BOOKED') {
      throw new Error('Cannot delete a booked slot. Cancel the booking first.');
    }

    await prisma.slot.delete({
      where: { id: slotId },
    });

    return { message: 'Slot deleted successfully' };
  }

  ///////////////////////////
  // BOOKINGS
  ///////////////////////////

  // Get mentor's bookings
  async getBookings(userId, filters = {}) {
    const { status, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const where = {
      mentorId: userId,
      ...(status && { status }),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          mentee: {
            select: this.userSelect,
          },
          slot: true,
          payment: true,
          feedback: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Reschedule booking
  async rescheduleBooking(userId, bookingId, newSlotId, reason) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { slot: true },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.mentorId !== userId) {
      throw new Error('Unauthorized to reschedule this booking');
    }

    if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
      throw new Error('Cannot reschedule this booking');
    }

    // Check if new slot is available
    const newSlot = await prisma.slot.findUnique({
      where: { id: newSlotId },
    });

    if (!newSlot || newSlot.status !== 'AVAILABLE') {
      throw new Error('Selected slot is not available');
    }

    if (newSlot.mentorId !== profile.id) {
      throw new Error('Selected slot does not belong to you');
    }

    // Perform reschedule in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Mark old slot as available
      await tx.slot.update({
        where: { id: booking.slotId },
        data: { status: 'AVAILABLE' },
      });

      // Mark new slot as booked
      await tx.slot.update({
        where: { id: newSlotId },
        data: { status: 'BOOKED' },
      });

      // Update booking
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          slotId: newSlotId,
          rescheduledFrom: booking.slotId,
          rescheduledAt: new Date(),
          rescheduledBy: userId,
          rescheduleReason: reason,
        },
        include: {
          slot: true,
          mentee: {
            select: this.userSelect,
          },
        },
      });

      return updatedBooking;
    });

    return result;
  }

  // Cancel booking
  async cancelBooking(userId, bookingId, reason) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { slot: true, payment: true },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.mentorId !== userId) {
      throw new Error('Unauthorized to cancel this booking');
    }

    if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
      throw new Error('Cannot cancel this booking');
    }

    // Check cancellation policy
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    const hoursUntilSession = (new Date(booking.slot.startTime) - new Date()) / (1000 * 60 * 60);
    const refundEligible = hoursUntilSession >= (profile?.cancellationPolicy || 24);

    // Perform cancellation in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Mark slot as available
      await tx.slot.update({
        where: { id: booking.slotId },
        data: { status: 'AVAILABLE' },
      });

      // Update booking
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: 'CANCELLED',
          cancelledAt: new Date(),
          cancelledBy: userId,
          cancellationReason: reason,
          refundInitiated: refundEligible && !!booking.payment,
        },
        include: {
          slot: true,
          mentee: {
            select: this.userSelect,
          },
        },
      });

      return { booking: updatedBooking, refundEligible };
    });

    return result;
  }

  // Complete booking
  async completeBooking(bookingId, mentorNotes) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { slot: true, payment: true },
    });

    if (!booking) {
      throw new Error('Booking not found');
    }

    if (booking.status !== 'CONFIRMED') {
      throw new Error('Only confirmed bookings can be completed');
    }

    const profile = await prisma.mentorProfile.findUnique({
      where: { userId: booking.mentorId },
    });

    // Calculate earnings
    const amount = booking.payment?.amount || profile.pricePerSession;
    const platformFee = (amount * this.PLATFORM_FEE_PERCENTAGE) / 100;
    const netAmount = amount - platformFee;

    // Complete booking and record earnings
    const result = await prisma.$transaction(async (tx) => {
      // Update booking
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: 'COMPLETED',
          mentorNotes,
        },
      });

      // Record earnings
      const earning = await tx.earnings.create({
        data: {
          mentorId: profile.id,
          bookingId,
          amount,
          platformFee,
          netAmount,
          status: 'PENDING', // Will be cleared after some time
        },
      });

      // Update pending earnings in profile
      await tx.mentorProfile.update({
        where: { id: profile.id },
        data: {
          pendingEarnings: { increment: netAmount },
        },
      });

      // Record transaction
      const transaction = await tx.transaction.create({
        data: {
          mentorId: profile.id,
          type: 'EARNING',
          amount: netAmount,
          balanceBefore: profile.balance,
          balanceAfter: profile.balance, // Pending doesn't affect balance yet
          reference: bookingId,
          description: `Earning from booking #${bookingId.slice(-6)}`,
          metadata: { bookingId, platformFee, originalAmount: amount },
        },
      });

      return { booking: updatedBooking, earning, transaction };
    });

    return result;
  }

  ///////////////////////////
  // EARNINGS & ANALYTICS
  ///////////////////////////

  // Get dashboard stats
  async getDashboardStats(userId) {
    console.log(userId)
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    // Get various stats
    const [
      totalBookings,
      completedBookings,
      pendingBookings,
      cancelledBookings,
      totalEarnings,
      thisMonthEarnings,
      ratings,
      incentives,
    ] = await Promise.all([
      prisma.booking.count({ where: { mentorId: userId } }),
      prisma.booking.count({ where: { mentorId: userId, status: 'COMPLETED' } }),
      prisma.booking.count({ where: { mentorId: userId, status: { in: ['PENDING', 'CONFIRMED'] } } }),
      prisma.booking.count({ where: { mentorId: userId, status: 'CANCELLED' } }),
      prisma.earnings.aggregate({
        where: { mentorId: profile.id },
        _sum: { netAmount: true },
      }),
      prisma.earnings.aggregate({
        where: {
          mentorId: profile.id,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
        _sum: { netAmount: true },
      }),
      prisma.review.findMany({
        where: {
          booking: { mentorId: userId },
        },
        select: { rating: true },
      }),
      prisma.incentive.aggregate({
        where: { mentorId: profile.id, status: 'COMPLETED' },
        _sum: { amount: true },
      }),
    ]);

    const avgRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

    return {
      balance: profile.balance,
      pendingEarnings: profile.pendingEarnings,
      totalEarnings: profile.totalEarnings,
      thisMonthEarnings: thisMonthEarnings._sum.netAmount || 0,
      totalIncentives: incentives._sum.amount || 0,
      bookings: {
        total: totalBookings,
        completed: completedBookings,
        pending: pendingBookings,
        cancelled: cancelledBookings,
      },
      rating: {
        average: Math.round(avgRating * 10) / 10,
        count: profile.totalReviews,
      },
      verificationStatus: profile.verificationStatus,
    };
  }

  // Get earnings history
  async getEarningsHistory(userId, filters = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const { page = 1, limit = 20, startDate, endDate } = filters;
    const skip = (page - 1) * limit;

    const where = {
      mentorId: profile.id,
      ...(startDate && { createdAt: { gte: new Date(startDate) } }),
      ...(endDate && { createdAt: { lte: new Date(endDate) } }),
    };

    const [earnings, total] = await Promise.all([
      prisma.earnings.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.earnings.count({ where }),
    ]);

    return {
      earnings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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
  // INCENTIVES
  ///////////////////////////

  // Get incentives
  async getIncentives(userId, filters = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const { page = 1, limit = 20, status, type } = filters;
    const skip = (page - 1) * limit;

    const where = {
      mentorId: profile.id,
      ...(status && { status }),
      ...(type && { type }),
    };

    const [incentives, total] = await Promise.all([
      prisma.incentive.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.incentive.count({ where }),
    ]);

    return {
      incentives,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Claim incentive
  async claimIncentive(userId, incentiveId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    const incentive = await prisma.incentive.findUnique({
      where: { id: incentiveId },
    });

    if (!incentive) {
      throw new Error('Incentive not found');
    }

    if (incentive.mentorId !== profile.id) {
      throw new Error('Unauthorized to claim this incentive');
    }

    if (incentive.status !== 'PENDING') {
      throw new Error('Incentive has already been claimed or expired');
    }

    if (incentive.expiresAt && new Date(incentive.expiresAt) < new Date()) {
      throw new Error('Incentive has expired');
    }

    // Claim incentive
    const result = await prisma.$transaction(async (tx) => {
      // Update incentive
      const claimedIncentive = await tx.incentive.update({
        where: { id: incentiveId },
        data: {
          status: 'COMPLETED',
          claimedAt: new Date(),
        },
      });

      // Add to balance
      await tx.mentorProfile.update({
        where: { id: profile.id },
        data: {
          balance: { increment: incentive.amount },
          totalEarnings: { increment: incentive.amount },
        },
      });

      // Record transaction
      await tx.transaction.create({
        data: {
          mentorId: profile.id,
          type: 'INCENTIVE',
          amount: incentive.amount,
          balanceBefore: profile.balance,
          balanceAfter: profile.balance + incentive.amount,
          reference: incentiveId,
          description: `Incentive: ${incentive.title}`,
        },
      });

      return claimedIncentive;
    });

    return result;
  }

  ///////////////////////////
  // RATINGS & REVIEWS
  ///////////////////////////

  // Get ratings and feedback
  async getRatingsAndFeedback(userId, filters = {}) {
    const { page = 1, limit = 20 } = filters;
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: {
          booking: { mentorId: userId },
        },
        include: {
          booking: {
            select: {
              id: true,
              createdAt: true,
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
      prisma.review.count({
        where: {
          booking: { mentorId: userId },
        },
      }),
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
