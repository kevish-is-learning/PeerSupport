import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
import { registerSchema, loginSchema, changePasswordSchema } from '../validators/auth.validator.js';

class AuthService {
  // Generate JWT Token
  generateToken(userId) {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      // { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  async getPostAuthRedirectPath(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        menteeProfile: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return '/profile';
    }

    if (user.role === 'MENTEE' && !user.menteeProfile) {
      return '/onboarding';
    }

    return '/profile';
  }

  // Register with Email/Password
  async register(data) {
    // Validate input using Zod
    const { email, password, name } = registerSchema.parse(data);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      if (existingUser.provider === 'google') {
        throw new Error('Email already registered with Google. Please sign in with Google');
      }
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with default role MENTEE
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || null,
        provider: 'local',
        role: 'MENTEE',
      },
      select: {
        id: true,
        email: true,
        name: true,
        provider: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
    });

    // Generate token
    const token = this.generateToken(user.id);

    return {
      user: {
        ...user,
        onboardingCompleted: false,
      },
      token,
    };
  }

  // Login with Email/Password
  async login(data) {
    // Validate input using Zod
    const { email, password } = loginSchema.parse(data);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        menteeProfile: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user registered with Google
    if (user.provider === 'google' || !user.password) {
      throw new Error('Please sign in with Google');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate token
    const token = this.generateToken(user.id);

    // Return user without password
    const { password: _, menteeProfile, ...userWithoutPassword } = user;

    return {
      user: {
        ...userWithoutPassword,
        onboardingCompleted: Boolean(menteeProfile),
      },
      token,
    };
  }

  // Change password (for local users only)
  async changePassword(userId, data) {
    // Validate input using Zod
    const { currentPassword, newPassword } = changePasswordSchema.parse(data);
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.provider === 'google' || !user.password) {
      throw new Error('Cannot change password for Google accounts');
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { message: 'Password changed successfully' };
  }
}

export default new AuthService();