import bcrypt from 'bcryptjs';
import { prisma } from '../config/database.js';
import { createUserSchema, updateUserSchema, updateRoleSchema } from '../validators/user.validator.js';

class UserService {
  // Select fields for user responses (excluding sensitive data)
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

  // Get all users with pagination and filtering
  async getAllUsers({ page = 1, limit = 10, role, isActive, search }) {
    const skip = (page - 1) * limit;
    
    const where = {
      deletedAt: null,
      ...(role && { role }),
      ...(isActive !== undefined && { isActive }),
      ...(search && {
        OR: [
          { email: { contains: search, mode: 'insensitive' } },
          { name: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: this.userSelect,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get user by ID
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        ...this.userSelect,
        mentorProfile: {
          include: {
            slots: true,
            earnings: true,
          }
        },
        menteeProfile: {
          include: {
            resumes: true,
          }
        },
        adminProfile: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Return only the relevant profile based on user role
    const response = { ...user };
    if (user.role === 'MENTOR') {
      delete response.menteeProfile;
      delete response.adminProfile;
    } else if (user.role === 'MENTEE') {
      delete response.mentorProfile;
      delete response.adminProfile;
    } else if (user.role === 'ADMIN') {
      delete response.mentorProfile;
      delete response.menteeProfile;
    }

    return response;
  }

  // Get user by email
  async getUserByEmail(email) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: this.userSelect,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  // Create user (admin only - with role specification)
  async createUser(data) {
    // Validate input using Zod
    const { email, password, name, role, isVerified } = createUserSchema.parse(data);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role,
        provider: 'local',
        isVerified,
      },
      select: this.userSelect,
    });

    return user;
  }

  // Update user
  async updateUser(userId, updateData) {
    // Validate input using Zod
    const { name, profilePicture, role, isActive, isVerified } = updateUserSchema.parse(updateData);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(profilePicture !== undefined && { profilePicture }),
        ...(role !== undefined && { role }),
        ...(isActive !== undefined && { isActive }),
        ...(isVerified !== undefined && { isVerified }),
      },
      select: this.userSelect,
    });

