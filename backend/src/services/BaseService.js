/**
 * Base Service
 * Abstract class providing common CRUD operations via Prisma.
 * All domain services extend this.
 * Pattern: Template Method / Repository
 */

import Database from '../config/database.js';
import logger from '../utils/logger.js';

class BaseService {
  /**
   * @param {string} modelName - Prisma model name (e.g. 'user', 'post')
   */
  constructor(modelName) {
    this.modelName = modelName;
  }

  /**
   * Returns the Prisma delegate for this model.
   * @returns {import('@prisma/client').PrismaClient[string]}
   */
  get model() {
    const db = Database.getInstance();
    return db.getClient()[this.modelName];
  }


  /**
   * Find a single record by ID.
   * @param {string} id
   * @param {object} options - Prisma findUnique options (include, select)
   * @returns {Promise<object|null>}
   */
  async findById(id, options = {}) {
    return this.model.findUnique({ where: { id }, ...options });
  }

  /**
   * Find a single record matching a filter.
   * @param {object} where
   * @param {object} options
   * @returns {Promise<object|null>}
   */
  async findOne(where, options = {}) {
    return this.model.findFirst({ where, ...options });
  }

  /**
   * Find many records with pagination.
   * @param {object} params
   * @param {object} params.where - Filter criteria
   * @param {number} params.skip
   * @param {number} params.take
   * @param {object} params.orderBy
   * @param {object} params.include
   * @returns {Promise<{ data: object[], total: number }>}
   */
  async findMany({ where = {}, skip = 0, take = 10, orderBy = { createdAt: 'desc' }, include } = {}) {
    const [data, total] = await Promise.all([
      this.model.findMany({ where, skip, take, orderBy, include }),
      this.model.count({ where }),
    ]);
    return { data, total };
  }

  /**
   * Create a new record.
   * @param {object} data
   * @param {object} options
   * @returns {Promise<object>}
   */
  async create(data, options = {}) {
    return this.model.create({ data, ...options });
  }

  /**
   * Update a record by ID.
   * @param {string} id
   * @param {object} data
   * @param {object} options
   * @returns {Promise<object>}
   */
  async update(id, data, options = {}) {
    return this.model.update({ where: { id }, data, ...options });
  }

  /**
   * Soft delete (if model supports deletedAt) or hard delete.
   * @param {string} id
   * @param {boolean} soft
   * @returns {Promise<object>}
   */
  async delete(id, soft = true) {
    if (soft) {
      return this.model.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    }
    return this.model.delete({ where: { id } });
  }

  /**
   * Count records matching a filter.
   * @param {object} where
   * @returns {Promise<number>}
   */
  async count(where = {}) {
    return this.model.count({ where });
  }
}

export default BaseService;
