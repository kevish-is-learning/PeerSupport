/**
 * Helper Utilities
 */

class Helpers {
  /**
   * Sanitize user object by removing sensitive fields
   * @param {object} user
   * @returns {object}
   */
  static sanitizeUser(user) {
    const { password, ...sanitized } = user;
    return sanitized;
  }

  /**
   * Generate a random username from email
   * @param {string} email
   * @returns {string}
   */
  static generateUsernameFromEmail(email) {
    const base = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    const random = Math.floor(Math.random() * 10000);
    return `${base}${random}`;
  }

  /**
   * Check if a string is a valid email
   * @param {string} email
   * @returns {boolean}
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Sleep for a given number of milliseconds
   * @param {number} ms
   * @returns {Promise<void>}
   */
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Paginate results
   * @param {number} page
   * @param {number} limit
   * @returns {{ skip: number, take: number }}
   */
  static paginate(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return { skip, take: limit };
  }
}

export default Helpers;
