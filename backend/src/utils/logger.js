/**
 * Logger Utility
 * Centralized logging with Winston.
 * Pattern: Singleton
 */

import winston from 'winston';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  defaultMeta: { service: 'peer-support-api' },
  transports: [
    // Console transport (always)
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),

    // File transports (production & development)
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

// In test env, silence logs
if (process.env.NODE_ENV === 'test') {
  logger.silent = true;
}

export default logger;
