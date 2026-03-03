import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import logger from "./utils/logger.js";
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();
// Middleware
app.use(helmet());
app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true,
  }),
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));

// Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
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
