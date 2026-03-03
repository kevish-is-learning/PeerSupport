/**
 * Helper Utilities
 * Common pure utility functions used across the application.
 */

class Helpers {
  /**
   * Builds a standardized API success response.
   * @param {any} data
   * @param {string} message
   * @param {object} meta - Pagination, etc.
   * @returns {object}
   */
  static successResponse(data, message = 'Success', meta = null) {
    const response = { success: true, message, data };
    if (meta) response.meta = meta;
    return response;
  }

  /**
   * Builds a standardized API error response.
   * @param {string} message
   * @param {array} errors
   * @returns {object}
   */
  static errorResponse(message = 'Error', errors = []) {
    return { success: false, message, errors };
  }

  /**
   * Builds pagination meta from query params.
   * @param {number} page
   * @param {number} limit
   * @param {number} total
   * @returns {object}
   */
  static paginationMeta(page, limit, total) {
    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    };
  }

  /**
   * Parses pagination params from request query.
   * @param {object} query - req.query
   * @returns {{ page: number, limit: number, skip: number }}
   */
  static parsePagination(query) {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(query.limit, 10) || 10));
    const skip = (page - 1) * limit;
    return { page, limit, skip };
  }

  /**
   * Strips sensitive fields from a user object.
   * @param {object} user
   * @returns {object}
   */
  static sanitizeUser(user) {
    if (!user) return null;
    const { password, ...sanitized } = user;
    return sanitized;
  }

  /**
   * Generates a random alphanumeric string.
   * @param {number} length
   * @returns {string}
   */
  static generateRandomString(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Slugifies a string (for URL-friendly slugs).
   * @param {string} text
   * @returns {string}
   */
  static slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

export default Helpers;
