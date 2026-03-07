import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from 'express-session';
import passport from './config/passport.js';
import logger from './config/logger.js';

import { connectDatabase } from './config/database.js';
import routes from "./routes/index.routes.js";


export const app = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP to allow inline scripts
  })
);
app.use(compression());
app.use(cookieParser());
app.use(morgan('combined', { stream: logger.stream }));
// Session configuration (required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static files (test UI)
app.use(express.static('public'));

app.use("/api", routes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Error:', { message: err.message, stack: err.stack, status: err.status });
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});


// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📍 API available at http://localhost:${PORT}`);
      logger.info(`🔐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', { message: error.message, stack: error.stack });
    process.exit(1);
  }
};

startServer();
