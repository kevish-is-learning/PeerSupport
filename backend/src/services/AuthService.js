import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { registerSchema, loginSchema, changePasswordSchema } from '../validators/auth.validator.js';

const selectRoleSchema = z.object({
  role: z.enum(['MENTEE', 'MENTOR']),
});

const mapUserWithOnboardingState = (user) => {
  const hasMenteeProfile = Boolean(user.menteeProfile);
  const hasMentorProfile = Boolean(user.mentorProfile);

  const onboardingCompleted =
    (user.role === 'MENTEE' && hasMenteeProfile) ||
    (user.role === 'MENTOR' && hasMentorProfile) ||
    user.role === 'ADMIN';

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    provider: user.provider,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
    onboardingCompleted,
    mentorApprovalStatus: user.mentorProfile?.approvalStatus || null,
    mentorIsVerified: Boolean(user.mentorProfile?.isVerified),
  };
};

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
        mentorProfile: {
          select: {
            id: true,
            isVerified: true,
          },
        },
        menteeProfile: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return '/auth?mode=login';
    }

    if (user.role === 'MENTEE' && !user.menteeProfile) {
      return '/onboarding';
    }

    if (user.role === 'MENTOR' && !user.mentorProfile) {
      return '/onboarding';
    }

    if (user.role === 'MENTOR') {
      return '/mentor/dashboard';
    }

    if (user.role === 'MENTEE') {
      return '/mentee/dashboard';
    }

    if (user.role === 'ADMIN') {
      return '/admin/dashboard';
    }

    return '/onboarding';
  }

  // Register with Email/Password
  async register(data) {
    // Validate input using Zod
    const { email, password, name, role } = registerSchema.parse(data);

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

    // Create user with selected role
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name: name || null,
        provider: 'LOCAL',
        role: role || "MENTEE",
      },
      include: {
        menteeProfile: {
          select: {
            id: true,
          },
        },
        mentorProfile: {
          select: {
            id: true,
            approvalStatus: true,
            isVerified: true,
          },
        },
      },
    });

    // Generate token
    const token = this.generateToken(user.id);

    return {
      user: mapUserWithOnboardingState(user),
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
        mentorProfile: {
          select: {
            approvalStatus: true,
            id: true,
            isVerified: true,
          },
        },
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
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: mapUserWithOnboardingState(userWithoutPassword),
      token,
    };
  }

  async selectRole(userId, data) {
    const { role } = selectRoleSchema.parse(data);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
      },
      include: {
        mentorProfile: {
          select: {
            approvalStatus: true,
            id: true,
            isVerified: true,
          },
        },
        menteeProfile: {
          select: {
            id: true,
          },
        },
      },
    });

    return mapUserWithOnboardingState(updatedUser);
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