/**
 * Application Entry Point
 * Pattern: Composition Root / Builder
 */

import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Server as SocketIOServer } from 'socket.io';

import Environment from './config/environment.js';
import Database from './config/database.js';
import logger from './utils/logger.js';
import routes from './routes/index.js';
import ErrorHandler from './middleware/errorHandler.js';
import RateLimiter from './middleware/rateLimiter.js';
import SocketHandler from './events/socketHandler.js';
import notificationService from './services/NotificationService.js';

class App {
  constructor() {
    this.env = new Environment().validate();
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = null;
  }

  /**
   * Initializes all middleware.
   */
  _initMiddleware() {
    // Security
    this.app.use(helmet());

    // CORS
    this.app.use(
      cors({
        origin: this.env.corsOrigin,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(cookieParser());

    // Compression
    this.app.use(compression());

    // Global rate limiting
    this.app.use(RateLimiter.api);

    // Request logging (development)
    if (this.env.isDevelopment) {
      this.app.use((req, _res, next) => {
        logger.debug(`${req.method} ${req.originalUrl}`);
        next();
      });
    }

    // Static files (uploads)
    this.app.use('/uploads', express.static(this.env.uploadDir));
  }

  /**
   * Mounts API routes.
   */
  _initRoutes() {
    this.app.use('/api', routes);

    // 404 handler
    this.app.use(ErrorHandler.notFound);

    // Global error handler (must be last)
    this.app.use(ErrorHandler.handle);
  }

  /**
   * Initializes Socket.IO for real-time communication.
   */
  _initSocketIO() {
    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: this.env.socketCorsOrigin,
        methods: ['GET', 'POST'],
      },
    });

    SocketHandler.init(this.io);

    // Inject io into notification service for real-time push
    notificationService.setSocketIO(this.io);
  }


  /**
   * Registers graceful shutdown handlers.
   */
  _initGracefulShutdown() {
    const shutdown = async (signal) => {
      logger.info(`${signal} received. Shutting down gracefully...`);

      // Stop accepting new connections
      this.server.close(async () => {
        // Disconnect data stores
        await Database.getInstance().disconnect();

        logger.info('Server shut down successfully');
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    // Catch unhandled rejections
    process.on('unhandledRejection', (reason) => {
      logger.error('Unhandled Rejection:', reason);
    });

    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      process.exit(1);
    });
  }

  /**
   * Starts the application.
   */
  async start() {
    try {
      // Init middleware & routes
      this._initMiddleware();
      this._initRoutes();

      // Init real-time
      this._initSocketIO();

      // Connect data stores
      await this._initDataStores();

      // Graceful shutdown
      this._initGracefulShutdown();

      // Start listening
      this.server.listen(this.env.port, () => {
        logger.info(`
  ================================================
  🚀 Peer Support API Server
  ================================================
  Environment : ${this.env.nodeEnv}
  Port        : ${this.env.port}
  API URL     : http://localhost:${this.env.port}/api
  Health      : http://localhost:${this.env.port}/api/health
  ================================================
        `);
      });
    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

// Boot the application
const app = new App();
app.start();

export default App;
