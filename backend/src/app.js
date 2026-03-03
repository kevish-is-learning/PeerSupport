import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import logger from "./utils/logger.js";
import passport from "./config/passport.js";
import routes from "./routes/index.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));

// Passport initialization
app.use(passport.initialize());

// API Routes
app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ 
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server

app.listen(PORT, async () => {
  try {
    logger.info(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    );
  } catch (error) {
    logger.error("Failed to connect to database:", error);
    process.exit(1);
  }
});

export default app;
