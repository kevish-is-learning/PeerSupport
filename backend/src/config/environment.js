/**
 * Environment Configuration
 * Centralizes all environment variable access with validation and defaults.
 * Pattern: Singleton + Configuration Object
 */

import dotenv from 'dotenv';
dotenv.config();

class Environment {
  static #instance = null;

  constructor() {
    if (Environment.#instance) {
      return Environment.#instance;
    }

    this.nodeEnv = process.env.NODE_ENV || 'development';
    this.port = parseInt(process.env.PORT, 10) || 5000;

    // Database
    this.databaseUrl = process.env.DATABASE_URL;

    // JWT
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '15m';
    this.jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';


    // CORS
    this.corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

    // File Uploads
    this.maxFileSize = parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024;
    this.uploadDir = process.env.UPLOAD_DIR || 'uploads';

    // Rate Limiting
    this.rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000;
    this.rateLimitMax = parseInt(process.env.RATE_LIMIT_MAX, 10) || 100;

    // Logging
    this.logLevel = process.env.LOG_LEVEL || 'debug';

    Environment.#instance = this;
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

  /**
   * Validates that all required environment variables are set.
   * Call on startup.
   */
  validate() {
    const required = ['DATABASE_URL', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    return this;
  }

  static getInstance() {
    if (!Environment.#instance) {
      new Environment();
    }
    return Environment.#instance;
  }
}

export default Environment;
