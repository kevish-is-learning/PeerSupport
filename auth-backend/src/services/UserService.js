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
        mentorProfile: true,
        menteeProfile: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
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
}

export default new UserService();