    return user;
  }

  // Update user role
  async updateUserRole(userId, role) {
    // Validate input using Zod
    const { role: validatedRole } = updateRoleSchema.parse({ role });

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: validatedRole },
      select: this.userSelect,
    });

    return user;
  }

  // Soft delete user
  async deleteUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    return { message: 'User deleted successfully' };
  }

  // Hard delete user (permanent)
  async permanentDeleteUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'User permanently deleted' };
  }

  // Restore soft-deleted user
  async restoreUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.deletedAt) {
      throw new Error('User is not deleted');
    }

    const restoredUser = await prisma.user.update({
      where: { id: userId },
      data: {
        deletedAt: null,
        isActive: true,
      },
      select: this.userSelect,
    });

    return restoredUser;
  }

  // Activate/Deactivate user
  async toggleUserStatus(userId, isActive) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive },
      select: this.userSelect,
    });

    return user;
  }

  // Get users by role
  async getUsersByRole(role, { page = 1, limit = 10 }) {
    const validRoles = ['MENTOR', 'MENTEE', 'ADMIN'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role. Must be MENTOR, MENTEE, or ADMIN');
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { role, deletedAt: null },
        select: this.userSelect,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: { role, deletedAt: null } }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Verify user email
  async verifyUser(userId) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isVerified: true },
      select: this.userSelect,
    });

    return user;
  }

  // Check if email exists
  async emailExists(email) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return !!user;
  }

  ///////////////////////////
  // MENTEE PROFILE CRUD
  ///////////////////////////

  // Create or Update Mentee Profile
  async createOrUpdateMenteeProfile(userId, profileData) {
    // Verify user is a mentee
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.role !== 'MENTEE') {
      throw new Error('User must have MENTEE role to create/update mentee profile');
    }

    const {
      dob,
      education10th,
      education12th,
      bachelors,
      masters,
      workExperience,
      certifications,
      catScore,
      expectations,
    } = profileData;

    // Check if profile exists
    const existingProfile = await prisma.menteeProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await prisma.menteeProfile.update({
        where: { userId },
        data: {
          ...(dob !== undefined && { dob: dob ? new Date(dob) : null }),
          ...(education10th !== undefined && { education10th }),
          ...(education12th !== undefined && { education12th }),
          ...(bachelors !== undefined && { bachelors }),
          ...(masters !== undefined && { masters }),
          ...(workExperience !== undefined && { workExperience }),
          ...(certifications !== undefined && { certifications }),
          ...(catScore !== undefined && { catScore }),
          ...(expectations !== undefined && { expectations }),
        },
        include: {
          resumes: true,
        },
      });
      return updatedProfile;
    } else {
      // Create new profile
      const newProfile = await prisma.menteeProfile.create({
        data: {
          userId,
          dob: dob ? new Date(dob) : null,
          education10th,
          education12th,
          bachelors,
          masters,
          workExperience,
          certifications: certifications || [],
          catScore,
          expectations,
        },
        include: {
          resumes: true,
        },
      });
      return newProfile;
    }
  }

  // Get Mentee Profile
  async getMenteeProfile(userId) {
    const profile = await prisma.menteeProfile.findUnique({
      where: { userId },
      include: {
        resumes: true,
        user: {
          select: this.userSelect,
        },
      },
    });

    if (!profile) {
      throw new Error('Mentee profile not found');
    }

    return profile;
  }

  // Delete Mentee Profile
  async deleteMenteeProfile(userId) {
    const profile = await prisma.menteeProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentee profile not found');
    }

    await prisma.menteeProfile.delete({
      where: { userId },
    });

    return { message: 'Mentee profile deleted successfully' };
  }

  ///////////////////////////
  // MENTOR PROFILE CRUD
  ///////////////////////////

  // Create or Update Mentor Profile
  async createOrUpdateMentorProfile(userId, profileData) {
    // Verify user is a mentor
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.role !== 'MENTOR') {
      throw new Error('User must have MENTOR role to create/update mentor profile');
    }

    const {
      bio,
      expertise,
      certifications,
      pricePerSession,
      verificationStatus,
      verifiedBadge,
    } = profileData;

    // Check if profile exists
    const existingProfile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await prisma.mentorProfile.update({
        where: { userId },
        data: {
          ...(bio !== undefined && { bio }),
          ...(expertise !== undefined && { expertise }),
          ...(certifications !== undefined && { certifications }),
          ...(pricePerSession !== undefined && { pricePerSession }),
          ...(verificationStatus !== undefined && { verificationStatus }),
          ...(verifiedBadge !== undefined && { verifiedBadge }),
        },
        include: {
          slots: true,
          earnings: true,
        },
      });
      return updatedProfile;
    } else {
      // Create new profile - bio, expertise, and pricePerSession are required
      if (!bio || !expertise || pricePerSession === undefined) {
        throw new Error('Bio, expertise, and pricePerSession are required to create mentor profile');
      }

      const newProfile = await prisma.mentorProfile.create({
        data: {
          userId,
          bio,
          expertise,
          certifications: certifications || [],
          pricePerSession,
          verificationStatus: verificationStatus || 'PENDING',
          verifiedBadge: verifiedBadge || false,
        },
        include: {
          slots: true,
          earnings: true,
        },
      });
      return newProfile;
    }
  }

  // Get Mentor Profile
  async getMentorProfile(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      include: {
        slots: {
          where: {
            startTime: { gte: new Date() },
          },
          orderBy: { startTime: 'asc' },
        },
        earnings: true,
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

  // Delete Mentor Profile
  async deleteMentorProfile(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Mentor profile not found');
    }

    await prisma.mentorProfile.delete({
      where: { userId },
    });

    return { message: 'Mentor profile deleted successfully' };
  }

  ///////////////////////////
  // ADMIN PROFILE CRUD
  ///////////////////////////

  // Create or Update Admin Profile
  async createOrUpdateAdminProfile(userId, profileData) {
    // Verify user is an admin
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.role !== 'ADMIN') {
      throw new Error('User must have ADMIN role to create/update admin profile');
    }

    const {
      department,
      permissions,
      phoneNumber,
      lastLoginAt,
    } = profileData;

    // Check if profile exists
    const existingProfile = await prisma.adminProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      // Update existing profile
      const updatedProfile = await prisma.adminProfile.update({
        where: { userId },
        data: {
          ...(department !== undefined && { department }),
          ...(permissions !== undefined && { permissions }),
          ...(phoneNumber !== undefined && { phoneNumber }),
          ...(lastLoginAt !== undefined && { lastLoginAt: lastLoginAt ? new Date(lastLoginAt) : null }),
        },
      });
      return updatedProfile;
    } else {
      // Create new profile
      const newProfile = await prisma.adminProfile.create({
        data: {
          userId,
          department,
          permissions: permissions || [],
          phoneNumber,
          lastLoginAt: lastLoginAt ? new Date(lastLoginAt) : null,
        },
      });
      return newProfile;
    }
  }

  // Get Admin Profile
  async getAdminProfile(userId) {
    const profile = await prisma.adminProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: this.userSelect,
        },
      },
    });

    if (!profile) {
      throw new Error('Admin profile not found');
    }

    return profile;
  }

  // Delete Admin Profile
  async deleteAdminProfile(userId) {
    const profile = await prisma.adminProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error('Admin profile not found');
    }

    await prisma.adminProfile.delete({
      where: { userId },
    });

    return { message: 'Admin profile deleted successfully' };
  }

  ///////////////////////////
  // ROLE-BASED PROFILE OPERATIONS
  ///////////////////////////

  // Get profile based on user role
  async getProfileByRole(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        ...this.userSelect,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let profile;
    switch (user.role) {
      case 'MENTEE':
        profile = await this.getMenteeProfile(userId);
        break;
      case 'MENTOR':
        profile = await this.getMentorProfile(userId);
        break;
      case 'ADMIN':
        profile = await this.getAdminProfile(userId);
        break;
      default:
        throw new Error('Invalid user role');
    }

    return {
      user,
      profile,
    };
  }

  // Update profile based on user role
  async updateProfileByRole(userId, profileData) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let profile;
    switch (user.role) {
      case 'MENTEE':
        profile = await this.createOrUpdateMenteeProfile(userId, profileData);
        break;
      case 'MENTOR':
        profile = await this.createOrUpdateMentorProfile(userId, profileData);
        break;
      case 'ADMIN':
        profile = await this.createOrUpdateAdminProfile(userId, profileData);
        break;
      default:
        throw new Error('Invalid user role');
    }

    return profile;
  }

  // Delete profile based on user role
  async deleteProfileByRole(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    let result;
    switch (user.role) {
      case 'MENTEE':
        result = await this.deleteMenteeProfile(userId);
        break;
      case 'MENTOR':
        result = await this.deleteMentorProfile(userId);
        break;
      case 'ADMIN':
        result = await this.deleteAdminProfile(userId);
        break;
      default:
        throw new Error('Invalid user role');
    }

    return result;
  }

  ///////////////////////////
  // RESUME MANAGEMENT (MENTEE)
  ///////////////////////////

  // Add resume to mentee profile
  async addResume(menteeProfileId, resumeData) {
    const { name, fileUrl } = resumeData;

    if (!name || !fileUrl) {
      throw new Error('Resume name and file URL are required');
    }

    const resume = await prisma.resume.create({
      data: {
        menteeId: menteeProfileId,
        name,
        fileUrl,
      },
    });

    return resume;
  }

  // Get all resumes for a mentee
  async getResumes(menteeProfileId) {
    const resumes = await prisma.resume.findMany({
      where: { menteeId: menteeProfileId },
      orderBy: { createdAt: 'desc' },
    });

    return resumes;
  }

  // Delete a resume
  async deleteResume(resumeId, userId) {
    // Verify resume belongs to user
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
      include: {
        mentee: {
          select: { userId: true },
        },
      },
    });

    if (!resume) {
      throw new Error('Resume not found');
    }

    if (resume.mentee.userId !== userId) {
      throw new Error('Unauthorized to delete this resume');
    }

    await prisma.resume.delete({
      where: { id: resumeId },
    });

    return { message: 'Resume deleted successfully' };
  }

  ///////////////////////////
  // MENTOR APPLICATION MANAGEMENT
  ///////////////////////////

  // Submit mentor application (by user)
  async submitMentorApplication(userId, applicationData) {
    const { bio, expertise, certifications, pricePerSession } = applicationData;

    // Validate required fields
    if (!bio || !expertise || expertise.length === 0 || !pricePerSession) {
      throw new Error('All fields are required: bio, expertise, and price per session');
    }

    // Check if user already has a pending application
    const existingApplication = await prisma.mentorApplication.findFirst({
      where: {
        userId,
        status: 'PENDING',
      },
    });

    if (existingApplication) {
      throw new Error('You already have a pending mentor application');
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
        expertise,
        certifications: certifications || [],
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

  // Update mentor application (only if PENDING or REJECTED)
  async updateMentorApplication(userId, applicationData) {
    const { bio, expertise, certifications, pricePerSession } = applicationData;

    // Find the user's most recent application that can be edited
    const application = await prisma.mentorApplication.findFirst({
      where: {
        userId,
        status: { in: ['PENDING', 'REJECTED'] },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!application) {
      throw new Error('No editable application found. You can only update pending or rejected applications.');
    }

    // Update the application
    const updatedApplication = await prisma.mentorApplication.update({
      where: { id: application.id },
      data: {
        bio: bio !== undefined ? bio : application.bio,
        expertise: expertise !== undefined ? expertise : application.expertise,
        certifications: certifications !== undefined ? certifications : application.certifications,
        pricePerSession: pricePerSession !== undefined ? parseFloat(pricePerSession) : application.pricePerSession,
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

  // Get all mentor applications (admin only) with filtering
  async getAllMentorApplications({ page = 1, limit = 10, status }) {
    const skip = (page - 1) * limit;
    
    const where = {
      ...(status && { status }),
    };

    const [applications, total] = await Promise.all([
      prisma.mentorApplication.findMany({
        where,
        include: {
          user: {
            select: this.userSelect,
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mentorApplication.count({ where }),
    ]);

    return {
      applications,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get single mentor application by ID
  async getMentorApplicationById(applicationId) {
    const application = await prisma.mentorApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: {
          select: this.userSelect,
        },
      },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    return application;
  }

  // Get user's own mentor application
  async getUserMentorApplication(userId) {
    const application = await prisma.mentorApplication.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return application;
  }

  // Approve mentor application (admin only)
  async approveMentorApplication(applicationId) {
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

    // Update application status and create mentor profile in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update application
      const updatedApplication = await tx.mentorApplication.update({
        where: { id: applicationId },
        data: {
          status: 'APPROVED',
          reviewedAt: new Date(),
        },
      });

      // Create mentor profile
      const mentorProfile = await tx.mentorProfile.create({
        data: {
          userId: application.userId,
          bio: application.bio,
          expertise: application.expertise,
          certifications: application.certifications,
          pricePerSession: application.pricePerSession,
          verificationStatus: 'PENDING',
        },
      });

      // Update user role to MENTOR
      await tx.user.update({
        where: { id: application.userId },
        data: { role: 'MENTOR' },
      });

      return { application: updatedApplication, mentorProfile };
    });

    return result;
  }

  // Reject mentor application (admin only)
  async rejectMentorApplication(applicationId, rejectionReason) {
    const application = await prisma.mentorApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    if (application.status !== 'PENDING') {
      throw new Error('Application has already been processed');
    }

    const updatedApplication = await prisma.mentorApplication.update({
      where: { id: applicationId },
      data: {
        status: 'REJECTED',
        rejectionReason: rejectionReason || 'Application does not meet requirements',
        reviewedAt: new Date(),
      },
    });

    return updatedApplication;
  }
}

export default new UserService();
