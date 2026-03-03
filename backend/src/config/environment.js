/**
 * Environment Configuration
 * Singleton pattern for managing environment variables
 */

class Environment {
  static instance = null;

  constructor() {
    if (Environment.instance) {
      return Environment.instance;
    }

    // Server
    this.nodeEnv = process.env.NODE_ENV || 'development';
    this.port = parseInt(process.env.PORT || '8080', 10);
    this.clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

    // Database
    this.databaseUrl = process.env.DATABASE_URL;

    // JWT
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-change-in-production';
    this.jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

    // Google OAuth
    this.googleClientId = process.env.GOOGLE_CLIENT_ID;
    this.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    this.googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:8080/api/auth/google/callback';

    // Rate Limiting
    this.rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10); // 15 minutes
    this.rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);

    Environment.instance = this;
  }

  static getInstance() {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  get isDevelopment() {
    return this.nodeEnv === 'development';
  }

  get isProduction() {
    return this.nodeEnv === 'production';
  }

  get isTest() {
    return this.nodeEnv === 'test';
  }
}

export default Environment;
