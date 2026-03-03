import bcrypt from 'bcryptjs';
import { prisma } from '../config/database.js';

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
            sopDocuments: true,
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
  async createUser({ email, password, name, role = 'MENTEE', isVerified = false }) {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Validate role
    const validRoles = ['MENTOR', 'MENTEE', 'ADMIN'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role. Must be MENTOR, MENTEE, or ADMIN');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
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
    const { name, profilePicture, role, isActive, isVerified } = updateData;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // Validate role if provided
    if (role) {
      const validRoles = ['MENTOR', 'MENTEE', 'ADMIN'];
      if (!validRoles.includes(role)) {
        throw new Error('Invalid role. Must be MENTOR, MENTEE, or ADMIN');
      }
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
    const validRoles = ['MENTOR', 'MENTEE', 'ADMIN'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role. Must be MENTOR, MENTEE, or ADMIN');
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
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
          sopDocuments: true,
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
          sopDocuments: true,
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
        sopDocuments: true,
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
}

export default new UserService();
