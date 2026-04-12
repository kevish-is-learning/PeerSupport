import jwt from "jsonwebtoken";
import { prisma } from "../config/database.js";
import { ApiError } from "../utils/apiError.js";

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
        provider: true,
        profilePicture: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
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

    const { menteeProfile, ...safeUser } = user;

    req.user = {
      ...safeUser,
      onboardingCompleted: Boolean(menteeProfile),
    };
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
          provider: true,
          profilePicture: true,
          isVerified: true,
          isActive: true,
          menteeProfile: {
            select: {
              id: true,
            },
          },
        },
      });

      if (user && user.isActive) {
        const { menteeProfile, ...safeUser } = user;

        req.user = {
          ...safeUser,
          onboardingCompleted: Boolean(menteeProfile),
        };
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
