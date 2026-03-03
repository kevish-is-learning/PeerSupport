/**
 * Database Configuration
 * Singleton wrapper around Prisma Client for connection management.
 * Pattern: Singleton
 */

import { PrismaClient } from '../generated/prisma/index.js';

import logger from '../utils/logger.js';

class Database {
  static #instance = null;
  #client = null;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }
    Database.#instance = this;
  }

  /**
   * Returns the Prisma client instance, creating it if needed.
   * @returns {PrismaClient}
   */
  getClient() {
    if (!this.#client) {
      this.#client = new PrismaClient({
        log: [
          { level: 'query', emit: 'event' },
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
        ],
      });

      // Log queries in development
      this.#client.$on('query', (e) => {
        logger.debug(`Query: ${e.query} — Duration: ${e.duration}ms`);
      });
    }
    return this.#client;
  }

  /**
   * Establishes database connection.
   */
  async connect() {
    try {
      const client = this.getClient();
      await client.$connect();
      logger.info('✅ Database connected successfully');
    } catch (error) {
      logger.error('❌ Database connection failed:', error.message);
      throw error;
    }
  }

  /**
   * Gracefully disconnects from the database.
   */
  async disconnect() {
    if (this.#client) {
      await this.#client.$disconnect();
      this.#client = null;
      logger.info('Database disconnected');
    }
  }

  static getInstance() {
    if (!Database.#instance) {
      new Database();
    }
    return Database.#instance;
  }
}

export default Database;
