/**
 * Socket.IO Event Handler
 * Manages WebSocket connections for real-time notifications.
 * Pattern: Observer
 */

import jwt from 'jsonwebtoken';
import Environment from '../config/environment.js';
import logger from '../utils/logger.js';

class SocketHandler {
  /**
   * @param {import('socket.io').Server} io
   */
  static init(io) {
    // Authentication middleware for sockets
    io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication required'));
      }

      try {
        const env = Environment.getInstance();
        const decoded = jwt.verify(token, env.jwtSecret);
        socket.user = decoded;
        next();
      } catch (err) {
        next(new Error('Invalid token'));
      }
    });

    io.on('connection', (socket) => {
      const userId = socket.user.id;

      // Join the user's personal notification room
      socket.join(`user:${userId}`);
      logger.debug(`Socket connected: user ${userId}`);

      // Handle joining a post room (for live comment updates)
      socket.on('join:post', (postId) => {
        socket.join(`post:${postId}`);
        logger.debug(`User ${userId} joined post room: ${postId}`);
      });

      socket.on('leave:post', (postId) => {
        socket.leave(`post:${postId}`);
      });

      // Typing indicator for comments
      socket.on('typing:start', ({ postId }) => {
        socket.to(`post:${postId}`).emit('typing:start', {
          userId,
          username: socket.user.username,
        });
      });

      socket.on('typing:stop', ({ postId }) => {
        socket.to(`post:${postId}`).emit('typing:stop', { userId });
      });

      socket.on('disconnect', () => {
        logger.debug(`Socket disconnected: user ${userId}`);
      });
    });

    logger.info('✅ Socket.IO handler initialized');
  }
}

export default SocketHandler;
