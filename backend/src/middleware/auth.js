import jwt from "jsonwebtoken";
import { prisma } from "../config/database.js";
import { ApiError } from "../utils/apiError.js";

const mapRequestUser = (user) => {
  const hasMenteeProfile = Boolean(user.menteeProfile);
  const hasMentorProfile = Boolean(user.mentorProfile);

  const onboardingCompleted =
    (user.role === "MENTEE" && hasMenteeProfile) ||
    (user.role === "MENTOR" && hasMentorProfile) ||
    user.role === "ADMIN";

  const { menteeProfile, mentorProfile, ...safeUser } = user;

  return {
    ...safeUser,
    onboardingCompleted,
    mentorApprovalStatus: mentorProfile?.approvalStatus || null,
    mentorIsVerified: Boolean(mentorProfile?.isVerified),
    mentorProfileId: mentorProfile?.id || null,
    menteeProfileId: menteeProfile?.id || null,
  };
};

// JWT Authentication Middleware
const authenticateJWT = async (req, res, next) => {
  try {
    // Read token from cookie instead of Authorization header
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "Authentication token missing",
            "Please log in to access this resource",
          ),
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        role: true,
        provider: true,
        profilePicture: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        mentorProfile: {
          select: {
            id: true,
            approvalStatus: true,
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
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "User not found",
            "Please log in to access this resource",
          ),
        );
    }

    // Check if user is active
    if (!user.isActive) {
      return res
        .status(403)
        .json(
          new ApiError(
            403,
            "Account is deactivated",
            "Your account has been deactivated",
          ),
        );
    }

    const mappedUser = mapRequestUser(user);
    // Prefer decoded token IDs if available, fallback to DB
    mappedUser.mentorProfileId = decoded.mentorProfileId || mappedUser.mentorProfileId;
    mappedUser.menteeProfileId = decoded.menteeProfileId || mappedUser.menteeProfileId;
    
    req.user = mappedUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "Token expired",
            "Your authentication token has expired",
          ),
        );
    }

    return res
      .status(401)
      .json(
        new ApiError(401, "Invalid token", "The provided token is invalid"),
      );
  }
};

// Optional JWT Authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    // Read token from cookie
    const token = req.cookies.token;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          role: true,
          provider: true,
          profilePicture: true,
          isVerified: true,
          isActive: true,
          mentorProfile: {
            select: {
              id: true,
              approvalStatus: true,
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

      if (user && user.isActive) {
        const mappedUser = mapRequestUser(user);
        mappedUser.mentorProfileId = decoded.mentorProfileId || mappedUser.mentorProfileId;
        mappedUser.menteeProfileId = decoded.menteeProfileId || mappedUser.menteeProfileId;
        req.user = mappedUser;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

// Role-based Authorization Middleware
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json(
          new ApiError(
            401,
            "Authentication required",
            "Please log in to access this resource",
          ),
        );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json(
          new ApiError(
            403,
            "Access denied",
            "You do not have permission to access this resource",
          ),
        );
    }

    next();
  };
};

// Admin only middleware
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json(
        new ApiError(
          401,
          "Authentication required",
          "Please log in to access this resource",
        ),
      );
  }

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(
        new ApiError(
          403,
          "Access denied",
          "You do not have permission to access this resource",
        ),
      );
  }

  next();
};

export { authenticateJWT, optionalAuth, authorizeRoles, adminOnly };
